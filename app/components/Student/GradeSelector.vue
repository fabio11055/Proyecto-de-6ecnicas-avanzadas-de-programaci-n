<template>
  <div class="d-flex ga-4 w-100 justify-center">
    <!-- Botón Grado 4° -->
    <v-btn
      :variant="selectedGrade === 4 ? 'elevated' : 'outlined'"
      :color="selectedGrade === 4 ? '#2D6A4F' : 'grey-darken-2'"
      class="grade-card flex-grow-1 py-6 rounded-xl bg-white"
      height="auto"
      @click="selectGrade(4)"
    >
      <div class="d-flex flex-column align-center">
        <span class="text-h4 font-weight-black text-black">4°</span>
        <span class="text-caption font-weight-bold text-grey-darken-1">GRADO</span>
      </div>
    </v-btn>

    <!-- Botón Grado 5° -->
    <v-btn
      :variant="selectedGrade === 5 ? 'elevated' : 'outlined'"
      :color="selectedGrade === 5 ? '#2D6A4F' : 'grey-darken-2'"
      class="grade-card flex-grow-1 py-6 rounded-xl bg-white"
      height="auto"
      @click="selectGrade(5)"
    >
      <div class="d-flex flex-column align-center">
        <span class="text-h4 font-weight-black text-black">5°</span>
        <span class="text-caption font-weight-bold text-grey-darken-1">GRADO</span>
      </div>
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedGrade = ref(null)

const selectGrade = (grade) => {
  selectedGrade.value = grade
}
</script>

<style scoped>
.grade-card {
  border: 2px solid transparent;
  transition: all 0.2s ease;
}
</style>