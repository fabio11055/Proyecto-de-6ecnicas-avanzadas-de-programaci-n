<template>
  <div class="w-100 max-width-form">
    <v-card class="pa-6 rounded-xl elevation-4 bg-white">
      <v-card-title class="text-h5 font-weight-bold text-green-darken-4 mb-2">
        Ingreso de Docentes
      </v-card-title>
      
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="form.email"
            placeholder="Correo institucional"
            variant="solo"
            rounded="pill"
            class="custom-input mb-3"
            hide-details
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            placeholder="Contraseña"
            type="password"
            variant="solo"
            rounded="pill"
            class="custom-input mb-5"
            hide-details
          ></v-text-field>

          <v-btn
            type="submit"
            block
            color="#2D6A4F"
            size="large"
            rounded="pill"
            class="text-white font-weight-bold elevation-2"
          >
            Iniciar Sesión
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = () => {
  console.log('Login docente:', form)
}
</script>

<style scoped>
.max-width-form {
  max-width: 480px;
}

/* Fondo gris claro y borde suave para diferenciar del fondo blanco */
:deep(.custom-input .v-field) {
  background-color: #f4f6f4 !important; /* Fondo gris/verde suave */
  border: 1.5px solid #2d6a4f22 !important; /* Borde verde sutil */
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.03) !important;
  transition: all 0.2s ease;
}

/* Efecto al hacer clic para escribir */
:deep(.custom-input .v-field--focused) {
  border-color: #2D6A4F !important; /* Borde verde más intenso */
  background-color: #ffffff !important; /* Se vuelve blanco al enfocar */
}

/* Texto que escribe el usuario */
:deep(.custom-input input) {
  color: #1c2518 !important;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
}

/* Placeholder */
:deep(.custom-input input::placeholder) {
  color: #666666 !important;
  opacity: 1;
}
</style>