<template>
  <v-container fluid class="landing-container d-flex align-center justify-center fill-height pa-4 text-center">
    <div class="content-wrapper d-flex flex-column align-center w-100">
      
      <!-- Logo modular sin tarjeta blanca -->
      <LogoCard simple />

      <!-- Formulario para Estudiante -->
      <StudentStudentForm v-if="role === 'estudiante'" />

      <!-- Formulario/Vista para Docente -->
      <div v-else-if="role === 'docente'" class="w-100 max-width-form">
        <v-card class="pa-6 rounded-xl elevation-4 bg-white">
          <v-card-title class="text-h5 font-weight-bold text-green-darken-4 mb-2">
            Ingreso de Docentes
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Correo institucional"
              variant="solo"
              rounded="pill"
              class="mb-3"
              hide-details
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              type="password"
              variant="solo"
              rounded="pill"
              class="mb-4"
              hide-details
            ></v-text-field>
            <v-btn
              block
              color="#2D6A4F"
              size="large"
              rounded="pill"
              class="text-white font-weight-bold"
            >
              Iniciar Sesión
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <!-- Botón de regreso si no hay un rol definido o para cambiar de rol -->
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
// Lee la propiedad ?role= de la URL
const role = computed(() => route.query.role || 'estudiante')
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

.max-width-form {
  max-width: 480px;
}
</style>
