import { readDbData, writeDbData } from '../../utils/db'

// Endpoint para registrar la calificación de un estudiante
export default defineEventHandler(async (event) => {
  // Lee el cuerpo de la solicitud
  const body = await readBody(event)

  if (!body || body.puntaje === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El puntaje es obligatorio para registrar la nota.',
    })
  }

  let docenteId = body.docenteId ? String(body.docenteId).trim() : ''
  let docenteCodigo = body.docenteCodigo ? String(body.docenteCodigo).trim().toUpperCase() : ''

  // Si no viene docenteId pero sí el código, buscar el docente
  if (docenteCodigo && !docenteId) {
    let docentes: any[] = []
    try {
      docentes = await $fetch<any[]>('http://localhost:3001/docentes')
    } catch {
      const db = readDbData()
      docentes = db.docentes || []
    }
    const docente = docentes.find((d: any) => d.codigo && d.codigo.trim().toUpperCase() === docenteCodigo)
    if (docente) docenteId = String(docente.id)
  }

  const grado = String(body.grado || body.grade || '4')
  const puntaje = Number(body.puntaje)

  const nuevaNota = {
    id: body.id ? String(body.id) : `nota-${Date.now()}`,
    estudianteId: body.estudianteId ? String(body.estudianteId) : `est-${Date.now()}`,
    nombre: (body.nombre || body.name || 'Estudiante').trim(),
    escuela: (body.escuela || body.school || 'Institución Educativa').trim(),
    grado,
    actividad: body.actividad || `Evaluación 3R - ${grado}° Grado`,
    puntaje,
    calificacionMaxima: 5.0,
    fecha: new Date().toISOString().split('T')[0],
    observacion: body.observacion || `Evaluación completada con calificación ${puntaje} sobre 5.0.`,
    docenteId,
    docenteCodigo,
  }

  try {
    // Si json-server está corriendo en el puerto 3001, intentamos guardarlo allí
    const guardado = await $fetch('http://localhost:3001/notas', {
      method: 'POST',
      body: nuevaNota,
    })
    return {
      success: true,
      message: '¡Tu evaluación ha sido calificada y registrada exitosamente!',
      nota: guardado,
    }
  } catch (error) {
    // Respaldo directo en db.json si json-server no está encendido
    const db = readDbData()
    if (!Array.isArray(db.notas)) {
      db.notas = []
    }

    db.notas.push(nuevaNota)
    writeDbData(db)
    return {
      success: true,
      message: '¡Tu evaluación ha sido calificada y registrada exitosamente!',
      nota: nuevaNota,
    }
  }
})
