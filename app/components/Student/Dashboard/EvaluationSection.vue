<template>
  <div class="section-container pa-6 rounded-2xl text-white fill-height">
    <div class="d-flex align-center mb-4 ga-3">
      <v-icon icon="mdi-clipboard-check-outline" size="36" color="cyan-lighten-2"></v-icon>
      <h2 class="text-h4 font-weight-black">Evaluación de Conocimientos</h2>
    </div>
    <p class="text-body-1 text-grey-lighten-2 mb-6">
      Responde a los cuestionarios para medir lo aprendido sobre la regla de las 3R.
    </p>

    <v-card class="bg-white-10 pa-6 rounded-xl border-light">
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <h3 class="text-h6 font-weight-bold">Quiz Nivel 1: Conceptos Básicos</h3>
          <span class="text-caption text-grey-lighten-1">5 Preguntas • 10 Minutos</span>
        </div>
        <v-chip color="green" variant="flat" size="small" class="font-weight-bold">Disponible</v-chip>
      </div>
      <v-btn color="#2D6A4F" rounded="pill" class="text-white font-weight-bold">
        Comenzar Evaluación
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped>
.section-container {
  background-color: rgba(26, 51, 32, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.bg-white-10 {
  background-color: rgba(255, 255, 255, 0.1);
}
.border-light {
  border: 1px solid rgba(255, 255, 255, 0.15);
}
</style>