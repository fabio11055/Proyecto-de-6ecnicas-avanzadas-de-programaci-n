import { readDbData, writeDbData } from '../../utils/db'

// Endpoint para editar o asignar calificaciones de estudiantes
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El ID de la nota es obligatorio',
    })
  }

  const id = String(body.id)

  // Caso: estudiante pendiente de calificar (aún no tenía nota en /notas)
  if (id.startsWith('pend-')) {
    const estId = id.replace('pend-', '')
    let est: any = null

    try {
      est = await $fetch<any>(`http://localhost:3001/estudiantes/${estId}`)
    } catch {
      const db = readDbData()
      est = (db.estudiantes || []).find((e: any) => String(e.id) === String(estId))
    }

    const nuevaNota = {
      id: `nota-${Date.now()}`,
      estudianteId: String(estId),
      nombre: est?.nombre || 'Estudiante',
      escuela: est?.escuela || 'Institución Educativa',
      grado: String(est?.grado || '4'),
      actividad: `Evaluación 3R - ${est?.grado || '4'}° Grado`,
      puntaje: body.puntaje !== undefined ? Number(body.puntaje) : 3.0,
      calificacionMaxima: 5.0,
      fecha: new Date().toISOString().split('T')[0],
      observacion: body.observacion || 'Calificación asignada por el docente.',
      docenteId: est?.docenteId || body.docenteId || '',
      docenteCodigo: est?.codigo || body.docenteCodigo || ''
    }

    let guardado = null
    try {
      guardado = await $fetch('http://localhost:3001/notas', {
        method: 'POST',
        body: nuevaNota
      })
    } catch {
      const db = readDbData()
      if (!Array.isArray(db.notas)) {
        db.notas = []
      }
      db.notas.push(nuevaNota)
      writeDbData(db)
      guardado = nuevaNota
    }

    return {
      success: true,
      message: 'Calificación asignada con éxito.',
      nota: guardado
    }
  }

  const actualizacion = {
    puntaje: body.puntaje !== undefined ? Number(body.puntaje) : undefined,
    observacion: body.observacion
  }

  // 1. Intentar comunicar con json-server (puerto 3001)
  try {
    const notaActualizada = await $fetch(`http://localhost:3001/notas/${id}`, {
      method: 'PATCH',
      body: actualizacion,
    })
    return {
      success: true,
      message: 'Calificación actualizada con éxito en el servidor.',
      nota: notaActualizada
    }
  } catch (error) {
    // 2. Si json-server no está corriendo, gestionar directamente en db.json
    const db = readDbData()
    if (!Array.isArray(db.notas)) {
      db.notas = []
    }

    // EDITAR O CAMBIAR ESTADO (PUT o PATCH)
    const index = db.notas.findIndex((p: any) => String(p.id) === String(id))
    if (index === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: `Calificación con ID ${id} no encontrada`,
      })
    }

    db.notas[index] = {
      ...db.notas[index],
      ...actualizacion,
    }

    writeDbData(db)
    return {
      success: true,
      message: 'Calificación actualizada con éxito en db.json.',
      nota: db.notas[index]
    }
  }
})
