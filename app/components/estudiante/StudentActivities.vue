<script setup>
// =========================================================================
// 1. IMPORTACIONES Y CONEXIÓN CON STORES
// =========================================================================
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useEstudianteStore } from '~/stores/estudiante'

// Stores para acceder al alumno autenticado y para registrar la nota vía POST
const authStore = useAuthStore()
const estudianteStore = useEstudianteStore()

// Grado actual del alumno ('4' o '5')
const gradoActual = computed(() => authStore.user?.grado || '4')

// Opciones estándar reutilizables de canecas (para evitar duplicación)
const OPCIONES_CANECAS = [
  'Caneca Blanca (Aprovechables)',
  'Caneca Verde (Orgánicos)',
  'Caneca Negra (No aprovechables)'
]

// =========================================================================
// 2. BANCOS DE PREGUNTAS POR GRADO
// =========================================================================
// 1. Banco de preguntas para 4° Grado (Intermedio)
const preguntasGrado4 = [
  {
    id: 'g4-p1',
    item: 'Botella de gaseosa transparente (plástico PET), limpia y aplastada',
    correcta: 0,
    explicacion: 'El plástico PET limpio y seco va a la caneca blanca para ser transformado en nuevas botellas.'
  },
  {
    id: 'g4-p2',
    item: 'Cáscaras de plátano, manzana y restos de fruta de la merienda escolar',
    correcta: 1,
    explicacion: 'Los restos de fruta son materia orgánica y van en la caneca verde para compost.'
  },
  {
    id: 'g4-p3',
    item: 'Servilletas de papel usadas con grasa y papel higiénico sucio',
    correcta: 2,
    explicacion: 'El papel sucio o con grasa no se puede reciclar, va a la caneca negra.'
  },
  {
    id: 'g4-p4',
    item: 'Caja de cartón de pizza limpia y seca, desarmada',
    correcta: 0,
    explicacion: 'El cartón limpio sin restos de grasa ni comida va en la caneca blanca.'
  },
  {
    id: 'g4-p5',
    item: 'Lata metálica de atún o gaseosa enjuagada y sin filo expuesto',
    correcta: 0,
    explicacion: 'El metal limpio (aluminio u hojalata) es reciclable en la caneca blanca.'
  },
  {
    id: 'g4-p6',
    item: 'Restos de poda de césped, hojas secas y ramas pequeñas',
    correcta: 1,
    explicacion: 'Los desechos vegetales de jardín son orgánicos y van a la caneca verde.'
  },
  {
    id: 'g4-p7',
    item: 'Paquete metalizado de papas fritas y golosinas grasoso',
    correcta: 2,
    explicacion: 'Los empaques metalizados multicapa con grasa van a la caneca negra.'
  },
  {
    id: 'g4-p8',
    item: 'Hojas de papel de cuaderno usadas pero limpias y secas',
    correcta: 0,
    explicacion: 'El papel limpio sin grasa es aprovechable y va en la caneca blanca.'
  }
]

// 2. Banco de preguntas para 5° Grado (Avanzado)
const preguntasGrado5 = [
  {
    id: 'g5-p1',
    item: 'Trozo de espejo roto o vidrio plano de ventana dañado',
    correcta: 2,
    explicacion: 'Los vidrios planos y espejos tienen aditivos químicos y van a la caneca negra.'
  },
  {
    id: 'g5-p2',
    item: 'Vaso desechable de café de cartón con recubrimiento encerado y restos de líquido',
    correcta: 2,
    explicacion: 'El cartón encerado con humedad no es aprovechable; va a la caneca negra.'
  },
  {
    id: 'g5-p3',
    item: 'Envase de yogur o champú de plástico rígido (PEAD), enjuagado',
    correcta: 0,
    explicacion: 'El plástico rígido limpio es reciclable y va a la caneca blanca.'
  },
  {
    id: 'g5-p4',
    item: 'Borra de café, bolsitas de té y cáscaras de huevo trituradas',
    correcta: 1,
    explicacion: 'Es materia orgánica perfecta para compost en la caneca verde.'
  },
  {
    id: 'g5-p5',
    item: 'Pilas alcalinas gastadas y batería de celular dañada',
    opciones: ['Caneca Blanca (Aprovechables)', 'Caneca Negra (No aprovechables)', 'Contenedor Especial Posconsumo (Residuo Peligroso)'],
    correcta: 2,
    explicacion: 'Las pilas tienen químicos tóxicos y deben ir a contenedores especiales posconsumo.'
  },
  {
    id: 'g5-p6',
    item: 'Icopor (poliestireno expandido) 100% limpio y seco de embalaje',
    correcta: 0,
    explicacion: 'El icopor limpio y seco es poliestireno aprovechable en la caneca blanca.'
  },
  {
    id: 'g5-p7',
    item: 'Frasco de vidrio de salsa de tomate enjuagado, seco y con tapa',
    correcta: 0,
    explicacion: 'El vidrio de envase es 100% reciclable en la caneca blanca.'
  },
  {
    id: 'g5-p8',
    item: 'Blíster vacío de pastillas o medicamentos vencidos',
    opciones: ['Caneca Blanca (Aprovechables)', 'Caneca Verde (Orgánicos)', 'Caneca Negra o Punto Azul (Riesgo farmacéutico)'],
    correcta: 2,
    explicacion: 'Los fármacos y blísteres van a contenedores Punto Azul o a la caneca negra.'
  }
]

