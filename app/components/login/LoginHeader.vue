<script setup>
// =========================================================================
// 1. COMPONENTE DE CABECERA Y LOGO (LOGIN / PORTAL PRINCIPAL)
// =========================================================================
// Props opcionales: permiten personalizar el título y subtítulo de la plataforma
defineProps({
  titulo: { type: String, default: 'Eco-Mentes' },
  subtitulo: {
    type: String,
    default: 'Plataforma interactiva para el aprendizaje de las 3R y clasificación de residuos escolares'
  }
})
</script>

<template>
  <div class="login-header d-flex flex-column align-center text-center mb-4">
    <!-- Contenedor del Logo con Insignia de Sostenibilidad -->
    <v-card class="logo-box mb-3 pa-4 rounded-2xl elevation-3 d-flex flex-column align-center position-relative">
      <v-img
        src="/logo.jpg"
        width="110"
        height="110"
        contain
        alt="Logo Eco-Mentes"
        class="rounded-lg"
      />
      <div class="module-badge elevation-2">
        <v-icon start icon="mdi-leaf" size="14" color="#2D6A4F" class="mr-1"></v-icon>
        <span class="badge-text">Módulo de Sostenibilidad</span>
      </div>
    </v-card>

    <h1 class="main-title text-h4 font-weight-black text-white mt-3 mb-1">
      {{ titulo }}
    </h1>
    <p class="subtitle text-body-2 text-white text-opacity-90 px-2">
      {{ subtitulo }}
    </p>
  </div>
</template>

<style scoped>
.logo-box {
  background-color: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: visible !important;
}

.module-badge {
  position: absolute;
  bottom: -13px;
  background-color: #E8F5E9;
  border: 1px solid #A5D6A7;
  border-radius: 20px;
  padding: 4px 14px;
  display: inline-flex;
  align-items: center;
}

.badge-text {
  color: #1B4332;
  font-weight: 700;
  font-size: 0.75rem;
}

.main-title {
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.35);
  letter-spacing: -0.5px;
}

.subtitle {
  max-width: 440px;
  line-height: 1.4;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
}
</style>
