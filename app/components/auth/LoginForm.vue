<template>
  <v-container fluid class="landing-container d-flex align-center justify-center fill-height pa-4 text-center">
    <div class="content-wrapper d-flex flex-column align-center w-100">
      
      <!-- Logo modular en modo simple -->
      <LogoCard simple />

      <!-- Formulario para Estudiante -->
      <StudentForm v-if="role === 'estudiante'" />

      <!-- Formulario modular para Docente -->
      <TeacherForm v-else-if="role === 'docente'" />

      <!-- Mensaje de respaldo por si el rol no coincide exactamente -->
      <div v-else class="text-white">
        <p>Cargando formulario...</p>
      </div>

      <!-- Botón para regresar al inicio -->
      <v-btn
        to="/"
        variant="text"
        color="white"
        class="mt-4 text-none font-weight-medium"
      >
        <v-icon start icon="mdi-arrow-left"></v-icon>
        Volver a la página principal
      </v-btn>

    </div>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Computed reactivo que limpia espacios y convierte a minúsculas
const role = computed(() => {
  const queryRole = route.query.role
  return queryRole ? String(queryRole).trim().toLowerCase() : ''
})
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: url('/fondo.jpg') center center / cover no-repeat;
  position: relative;
}

.content-wrapper {
  max-width: 500px;
}
</style>