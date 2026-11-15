<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// Instancia del store de autenticación (maneja roles, login y sesión)
const authStore = useAuthStore()
const route = useRoute()


// Controla el rol seleccionado: 'estudiante' por defecto, o lee ?role=docente de la URL
const selectedRole = ref('estudiante')


// Al cargar la vista, recupera la sesión previa y sincroniza el rol desde la URL
onMounted(() => {
  // Inicializa los datos del usuario si ya existía una sesión guardada
  authStore.initUser()

  // Si en la URL viene el parámetro ?role=docente o ?role=estudiante, lo asigna
  const queryRole = String(route.query.role || '').toLowerCase()
  if (queryRole === 'docente' || queryRole === 'estudiante') {
    selectedRole.value = queryRole
  }
})
</script>

<template>
  <!-- CONTENEDOR PRINCIPAL: Centrado en pantalla con fondo temático -->
  <v-container fluid class="login-page-container d-flex align-center justify-center fill-height pa-4 text-center">
    <div class="page-content-wrapper d-flex flex-column align-center w-100">
      
      <!-- 1. Cabecera con Logo, Título y Descripción del Sistema -->
      <LoginHeader />

      <!-- 2. Alertas globales de feedback en caso de éxito o error -->
      <v-alert
        v-if="authStore.error"
        type="error"
        variant="tonal"
        closable
        density="compact"
        class="mb-3 w-100 text-left"
        @click:close="authStore.error = null"
      >
        ⚠️ {{ authStore.error }}
      </v-alert>

      <!-- 3. Selector de Rol Interactivo (Estudiante o Docente) -->
      <RoleSelector v-model="selectedRole" />

      <!-- 4. Formulario dinámico según el rol (Inicio de sesión o registro) -->
      <LoginForm :role="selectedRole" />

    </div>
  </v-container>
</template>

<style scoped>
.login-page-container {
  min-height: 100vh;
  background: url('/fondo.jpg') center center / cover no-repeat;
  position: relative;
}

.page-content-wrapper {
  max-width: 520px;
}
</style>
