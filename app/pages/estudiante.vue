<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useEstudianteStore } from '~/stores/estudiante'

// Acceso al enrutador y a los stores de autenticación y estudiante
const route = useRoute()
const authStore = useAuthStore()
const estudianteStore = useEstudianteStore()

// Controla la pestaña activa: 'contenido' (Conceptos 3R, Videos, Guías) o 'evaluacion' (Desafíos y Test)
const activeTab = ref('contenido')


// Al abrir el aula virtual, verifica al estudiante y carga el contenido educativo desde el servidor
onMounted(async () => {
  // 1. Restaura la sesión del alumno almacenada localmente
  authStore.initUser()

  // 2. Soporte para acceso directo con datos en la URL (?nombre=...&grado=...)
  if (route.query.nombre && !authStore.user) {
    authStore.user = {
      role: 'estudiante',
      nombre: String(route.query.nombre),
      escuela: String(route.query.escuela || 'Institución Educativa'),
      grado: String(route.query.grado || '4'),
      codigo: String(route.query.codigo || '')
    }
  }

  // 3. Extrae el material educativo desde el servidor (GET /api/estudiante/contenido)
  await estudianteStore.cargarContenido()
})


// Cambia entre la pestaña de contenido y la de evaluación
function cambiarPestana(nombrePestana) {
  activeTab.value = nombrePestana
}

// Cierra la sesión del estudiante y vuelve al portal de inicio
function salir() {
  authStore.logout()
}
</script>

<template>
  <!-- CONTENEDOR PRINCIPAL: Aula virtual para el estudiante con fondo temático -->
  <v-container fluid class="estudiante-page-container fill-height pa-3 pa-sm-5 pa-md-6">
    <div class="content-wrapper w-100 fill-height d-flex flex-column">
      
      <!-- Banner de Alerta: Notificaciones de Éxito (ej. al enviar la evaluación) -->
      <v-alert
        v-if="estudianteStore.mensajeExito"
        type="success"
        variant="tonal"
        closable
        density="compact"
        class="mb-3"
        @click:close="estudianteStore.mensajeExito = null"
      >
        🎉 {{ estudianteStore.mensajeExito }}
      </v-alert>

      <!-- Banner de Alerta: Notificaciones de Error -->
      <v-alert
        v-if="estudianteStore.error"
        type="error"
        variant="tonal"
        closable
        density="compact"
        class="mb-3"
        @click:close="estudianteStore.error = null"
      >
        ⚠️ {{ estudianteStore.error }}
      </v-alert>

      <!-- 1. Cabecera con datos del estudiante, grado y botones de pestañas (Contenido / Evaluación) -->
      <StudentHeader v-model:activeTab="activeTab" @salir="salir" />

      <!-- 2. Pestaña de Contenido: Conceptos de Reducir, Reutilizar, Reciclar, Videos y Guías PDF -->
      <StudentContent v-if="activeTab === 'contenido'" @ir-a-evaluacion="cambiarPestana('evaluacion')" />

      <!-- 3. Pestaña de Evaluación: Preguntas adaptadas según el grado con envío POST de calificación -->
      <StudentActivities v-else-if="activeTab === 'evaluacion' || activeTab === 'actividades'" />

    </div>
  </v-container>
</template>

<style scoped>
.estudiante-page-container {
  min-height: 100vh;
  background: url('/fondo.jpg') center center / cover no-repeat;
  position: relative;
  align-content: flex-start;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
