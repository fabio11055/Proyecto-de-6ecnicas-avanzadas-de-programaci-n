<script setup>
// =========================================================================
// 1. IMPORTACIONES Y CONEXIÓN CON STORES
// =========================================================================
import { ref, watch } from 'vue'
import { useDocenteStore } from '~/stores/docente'

// Acceso al store del docente para editar la nota
const docenteStore = useDocenteStore()

// =========================================================================
// 2. MODELO REACTIVO LOCAL DEL MODAL DE EDICIÓN
// =========================================================================
const puntajeEditado = ref(1.0)
const observacionEditada = ref('')

// Sincroniza los campos del modal cada vez que se selecciona un estudiante
watch(
  () => docenteStore.notaSeleccionada,
  (nota) => {
    if (nota) {
      let p = (nota.puntaje !== null && nota.puntaje !== undefined) ? Number(nota.puntaje) : 3.5
      if (p > 5.0) p = p / 20
      puntajeEditado.value = Number(p.toFixed(1))
      observacionEditada.value = nota.observacion || ''
    }
  },
  { immediate: true }
)

// =========================================================================
// 3. ENVÍO DE ACTUALIZACIÓN AL SERVIDOR (PUT /api/docente/notas)
// =========================================================================
const guardarCambios = async () => {
  if (!docenteStore.notaSeleccionada) return
  await docenteStore.actualizarNota(
    docenteStore.notaSeleccionada.id,
    Number(puntajeEditado.value),
    observacionEditada.value
  )
}
</script>

<template>
  <!-- MODAL DE CALIFICACIÓN / EDICIÓN DE NOTA (PUT /api/docente/notas) -->
  <v-dialog v-model="docenteStore.dialogEditar" max-width="480px">
    <v-card v-if="docenteStore.notaSeleccionada" class="rounded-2xl overflow-hidden elevation-5">
      
      <!-- Encabezado del Modal -->
      <v-card-title class="bg-green-darken-4 text-white pa-4 d-flex align-center justify-space-between">
        <div class="d-flex align-center ga-2">
          <v-icon :icon="docenteStore.notaSeleccionada.estado === 'evaluado' ? 'mdi-pencil-box-outline' : 'mdi-plus-box-outline'" color="light-green-accent-2"></v-icon>
          <span class="text-subtitle-1 font-weight-bold">
            {{ docenteStore.notaSeleccionada.estado === 'evaluado' ? 'Modificar Calificación' : 'Asignar Calificación' }}
          </span>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" color="white" @click="docenteStore.dialogEditar = false"></v-btn>
      </v-card-title>

      <v-card-text class="pa-4 bg-white">
        <!-- Resumen del Alumno Seleccionado -->
        <div class="pa-3 rounded-xl mb-4 bg-grey-lighten-4 border">
          <div class="d-flex justify-space-between align-center mb-1">
            <span class="font-weight-bold text-subtitle-2 text-green-darken-4">
              {{ docenteStore.notaSeleccionada.nombre }}
            </span>
            <v-chip size="x-small" color="green-darken-3" class="text-white font-weight-bold">
              {{ docenteStore.notaSeleccionada.grado }}° Grado
            </v-chip>
          </div>
          <div class="text-caption text-grey-darken-1">
            {{ docenteStore.notaSeleccionada.actividad }}
          </div>
        </div>

        <!-- Formulario de Modificación de Calificación -->
        <v-form @submit.prevent="guardarCambios">
          <label class="text-caption font-weight-bold text-green-darken-4 mb-1 d-block">
            CALIFICACIÓN (ESCALA 1.0 A 5.0)
          </label>
          <div class="d-flex align-center ga-3 mb-4">
            <v-slider
              v-model="puntajeEditado"
              :min="1.0"
              :max="5.0"
              :step="0.1"
              color="#2D6A4F"
              track-color="grey-lighten-2"
              hide-details
              class="flex-grow-1"
            ></v-slider>
            <v-chip size="large" color="#2D6A4F" variant="flat" class="text-white font-weight-black px-3">
              {{ Number(puntajeEditado).toFixed(1) }} / 5.0
            </v-chip>
          </div>

          <label class="text-caption font-weight-bold text-green-darken-4 mb-1 d-block">
            OBSERVACIÓN PEDAGÓGICA
          </label>
          <v-textarea
            v-model="observacionEditada"
            placeholder="Escribe comentarios pedagógicos para el estudiante..."
            variant="outlined"
            rounded="xl"
            density="comfortable"
            rows="3"
            color="#2D6A4F"
            class="mb-3"
            hide-details
          ></v-textarea>

          <!-- Acciones del Modal -->
          <div class="d-flex justify-end ga-2 pt-2">
            <v-btn variant="text" color="grey-darken-2" rounded="pill" class="text-none font-weight-bold" @click="docenteStore.dialogEditar = false">
              Cancelar
            </v-btn>
            <v-btn
              type="submit"
              color="#2D6A4F"
              rounded="pill"
              class="text-white text-none font-weight-bold px-5 elevation-2"
              :loading="docenteStore.guardando"
            >
              <v-icon start icon="mdi-content-save"></v-icon>
              {{ docenteStore.guardando ? 'Guardando...' : 'Guardar Cambios' }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Estilos adicionales si se requieren para el diálogo modal */
</style>