// Selecciona reactivamente las preguntas según el grado del estudiante
const preguntas = computed(() => (gradoActual.value === '5' ? preguntasGrado5 : preguntasGrado4))

// =========================================================================
// 3. ESTADOS REACTIVOS DE LA EVALUACIÓN
// =========================================================================
const respuestas = ref(new Array(8).fill(null))
const evaluado = ref(false)
const puntajeObtenido = ref(null)

const todasRespondidas = computed(() => respuestas.value.every(r => r !== null && r !== undefined))
const pendientesCount = computed(() => respuestas.value.filter(r => r === null || r === undefined).length)

// =========================================================================
// 4. MÉTODOS DE CONSULTA Y ENVÍO (POST /api/estudiante/notas)
// =========================================================================
// Consulta si el alumno ya realizó la evaluación previamente
const verificarEstado = async () => {
  const user = authStore.user
  if (!user?.nombre) return

  const notas = await estudianteStore.consultarNotasEstudiante({
    estudianteId: user.id,
    nombre: user.nombre,
    grado: gradoActual.value,
    codigo: user.codigo || user.docenteCodigo
  })

  const encontrada = Array.isArray(notas) ? notas.find(n => String(n.grado) === String(gradoActual.value)) : null
  if (encontrada) {
    evaluado.value = true
    let p = Number(encontrada.puntaje)
    if (p > 5.0) p = p / 20
    puntajeObtenido.value = Number(p.toFixed(1))
  }
}

onMounted(verificarEstado)
watch(gradoActual, verificarEstado)

// Calcula la calificación (1.0 a 5.0) y la registra en el servidor mediante el store
const calificarYGuardar = async () => {
  if (!todasRespondidas.value || evaluado.value) return

  // 1. Contar aciertos
  const aciertos = preguntas.value.filter((preg, idx) => respuestas.value[idx] === preg.correcta).length

  // 2. Escala 1.0 a 5.0: Nota = 1.0 + (aciertos / 8) * 4.0
  const nota = Number((1.0 + (aciertos / preguntas.value.length) * 4.0).toFixed(1))
  puntajeObtenido.value = nota
  evaluado.value = true

  // 3. Enviar nota al servidor vía HTTP POST
  await estudianteStore.guardarNota({
    nombre: authStore.user?.nombre || 'Estudiante',
    escuela: authStore.user?.escuela || 'Institución Educativa',
    grado: gradoActual.value,
    actividad: `Evaluación 3R - ${gradoActual.value}° Grado`,
    puntaje: nota,
    calificacionMaxima: 5.0,
    observacion: `Aciertos: ${aciertos} de ${preguntas.value.length}. Calificación: ${nota} / 5.0`,
    docenteId: authStore.user?.docenteId || '',
    docenteCodigo: authStore.user?.docenteCodigo || authStore.user?.codigo || ''
  })
}

// Funciones auxiliares para formato visual de la nota
const getColorNota = (n) => (n >= 4.5 ? 'green-accent-3' : n >= 3.0 ? 'amber-accent-3' : 'red-accent-2')
const getTextoDesempeno = (n) => (n >= 4.5 ? 'Desempeño Superior' : n >= 3.0 ? 'Desempeño Básico (Aprobado)' : 'Desempeño Bajo (Reprobado)')
</script>

