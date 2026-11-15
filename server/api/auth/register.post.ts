import { readDbData, writeDbData } from '../../utils/db'

// Endpoint para registrar un nuevo docente (POST)
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) || {}
  const email = (body.email || '').trim().toLowerCase()
  const password = (body.password || '').trim()
  const nombre = (body.nombre || body.name || '').trim()

  if (!email || !nombre || !password || password.length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nombre, correo y contraseña (mínimo 3 caracteres) son requeridos',
    })
  }

  // Extraer docentes para verificar si el correo ya existe
  let docentes: any[] = []
  try {
    const res = await $fetch<any[]>('http://localhost:3001/docentes')
    docentes = Array.isArray(res) ? res : []
  } catch {
    const db = readDbData()
    docentes = Array.isArray(db.docentes) ? db.docentes : []
  }

  if (docentes.some((d: any) => d.email && d.email.trim().toLowerCase() === email)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Ya existe una cuenta con el correo ${email}. Inicia sesión.`,
    })
  }

  const codigo = (body.codigo || '').trim().toUpperCase() || `DOC-${Math.floor(100 + Math.random() * 900)}`

  const nuevoDocente = {
    id: body.id ? String(body.id) : `doc-${Date.now()}`,
    nombre,
    email,
    password,
    institucion: (body.institucion || body.school || 'Colegio Eco-Mentes').trim(),
    codigo,
  }

  let guardado = null

  try {
    // Si json-server está corriendo en el puerto 3001, intentamos guardarlo allí
    guardado = await $fetch('http://localhost:3001/docentes', {
      method: 'POST',
      body: nuevoDocente,
    })
  } catch (error) {
    // Respaldo directo en db.json si json-server no está encendido
    const db = readDbData()
    if (!Array.isArray(db.docentes)) {
      db.docentes = []
    }

    db.docentes.push(nuevoDocente)
    writeDbData(db)
    guardado = nuevoDocente
  }

  return {
    success: true,
    message: `¡Cuenta docente creada con éxito! Tu código para estudiantes es ${codigo}.`,
    user: { role: 'docente', ...guardado },
    redirectTo: '/docente',
  }
})
