import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export interface NotaDocente {
  id: string
  estudianteId?: string
  nombre: string
  escuela: string
  grado: string
  actividad: string
  puntaje: number | null
  calificacionMaxima: number
  fecha: string
  observacion?: string
  docenteId?: string
  docenteCodigo?: string
  estado?: 'evaluado' | 'pendiente'
  ingresado?: boolean
}

export const useDocenteStore = defineStore('docente', () => {
  // 1. Estado reactivo: lista de notas, resumen estadístico y estados de petición
  const notas = ref<NotaDocente[]>([])
  const resumen = ref({
    totalEstudiantes: 0,
    evaluados: 0,
    pendientes: 0,
    promedioGeneral: 0,
    grado4: { total: 0, evaluados: 0, pendientes: 0, promedio: 0 },
    grado5: { total: 0, evaluados: 0, pendientes: 0, promedio: 0 }
  })

  const cargando = ref(false)
  const guardando = ref(false)
  const eliminando = ref(false)
  const error = ref<string | null>(null)
  const mensajeExito = ref<string | null>(null)

  // Control del modal para calificar/editar nota
  const notaSeleccionada = ref<NotaDocente | null>(null)
  const dialogEditar = ref(false)

  // 2. Filtros computados por grado y estado
  const estudiantesGrado4 = computed(() => notas.value.filter(n => n.grado === '4'))
  const estudiantesGrado5 = computed(() => notas.value.filter(n => n.grado === '5'))
  const estudiantesEvaluados = computed(() => notas.value.filter(n => n.estado === 'evaluado'))
  const estudiantesPendientes = computed(() => notas.value.filter(n => n.estado === 'pendiente'))

  // 3. Acciones: Conexión con los endpoints del servidor (/api/docente/...)
  
  // GET: Cargar estudiantes y notas del docente actual
  const cargarNotas = async () => {
    cargando.value = true
    error.value = null
    const authStore = useAuthStore()
    if (!authStore.user) authStore.initUser()

    try {
      const res = await $fetch<any>('/api/docente/notas', {
        method: 'GET',
        query: { docenteId: authStore.user?.id, codigo: authStore.user?.codigo }
      })
      if (res?.data) {
        notas.value = res.data
        if (res.resumen) resumen.value = res.resumen
      }
    } catch (err: any) {
      error.value = err?.statusMessage || 'Error al consultar notas.'
    } finally {
      cargando.value = false
    }
  }

  // PUT: Guardar nueva nota u observación
  const actualizarNota = async (id: string, puntaje: number, observacion?: string) => {
    guardando.value = true
    error.value = null
    mensajeExito.value = null

    try {
      const res = await $fetch<any>('/api/docente/notas', {
        method: 'PUT',
        body: { id, puntaje, observacion }
      })
      if (res?.success) {
        await cargarNotas()
        mensajeExito.value = res.message
        dialogEditar.value = false
        return res.nota
      }
    } catch (err: any) {
      error.value = err?.statusMessage || 'Error al actualizar calificación.'
      throw err
    } finally {
      guardando.value = false
    }
  }

  // DELETE: Eliminar alumno de la lista y base de datos
  const eliminarAlumno = async (item: NotaDocente) => {
    eliminando.value = true
    error.value = null
    mensajeExito.value = null

    try {
      const res = await $fetch<any>('/api/docente/alumno', {
        method: 'DELETE',
        body: { id: item.id, estudianteId: item.estudianteId, nombre: item.nombre }
      })
      if (res?.success) {
        await cargarNotas()
        mensajeExito.value = res.message
        return true
      }
    } catch (err: any) {
      error.value = err?.statusMessage || 'Error al eliminar estudiante.'
      throw err
    } finally {
      eliminando.value = false
    }
  }

  // Abrir modal de edición con los datos del alumno
  const abrirEdicion = (nota: NotaDocente) => {
    notaSeleccionada.value = { ...nota }
    dialogEditar.value = true
  }

  return {
    notas,
    resumen,
    cargando,
    guardando,
    eliminando,
    error,
    mensajeExito,
    notaSeleccionada,
    dialogEditar,
    estudiantesGrado4,
    estudiantesGrado5,
    estudiantesEvaluados,
    estudiantesPendientes,
    cargarNotas,
    actualizarNota,
    eliminarAlumno,
    abrirEdicion
  }
})
