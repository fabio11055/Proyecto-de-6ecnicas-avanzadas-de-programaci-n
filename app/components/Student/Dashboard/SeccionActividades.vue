<template>
  <div class="section-container pa-6 rounded-2xl text-white fill-height">
    <div class="d-flex align-center mb-4 ga-3">
      <v-icon icon="mdi-puzzle" size="36" color="amber-lighten-2"></v-icon>
      <h2 class="text-h4 font-weight-black">Actividades Interactivas</h2>
    </div>
    <p class="text-body-1 text-grey-lighten-2 mb-6">
      ¡Pon a prueba tus habilidades clasificando residuos en el juego Eco-Mentes!
    </p>

    <v-card class="bg-white-10 pa-6 rounded-xl text-center border-light">
      <v-icon icon="mdi-gamepad-variant-outline" size="64" color="white" class="mb-3"></v-icon>
      <h3 class="text-h5 font-weight-bold mb-2">Desafío de Clasificación</h3>
      <p class="text-body-2 text-grey-lighten-1 mb-4">
        Arrastra cada residuo a la caneca correspondiente (Orgánicos, Plásticos, Papel/Cartón).
      </p>
      <v-btn color="#2D6A4F" size="large" rounded="pill" class="text-white font-weight-bold px-8">
        Iniciar Juego
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