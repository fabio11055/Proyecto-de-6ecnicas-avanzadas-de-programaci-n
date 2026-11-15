<script setup>
// =========================================================================
// 1. IMPORTACIONES Y CONEXIÓN CON STORES
// =========================================================================
import { ref, computed } from 'vue'
import { useDocenteStore } from '~/stores/docente'

// Acceso al store de administración docente
const docenteStore = useDocenteStore()

// =========================================================================
// 2. CONFIGURACIÓN DE FILTROS Y ESTADOS REACTIVOS
// =========================================================================
// Opciones fijas de filtrado
const OPCIONES_GRADO = [
  { label: 'Todos', val: 'todos' },
  { label: '4° Grado', val: '4' },
  { label: '5° Grado', val: '5' }
]

const OPCIONES_ESTADO = [
  { label: 'Todos', val: 'todos' },
  { label: 'Evaluados', val: 'evaluado' },
  { label: 'Pendientes', val: 'pendiente' }
]

// Filtros reactivos (texto de búsqueda, grado y estado)
const filtroTexto = ref('')
const filtroGrado = ref('todos')
const filtroEstado = ref('todos')

// Control del diálogo modal para confirmar eliminación de un alumno
const dialogEliminar = ref(false)
const alumnoAEliminar = ref(null)

// =========================================================================
// 3. MÉTODOS DE ACCIÓN Y CONTROL
// =========================================================================
// Abre el modal de confirmación antes de eliminar
const abrirDialogoEliminar = (item) => {
  alumnoAEliminar.value = item
  dialogEliminar.value = true
}

// Ejecuta la petición DELETE mediante el store
const ejecutarEliminar = async () => {
  if (!alumnoAEliminar.value) return
  try {
    await docenteStore.eliminarAlumno(alumnoAEliminar.value)
    dialogEliminar.value = false
    alumnoAEliminar.value = null
  } catch (e) {
    console.error('Error al eliminar alumno:', e)
  }
}

// Filtra la lista de estudiantes según texto, grado y estado seleccionado
const alumnosFiltrados = computed(() => {
  let list = docenteStore.notas || []

  if (filtroGrado.value !== 'todos') {
    list = list.filter(item => String(item.grado) === filtroGrado.value)
  }
  if (filtroEstado.value !== 'todos') {
    list = list.filter(item => item.estado === filtroEstado.value)
  }
  if (filtroTexto.value.trim()) {
    const q = filtroTexto.value.trim().toLowerCase()
    list = list.filter(item =>
      (item.nombre && item.nombre.toLowerCase().includes(q)) ||
      (item.escuela && item.escuela.toLowerCase().includes(q))
    )
  }
  return list
})

// Funciones auxiliares para formato y color de notas
const formatPuntaje = (p) => (p !== null && p !== undefined ? Number(p).toFixed(1) : '-')

const getColorPuntaje = (p) => {
  const n = Number(p)
  if (n >= 4.5) return 'text-light-green-accent-3'
  if (n >= 3.0) return 'text-amber-accent-2'
  return 'text-red-lighten-2'
}
</script>

