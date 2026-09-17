<template>
  <div class="d-flex ga-4 justify-center">
    <!-- Botón Grado 4 -->
    <v-btn
      :color="modelValue === '4' ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'"
      :class="modelValue === '4' ? 'text-green-darken-4 font-weight-black' : 'text-white font-weight-bold'"
      rounded="xl"
      size="x-large"
      class="flex-grow-1 py-4 elevation-2 text-none"
      @click="updateGrade('4')"
    >
      <div class="d-flex flex-column align-center">
        <span class="text-h6 font-weight-black line-height-tight">4°</span>
        <span class="text-caption font-weight-bold">GRADO</span>
      </div>
    </v-btn>

    <!-- Botón Grado 5 -->
    <v-btn
      :color="modelValue === '5' ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'"
      :class="modelValue === '5' ? 'text-green-darken-4 font-weight-black' : 'text-white font-weight-bold'"
      rounded="xl"
      size="x-large"
      class="flex-grow-1 py-4 elevation-2 text-none"
      @click="updateGrade('5')"
    >
      <div class="d-flex flex-column align-center">
        <span class="text-h6 font-weight-black line-height-tight">5°</span>
        <span class="text-caption font-weight-bold">GRADO</span>
      </div>
    </v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '4'
  }
})

const emit = defineEmits(['update:modelValue'])

const updateGrade = (grade) => {
  emit('update:modelValue', grade)
}
</script>

<style scoped>
.line-height-tight {
  line-height: 1;
}
</style>