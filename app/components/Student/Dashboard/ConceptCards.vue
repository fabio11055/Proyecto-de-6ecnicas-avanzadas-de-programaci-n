<template>
  <div class="concept-cards d-flex flex-column ga-5 mt-2">
    
    <!-- 1. Reducir -->
    <div class="d-flex align-center">
      <div class="icon-box d-flex align-center justify-center mr-4 rounded-xl">
        <!-- Tu imagen personalizada aquí -->
        <v-img src="/reducir.jpg" width="70" height="70" contain></v-img>
      </div>
      <div>
        <h3 class="text-h6 font-weight-black text-white mb-1">Reducir</h3>
        <p class="text-body-2 ma-0 leading-tight">
          Disminuir el consumo y la cantidad de residuos que generamos.
        </p>
      </div>
    </div>

    <!-- 2. Reutilizar -->
    <div class="d-flex align-center">
      <div class="icon-box d-flex align-center justify-center mr-4 rounded-xl">
        <!-- Tu imagen personalizada aquí -->
        <v-img src="/reutilizar.png" width="70" height="70" contain></v-img>
      </div>
      <div>
        <h3 class="text-h6 font-weight-black text-white mb-1">Reutilizar</h3>
        <p class="text-body-2 ma-0 leading-tight">
          Volver a utilizar un objeto o material varias veces antes de desecharlo.
        </p>
      </div>
    </div>

    <!-- 3. Reciclar -->
    <div class="d-flex align-center">
      <div class="icon-box d-flex align-center justify-center mr-4 rounded-xl">
        <!-- Tu imagen personalizada aquí -->
        <v-img src="/reciclar.jpg" width="70" height="70" contain></v-img>
      </div>
      <div>
        <h3 class="text-h6 font-weight-black text-white mb-1">Reciclar</h3>
        <p class="text-body-2 ma-0 leading-tight">
          Transformar materiales usados en nuevos productos para aprovecharlos nuevamente.
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.concept-cards {
  width: 100%;
}

.icon-box {
  background-color: #c8d8b0;
  min-width: 90px;
  max-width: 90px;
  height: 90px;
  border-radius: 20px !important;
  flex-shrink: 0;
  overflow: hidden;
}

/* Forzar color negro para las definiciones */
.leading-tight {
  line-height: 1.25;
  color: #000000 !important;
  font-weight: 600;
}
</style>