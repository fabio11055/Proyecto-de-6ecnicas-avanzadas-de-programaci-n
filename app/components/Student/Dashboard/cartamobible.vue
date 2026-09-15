<template>
  <div class="banner-card rounded-2xl overflow-hidden fill-height d-flex flex-column position-relative">
    
    <!-- Franja verde oscura superior dinámica -->
    <div class="banner-header px-6 py-3 d-flex align-center justify-space-between">
      <h2 class="text-h6 font-weight-bold text-white ma-0">
        Reciclaje: 
        <span :class="{ 'highlight-text': currentSlide === 1 }">Reducir</span>, 
        <span :class="{ 'highlight-text': currentSlide === 2 }">REUTILIZAR</span>, 
        <span :class="{ 'highlight-text': currentSlide === 3 }">Reciclar</span>
      </h2>
      <v-chip color="light-green-accent-2" size="small" variant="flat" class="font-weight-black text-green-darken-4">
        {{ currentSlide + 1 }} / 4
      </v-chip>
    </div>

    <!-- Carrusel de componentes -->
    <div class="banner-body flex-grow-1 position-relative">
      <v-carousel
        v-model="currentSlide"
        :show-arrows="'hover'"
        hide-delimiter-background
        height="100%"
        class="fill-height"
      >
        <!-- Slide 0: Imagen de Portada Principal -->
        <v-carousel-item class="fill-height">
          <div class="image-wrapper fill-height w-100 h-100 d-flex align-center justify-center">
            <v-img
              :src="mainImage"
              cover
              class="fill-height w-100 h-100"
              alt="Símbolo de Reciclaje"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
                  <v-progress-circular indeterminate color="green"></v-progress-circular>
                </div>
              </template>
            </v-img>
          </div>
        </v-carousel-item>

        <!-- Slide 1: Componente REDUCIR -->
        <v-carousel-item class="fill-height">
          <StudentDashboardCardReducir />
        </v-carousel-item>

        <!-- Slide 2: Componente REUTILIZAR -->
        <v-carousel-item class="fill-height">
          <StudentDashboardCardReutilizar />
        </v-carousel-item>

        <!-- Slide 3: Componente RECICLAR -->
        <v-carousel-item class="fill-height">
          <StudentDashboardCardReciclar />
        </v-carousel-item>

      </v-carousel>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)
const mainImage = ref('/reciclaje.jpeg')
</script>

<style scoped>
/* Fondo traslúcido con desenfoque de cristal (Glassmorphism) */
.banner-card {
  background-color: rgba(45, 82, 54, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  min-height: 480px;
}

.banner-header {
  background-color: #263e24;
  z-index: 2;
}

.highlight-text {
  color: #a7f3d0;
  font-weight: 900;
  text-decoration: underline;
}

.banner-body {
  width: 100%;
  height: 100%;
  min-height: 420px;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

:deep(.v-window__left),
:deep(.v-window__right) {
  background-color: rgba(38, 62, 36, 0.7) !important;
  color: white !important;
}
</style>