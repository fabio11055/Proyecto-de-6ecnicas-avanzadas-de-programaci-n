<template>
  <v-form @submit.prevent="handleSubmit" class="form-container">
    
    <!-- Campo: ¿Cómo te llamas? -->
    <label class="field-label text-caption font-weight-black text-white mb-1 d-block text-left">
      ¿CÓMO TE LLAMAS?
    </label>
    <v-text-field
      v-model="form.name"
      placeholder="Escribe tu nombre aquí"
      variant="solo"
      rounded="pill"
      class="custom-input mb-3"
      hide-details
    ></v-text-field>

    <!-- Campo: Institución Educativa -->
    <label class="field-label text-caption font-weight-black text-white mb-1 d-block text-left">
      INSTITUCIÓN EDUCATIVA
    </label>
    <v-text-field
      v-model="form.school"
      placeholder="Escribe tu escuela o colegio aquí"
      variant="solo"
      rounded="pill"
      class="custom-input mb-3"
      hide-details
    ></v-text-field>

    <!-- Campo: Código de Acceso -->
    <label class="field-label text-caption font-weight-black text-white mb-1 d-block text-left">
      CÓDIGO DE ACCESO
    </label>
    <v-text-field
      v-model="form.code"
      placeholder="Escribe tu código de acceso aquí"
      variant="solo"
      rounded="pill"
      class="custom-input mb-4"
      hide-details
    ></v-text-field>

    <!-- Campo: ¿En qué grado estás? -->
    <label class="field-label text-caption font-weight-black text-white mb-2 d-block text-left">
      ¿EN QUÉ GRADO ESTÁS?
    </label>
    
    <!-- Componente de Selección de Grado -->
    <StudentGradeSelector class="mb-6" />

    <!-- Botón de Continuar -->
    <v-btn
      type="submit"
      block
      color="#1C2518"
      size="x-large"
      rounded="pill"
      class="text-none text-white font-weight-bold elevation-4 py-4"
    >
      Continuar al Dashboard
      <v-icon end icon="mdi-arrow-right" class="ml-2"></v-icon>
    </v-btn>

  </v-form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  school: '',
  code: ''
})

const handleSubmit = () => {
  console.log('Datos estudiante:', form)
}
</script>

<style scoped>
.form-container {
  max-width: 480px;
  width: 100%;
}

.field-label {
  letter-spacing: 1px;
}

/* Aplica fondo blanco a la tarjeta del input */
:deep(.custom-input .v-field) {
  background-color: #ffffff !important;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08) !important;
}

/* Asegura que el texto que escribe el usuario sea visible y oscuro */
:deep(.custom-input input) {
  color: #1c2518 !important; /* Color oscuro visible */
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
}

/* Cambia el color del texto del placeholder cuando está vacío */
:deep(.custom-input input::placeholder) {
  color: #888888 !important;
  opacity: 1;
}
</style>