<script setup>
// =========================================================================
// 1. IMPORTACIONES Y CONEXIÓN CON STORES
// =========================================================================
import { ref, onMounted } from 'vue'
import { useEstudianteStore } from '~/stores/estudiante'

// Acceso al store del estudiante (trae los conceptos 3R, videos y guías desde /api/estudiante/contenido)
const estudianteStore = useEstudianteStore()

// Emits opcionales para navegación guiada
defineEmits(['ir-a-evaluacion'])

// =========================================================================
// 2. ESTADO REACTIVO PARA MODALES (VISOR PDF E IMÁGENES)
// =========================================================================
// Estado y funciones del Visor PDF
const dialogVisorPdf = ref(false)
const pdfActual = ref('')
const tituloPdfActual = ref('')

const abrirVisorPdf = (ruta, titulo) => {
  pdfActual.value = ruta
  tituloPdfActual.value = titulo
  dialogVisorPdf.value = true
}

// Estado y funciones del Visor de Imagen
const dialogVisorImagen = ref(false)
const imagenActual = ref('')
const imagenActualTitulo = ref('')
const imagenActualDesc = ref('')

const abrirVisorImagen = (ruta, titulo, desc) => {
  imagenActual.value = ruta
  imagenActualTitulo.value = titulo || 'Detalle'
  imagenActualDesc.value = desc || ''
  dialogVisorImagen.value = true
}

// =========================================================================
// 3. CICLO DE VIDA (onMounted)
// =========================================================================
// Si la información de contenidos no ha sido cargada aún, la solicita
onMounted(async () => {
  if (!estudianteStore.contenido.conceptos.length) {
    await estudianteStore.cargarContenido()
  }
})
</script>

