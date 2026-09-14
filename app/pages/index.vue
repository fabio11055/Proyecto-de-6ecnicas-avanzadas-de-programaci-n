<template>
  <v-container fluid class="landing-container d-flex align-center justify-center fill-height text-center pa-4">
    <div class="content-wrapper d-flex flex-column align-center">
      
      <!-- Componente del Logo + Insignia -->
      <LogoCard />

      <!-- Título Principal -->
      <h1 class="main-title text-h2 font-weight-black mb-4">
        Clasificación de<br />residuos
      </h1>

      <!-- Subtítulo -->
      <p class="subtitle-text text-body-1 mb-8">
        Descubre cómo clasificar correctamente los residuos y su importancia<br />
        para el medio ambiente mediante un proceso interactivo.
      </p>

      <!-- Botones de Acción independientes -->
      <div class="d-flex flex-wrap justify-center ga-4">
        <TeacherBtn />
        <StudentBtn />
      </div>

    </div>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: url('/fondo.jpg') center center / cover no-repeat;
  position: relative;
}

.main-title {
  color: #1B4332;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  line-height: 1.1;
}

.subtitle-text {
  color: #1B4332;
  font-weight: 600;
  max-width: 600px;
}
</style>