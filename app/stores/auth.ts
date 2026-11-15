import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

// Estructura de los datos del usuario en sesión
export interface UserSession {
  id?: string
  role: 'estudiante' | 'docente'
  nombre: string
  escuela?: string
  grado?: string
  codigo?: string
  docenteId?: string
  docenteNombre?: string
  email?: string
  institucion?: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // 1. Estado reactivo: datos del usuario y estados de carga/mensajes
  const user = ref<UserSession | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  const successMessage = ref<string | null>(null)

  // Función auxiliar para enviar peticiones de login o registro sin repetir código
  const peticionAuth = async (endpoint: string, datos: any) => {
    isLoading.value = true
    errorMessage.value = null
    successMessage.value = null

    try {
      const res = await $fetch<{ success: boolean; message: string; user: UserSession; redirectTo: string }>(
        endpoint,
        { method: 'POST', body: datos }
      )

      if (res?.success) {
        user.value = res.user
        successMessage.value = res.message

        // Guardar sesión en el navegador para que no se pierda al recargar
        if (import.meta.client) {
          localStorage.setItem('ecomentes_user', JSON.stringify(res.user))
        }

        if (res.redirectTo) await router.push(res.redirectTo)
        return res
      }
    } catch (err: any) {
      errorMessage.value = err?.data?.statusMessage || err?.statusMessage || 'Error de autenticación'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 2. Acciones del store
  const login = (formData: any) => peticionAuth('/api/auth/login', formData)
  const registerDocente = (formData: any) => peticionAuth('/api/auth/register', formData)

  // Cerrar sesión y limpiar el almacenamiento
  const logout = async () => {
    user.value = null
    errorMessage.value = null
    successMessage.value = null
    if (import.meta.client) localStorage.clear()
    await router.push('/')
  }

  // Restaurar usuario guardado al abrir la página
  const initUser = () => {
    if (import.meta.client && !user.value) {
      const saved = localStorage.getItem('ecomentes_user')
      if (saved) {
        try {
          user.value = JSON.parse(saved)
        } catch {
          localStorage.removeItem('ecomentes_user')
        }
      }
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    errorMessage,
    successMessage,
    login,
    registerDocente,
    logout,
    initUser
  }
})
