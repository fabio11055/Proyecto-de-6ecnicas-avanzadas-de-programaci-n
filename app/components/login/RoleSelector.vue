<script setup>
// =========================================================================
// 1. PROPS Y EMITS: SELECTOR DE ROL (ESTUDIANTE / DOCENTE)
// =========================================================================
// Prop: Recibe el rol actualmente seleccionado ('estudiante' o 'docente')
defineProps({
  modelValue: { type: String, default: 'estudiante' }
})

// Emit: Comunica el nuevo rol seleccionado hacia el componente padre (index.vue)
defineEmits(['update:modelValue'])

// =========================================================================
// 2. CONFIGURACIÓN DE ROLES
// =========================================================================
// Lista de roles interactivos disponibles en la plataforma
const roles = [
  { id: 'estudiante', label: 'Soy Estudiante', icon: 'mdi-school' },
  { id: 'docente', label: 'Soy Docente', icon: 'mdi-teach' }
]
</script>

<template>
  <div class="role-selector-container w-100 max-w-form mb-4">
    <!-- Pista de selección con efecto translúcido -->
    <div class="selector-track pa-1 rounded-pill d-flex elevation-2">
      <v-btn
        v-for="rol in roles"
        :key="rol.id"
        :variant="modelValue === rol.id ? 'flat' : 'text'"
        :color="modelValue === rol.id ? '#2D6A4F' : 'transparent'"
        :class="modelValue === rol.id ? 'active-btn font-weight-black' : 'inactive-btn font-weight-medium'"
        rounded="pill"
        size="large"
        class="flex-grow-1 text-none py-2 px-3 text-white"
        @click="$emit('update:modelValue', rol.id)"
      >
        <v-icon start :icon="rol.icon" size="20" class="mr-1"></v-icon>
        {{ rol.label }}
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.max-w-form {
  max-width: 440px;
}
.selector-track {
  background-color: rgba(20, 38, 23, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
}
.active-btn {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
}
.inactive-btn {
  opacity: 0.85;
}
.inactive-btn:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
