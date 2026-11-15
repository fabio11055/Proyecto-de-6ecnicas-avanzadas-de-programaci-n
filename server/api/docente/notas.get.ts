import { readDbData } from '../../utils/db'

// El servidor se encarga de pasarle las notas y alumnos al store del docente
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const docenteId = query.docenteId ? String(query.docenteId).trim() : null
  const codigo = query.codigo ? String(query.codigo).trim().toUpperCase() : null
  const gradoFiltro = query.grado ? String(query.grado).trim() : null

  if (!docenteId && !codigo) {
    return { success: true, total: 0, resumen: emptyResumen(), data: [] }
  }

  let todasLasNotas: any[] = []
  let todosLosEstudiantes: any[] = []

  try {
    // Si json-server está corriendo (puerto 3001), extrae notas y estudiantes de allí
    const [notasRes, estRes] = await Promise.all([
      $fetch<any[]>('http://localhost:3001/notas'),
      $fetch<any[]>('http://localhost:3001/estudiantes')
    ])
    todasLasNotas = Array.isArray(notasRes) ? notasRes : []
    todosLosEstudiantes = Array.isArray(estRes) ? estRes : []
  } catch {
    // Si json-server no está encendido, responde leyendo directamente de db.json
    const db = readDbData()
    todasLasNotas = Array.isArray(db.notas) ? db.notas : []
    todosLosEstudiantes = Array.isArray(db.estudiantes) ? db.estudiantes : []
  }

  // Filtrar los que pertenecen a este docente
  const estudiantesDocente = todosLosEstudiantes.filter((e: any) => 
    (docenteId && String(e.docenteId) === docenteId) ||
    (codigo && e.codigo && e.codigo.trim().toUpperCase() === codigo)
  )

  const notasDocente = todasLasNotas.filter((n: any) => 
    (docenteId && String(n.docenteId) === docenteId) ||
    (codigo && n.docenteCodigo && n.docenteCodigo.trim().toUpperCase() === codigo)
  )

  // Unificar lista de alumnos (evaluados y pendientes)
  const listaUnificada: any[] = []
  const notasUsadas = new Set<string>()

  for (const est of estudiantesDocente) {
    const gradoEst = String(est.grado || '4')
    const nota = notasDocente.find((n: any) => 
      !notasUsadas.has(String(n.id)) &&
      (String(n.estudianteId) === String(est.id) || 
       (n.nombre?.toLowerCase() === est.nombre?.toLowerCase() && String(n.grado) === gradoEst))
    )

    if (nota) {
      notasUsadas.add(String(nota.id))
      let puntaje = Number(nota.puntaje)
      if (puntaje > 5) puntaje = puntaje / 20

      listaUnificada.push({
        id: String(nota.id),
        estudianteId: String(est.id),
        nombre: est.nombre || nota.nombre,
        escuela: est.escuela || nota.escuela,
        grado: gradoEst,
        actividad: nota.actividad || `Evaluación 3R - ${gradoEst}° Grado`,
        puntaje: Number(puntaje.toFixed(1)),
        calificacionMaxima: 5.0,
        fecha: nota.fecha,
        observacion: nota.observacion || `Evaluación completada con calificación ${puntaje.toFixed(1)} / 5.0`,
        docenteId: nota.docenteId || docenteId,
        docenteCodigo: nota.docenteCodigo || codigo,
        estado: 'evaluado',
        ingresado: true
      })
    } else {
      listaUnificada.push({
        id: `pend-${est.id}`,
        estudianteId: String(est.id),
        nombre: est.nombre,
        escuela: est.escuela || 'Institución Educativa',
        grado: gradoEst,
        actividad: `Evaluación 3R - ${gradoEst}° Grado`,
        puntaje: null,
        calificacionMaxima: 5.0,
        fecha: 'Ingresó con código',
        observacion: 'El estudiante ingresó al aula con el código pero aún no realiza la evaluación.',
        docenteId: est.docenteId || docenteId,
        docenteCodigo: est.codigo || codigo,
        estado: 'pendiente',
        ingresado: true
      })
    }
  }

  // Agregar notas sueltas del docente que no estaban en estudiantes
  for (const n of notasDocente) {
    if (!notasUsadas.has(String(n.id))) {
      let puntaje = Number(n.puntaje)
      if (puntaje > 5) puntaje = puntaje / 20
      const gradoNota = String(n.grado || '4')

      listaUnificada.push({
        id: String(n.id),
        estudianteId: n.estudianteId || n.id,
        nombre: n.nombre || 'Estudiante',
        escuela: n.escuela || 'Institución Educativa',
        grado: gradoNota,
        actividad: n.actividad || `Evaluación 3R - ${gradoNota}° Grado`,
        puntaje: Number(puntaje.toFixed(1)),
        calificacionMaxima: 5.0,
        fecha: n.fecha,
        observacion: n.observacion,
        docenteId: n.docenteId || docenteId,
        docenteCodigo: n.docenteCodigo || codigo,
        estado: 'evaluado',
        ingresado: true
      })
    }
  }

  // Calcular métricas para el panel del docente
  const metricasGrado = (g: string) => {
    const items = listaUnificada.filter((r: any) => r.grado === g)
    const evaluados = items.filter((r: any) => r.estado === 'evaluado' && r.puntaje !== null)
    const suma = evaluados.reduce((acc: number, c: any) => acc + Number(c.puntaje), 0)
    return {
      total: items.length,
      evaluados: evaluados.length,
      pendientes: items.length - evaluados.length,
      promedio: evaluados.length ? Number((suma / evaluados.length).toFixed(1)) : 0
    }
  }

  const g4 = metricasGrado('4')
  const g5 = metricasGrado('5')
  const todosEvaluados = listaUnificada.filter((r: any) => r.estado === 'evaluado' && r.puntaje !== null)
  const sumaTotal = todosEvaluados.reduce((acc: number, c: any) => acc + Number(c.puntaje), 0)

  const resumen = {
    totalEstudiantes: listaUnificada.length,
    evaluados: todosEvaluados.length,
    pendientes: listaUnificada.length - todosEvaluados.length,
    promedioGeneral: todosEvaluados.length ? Number((sumaTotal / todosEvaluados.length).toFixed(1)) : 0,
    grado4: g4,
    grado5: g5
  }

  const resultado = gradoFiltro ? listaUnificada.filter((r: any) => r.grado === gradoFiltro) : listaUnificada

  return { success: true, total: resultado.length, resumen, data: resultado }
})

const emptyResumen = () => ({
  totalEstudiantes: 0,
  evaluados: 0,
  pendientes: 0,
  promedioGeneral: 0,
  grado4: { total: 0, evaluados: 0, pendientes: 0, promedio: 0 },
  grado5: { total: 0, evaluados: 0, pendientes: 0, promedio: 0 }
})
