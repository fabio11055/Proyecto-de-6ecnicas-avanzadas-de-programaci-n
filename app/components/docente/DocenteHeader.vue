<script setup>
// =========================================================================
// 1. IMPORTACIONES Y CONEXIÓN CON STORES
// =========================================================================
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useDocenteStore } from '~/stores/docente'

// Acceso al store del usuario autenticado y al de gestión de notas
const authStore = useAuthStore()
const docenteStore = useDocenteStore()

// Emits opcionales para comunicar acciones al padre (docente.vue)
defineEmits(['refrescar', 'salir'])

// =========================================================================
// 2. CÁLCULOS Y MÉTRICAS COMPUTADAS (KPIs)
// =========================================================================
// 1. Cálculo de promedio general en escala de 1.0 a 5.0
const promedioGeneral = computed(() => {
  const evaluados = docenteStore.estudiantesEvaluados
  if (!evaluados.length) return '0.0'
  const suma = evaluados.reduce((acc, curr) => {
    let p = Number(curr.puntaje || 0)
    if (p > 5.0) p = p / 20
    return acc + p
  }, 0)
  return (suma / evaluados.length).toFixed(1)
})

// 2. Conteo de estudiantes aprobados (nota >= 3.0)
const totalAprobados = computed(() => {
  return docenteStore.estudiantesEvaluados.filter(n => {
    let p = Number(n.puntaje || 0)
    if (p > 5.0) p = p / 20
    return p >= 3.0
  }).length
})

// 3. Arreglo reactivo para dibujar las 3 tarjetas de métricas sin duplicar código
const metricas = computed(() => [
  {
    valor: `${docenteStore.notas.length} Estudiantes`,
    detalle: `4°: ${docenteStore.estudiantesGrado4.length} • 5°: ${docenteStore.estudiantesGrado5.length}`,
    icon: 'mdi-account-multiple-check',
    color: 'light-green-accent-2'
  },
  {
    valor: `${promedioGeneral.value} / 5.0`,
    detalle: `Promedio 4°: ${docenteStore.resumen.grado4.promedio} • 5°: ${docenteStore.resumen.grado5.promedio}`,
    icon: 'mdi-chart-line',
    color: 'amber-accent-2'
  },
  {
    valor: `${totalAprobados.value} Aprobados`,
    detalle: `${docenteStore.estudiantesEvaluados.length} evaluados • ${docenteStore.estudiantesPendientes.length} pendientes`,
    icon: 'mdi-seal',
    color: 'cyan-accent-2'
  }
])
</script>

<template>
  <div class="docente-header w-100 mb-4">
    <!-- Barra Superior: Info del Docente, Código de Alumnos y Acciones -->
    <v-card class="header-card pa-3 pa-sm-4 rounded-2xl elevation-3 d-flex flex-column flex-md-row justify-space-between align-center ga-3 mb-4">
      
      <!-- Información del Docente -->
      <div class="d-flex align-center ga-3 w-100 w-md-auto">
        <v-avatar color="#2D6A4F" size="48" class="elevation-2 text-white">
          <v-icon icon="mdi-teach" size="28"></v-icon>
        </v-avatar>
        <div class="min-width-0">
          <div class="d-flex align-center ga-2 flex-wrap">
            <h2 class="text-subtitle-1 text-sm-h6 font-weight-black text-white ma-0 text-truncate">
              {{ authStore.user?.nombre || 'Profesor(a)' }}
            </h2>
            <v-chip size="x-small" color="light-green-accent-2" variant="flat" class="font-weight-black text-green-darken-4">
              DOCENTE
            </v-chip>
          </div>
          <span class="text-caption text-grey-lighten-2 text-truncate d-block">
            <v-icon icon="mdi-email-outline" size="14" class="mr-1"></v-icon>
            {{ authStore.user?.email || 'docente@ecomentes.edu' }} • {{ authStore.user?.institucion || 'Colegio Eco-Mentes' }}
          </span>
        </div>
      </div>

      <!-- Código de Acceso para los Estudiantes -->
      <div class="codigo-box pa-2 px-3 rounded-pill d-flex align-center ga-2 elevation-2">
        <v-icon icon="mdi-key" color="amber-accent-2" size="20"></v-icon>
        <div class="text-start">
          <span class="text-caption text-grey-lighten-2 d-block" style="font-size: 0.68rem; line-height: 1;">
            Código para tus alumnos (4° y 5°):
          </span>
          <span class="font-weight-black text-amber-accent-2 text-subtitle-2">
            {{ authStore.user?.codigo || 'DOC-401' }}
          </span>
        </div>
      </div>

      <!-- Botones de Acción (Refrescar y Salir) -->
      <div class="d-flex justify-end w-100 w-md-auto ga-2">
        <v-btn
          variant="tonal"
          color="light-green-accent-2"
          size="small"
          rounded="pill"
          class="text-none font-weight-bold"
          :loading="docenteStore.cargando"
          @click="docenteStore.cargarNotas"
        >
          <v-icon start icon="mdi-refresh"></v-icon>
          Refrescar
        </v-btn>

        <v-btn
          variant="tonal"
          color="red-lighten-3"
          size="small"
          rounded="pill"
          class="text-none font-weight-bold"
          @click="authStore.logout"
        >
          <v-icon start icon="mdi-logout"></v-icon>
          Cerrar Sesión
        </v-btn>
      </div>
    </v-card>

    <!-- 3 Tarjetas de Métricas Generales (KPIs) -->
    <v-row class="ma-0" dense>
      <v-col v-for="(m, i) in metricas" :key="i" cols="12" sm="4" class="pa-1">
        <v-card class="metric-card pa-3 rounded-xl elevation-2 d-flex align-center ga-3">
          <v-avatar color="#1B4332" size="42" rounded="lg">
            <v-icon :icon="m.icon" :color="m.color" size="24"></v-icon>
          </v-avatar>
          <div>
            <div class="text-h6 font-weight-black text-white leading-tight">
              {{ m.valor }}
            </div>
            <span class="text-caption text-grey-lighten-2 font-weight-medium">
              {{ m.detalle }}
            </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.header-card,
.metric-card {
  background-color: rgba(20, 38, 23, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.codigo-box {
  background-color: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 215, 0, 0.3);
}
.leading-tight { line-height: 1.1; }
.min-width-0 { min-width: 0; }
</style>
