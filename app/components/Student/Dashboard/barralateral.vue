<template>
  <div class="sidebar-card fill-height d-flex flex-column pa-6 rounded-xl">
    
    <!-- Logo modular -->
    <div class="d-flex justify-center mb-4">
      <LogoCard simple />
    </div>

    <!-- Perfil Dinámico del Estudiante -->
    <div class="d-flex align-center mb-6 pa-3 rounded-lg bg-green-darken-4 text-white">
      <v-avatar color="grey-lighten-2" size="44" class="mr-3">
        <v-icon icon="mdi-account" color="grey-darken-2" size="30"></v-icon>
      </v-avatar>
      <div class="overflow-hidden">
        <div class="text-subtitle-2 font-weight-bold text-truncate">
          {{ studentName }}
        </div>
        <div class="text-caption text-grey-lighten-1 font-weight-medium">
          {{ studentGrade }}° GRADO
        </div>
        <div class="text-caption text-grey-lighten-2 text-truncate" style="font-size: 0.7rem !important;">
          {{ studentSchool }}
        </div>
      </div>
    </div>

    <!-- Menú Lateral Interactivo -->
    <v-list class="sidebar-menu bg-transparent pa-0 flex-grow-1">
      
      <!-- Inicio -->
      <v-list-item
        :active="activeTab === 'inicio'"
        color="white"
        rounded="pill"
        class="menu-item mb-2 text-white"
        @click="selectTab('inicio')"
      >
        <template #prepend>
          <v-icon icon="mdi-home" class="mr-3"></v-icon>
        </template>
        <v-list-item-title class="font-weight-bold">Inicio</v-list-item-title>
      </v-list-item>

      <!-- Contenidos -->
      <v-list-item
        :active="activeTab === 'contenidos'"
        color="white"
        rounded="pill"
        class="menu-item mb-2 text-white"
        @click="selectTab('contenidos')"
      >
        <template #prepend>
          <v-icon icon="mdi-book-open-variant" class="mr-3"></v-icon>
        </template>
        <v-list-item-title class="font-weight-medium">Contenidos</v-list-item-title>
      </v-list-item>

      <!-- Recursos -->
      <v-list-item
        :active="activeTab === 'recursos'"
        color="white"
        rounded="pill"
        class="menu-item mb-2 text-white"
        @click="selectTab('recursos')"
      >
        <template #prepend>
          <v-icon icon="mdi-folder-open" class="mr-3"></v-icon>
        </template>
        <v-list-item-title class="font-weight-medium">Recursos</v-list-item-title>
      </v-list-item>

      <!-- Actividades -->
      <v-list-item
        :active="activeTab === 'actividades'"
        color="white"
        rounded="pill"
        class="menu-item mb-2 text-white"
        @click="selectTab('actividades')"
      >
        <template #prepend>
          <v-icon icon="mdi-puzzle" class="mr-3"></v-icon>
        </template>
        <v-list-item-title class="font-weight-medium">Actividades</v-list-item-title>
      </v-list-item>

      <!-- Evaluación -->
      <v-list-item
        :active="activeTab === 'evaluacion'"
        color="white"
        rounded="pill"
        class="menu-item mb-2 text-white"
        @click="selectTab('evaluacion')"
      >
        <template #prepend>
          <v-icon icon="mdi-lock" class="mr-3"></v-icon>
        </template>
        <v-list-item-title class="font-weight-medium">Evaluación</v-list-item-title>
      </v-list-item>

    </v-list>

    <!-- Cerrar Sesión -->
    <v-btn
      to="/login?role=estudiante"
      variant="text"
      color="red-lighten-2"
      class="text-none justify-start px-2 mt-auto font-weight-bold"
    >
      <v-icon start icon="mdi-logout" class="mr-2"></v-icon>
      Cerrar Sesión
    </v-btn>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  activeTab: {
    type: String,
    default: 'inicio'
  }
})

const emit = defineEmits(['change-tab'])

const studentName = computed(() => route.query.nombre || 'Estudiante')
const studentSchool = computed(() => route.query.escuela || '')
const studentGrade = computed(() => route.query.grado || '4')

const selectTab = (tab) => {
  emit('change-tab', tab)
}
</script>

<style scoped>
.sidebar-card {
  background-color: #1a3320ef;
  backdrop-filter: blur(8px);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
}

.menu-item.v-list-item--active {
  background-color: #3b6645 !important;
}

.menu-item {
  transition: all 0.2s ease;
  cursor: pointer;
}
</style>