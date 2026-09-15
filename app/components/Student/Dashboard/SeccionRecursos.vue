<template>
  <div class="recursos-container pa-6 rounded-2xl elevation-3 fill-height d-flex flex-column">
    
    <!-- Encabezado de la Sección -->
    <div class="d-flex align-center mb-6">
      <v-avatar color="#1E3824" size="48" class="mr-3 elevation-2">
        <v-icon icon="mdi-folder-google-drive" color="#A7F3D0" size="28"></v-icon>
      </v-avatar>
      <div>
        <h2 class="text-h5 font-weight-black text-white ma-0">Recursos Educativos</h2>
        <span class="text-caption text-black font-weight-medium">
          Explora los videos explicativos, visualiza los PDF o descárgalos directamente.
        </span>
      </div>
    </div>

    <v-row>
      <!-- SECCIÓN 1: VIDEOS EDUCATIVOS -->
      <v-col cols="12">
        <h3 class="text-subtitle-1 font-weight-black text-white mb-3 d-flex align-center">
          <v-icon icon="mdi-youtube" color="red-accent-3" class="mr-2"></v-icon>
          Videos Interactivos
        </h3>
        
        <v-row>
          <!-- Video 1: Reducir -->
          <v-col cols="12" md="4">
            <div class="recurso-card pa-3 rounded-xl d-flex flex-column justify-space-between fill-height">
              <div class="video-wrapper rounded-lg overflow-hidden mb-3 elevation-2">
                <iframe 
                  width="100%" 
                  height="160" 
                  src="https://www.youtube.com/embed/cvakvfXj0KE" 
                  title="Tutorial Reducir" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                ></iframe>
              </div>
              <div>
                <v-chip color="#1E3824" size="x-small" class="text-white font-weight-bold mb-1">REDUCIR</v-chip>
                <div class="text-subtitle-2 font-weight-bold text-white">Aprende a Reducir en Casa</div>
                <div class="text-caption text-black leading-tight">Consejos prácticos para consumir menos agua y energía diaria.</div>
              </div>
            </div>
          </v-col>

          <!-- Video 2: Reutilizar -->
          <v-col cols="12" md="4">
            <div class="recurso-card pa-3 rounded-xl d-flex flex-column justify-space-between fill-height">
              <div class="video-wrapper rounded-lg overflow-hidden mb-3 elevation-2">
                <iframe 
                  width="100%" 
                  height="160" 
                  src="https://www.youtube.com/embed/yM0SeWPybu8?si=Na1oiQt9mYJ6QblP" 
                  title="Tutorial Reutilizar" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                ></iframe>
              </div>
              <div>
                <v-chip color="#1E3824" size="x-small" class="text-white font-weight-bold mb-1">REUTILIZAR</v-chip>
                <div class="text-subtitle-2 font-weight-bold text-white">Cómo Reutilizar Objetos</div>
                <div class="text-caption text-black leading-tight">Proyectos sencillos de manualidades DIY con materiales usados.</div>
              </div>
            </div>
          </v-col>

          <!-- Video 3: Reciclar -->
          <v-col cols="12" md="4">
            <div class="recurso-card pa-3 rounded-xl d-flex flex-column justify-space-between fill-height">
              <div class="video-wrapper rounded-lg overflow-hidden mb-3 elevation-2">
                <iframe 
                  width="100%" 
                  height="160" 
                  src="https://www.youtube.com/embed/WVrxkF6TcQU?si=maVgU7PZvXpf_Ne1" 
                  title="Tutorial Reciclar" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                ></iframe>
              </div>
              <div>
                <v-chip color="#1E3824" size="x-small" class="text-white font-weight-bold mb-1">RECICLAR</v-chip>
                <div class="text-subtitle-2 font-weight-bold text-white">Guía de Clasificación</div>
                <div class="text-caption text-black leading-tight">Aprende a separar correctamente en canecas blanca, verde y negra.</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <!-- SECCIÓN 2: DOCUMENTOS PDF (VER Y DESCARGAR) -->
      <v-col cols="12" class="mt-4">
        <h3 class="text-subtitle-1 font-weight-black text-white mb-3 d-flex align-center">
          <v-icon icon="mdi-file-pdf-box" color="red-darken-1" class="mr-2"></v-icon>
          Guías y Documentos (PDF)
        </h3>

        <v-row>
          <!-- PDF 1: Guía Completa -->
          <v-col cols="12" md="6">
            <div class="recurso-card pa-4 rounded-xl d-flex align-center justify-space-between">
              <div class="d-flex align-center mr-3 cursor-pointer" @click="abrirVisor(pdfGuia, 'Guía Completa de las 3R')">
                <v-avatar color="#FFEBEE" size="48" class="mr-3">
                  <v-icon icon="mdi-file-pdf-box" color="red-darken-2" size="32"></v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-2 font-weight-bold text-white">Guía Completa de las 3R para Niños</div>
                  <div class="text-caption text-black">Haz clic para leer el documento o usa los botones.</div>
                </div>
              </div>

              <div class="d-flex ga-2">
                <!-- Botón de Vista Previa -->
                <v-btn 
                  color="#1E3824" 
                  icon="mdi-eye" 
                  variant="flat" 
                  size="small"
                  class="text-white"
                  title="Ver PDF"
                  @click="abrirVisor(pdfGuia, 'Guía Completa de las 3R')"
                ></v-btn>

                <!-- Botón de Descarga Directa -->
                <v-btn 
                  :href="pdfGuia" 
                  download="Guia_Completa_3R.pdf"
                  color="#2D6A4F" 
                  icon="mdi-download" 
                  variant="flat" 
                  size="small"
                  class="text-white"
                  title="Descargar PDF"
                ></v-btn>
              </div>
            </div>
          </v-col>

          <!-- PDF 2: Ficha de Actividades -->
          <v-col cols="12" md="6">
            <div class="recurso-card pa-4 rounded-xl d-flex align-center justify-space-between">
              <div class="d-flex align-center mr-3 cursor-pointer" @click="abrirVisor(pdfActividades, 'Ficha de Actividades')">
                <v-avatar color="#FFEBEE" size="48" class="mr-3">
                  <v-icon icon="mdi-file-pdf-box" color="red-darken-2" size="32"></v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-2 font-weight-bold text-white">Ficha de Actividades y Colorear</div>
                  <div class="text-caption text-black">Haz clic para leer el documento o usa los botones.</div>
                </div>
              </div>

              <div class="d-flex ga-2">
                <!-- Botón de Vista Previa -->
                <v-btn 
                  color="#1E3824" 
                  icon="mdi-eye" 
                  variant="flat" 
                  size="small"
                  class="text-white"
                  title="Ver PDF"
                  @click="abrirVisor(pdfActividades, 'Ficha de Actividades')"
                ></v-btn>

                <!-- Botón de Descarga Directa -->
                <v-btn 
                  :href="pdfActividades" 
                  download="Ficha_Actividades_3R.pdf"
                  color="#2D6A4F" 
                  icon="mdi-download" 
                  variant="flat" 
                  size="small"
                  class="text-white"
                  title="Descargar PDF"
                ></v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- MODAL / VISOR INTERACTIVO DE PDF -->
    <v-dialog v-model="dialogVisor" max-width="900px" scrollable>
      <v-card class="rounded-2xl overflow-hidden bg-grey-lighten-4">
        <v-card-title class="bg-green-darken-4 text-white d-flex align-center justify-space-between px-4 py-3">
          <span class="text-h6 font-weight-bold">{{ tituloPdfActual }}</span>
          <v-btn icon="mdi-close" variant="text" color="white" @click="dialogVisor = false"></v-btn>
        </v-card-title>

        <v-card-text class="pa-0" style="height: 75vh;">
          <iframe 
            :src="pdfActual" 
            width="100%" 
            height="100%" 
            frameborder="0"
          ></iframe>
        </v-card-text>

        <v-card-actions class="bg-white pa-3 justify-end">
          <v-btn 
            :href="pdfActual" 
            download
            color="#2D6A4F" 
            variant="flat" 
            class="text-white rounded-lg font-weight-bold"
            prepend-icon="mdi-download"
          >
            Descargar Documento
          </v-btn>
          <v-btn 
            color="grey-darken-1" 
            variant="text" 
            class="font-weight-bold" 
            @click="dialogVisor = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Rutas de tus archivos PDF guardados en public/
const pdfGuia = ref('/guia-3r-ninos.pdf')
const pdfActividades = ref('/actividades-reciclaje.pdf')

// Estado del Modal Visor de PDF
const dialogVisor = ref(false)
const pdfActual = ref('')
const tituloPdfActual = ref('')

const abrirVisor = (rutaPdf, titulo) => {
  pdfActual.value = rutaPdf
  tituloPdfActual.value = titulo
  dialogVisor.value = true
}
</script>

<style scoped>
.recursos-container {
  background-color: rgba(45, 82, 54, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.recurso-card {
  background-color: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(6px);
}

.cursor-pointer {
  cursor: pointer;
}

.leading-tight {
  line-height: 1.25;
}
</style>