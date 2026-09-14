<template>
  <div class="badge-container">
    <div class="badge-pill elevation-2">
      <v-icon start icon="mdi-leaf" size="x-small" color="#8B5A2B" class="mr-1"></v-icon>
      <span class="badge-text">Modulo de Sostenibilidad</span>
    </div>
  </div>
</template>

<style scoped>
.badge-container {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.badge-pill {
  background-color: #EFEBE9;
  border: 1px solid #D7CCC8;
  border-radius: 50px;
  padding: 6px 20px;
  display: inline-flex;
  align-items: center;
}

.badge-text {
  color: #8B5A2B;
  font-weight: 600;
  font-size: 0.85rem;
}
</style>