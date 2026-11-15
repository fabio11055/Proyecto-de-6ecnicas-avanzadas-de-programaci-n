<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

// Props: Recibe el rol actual inyectado desde la página principal ('estudiante' o 'docente')
const props = defineProps({
  role: { type: String, default: 'estudiante' }
})

// Acceso al store de autenticación (login, registro y manejo de errores)
const authStore = useAuthStore()

// Modo del docente: alternar entre 'login' (iniciar sesión) y 'register' (crear cuenta)
const docenteMode = ref('login')

// =========================================================================
// 2. MODELO REACTIVO DEL FORMULARIO
// =========================================================================
// Un solo objeto reactivo para todos los campos de entrada
const form = reactive({
  nombre: '',
  escuela: '',
  grado: '4',
  codigo: '',
  email: '',
  password: '',
  institucion: ''
})

// Genera un código aleatorio sugerido para nuevos docentes
const generarNuevoCodigo = () => {
  form.codigo = `DOC-${Math.floor(100 + Math.random() * 900)}`
}
onMounted(generarNuevoCodigo)

// =========================================================================
// 3. ENVÍO Y VALIDACIÓN DE DATOS
// =========================================================================
// Envía los datos al servidor según el rol y modo activo
const handleSubmit = async () => {
  // Caso 1: Estudiante
  if (props.role === 'estudiante') {
    if (!form.nombre.trim() || !form.codigo.trim()) {
      authStore.errorMessage = 'Por favor escribe tu nombre y el código de tu docente.'
      return
    }
    return await authStore.login({
      role: 'estudiante',
      nombre: form.nombre.trim(),
      escuela: form.escuela.trim() || 'Institución Educativa',
      grado: form.grado,
      codigo: form.codigo.trim().toUpperCase()
    })
  }

  // Caso 2: Docente - Iniciar Sesión
  if (docenteMode.value === 'login') {
    if (!form.email.trim() || !form.password.trim()) {
      authStore.errorMessage = 'Correo y contraseña son obligatorios.'
      return
    }
    return await authStore.login({
      role: 'docente',
      email: form.email.trim(),
      password: form.password.trim()
    })
  }

  // Caso 3: Docente - Crear Cuenta
  if (!form.nombre.trim() || !form.email.trim() || !form.password.trim()) {
    authStore.errorMessage = 'Nombre, correo y contraseña son obligatorios.'
    return
  }
  await authStore.registerDocente({
    nombre: form.nombre.trim(),
    email: form.email.trim(),
    institucion: form.institucion.trim() || 'Colegio Eco-Mentes',
    password: form.password.trim(),
    codigo: form.codigo.trim().toUpperCase()
  })
}
</script>

