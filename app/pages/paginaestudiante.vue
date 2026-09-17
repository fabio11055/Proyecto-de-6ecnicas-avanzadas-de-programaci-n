<template>
  <v-container fluid class="dashboard-container fill-height pa-6">
    <v-row class="fill-height ma-0" no-gutters>
      
      <!-- Panel Lateral -->
      <v-col cols="12" md="3" lg="2.5" class="pr-md-4 mb-4 mb-md-0">
        <StudentSidebar 
          :active-tab="currentTab" 
          @change-tab="currentTab = $event" 
        />
      </v-col>

      <!-- Panel de Contenido -->
      <v-col cols="12" md="9" lg="9.5" class="d-flex flex-column">
        
        <!-- Barra Superior Conectada -->
        <StudentNavbar 
          :active-tab="currentTab" 
          @change-tab="currentTab = $event" 
        />

        <!-- Vistas de Componentes -->
        <ContentSection 
          v-if="currentTab === 'inicio' || currentTab === 'contenidos'" 
        />

        <ResourcesSection 
          v-else-if="currentTab === 'recursos'" 
        />

        <ActivitiesSection 
          v-else-if="currentTab === 'actividades'" 
        />

        <EvaluationSection 
          v-else-if="currentTab === 'evaluacion'" 
        />

      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('inicio')
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: url('/fondo.jpg') center center / cover no-repeat;
  position: relative;
}
</style>