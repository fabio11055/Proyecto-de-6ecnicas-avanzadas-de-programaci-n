<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useDocenteStore } from '~/stores/docente'

// Stores para la sesión del docente y la gestión de calificaciones
const authStore = useAuthStore()
const docenteStore = useDocenteStore()

// Al abrir la página, restaura la sesión del docente y carga las notas desde el servidor
onMounted(async () => {
  // 1. Inicializa la sesión del docente (GET /api/auth/me)
  authStore.initUser()

  // 2. Extrae la lista de estudiantes y calificaciones (GET /api/docente/notas)
  await docenteStore.cargarNotas()
})

// Recarga manualmente la información de calificaciones desde el servidor
async function refrescarDatos() {
  await docenteStore.cargarNotas()
}

// Cierra la sesión activa y redirige al inicio
function cerrarSesion() {
  authStore.logout()
}
</script>

<template>
  <!-- CONTENEDOR PRINCIPAL: Panel de control con fondo ambiental -->
  <v-container fluid class="docente-page-container fill-height pa-3 pa-sm-5 pa-md-6">
    <div class="content-wrapper w-100 fill-height d-flex flex-column">
      
      <!-- Banner de Alerta: Notificaciones de Éxito -->
      <v-alert
        v-if="docenteStore.mensajeExito"
        type="success"
        variant="tonal"
        closable
        density="compact"
        class="mb-3"
        @click:close="docenteStore.mensajeExito = null"
      >
        ✅ {{ docenteStore.mensajeExito }}
      </v-alert>

      <!-- Banner de Alerta: Notificaciones de Error -->
      <v-alert
        v-if="docenteStore.error"
        type="error"
        variant="tonal"
        closable
        density="compact"
        class="mb-3"
        @click:close="docenteStore.error = null"
      >
        ⚠️ {{ docenteStore.error }}
      </v-alert>

      <!-- 1. Cabecera con datos del docente, código de clase y tarjetas de KPIs -->
      <DocenteHeader @refrescar="refrescarDatos" @salir="cerrarSesion" />

      <!-- 2. Tabla interactiva de estudiantes y calificaciones con filtros por grado (GET /api/docente/notas) -->
      <DocenteGradesTable />

      <!-- 3. Modal para asignar o modificar notas de estudiantes (PUT /api/docente/notas) -->
      <DocenteEditGrade />

    </div>
  </v-container>
</template>

<style scoped>
.docente-page-container {
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
