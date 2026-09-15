<template>
  <div class="card-layout pa-6 fill-height d-flex flex-column justify-space-between">
    <v-row>
      <!-- Columna Izquierda: Definición e Ideas -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
        <div>
          <p class="text-body-1 font-weight-medium mb-4 leading-normal text-black">
            <strong class="text-black">REDUCIR:</strong> 
            Disminuir la cantidad de residuos que generamos es el primer paso para proteger nuestro planeta. Consiste en consumir con responsabilidad y evitar lo innecesario.
          </p>
          <h3 class="text-h6 font-weight-black text-black mb-4">
            Estrategias para Reducir el Consumo
          </h3>
        </div>

        <!-- Lista de Ideas -->
        <div class="d-flex flex-column ga-3">
          
          <!-- Item 1: Agua -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgAgua" width="36" height="36" contain alt="Ahorro de agua">
                <template #placeholder>
                  <v-icon icon="mdi-water-off" size="28" color="#2D6A4F"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Ahorro de Agua</div>
              <div class="text-caption text-black leading-tight">Cierra el grifo mientras te cepillas o te enjabonas las manos.</div>
            </div>
          </div>

          <!-- Item 2: Energía -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgEnergia" width="36" height="36" contain alt="Ahorro de energía">
                <template #placeholder>
                  <v-icon icon="mdi-flash-off" size="28" color="#2D6A4F"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Eficiencia Energética</div>
              <div class="text-caption text-black leading-tight">Apaga las luces y desconecta aparatos sin usar.</div>
            </div>
          </div>

          <!-- Item 3: Plásticos -->
          <div class="idea-item d-flex align-center pa-3 rounded-xl">
            <div class="idea-icon mr-3 d-flex align-center justify-center rounded-lg overflow-hidden pa-1">
              <v-img :src="imgPlastico" width="36" height="36" contain alt="Ahorro de plástico">
                <template #placeholder>
                  <v-icon icon="mdi-package-variant-closed-remove" size="28" color="#2D6A4F"></v-icon>
                </template>
              </v-img>
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold text-black">Menos Plásticos</div>
              <div class="text-caption text-black leading-tight">Evita empaques desechables de un solo uso.</div>
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
            src="https://www.youtube.com/embed/cvakvfXj0KE" 
            title="Tutoriales de Reducir" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>

        <div>
          <div class="text-caption font-weight-bold text-uppercase text-black">VIDEO TUTORIAL</div>
          <h4 class="text-subtitle-1 font-weight-black text-black">Aprende a Reducir en Casa</h4>
          <p class="text-caption text-black ma-0 font-weight-medium">Consejos prácticos para consumir menos energía, agua y generar menos basura diaria.</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imgAgua = ref('/agua.jpg')
const imgEnergia = ref('/energia.jpg')
// Nombre corregido según la carpeta public
const imgPlastico = ref('/plasticos.jpg')
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