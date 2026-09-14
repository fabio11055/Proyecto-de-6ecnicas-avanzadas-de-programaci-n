<template>
  <v-card 
    :class="[
      'logo-card mb-6 pa-5 rounded-xl d-flex flex-column align-center position-relative',
      simple ? 'elevation-0 bg-transparent' : 'elevation-4'
    ]"
  >
    <v-img 
      :src="'/logo.jpg'" 
      :width="simple ? 120 : 180" 
      :height="simple ? 120 : 180" 
      contain
      alt="Eco-Mentes Logo" 
    />
    
    <!-- La insignia solo se muestra si NO está en modo simple -->
    <ModuleBadge v-if="!simple" />
  </v-card>
</template>

<script setup>
defineProps({
  // Si le pasas simple="true", quita el fondo blanco y oculta la insignia
  simple: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.logo-card {
  background-color: rgba(255, 255, 255, 0.95);
  min-width: 250px;
  overflow: visible !important;
}

/* Si es transparente en el modo simple */
.bg-transparent {
  background-color: transparent !important;
  min-width: auto;
}
</style>