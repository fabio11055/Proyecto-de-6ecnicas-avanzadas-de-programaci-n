<template>
  <div class="top-navbar px-6 py-3 mb-6 rounded-pill">
    
    <!-- 1. Extremo Izquierdo: Hoja -->
    <div class="d-flex align-center justify-start">
      <v-icon icon="mdi-leaf" color="green-lighten-2" size="32"></v-icon>
    </div>

    <!-- 2. Centro Perfecto: Menú de navegación con texto más grande -->
    <div class="nav-links d-flex align-center justify-center ga-8">
      <span 
        class="nav-item font-weight-medium text-white-70"
        :class="{ 'active font-weight-bold text-white': activeTab === 'contenidos' || activeTab === 'inicio' }"
        @click="selectTab('contenidos')"
      >
        Contenidos
      </span>

      <span 
        class="nav-item font-weight-medium text-white-70"
        :class="{ 'active font-weight-bold text-white': activeTab === 'recursos' }"
        @click="selectTab('recursos')"
      >
        Recursos
      </span>

      <span 
        class="nav-item font-weight-medium text-white-70"
        :class="{ 'active font-weight-bold text-white': activeTab === 'actividades' }"
        @click="selectTab('actividades')"
      >
        Actividades
      </span>

      <span 
        class="nav-item font-weight-medium text-white-70"
        :class="{ 'active font-weight-bold text-white': activeTab === 'evaluacion' }"
        @click="selectTab('evaluacion')"
      >
        Evaluación
      </span>
    </div>

    <!-- 3. Extremo Derecho: Avatar del usuario -->
    <div class="d-flex align-center justify-end">
      <v-avatar color="grey-lighten-2" size="40">
        <v-icon icon="mdi-account" color="grey-darken-2" size="26"></v-icon>
      </v-avatar>
    </div>

  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    default: 'inicio'
  }
})

const emit = defineEmits(['change-tab'])

const selectTab = (tab) => {
  emit('change-tab', tab)
}
</script>

<style scoped>
.top-navbar {
  background-color: #2d5236b3;
  backdrop-filter: blur(8px);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

/* Aumento de tamaño de texto */
.nav-item {
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  user-select: none;
  font-size: 1.35rem; /* Tamaño de fuente incrementado */
  white-space: nowrap;
}

.nav-item:hover {
  color: #ffffff !important;
}

/* Indicador de línea inferior ajustado al nuevo tamaño */
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  border-radius: 2px;
}

.text-white-70 {
  color: rgba(255, 255, 255, 0.8) !important;
}
</style>