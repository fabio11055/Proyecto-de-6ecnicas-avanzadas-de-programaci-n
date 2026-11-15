import { readDbData, writeDbData } from '../../utils/db'

// Endpoint para eliminar un alumno y sus notas asociadas (DELETE)
export default defineEventHandler(async (event) => {
  let body: any = {}
  try { body = await readBody(event) || {} } catch {}
  const query = getQuery(event)

  const id = body.id || query.id
  const estudianteId = body.estudianteId || query.estudianteId || (id?.startsWith('pend-') ? id.replace('pend-', '') : undefined)
  const notaId = id && !id.startsWith('pend-') ? id : undefined
  const nombre = body.nombre || query.nombre

  if (!id && !estudianteId && !nombre) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Se requiere el ID o nombre del estudiante para eliminarlo',
    })
  }

  // 1. Intentar comunicar con json-server (puerto 3001)
  try {
    if (estudianteId) {
      try {
        await $fetch(`http://localhost:3001/estudiantes/${estudianteId}`, { method: 'DELETE' })
      } catch {}
    }
    if (notaId) {
      try {
        await $fetch(`http://localhost:3001/notas/${notaId}`, { method: 'DELETE' })
      } catch {}
    }
    return {
      success: true,
      id,
      message: `Estudiante ${nombre ? `"${nombre}"` : ''} eliminado con éxito del servidor.`,
    }
  } catch (error) {
    // 2. Si json-server no está corriendo, gestionar directamente en db.json
    const db = readDbData()
    if (!Array.isArray(db.estudiantes)) {
      db.estudiantes = []
    }
    if (!Array.isArray(db.notas)) {
      db.notas = []
    }

    // ELIMINAR (DELETE) de estudiantes
    db.estudiantes = db.estudiantes.filter((e: any) =>
      (!estudianteId || String(e.id) !== String(estudianteId)) &&
      (!nombre || e.nombre?.toLowerCase() !== String(nombre).toLowerCase())
    )

    // ELIMINAR (DELETE) de notas
    db.notas = db.notas.filter((n: any) =>
      (!notaId || String(n.id) !== String(notaId)) &&
      (!estudianteId || String(n.estudianteId) !== String(estudianteId)) &&
      (!nombre || n.nombre?.toLowerCase() !== String(nombre).toLowerCase())
    )

    writeDbData(db)
    return {
      success: true,
      id,
      message: `Estudiante ${nombre ? `"${nombre}"` : ''} eliminado con éxito de db.json.`,
    }
  }
})