<template>
  <div class="student-activities d-flex flex-column ga-4">

    <!-- Alertas de Éxito o Error -->
    <v-alert
      v-if="estudianteStore.mensajeExito"
      type="success"
      variant="elevated"
      closable
      class="rounded-xl elevation-3"
      @click:close="estudianteStore.mensajeExito = null"
    >
      {{ estudianteStore.mensajeExito }}
    </v-alert>

    <v-alert
      v-if="estudianteStore.error"
      type="error"
      variant="tonal"
      closable
      class="rounded-xl"
      @click:close="estudianteStore.error = null"
    >
      {{ estudianteStore.error }}
    </v-alert>

    <!-- Banner si la evaluación ya fue realizada -->
    <v-alert
      v-if="evaluado && puntajeObtenido !== null"
      type="info"
      variant="tonal"
      color="light-green-accent-2"
      density="comfortable"
      class="rounded-xl elevation-2 text-white"
    >
      <div class="d-flex align-center ga-2">
        <v-icon icon="mdi-lock-outline" color="light-green-accent-2" size="20"></v-icon>
        <span class="text-caption font-weight-medium">
          Ya completaste tu evaluación de {{ gradoActual }}° Grado. Tu calificación está registrada en el servidor de tu docente.
        </span>
      </div>
    </v-alert>

    <!-- ================= FORMULARIO DE EVALUACIÓN ================= -->
    <v-card class="activity-panel pa-4 pa-sm-6 rounded-2xl elevation-3">
      
      <!-- Encabezado de la Evaluación -->
      <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between ga-3 mb-4 pb-3 border-bottom-light">
        <div class="d-flex align-center ga-3">
          <v-avatar color="#2D6A4F" size="48" class="elevation-2 text-white">
            <v-icon icon="mdi-clipboard-text-outline" size="28"></v-icon>
          </v-avatar>
          <div>
            <div class="d-flex align-center ga-2 flex-wrap">
              <h3 class="text-h6 font-weight-black text-white ma-0">Formulario de Evaluación: Conocimientos 3R</h3>
              <v-chip size="x-small" :color="gradoActual === '5' ? 'amber-accent-2' : 'light-green-accent-2'" variant="flat" class="text-green-darken-4 font-weight-black">
                {{ gradoActual === '5' ? '5° GRADO • AVANZADO' : '4° GRADO • INTERMEDIO' }}
              </v-chip>
            </div>
            <span class="text-caption text-grey-lighten-2">
              Responde las 8 preguntas seleccionando la caneca correcta.
            </span>
          </div>
        </div>

        <div class="d-flex align-center ga-2 flex-wrap">
          <v-chip :color="gradoActual === '5' ? 'amber-accent-2' : 'light-green-accent-2'" variant="flat" class="font-weight-black text-green-darken-4">
            <v-icon start icon="mdi-school" size="16"></v-icon>
            {{ gradoActual }}° Grado
          </v-chip>
          <v-chip color="amber-accent-3" variant="flat" class="text-black font-weight-black">
            <v-icon start icon="mdi-star" size="16"></v-icon>
            Escala: 1.0 a 5.0
          </v-chip>
          <v-chip color="#2D6A4F" variant="flat" class="text-white font-weight-bold">8 Preguntas</v-chip>
        </div>
      </div>

      <!-- Tarjeta con la Nota Obtenida (si ya respondió) -->
      <div v-if="evaluado && puntajeObtenido !== null" class="resultado-banner pa-4 rounded-2xl mb-4 d-flex flex-column flex-sm-row align-center justify-space-between ga-3 elevation-2">
        <div class="d-flex align-center ga-3">
          <v-avatar :color="puntajeObtenido >= 3.0 ? '#1B4332' : '#B71C1C'" size="54" class="elevation-2 text-white">
            <v-icon :icon="puntajeObtenido >= 3.0 ? 'mdi-trophy-outline' : 'mdi-alert-circle-outline'" size="32" :color="puntajeObtenido >= 3.0 ? 'amber-accent-2' : 'white'"></v-icon>
          </v-avatar>
          <div>
            <span class="text-caption text-grey-lighten-2 d-block">Tu Calificación en {{ gradoActual }}° Grado:</span>
            <div class="d-flex align-center ga-2">
              <span class="text-h4 font-weight-black text-amber-accent-2 leading-none">{{ puntajeObtenido.toFixed(1) }}</span>
              <span class="text-subtitle-1 text-grey-lighten-1 font-weight-bold">/ 5.0</span>
            </div>
          </div>
        </div>

        <div class="text-sm-right d-flex flex-column align-items-end ga-1">
          <v-chip :color="getColorNota(puntajeObtenido)" size="large" variant="flat" class="font-weight-black px-4 text-black">
            {{ getTextoDesempeno(puntajeObtenido) }}
          </v-chip>
          <span class="text-caption text-light-green-accent-1">
            <v-icon icon="mdi-check-all" size="14" class="mr-1"></v-icon>
            Guardada con el código de tu docente
          </span>
        </div>
      </div>

      <!-- Lista de Preguntas -->
      <div class="d-flex flex-column ga-4 my-2">
        <div
          v-for="(pregunta, index) in preguntas"
          :key="pregunta.id"
          class="pregunta-box pa-4 rounded-xl"
        >
          <div class="d-flex align-center justify-space-between ga-2 mb-3">
            <div class="d-flex align-center ga-2 flex-wrap">
              <v-chip size="small" color="#2D6A4F" variant="flat" class="text-white font-weight-bold">
                Pregunta {{ index + 1 }} de {{ preguntas.length }}
              </v-chip>
              <span class="text-subtitle-1 font-weight-bold text-white">
                ¿Dónde depositar: <span class="text-light-green-accent-2">"{{ pregunta.item }}"</span>?
              </span>
            </div>

            <!-- Indicador Correcto / Incorrecto -->
            <v-chip
              v-if="evaluado"
              size="small"
              :color="respuestas[index] === pregunta.correcta ? 'green-accent-3' : 'red-accent-2'"
              variant="flat"
              :class="respuestas[index] === pregunta.correcta ? 'text-green-darken-4' : 'text-white'"
              class="font-weight-bold"
            >
              <v-icon start :icon="respuestas[index] === pregunta.correcta ? 'mdi-check-bold' : 'mdi-close-thick'" size="14"></v-icon>
              {{ respuestas[index] === pregunta.correcta ? 'Correcto' : 'Incorrecto' }}
            </v-chip>
          </div>

          <!-- Opciones de Selección -->
          <v-radio-group
            v-model="respuestas[index]"
            :disabled="evaluado"
            hide-details
            class="ma-0"
          >
            <v-radio
              v-for="(opcion, opcIndex) in (pregunta.opciones || OPCIONES_CANECAS)"
              :key="opcIndex"
              :value="opcIndex"
              :label="opcion"
              color="light-green-accent-3"
              class="mb-2 option-radio"
              :class="{
                'opcion-correcta': evaluado && opcIndex === pregunta.correcta,
                'opcion-errada': evaluado && respuestas[index] === opcIndex && opcIndex !== pregunta.correcta
              }"
            ></v-radio>
          </v-radio-group>

          <!-- Retroalimentación pedagógica tras evaluar -->
          <div v-if="evaluado" class="pa-2.5 rounded-lg mt-2 d-flex align-start ga-2 bg-black-20">
            <v-icon icon="mdi-lightbulb-on-outline" color="amber-accent-2" size="18" class="mt-0.5 flex-shrink-0"></v-icon>
            <span class="text-caption text-grey-lighten-2">{{ pregunta.explicacion }}</span>
          </div>
        </div>
      </div>

      <!-- Pie del Formulario y Botón para Enviar -->
      <div class="d-flex flex-column flex-sm-row justify-space-between align-center ga-3 mt-4 pt-3 border-top-light">
        <span class="text-caption text-grey-lighten-2">
          {{ evaluado ? 'Evaluación completada.' : `${pendientesCount} de ${preguntas.length} preguntas pendientes.` }}
        </span>

        <v-btn
          v-if="!evaluado"
          color="amber-accent-3"
          size="large"
          rounded="pill"
          class="text-black font-weight-bold px-6 elevation-3"
          :disabled="!todasRespondidas || estudianteStore.guardandoNota"
          :loading="estudianteStore.guardandoNota"
          @click="calificarYGuardar"
        >
          <v-icon start icon="mdi-check-decagram"></v-icon>
          {{ estudianteStore.guardandoNota ? 'Enviando...' : 'Calificar y Enviar Nota al Servidor' }}
        </v-btn>
      </div>

    </v-card>
  </div>
</template>

<style scoped>
.activity-panel {
  background-color: rgba(20, 38, 23, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.resultado-banner {
  background: linear-gradient(135deg, rgba(27, 67, 50, 0.95), rgba(45, 106, 79, 0.85));
  border: 1.5px solid rgba(255, 215, 0, 0.4);
}
.pregunta-box {
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.border-bottom-light { border-bottom: 1px solid rgba(255, 255, 255, 0.15); }
.border-top-light { border-top: 1px solid rgba(255, 255, 255, 0.15); }
.bg-black-20 { background-color: rgba(0, 0, 0, 0.25); }
:deep(.option-radio .v-label) {
  color: #ffffff !important;
  font-size: 0.93rem;
}
.opcion-correcta :deep(.v-label) {
  color: #A5D6A7 !important;
  font-weight: bold !important;
}
.opcion-errada :deep(.v-label) {
  color: #EF9A9A !important;
  text-decoration: line-through;
}
.leading-none { line-height: 1; }
</style>