<template>
  <div class="docente-grades-table">
    <v-card class="table-card pa-4 pa-sm-5 rounded-2xl elevation-3">
      
      <!-- 1. Encabezado y Barra de Búsqueda -->
      <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center ga-3 mb-4 pb-3 border-bottom-light">
        <div class="d-flex align-center ga-3">
          <v-avatar color="#2D6A4F" size="44" class="elevation-2 text-white">
            <v-icon icon="mdi-format-list-numbered" size="26"></v-icon>
          </v-avatar>
          <div>
            <h3 class="text-h6 font-weight-black text-white ma-0">Estudiantes y Evaluaciones</h3>
            <span class="text-caption text-grey-lighten-2">
              Calificaciones de 4° y 5° Grado vinculadas a tu código de docente.
            </span>
          </div>
        </div>

        <v-text-field
          v-model="filtroTexto"
          placeholder="Buscar estudiante o escuela..."
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="solo-filled"
          rounded="pill"
          hide-details
          class="w-100 w-md-auto"
          style="max-width: 300px;"
        ></v-text-field>
      </div>

      <!-- Alertas de Carga y Mensajes -->
      <div v-if="docenteStore.cargando" class="text-center py-6">
        <v-progress-circular indeterminate color="light-green-accent-3" size="40"></v-progress-circular>
        <p class="text-white mt-2 text-caption">Consultando notas en el servidor...</p>
      </div>

      <v-alert
        v-if="docenteStore.mensajeExito"
        type="success"
        variant="elevated"
        closable
        class="rounded-xl mb-3 elevation-2"
        @click:close="docenteStore.mensajeExito = null"
      >
        {{ docenteStore.mensajeExito }}
      </v-alert>

      <v-alert
        v-else-if="docenteStore.error"
        type="error"
        variant="tonal"
        closable
        class="rounded-xl mb-3"
        @click:close="docenteStore.error = null"
      >
        {{ docenteStore.error }}
      </v-alert>

      <template v-else>
        <!-- 2. Resumen interactivo por Grado (4° y 5°) -->
        <v-row class="ma-0 mb-4" dense>
          <v-col v-for="g in ['4', '5']" :key="g" cols="12" md="6" class="pa-1">
            <v-card 
              class="grade-card pa-3 rounded-xl elevation-2 cursor-pointer"
              :class="{ 'card-active': filtroGrado === g }"
              @click="filtroGrado = filtroGrado === g ? 'todos' : g"
            >
              <div class="d-flex align-center justify-space-between mb-2">
                <div class="d-flex align-center ga-2">
                  <v-avatar color="#2D6A4F" size="30" class="text-white font-weight-black text-caption">{{ g }}°</v-avatar>
                  <span class="font-weight-black text-subtitle-2 text-white">Estudiantes de {{ g }}° Grado</span>
                </div>
                <v-chip size="x-small" color="light-green-accent-2" variant="flat" class="text-green-darken-4 font-weight-black">
                  {{ g === '4' ? 'Nivel Intermedio' : 'Nivel Avanzado' }}
                </v-chip>
              </div>

              <!-- Estadísticas por Grado -->
              <div class="d-flex justify-space-around align-center text-center ga-2 pt-1 border-top-light">
                <div>
                  <div class="text-h6 font-weight-black text-white">{{ docenteStore.resumen['grado' + g]?.total || 0 }}</div>
                  <span class="text-caption text-grey-lighten-2">Ingresaron</span>
                </div>
                <v-divider vertical class="border-opacity-25"></v-divider>
                <div>
                  <div class="text-h6 font-weight-black text-light-green-accent-2">{{ docenteStore.resumen['grado' + g]?.evaluados || 0 }}</div>
                  <span class="text-caption text-grey-lighten-2">Evaluados</span>
                </div>
                <v-divider vertical class="border-opacity-25"></v-divider>
                <div>
                  <div class="text-h6 font-weight-black text-amber-accent-2">{{ docenteStore.resumen['grado' + g]?.pendientes || 0 }}</div>
                  <span class="text-caption text-grey-lighten-2">Pendientes</span>
                </div>
                <v-divider vertical class="border-opacity-25"></v-divider>
                <div>
                  <div class="text-h6 font-weight-black text-cyan-accent-2">{{ docenteStore.resumen['grado' + g]?.promedio || 0 }}</div>
                  <span class="text-caption text-grey-lighten-2">Promedio</span>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- 3. Botones de Filtrado Rápido -->
        <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-3">
          <!-- Filtro por Grado -->
          <div class="d-flex align-center ga-1">
            <span class="text-caption text-grey-lighten-2 mr-1">Grado:</span>
            <v-btn
              v-for="op in OPCIONES_GRADO"
              :key="op.val"
              size="small"
              rounded="pill"
              :variant="filtroGrado === op.val ? 'flat' : 'outlined'"
              :color="filtroGrado === op.val ? 'light-green-accent-2' : 'white'"
              :class="filtroGrado === op.val ? 'text-green-darken-4 font-weight-black' : 'text-white'"
              class="text-none"
              @click="filtroGrado = op.val"
            >
              {{ op.label }}
            </v-btn>
          </div>

          <!-- Filtro por Estado -->
          <div class="d-flex align-center ga-1">
            <span class="text-caption text-grey-lighten-2 mr-1">Estado:</span>
            <v-btn
              v-for="op in OPCIONES_ESTADO"
              :key="op.val"
              size="small"
              rounded="pill"
              :variant="filtroEstado === op.val ? 'flat' : 'outlined'"
              :color="filtroEstado === op.val ? 'light-green-accent-2' : 'white'"
              :class="filtroEstado === op.val ? 'text-green-darken-4 font-weight-black' : 'text-white'"
              class="text-none"
              @click="filtroEstado = op.val"
            >
              {{ op.label }}
            </v-btn>
          </div>
        </div>

        <!-- 4. Tabla de Datos -->
        <v-table class="grades-vtable rounded-xl elevation-2" density="comfortable">
          <thead>
            <tr class="header-row">
              <th class="text-left font-weight-bold">ESTUDIANTE</th>
              <th class="text-center font-weight-bold">GRADO</th>
              <th class="text-center font-weight-bold">ESTADO</th>
              <th class="text-center font-weight-bold">NOTA</th>
              <th class="text-left font-weight-bold">OBSERVACIÓN</th>
              <th class="text-center font-weight-bold">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alumno in alumnosFiltrados" :key="alumno.id" class="table-row">
              <!-- Nombre y Escuela -->
              <td>
                <div class="font-weight-bold text-white">{{ alumno.nombre }}</div>
                <div class="text-caption text-grey-lighten-1">{{ alumno.escuela || 'Colegio no especificado' }}</div>
              </td>

              <!-- Grado -->
              <td class="text-center">
                <v-chip size="x-small" :color="alumno.grado === '5' ? 'amber-accent-2' : 'light-green-accent-2'" variant="flat" class="text-green-darken-4 font-weight-black">
                  {{ alumno.grado }}°
                </v-chip>
              </td>

              <!-- Estado (Evaluado / Pendiente) -->
              <td class="text-center">
                <v-chip
                  size="x-small"
                  :color="alumno.estado === 'evaluado' ? 'light-green-accent-2' : 'amber-accent-2'"
                  variant="flat"
                  class="font-weight-black"
                  :class="alumno.estado === 'evaluado' ? 'text-green-darken-4' : 'text-amber-darken-4'"
                >
                  <v-icon start :icon="alumno.estado === 'evaluado' ? 'mdi-check-circle' : 'mdi-clock-outline'" size="12"></v-icon>
                  {{ alumno.estado === 'evaluado' ? 'Evaluado' : 'Pendiente' }}
                </v-chip>
              </td>

              <!-- Nota -->
              <td class="text-center font-weight-black text-subtitle-2" :class="getColorPuntaje(alumno.puntaje)">
                {{ formatPuntaje(alumno.puntaje) }}
                <span v-if="alumno.puntaje !== null" class="text-caption text-grey-lighten-1 font-weight-regular">/5.0</span>
              </td>

              <!-- Observación Pedagógica -->
              <td>
                <div class="text-caption text-truncate max-w-obs" :title="alumno.observacion || ''">
                  {{ alumno.observacion || 'Sin observaciones' }}
                </div>
              </td>

              <!-- Acciones: Calificar/Editar y Eliminar -->
              <td class="text-center">
                <div class="d-inline-flex ga-1">
                  <!-- Botón Calificar / Editar (Abre modal PUT) -->
                  <v-btn
                    icon
                    size="small"
                    variant="tonal"
                    color="light-green-accent-2"
                    title="Calificar o modificar nota"
                    @click="docenteStore.abrirModalEditar(alumno)"
                  >
                    <v-icon icon="mdi-pencil"></v-icon>
                  </v-btn>

                  <!-- Botón Eliminar (Abre confirmación DELETE) -->
                  <v-btn
                    icon
                    size="small"
                    variant="tonal"
                    color="red-lighten-2"
                    title="Eliminar estudiante"
                    @click="abrirDialogoEliminar(alumno)"
                  >
                    <v-icon icon="mdi-delete"></v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>

            <!-- Mensaje si no hay registros -->
            <tr v-if="!alumnosFiltrados.length">
              <td colspan="6" class="text-center py-6 text-grey-lighten-2">
                <v-icon icon="mdi-account-search" size="32" class="mb-1 d-block mx-auto text-grey-lighten-1"></v-icon>
                No se encontraron estudiantes para los filtros seleccionados.
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>

    </v-card>

    <!-- Modal de Confirmación para Eliminar Estudiante (DELETE) -->
    <v-dialog v-model="dialogEliminar" max-width="420px">
      <v-card v-if="alumnoAEliminar" class="rounded-2xl overflow-hidden elevation-5">
        <v-card-title class="bg-red-darken-4 text-white pa-4 d-flex align-center ga-2">
          <v-icon icon="mdi-alert-circle-outline" color="amber-accent-2"></v-icon>
          <span class="text-subtitle-1 font-weight-bold">¿Eliminar estudiante?</span>
        </v-card-title>

        <v-card-text class="pa-4 bg-white">
          <p class="mb-3 text-body-2 text-grey-darken-3">
            ¿Estás seguro de que deseas eliminar a <strong>{{ alumnoAEliminar.nombre }}</strong>?
          </p>
          <div class="pa-3 rounded-xl bg-grey-lighten-4 mb-3 text-caption text-grey-darken-2">
            <div><strong>Grado:</strong> {{ alumnoAEliminar.grado }}° Grado</div>
            <div><strong>Institución:</strong> {{ alumnoAEliminar.escuela || 'No especificada' }}</div>
            <div><strong>Nota actual:</strong> {{ alumnoAEliminar.puntaje !== null ? formatPuntaje(alumnoAEliminar.puntaje) + ' / 5.0' : 'Pendiente' }}</div>
          </div>
          <span class="text-caption text-red-darken-3 font-weight-medium">
            Esta acción eliminará al estudiante y todas sus notas registradas.
          </span>
        </v-card-text>

        <v-card-actions class="pa-3 bg-grey-lighten-4 d-flex justify-end ga-2">
          <v-btn variant="text" color="grey-darken-2" rounded="pill" class="text-none font-weight-bold" @click="dialogEliminar = false">
            Cancelar
          </v-btn>
          <v-btn
            color="red-darken-3"
            rounded="pill"
            class="text-white text-none font-weight-bold px-4"
            :loading="docenteStore.eliminando"
            @click="ejecutarEliminar"
          >
            <v-icon start icon="mdi-delete"></v-icon>
            Sí, Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.table-card {
  background: rgba(20, 40, 30, 0.88);
  backdrop-filter: blur(8px);
}
.grade-card {
  background: rgba(30, 60, 45, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}
.card-active {
  border-color: #69f0ae !important;
  background: rgba(30, 75, 55, 0.9) !important;
}
.grades-vtable {
  background: rgba(15, 30, 22, 0.95);
  color: white;
}
.header-row th {
  background: #1b4332 !important;
  color: #b7e4c7 !important;
}
.table-row:hover {
  background: rgba(45, 106, 79, 0.25) !important;
}
.max-w-obs { max-width: 180px; }
.border-bottom-light { border-bottom: 1px solid rgba(255, 255, 255, 0.12); }
.border-top-light { border-top: 1px solid rgba(255, 255, 255, 0.12); }
</style>
