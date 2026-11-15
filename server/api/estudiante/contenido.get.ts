import { readDbData } from '../../utils/db'

// El servidor se encarga de pasarle el contenido educativo al store
export default defineEventHandler(async () => {
  try {
    // Si json-server está corriendo (puerto 3001), extrae el contenido de allí
    return await $fetch('http://localhost:3001/contenido')
  } catch {
    // Si json-server no está encendido, responde leyendo directamente de db.json
    const db = readDbData()
    return db.contenido || { conceptos: [], videos: [], documentos: [], actividades: [] }
  }
})
