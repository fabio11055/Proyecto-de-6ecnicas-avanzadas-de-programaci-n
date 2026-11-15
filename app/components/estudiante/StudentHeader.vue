<script setup>
// =========================================================================
// 1. IMPORTACIONES, PROPS Y EMITS: CABECERA DEL ESTUDIANTE
// =========================================================================
import { useAuthStore } from '~/stores/auth'

// Prop: Pestaña actualmente activa ('contenido' o 'evaluacion')
defineProps({
  activeTab: { type: String, default: 'contenido' }
})

// Emit: Comunica al componente padre (estudiante.vue) el cambio de pestaña
defineEmits(['update:activeTab', 'salir'])

// Acceso al store de autenticación (datos del alumno, colegio y grado)
const authStore = useAuthStore()

// =========================================================================
// 2. CONFIGURACIÓN DE PESTAÑAS DEL AULA
// =========================================================================
const pestanas = [
  { id: 'contenido', label: 'Videos y Guías', icon: 'mdi-play-box-multiple' },
  { id: 'evaluacion', label: 'Evaluación', icon: 'mdi-clipboard-check-outline' }
]
</script>

<template>
  <div class="student-header w-100 mb-4">
    <v-card class="header-card pa-3 pa-sm-4 rounded-2xl elevation-3 d-flex flex-column flex-md-row justify-space-between align-center ga-3">
      
      <!-- Información del Estudiante en sesión -->
      <div class="d-flex align-center ga-3 w-100 w-md-auto">
        <v-avatar color="#2D6A4F" size="48" class="elevation-2 text-white">
          <v-icon icon="mdi-account-school" size="28"></v-icon>
        </v-avatar>
        <div class="min-width-0">
          <div class="d-flex align-center ga-2 flex-wrap">
            <h2 class="text-subtitle-1 text-sm-h6 font-weight-black text-white ma-0 text-truncate">
              {{ authStore.user?.nombre || 'Estudiante' }}
            </h2>
            <v-chip 
              size="x-small" 
              :color="authStore.user?.grado === '5' ? 'amber-accent-2' : 'light-green-accent-2'" 
              variant="flat" 
              class="font-weight-black"
              :class="authStore.user?.grado === '5' ? 'text-black' : 'text-green-darken-4'"
            >
              {{ authStore.user?.grado || '4' }}° GRADO
            </v-chip>
            <v-chip v-if="authStore.user?.docenteNombre" size="x-small" color="amber-accent-2" variant="flat" class="font-weight-black text-black">
              Docente: {{ authStore.user.docenteNombre }}
            </v-chip>
          </div>
          <span class="text-caption text-grey-lighten-2 text-truncate d-block">
            <v-icon icon="mdi-domain" size="14" class="mr-1"></v-icon>
            {{ authStore.user?.escuela || 'Institución Educativa' }}
          </span>
        </div>
      </div>

      <!-- Pestañas de Navegación (Videos y Guías / Evaluación) -->
      <div class="tab-switcher d-flex ga-1 pa-1 rounded-pill w-100 w-md-auto justify-center">
        <v-btn
          v-for="pestana in pestanas"
          :key="pestana.id"
          :variant="activeTab === pestana.id ? 'flat' : 'text'"
          :color="activeTab === pestana.id ? '#2D6A4F' : 'transparent'"
          :class="activeTab === pestana.id ? 'text-white font-weight-bold' : 'text-grey-lighten-2'"
          rounded="pill"
          size="small"
          class="text-none flex-grow-1 flex-md-grow-0"
          @click="$emit('update:activeTab', pestana.id)"
        >
          <v-icon start :icon="pestana.icon" size="18"></v-icon>
          {{ pestana.label }}
        </v-btn>
      </div>

      <!-- Botón para cerrar sesión -->
      <div class="d-flex justify-end w-100 w-md-auto">
        <v-btn
          variant="tonal"
          color="red-lighten-3"
          size="small"
          rounded="pill"
          class="text-none font-weight-bold"
          @click="authStore.logout"
        >
          <v-icon start icon="mdi-logout"></v-icon>
          Salir
        </v-btn>
      </div>

    </v-card>
  </div>
</template>

<style scoped>
.header-card {
  background-color: rgba(20, 38, 23, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.tab-switcher {
  background-color: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.min-width-0 { min-width: 0; }
</style>