<template>
  <div class="login-form-wrapper w-100 max-w-form">
    <v-card class="form-card pa-5 pa-sm-6 rounded-2xl elevation-4">
      
      <!-- Alerta dinámica de mensajes del servidor (error o éxito) -->
      <v-alert
        v-if="authStore.errorMessage || authStore.successMessage"
        :type="authStore.errorMessage ? 'error' : 'success'"
        variant="tonal"
        closable
        density="compact"
        class="mb-4 rounded-xl"
        @click:close="authStore.errorMessage = authStore.successMessage = null"
      >
        {{ authStore.errorMessage || authStore.successMessage }}
      </v-alert>

      <v-form @submit.prevent="handleSubmit">
        <!-- Defaults de Vuetify para aplicar estilo uniforme a todos los campos -->
        <v-defaults-provider :defaults="{ VTextField: { variant: 'solo-filled', rounded: 'pill', density: 'comfortable', hideDetails: true, class: 'mb-3' } }">

          <!-- ================= 1. FORMULARIO ESTUDIANTE ================= -->
          <template v-if="role === 'estudiante'">
            <div class="mb-3 d-flex align-center justify-center ga-1 text-green-darken-3 font-weight-bold text-caption">
              <v-icon icon="mdi-school" size="18"></v-icon>
              Ingreso al Aula Virtual Estudiantil
            </div>

            <label class="field-label">¿CÓMO TE LLAMAS? *</label>
            <v-text-field v-model="form.nombre" placeholder="Ej: Daniel Gómez" prepend-inner-icon="mdi-account" required />

            <label class="field-label">INSTITUCIÓN EDUCATIVA</label>
            <v-text-field v-model="form.escuela" placeholder="Ej: Colegio San José" prepend-inner-icon="mdi-domain" />

            <!-- Selector de Grado -->
            <label class="field-label">¿EN QUÉ GRADO ESTÁS?</label>
            <div class="d-flex ga-3 mb-3">
              <v-btn
                v-for="g in ['4', '5']"
                :key="g"
                :variant="form.grado === g ? 'flat' : 'outlined'"
                :color="form.grado === g ? '#2D6A4F' : 'grey-darken-1'"
                rounded="pill"
                class="flex-grow-1 text-none font-weight-bold py-2"
                @click="form.grado = g"
              >
                {{ g }}° Grado
              </v-btn>
            </div>

            <label class="field-label">CÓDIGO DE TU DOCENTE *</label>
            <v-text-field v-model="form.codigo" placeholder="Ej: DOC-401 o 1211" prepend-inner-icon="mdi-key" required />
            <span class="text-caption text-grey-darken-1 d-block mb-4 pl-2" style="font-size: 0.73rem;">
              <v-icon icon="mdi-information-outline" size="13" class="mr-1"></v-icon>
              Ingresa el código proporcionado por tu docente.
            </span>

            <v-btn
              type="submit"
              block
              color="#1B4332"
              size="x-large"
              rounded="pill"
              class="text-white font-weight-bold elevation-3 text-none"
              :loading="authStore.isLoading"
            >
              {{ authStore.isLoading ? 'Validando código...' : 'Ingresar al Aula Virtual' }}
              <v-icon end icon="mdi-arrow-right" class="ml-2"></v-icon>
            </v-btn>
          </template>

          <!-- ================= 2. FORMULARIO DOCENTE (LOGIN Y REGISTRO) ================= -->
          <template v-else>
            <!-- Selector para alternar entre Iniciar Sesión o Crear Cuenta -->
            <div class="d-flex ga-1 pa-1 rounded-pill mb-3 bg-grey-lighten-4">
              <v-btn
                v-for="modo in [
                  { id: 'login', label: 'Iniciar Sesión', icon: 'mdi-login' },
                  { id: 'register', label: 'Crear Cuenta', icon: 'mdi-account-plus' }
                ]"
                :key="modo.id"
                :variant="docenteMode === modo.id ? 'flat' : 'text'"
                :color="docenteMode === modo.id ? '#2D6A4F' : 'transparent'"
                :class="docenteMode === modo.id ? 'text-white font-weight-bold' : 'text-grey-darken-2'"
                size="small"
                rounded="pill"
                class="flex-grow-1 text-none"
                @click="docenteMode = modo.id"
              >
                <v-icon start :icon="modo.icon" size="16"></v-icon>
                {{ modo.label }}
              </v-btn>
            </div>

            <!-- Campos adicionales exclusivos de registro -->
            <template v-if="docenteMode === 'register'">
              <label class="field-label">NOMBRE COMPLETO *</label>
              <v-text-field v-model="form.nombre" placeholder="Prof. Laura Mendoza" prepend-inner-icon="mdi-account-tie" />
            </template>

            <!-- Correo (común a login y registro) -->
            <label class="field-label">CORREO INSTITUCIONAL *</label>
            <v-text-field v-model="form.email" placeholder="profesor@colegio.edu.co" type="email" prepend-inner-icon="mdi-email-outline" />

            <!-- Institución (solo registro) -->
            <template v-if="docenteMode === 'register'">
              <label class="field-label">INSTITUCIÓN EDUCATIVA</label>
              <v-text-field v-model="form.institucion" placeholder="Colegio Ecológico" prepend-inner-icon="mdi-domain" />
            </template>

            <!-- Contraseña (común a login y registro) -->
            <label class="field-label">CONTRASEÑA *</label>
            <v-text-field v-model="form.password" placeholder="••••••••" type="password" prepend-inner-icon="mdi-lock-outline" />

            <!-- Código (solo registro) -->
            <template v-if="docenteMode === 'register'">
              <div class="d-flex justify-space-between align-center mb-1">
                <label class="field-label mb-0">CÓDIGO PARA ESTUDIANTES *</label>
                <v-btn variant="text" density="compact" size="x-small" color="#2D6A4F" class="text-none font-weight-bold" @click="generarNuevoCodigo">
                  <v-icon start icon="mdi-refresh" size="12"></v-icon> Generar otro
                </v-btn>
              </div>
              <v-text-field v-model="form.codigo" placeholder="DOC-401" prepend-inner-icon="mdi-qrcode" />
            </template>

            <!-- Botón de acción con texto e icono dinámico -->
            <v-btn
              type="submit"
              block
              color="#2D6A4F"
              size="x-large"
              rounded="pill"
              class="text-white font-weight-bold elevation-3 text-none my-3"
              :loading="authStore.isLoading"
            >
              {{ authStore.isLoading ? 'Procesando...' : (docenteMode === 'login' ? 'Ingresar al Panel Docente' : 'Crear Cuenta Docente') }}
              <v-icon end :icon="docenteMode === 'login' ? 'mdi-login' : 'mdi-check-circle'" class="ml-2"></v-icon>
            </v-btn>

            <!-- Enlace inferior para alternar de modo -->
            <div class="text-center">
              <span class="text-caption text-grey-darken-2">
                {{ docenteMode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}
              </span>
              <v-btn
                variant="plain"
                color="#1B4332"
                size="small"
                class="text-none font-weight-bold pa-0 ml-1"
                @click="docenteMode = docenteMode === 'login' ? 'register' : 'login'"
              >
                {{ docenteMode === 'login' ? 'Crear cuenta docente aquí' : 'Inicia sesión aquí' }}
              </v-btn>
            </div>
          </template>

        </v-defaults-provider>
      </v-form>

      <div class="text-center mt-3">
        <span class="text-caption text-grey-lighten-1">Eco-Mentes • Aprendizaje Sostenible</span>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.form-card {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
}
.max-w-form {
  max-width: 480px;
}
.field-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1b4332;
  margin-bottom: 4px;
}
</style>
