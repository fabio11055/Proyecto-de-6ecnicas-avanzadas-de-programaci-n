<template>
  <div class="card-layout pa-6 fill-height d-flex flex-column justify-space-between">
    <v-row>
      <!-- Columna Izquierda: Definición e Ideas -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
        <div>
          <p class="text-body-1 font-weight-medium mb-4 leading-normal text-black">
            <strong class="text-black">RECICLAR:</strong> 
            Es el proceso mediante el cual los materiales desechados se recolectan y transforman en materia prima para crear productos nuevos, evitando la contaminación.
          </p>
          <h3 class="text-h6 font-weight-black text-black mb-4">
            Guía de Clasificación de Residuos
          </h3>
        </div>

        <!-- Lista de Ideas -->
        <div class="d-flex flex-column ga-3">
          
          <!-- Item 1: Caneca Blanca -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgBlanca" width="36" height="36" contain alt="Caneca blanca">
                <template #placeholder>
                  <v-icon icon="mdi-delete" size="28" color="#757575"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Caneca Blanca</div>
              <div class="text-caption text-black leading-tight">Aprovechables: Plástico, cartón, papel, vidrio y metales limpios.</div>
            </div>
          </div>

          <!-- Item 2: Caneca Verde -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgVerde" width="36" height="36" contain alt="Caneca verde">
                <template #placeholder>
                  <v-icon icon="mdi-delete" size="28" color="#2E7D32"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Caneca Verde</div>
              <div class="text-caption text-black leading-tight">Orgánicos: Restos de comida y desechos agrícolas para compostaje.</div>
            </div>
          </div>

          <!-- Item 3: Caneca Negra -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgNegra" width="36" height="36" contain alt="Caneca negra">
                <template #placeholder>
                  <v-icon icon="mdi-delete" size="28" color="#212121"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Caneca Negra</div>
              <div class="text-caption text-black leading-tight">No aprovechables: Papel higiénico, servilletas usadas y cartón sucio.</div>
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
  src="https://www.youtube.com/embed/WVrxkF6TcQU?si=maVgU7PZvXpf_Ne1" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen
></iframe>
        </div>

        <div>
          <div class="text-caption font-weight-bold text-uppercase text-black">VIDEO TUTORIAL</div>
          <h4 class="text-subtitle-1 font-weight-black text-black">Aprende a Reciclar Correctamente</h4>
          <p class="text-caption text-black ma-0 font-weight-medium">Aprende los colores de los contenedores y cómo entregar los envases limpios y secos.</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Cambia aquí los nombres de tus archivos en /public
const imgBlanca = ref('/caneca-blanca.jpg')
const imgVerde = ref('/caneca-verde.jpg')
const imgNegra = ref('/caneca-negra.jpg')
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