import { defineStore } from 'pinia'

export interface NotaRegistro {
  id: string
  nombre: string
  escuela: string
  grado: string
  actividad: string
  puntaje: number
  calificacionMaxima: number
  fecha: string
  observacion?: string
  docenteId?: string
  docenteCodigo?: string
}

export const useEstudianteStore = defineStore('estudiante', () => {
  // 1. Estado reactivo: contenido educativo (3R, videos, pdfs) y notas del alumno
  const contenido = ref<any>({ conceptos: [], videos: [], documentos: [], actividades: [] })
  const misNotas = ref<NotaRegistro[]>([])
  const cargando = ref(false)
  const guardandoNota = ref(false)
  const error = ref<string | null>(null)
  const mensajeExito = ref<string | null>(null)

  // 2. GET: Cargar material educativo desde /api/estudiante/contenido
  const cargarContenido = async () => {
    cargando.value = true
    error.value = null
    try {
      const response = await $fetch<any>('/api/estudiante/contenido')
      if (response) contenido.value = response.data || response
    } catch (err: any) {
      error.value = err?.statusMessage || 'No se pudo cargar el material educativo.'
    } finally {
      cargando.value = false
    }
  }

  // 3. POST: Enviar resultado de la evaluación a /api/estudiante/notas
  const guardarNota = async (datos: any) => {
    guardandoNota.value = true
    error.value = null
    mensajeExito.value = null
    try {
      const response = await $fetch<{ success: boolean; message: string; nota: NotaRegistro }>(
        '/api/estudiante/notas',
        { method: 'POST', body: datos }
      )
      if (response?.success) {
        misNotas.value.unshift(response.nota)
        mensajeExito.value = response.message
        return response.nota
      }
    } catch (err: any) {
      error.value = err?.statusMessage || 'No se pudo registrar la calificación.'
      throw err
    } finally {
      guardandoNota.value = false
    }
  }

  // 4. GET: Consultar si el estudiante ya completó la evaluación
  const consultarNotasEstudiante = async (params: any) => {
    try {
      const response = await $fetch<any>('/api/estudiante/notas', { query: params })
      const list = Array.isArray(response) ? response : (response?.notas || response?.data || [])
      misNotas.value = list
      return list
    } catch (e) {
      console.error('Error consultando notas:', e)
      return []
    }
  }

  return {
    contenido,
    misNotas,
    cargando,
    guardandoNota,
    error,
    mensajeExito,
    cargarContenido,
    guardarNota,
    consultarNotasEstudiante
  }
})
