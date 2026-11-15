import fs from 'node:fs'
import path from 'node:path'

// Ruta absoluta al archivo db.json en la raíz del proyecto
const getDbPath = () => path.resolve(process.cwd(), 'db.json')

// Función para leer directamente db.json
export const readDbData = (): any => {
  try {
    const filePath = getDbPath()
    if (!fs.existsSync(filePath)) {
      return { estudiantes: [], docentes: [], notas: [], contenido: {} }
    }
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content || '{}')
  } catch (err) {
    console.error('Error al leer db.json:', err)
    return { estudiantes: [], docentes: [], notas: [], contenido: {} }
  }
}

// Función para escribir directamente en db.json
export const writeDbData = (data: any): void => {
  try {
    const filePath = getDbPath()
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error al escribir en db.json:', err)
  }
}

// Tipos de datos principales del proyecto
export interface DocenteUser {
  id?: string
  nombre: string
  email: string
  password?: string
  institucion: string
  codigo: string
}

export interface EstudianteUser {
  id?: string
  nombre: string
  escuela: string
  grado: string
  codigo: string
  docenteId?: string
  docenteNombre?: string
}

export interface NotaEstudiante {
  id: string
  estudianteId?: string
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

// URL base de json-server (puerto 3001)
export const API_URL = 'http://localhost:3001'
