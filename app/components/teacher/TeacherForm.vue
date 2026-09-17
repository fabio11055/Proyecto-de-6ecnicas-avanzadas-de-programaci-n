<template>
  <div class="w-100 max-width-form">
    <v-card class="pa-6 rounded-xl elevation-4 bg-white">
      <v-card-title class="text-h5 font-weight-bold text-green-darken-4 mb-2">
        {{ isRegistering ? 'Registro de Docentes' : 'Ingreso de Docentes' }}
      </v-card-title>
      
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          
          <!-- Campo adicional para el registro -->
          <v-text-field
            v-if="isRegistering"
            v-model="form.name"
            placeholder="Nombre completo"
            variant="solo"
            rounded="pill"
            class="custom-input mb-3"
            hide-details
          ></v-text-field>

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
            class="custom-input mb-4"
            hide-details
          ></v-text-field>

          <v-btn
            type="submit"
            block
            color="#2D6A4F"
            size="large"
            rounded="pill"
            class="text-white font-weight-bold elevation-2 mb-3"
          >
            {{ isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión' }}
          </v-btn>

          <!-- Enlace para alternar entre Login y Registro -->
          <div class="text-caption font-weight-medium text-grey-darken-2 mt-2">
            {{ isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta de docente?' }}
            <a
              href="#"
              class="text-green-darken-3 font-weight-bold ml-1 text-decoration-none"
              @click.prevent="isRegistering = !isRegistering"
            >
              {{ isRegistering ? 'Inicia sesión aquí' : 'Regístrate como docente' }}
            </a>
          </div>

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const isRegistering = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  if (isRegistering.value) {
    console.log('Registrando docente:', form)
  } else {
    console.log('Login docente:', form)
  }
}
</script>

<style scoped>
.max-width-form {
  max-width: 480px;
}

:deep(.custom-input .v-field) {
  background-color: #f4f6f4 !important;
  border: 1.5px solid #2d6a4f22 !important;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.03) !important;
  transition: all 0.2s ease;
}

:deep(.custom-input .v-field--focused) {
  border-color: #2D6A4F !important;
  background-color: #ffffff !important;
}

:deep(.custom-input input) {
  color: #1c2518 !important;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
}

:deep(.custom-input input::placeholder) {
  color: #666666 !important;
  opacity: 1;
}
</style>