<template>
  <div class="card-layout pa-6 fill-height d-flex flex-column justify-space-between">
    <v-row>
      <!-- Columna Izquierda: Definición e Ideas -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
        <div>
          <p class="text-body-1 font-weight-medium mb-4 leading-normal text-black">
            <strong class="text-black">REUTILIZAR:</strong> 
            Dar una segunda vida a los objetos es clave para la sostenibilidad. Es el arte de usar la creatividad para evitar que las cosas se conviertan en basura antes de tiempo, transformando lo viejo en nuevo.
          </p>
          <h3 class="text-h6 font-weight-black text-black mb-4">
            Ideas Creativas de Reutilización
          </h3>
        </div>

        <!-- Lista de Ideas -->
        <div class="d-flex flex-column ga-3">
          
          <!-- Item 1: Vidrio -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgVidrio" width="36" height="36" contain alt="Envases de vidrio">
                <template #placeholder>
                  <v-icon icon="mdi-glass-jar" size="28" color="#2D6A4F"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Envases de Vidrio</div>
              <div class="text-caption text-black leading-tight">Úsalos como especieros, macetas para pequeñas plantas o portavelas.</div>
            </div>
          </div>

          <!-- Item 2: Ropa -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgRopa" width="36" height="36" contain alt="Ropa vieja">
                <template #placeholder>
                  <v-icon icon="mdi-tshirt-crew" size="28" color="#2D6A4F"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Ropa Vieja</div>
              <div class="text-caption text-black leading-tight">Conviértela en bolsas de tela para compras, trapos de limpieza o alfombras.</div>
            </div>
          </div>

          <!-- Item 3: Botellas -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgBotellas" width="36" height="36" contain alt="Botellas de plástico">
                <template #placeholder>
                  <v-icon icon="mdi-bottle-soda-classic" size="28" color="#2D6A4F"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Botellas de Plástico</div>
              <div class="text-caption text-black leading-tight">Transfórmalas en sistemas de auto-riego o comederos para aves.</div>
            </div>
          </div>

        </div>
      </v-col>

      <!-- Columna Derecha: Video -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-center">
        <div class="video-container rounded-xl overflow-hidden elevation-3 position-relative mb-3">
      <iframe 
  width="100%" 
  height="220" 
  src="https://www.youtube.com/embed/yM0SeWPybu8?si=Na1oiQt9mYJ6QblP" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen
></iframe>
        </div>

        <div>
          <div class="text-caption font-weight-bold text-uppercase text-black">VIDEO TUTORIAL</div>
          <h4 class="text-subtitle-1 font-weight-black text-black">Cómo Reutilizar Objetos Cotidianos</h4>
          <p class="text-caption text-black ma-0 font-weight-medium">Descubre cómo dar nuevos usos a objetos que creías basura con proyectos DIY sencillos.</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Cambia aquí los nombres de tus archivos en /public
const imgVidrio = ref('/vidrio.jpg')
const imgRopa = ref('/ropa.jpeg')
const imgBotellas = ref('/botellas.jpg')
</script>

<style scoped>
.card-layout {
  background: transparent;
  height: 100%;
}
.idea-item {
  background-color: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(6px);
}
.idea-icon {
  background-color: #ffffff;
  min-width: 52px;
  height: 52px;
  flex-shrink: 0;
}
.leading-normal { line-height: 1.4; }
.leading-tight { line-height: 1.2; }
</style>