<template>
  <div class="student-content d-flex flex-column ga-5">
    
    <!-- Alerta de Carga -->
    <div v-if="estudianteStore.cargando" class="text-center py-8">
      <v-progress-circular indeterminate color="light-green-accent-3" size="48"></v-progress-circular>
      <p class="text-white mt-3 font-weight-medium">Cargando material educativo...</p>
    </div>

    <template v-else>
      <!-- ================= 1. CONCEPTOS CLAVE DE LAS 3R ================= -->
      <v-card class="content-panel pa-4 pa-sm-6 rounded-2xl elevation-3">
        <div class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center ga-2 mb-4">
          <div class="d-flex align-center ga-3">
            <v-avatar color="#2D6A4F" size="44" class="elevation-2 text-white">
              <v-icon icon="mdi-recycle" size="26" color="light-green-accent-2"></v-icon>
            </v-avatar>
            <div>
              <h3 class="text-h6 text-sm-h5 font-weight-black text-white ma-0">Aprende la Regla de las 3R</h3>
              <span class="text-caption text-grey-lighten-2">
                Reducir, Reutilizar y Reciclar: los tres pilares para cuidar el planeta.
              </span>
            </div>
          </div>
          <v-chip color="light-green-accent-2" variant="flat" class="text-green-darken-4 font-weight-black">
            3 Módulos Visuales
          </v-chip>
        </div>

        <!-- Tarjetas de Conceptos (Reducir, Reutilizar, Reciclar) -->
        <v-row class="ma-0" dense>
          <v-col
            v-for="item in estudianteStore.contenido.conceptos"
            :key="item.id"
            cols="12"
            lg="4"
            class="pa-2 d-flex"
          >
            <div class="concept-card pa-0 rounded-2xl fill-height d-flex flex-column overflow-hidden elevation-3 w-100">
              
              <!-- Imagen Principal del Concepto -->
              <div class="position-relative">
                <v-img
                  :src="item.imagen"
                  height="180"
                  cover
                  class="cursor-pointer"
                  @click="abrirVisorImagen(item.imagen, item.titulo, item.descripcion)"
                >
                  <div class="hero-overlay d-flex flex-column justify-space-between pa-3 fill-height">
                    <div class="d-flex justify-space-between align-center">
                      <v-chip size="small" color="#1B4332" variant="flat" class="text-light-green-accent-2 font-weight-black">
                        Pilar 3R
                      </v-chip>
                      <v-btn
                        icon="mdi-magnify-plus-outline"
                        size="x-small"
                        color="rgba(0,0,0,0.6)"
                        variant="flat"
                        class="text-white"
                        @click.stop="abrirVisorImagen(item.imagen, item.titulo, item.descripcion)"
                      ></v-btn>
                    </div>
                    <h4 class="text-h5 font-weight-black text-white text-shadow ma-0">
                      {{ item.titulo }}
                    </h4>
                  </div>
                </v-img>
              </div>

              <!-- Explicación y Puntos Clave -->
              <div class="pa-4 d-flex flex-column flex-grow-1">
                <p class="text-body-2 text-grey-lighten-2 mb-3">
                  {{ item.descripcion }}
                </p>

                <div class="d-flex align-center ga-2 mb-2 text-light-green-accent-2 font-weight-bold text-caption">
                  <v-icon icon="mdi-leaf" size="14"></v-icon>
                  <span>Acciones Clave:</span>
                </div>

                <!-- Lista de Puntos con Miniaturas -->
                <div class="d-flex flex-column ga-2 flex-grow-1">
                  <div
                    v-for="(pto, idx) in item.puntosClave"
                    :key="idx"
                    class="punto-item pa-2 rounded-xl d-flex align-center ga-3"
                  >
                    <v-img
                      v-if="pto.img"
                      :src="pto.img"
                      width="58"
                      height="58"
                      cover
                      class="rounded-lg cursor-pointer flex-shrink-0"
                      @click="abrirVisorImagen(pto.img, pto.titulo, pto.desc)"
                    />
                    <v-avatar v-else color="#2D6A4F" size="58" rounded="lg" class="text-white flex-shrink-0">
                      <v-icon :icon="pto.icon" size="26" color="light-green-accent-2"></v-icon>
                    </v-avatar>

                    <div class="min-width-0 flex-grow-1">
                      <span class="text-subtitle-2 font-weight-bold text-white d-block text-truncate">
                        {{ pto.titulo }}
                      </span>
                      <p class="text-caption text-grey-lighten-2 ma-0 line-clamp-2">
                        {{ pto.desc }}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- ================= 2. VIDEOS EDUCATIVOS ================= -->
      <v-card class="content-panel pa-4 pa-sm-6 rounded-2xl elevation-3">
        <div class="d-flex align-center mb-4 ga-3">
          <v-avatar color="#C62828" size="44" class="elevation-2 text-white">
            <v-icon icon="mdi-youtube" color="white" size="26"></v-icon>
          </v-avatar>
          <div>
            <h3 class="text-h6 text-sm-h5 font-weight-black text-white ma-0">Videos Interactivos</h3>
            <span class="text-caption text-grey-lighten-2">Videos didácticos para reforzar las 3R.</span>
          </div>
        </div>

        <v-row class="ma-0" dense>
          <v-col
            v-for="video in estudianteStore.contenido.videos"
            :key="video.id"
            cols="12"
            md="4"
            class="pa-2 d-flex"
          >
            <div class="subcard pa-3.5 rounded-2xl fill-height d-flex flex-column justify-space-between w-100 elevation-2">
              <div>
                <div class="video-wrapper rounded-xl overflow-hidden mb-3">
                  <iframe
                    :src="video.url"
                    :title="video.titulo"
                    class="video-frame"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
                <v-chip size="x-small" color="#2D6A4F" variant="flat" class="text-white font-weight-bold mb-1">
                  {{ video.categoria }}
                </v-chip>
                <h4 class="text-subtitle-1 font-weight-bold text-white mb-2 leading-snug">
                  {{ video.titulo }}
                </h4>
              </div>
              <p class="text-caption text-grey-lighten-2 ma-0">
                {{ video.descripcion }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- ================= 3. GUÍAS Y RECURSOS PDF ================= -->
      <v-card class="content-panel pa-4 pa-sm-6 rounded-2xl elevation-3">
        <div class="d-flex align-center mb-4 ga-3">
          <v-avatar color="#B71C1C" size="44" class="elevation-2 text-white">
            <v-icon icon="mdi-file-pdf-box" color="white" size="26"></v-icon>
          </v-avatar>
          <div>
            <h3 class="text-h6 text-sm-h5 font-weight-black text-white ma-0">Material Imprimible y Guías</h3>
            <span class="text-caption text-grey-lighten-2">Visualiza o descarga las fichas de trabajo.</span>
          </div>
        </div>

        <v-row class="ma-0" dense>
          <v-col
            v-for="doc in estudianteStore.contenido.documentos"
            :key="doc.id"
            cols="12"
            md="6"
            class="pa-2"
          >
            <div class="subcard pa-4 rounded-2xl d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between ga-3 elevation-2">
              <div class="d-flex align-center ga-3 min-width-0">
                <v-avatar color="#FFCDD2" size="48" rounded="lg" class="flex-shrink-0">
                  <v-icon icon="mdi-file-pdf-box" color="red-darken-4" size="28"></v-icon>
                </v-avatar>
                <div class="min-width-0">
                  <h4 class="text-subtitle-1 font-weight-bold text-white text-truncate mb-1">
                    {{ doc.titulo }}
                  </h4>
                  <span class="text-caption text-grey-lighten-2 text-truncate d-block">
                    {{ doc.descripcion }}
                  </span>
                </div>
              </div>

              <div class="d-flex ga-2 flex-shrink-0 w-100 w-sm-auto justify-end">
                <v-btn
                  variant="flat"
                  color="#2D6A4F"
                  rounded="pill"
                  size="small"
                  class="text-white text-none font-weight-bold px-3"
                  @click="abrirVisorPdf(doc.archivo, doc.titulo)"
                >
                  <v-icon start icon="mdi-eye" size="16"></v-icon>
                  Ver PDF
                </v-btn>
                <v-btn
                  variant="flat"
                  color="#1B4332"
                  rounded="pill"
                  size="small"
                  class="text-white text-none font-weight-bold px-3"
                  :href="doc.archivo"
                  download
                >
                  <v-icon start icon="mdi-download" size="16"></v-icon>
                  Descargar
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </template>

    <!-- Modal para Visualizar PDF -->
    <v-dialog v-model="dialogVisorPdf" max-width="900px" scrollable>
      <v-card class="rounded-2xl overflow-hidden bg-grey-lighten-4">
        <v-card-title class="bg-green-darken-4 text-white d-flex align-center justify-space-between px-4 py-3">
          <span class="text-subtitle-1 font-weight-bold text-truncate">{{ tituloPdfActual }}</span>
          <v-btn icon="mdi-close" variant="text" color="white" size="small" @click="dialogVisorPdf = false"></v-btn>
        </v-card-title>
        <v-card-text class="pa-0" style="height: 75vh;">
          <iframe :src="pdfActual" width="100%" height="100%" frameborder="0"></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal para Visualizar Imagen Ampliada -->
    <v-dialog v-model="dialogVisorImagen" max-width="640px">
      <v-card class="rounded-2xl overflow-hidden bg-green-darken-4 text-white">
        <v-card-title class="d-flex align-center justify-space-between px-4 py-3">
          <span class="text-subtitle-1 font-weight-bold text-truncate">{{ imagenActualTitulo }}</span>
          <v-btn icon="mdi-close" variant="text" color="white" size="small" @click="dialogVisorImagen = false"></v-btn>
        </v-card-title>
        <div class="pa-2 text-center bg-black">
          <v-img :src="imagenActual" max-height="400" contain class="rounded-lg"></v-img>
        </div>
        <v-card-text v-if="imagenActualDesc" class="pa-3 text-grey-lighten-2 text-body-2">
          {{ imagenActualDesc }}
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<style scoped>
.content-panel {
  background-color: rgba(20, 38, 23, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.concept-card,
.subcard {
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.2s ease;
}
.concept-card:hover,
.subcard:hover {
  transform: translateY(-3px);
}
.hero-overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(10, 30, 15, 0.85) 100%);
}
.punto-item {
  background-color: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.video-frame {
  width: 100%;
  height: 200px;
  display: block;
}
.cursor-pointer { cursor: pointer; }
.min-width-0 { min-width: 0; }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
