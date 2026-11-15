import { readDbData } from '../../utils/db'

// Extrae las notas de los estudiantes para el store
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const estudianteId = query.estudianteId ? String(query.estudianteId).trim() : null
  const nombre = query.nombre ? String(query.nombre).trim().toLowerCase() : null
  const grado = query.grado ? String(query.grado).trim() : null
  const codigo = query.codigo ? String(query.codigo).trim().toUpperCase() : null

  let todasLasNotas: any[] = []

  try {
    // Si json-server está corriendo (puerto 3001), extrae las notas de allí
    const res = await $fetch<any[]>('http://localhost:3001/notas')
    todasLasNotas = Array.isArray(res) ? res : []
  } catch {
    // Si json-server no está encendido, responde leyendo directamente de db.json
    const db = readDbData()
    todasLasNotas = Array.isArray(db.notas) ? db.notas : []
  }

  if (!estudianteId && !nombre) {
    return { success: true, notas: todasLasNotas }
  }

  // Filtrar las notas pertenecientes al estudiante
  const notasEstudiante = todasLasNotas.filter((n: any) => {
    const matchId = estudianteId && n.estudianteId && String(n.estudianteId) === estudianteId
    const matchNombre = nombre && n.nombre && n.nombre.trim().toLowerCase() === nombre &&
                        (!grado || String(n.grado) === grado) &&
                        (!codigo || !n.docenteCodigo || n.docenteCodigo.trim().toUpperCase() === codigo)
    return matchId || matchNombre
  })

  return { success: true, notas: notasEstudiante }
})
