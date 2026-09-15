<template>
  <v-row class="flex-grow-1 ma-0">
    <!-- Columna Izquierda: Conceptos Clave -->
    <v-col cols="12" lg="4" class="pr-lg-4 mb-4 mb-lg-0 pa-0">
      <h2 class="text-h6 font-weight-black text-white mb-2">
        Conceptos Clave<br />de Sostenibilidad
      </h2>
      <StudentDashboardConceptCards />
    </v-col>

    <!-- Columna Derecha: Banner Principal -->
    <v-col cols="12" lg="8">
      <StudentDashboardCartamobible />
    </v-col>
  </v-row>
</template>