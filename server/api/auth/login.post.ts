import { readDbData, writeDbData } from '../../utils/db'

// Endpoint para autenticación de estudiantes y docentes (POST)
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.role) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El rol es obligatorio (estudiante o docente)',
    })
  }

  const role = String(body.role).toLowerCase()

  // Extraer docentes (json-server con respaldo en db.json)
  let docentes: any[] = []
  try {
    const res = await $fetch<any[]>('http://localhost:3001/docentes')
    docentes = Array.isArray(res) ? res : []
  } catch {
    const db = readDbData()
    docentes = Array.isArray(db.docentes) ? db.docentes : []
  }

  // 1. LOGIN DE ESTUDIANTE
  if (role === 'estudiante') {
    const nombre = (body.name || body.nombre || '').trim()
    const codigoIngresado = (body.code || body.codigo || '').trim().toUpperCase()

    if (!nombre) {
      throw createError({ statusCode: 400, statusMessage: 'Por favor ingresa tu nombre de estudiante.' })
    }
    if (!codigoIngresado) {
      throw createError({ statusCode: 400, statusMessage: 'Debes ingresar el código de tu docente para ingresar.' })
    }

    const docenteEncontrado = docentes.find((d: any) => d.codigo && d.codigo.trim().toUpperCase() === codigoIngresado)

    if (!docenteEncontrado) {
      throw createError({
        statusCode: 400,
        statusMessage: `El código "${codigoIngresado}" no pertenece a ningún docente registrado.`
      })
    }

    // Extraer estudiantes (json-server con respaldo en db.json)
    let estudiantes: any[] = []
    try {
      const res = await $fetch<any[]>('http://localhost:3001/estudiantes')
      estudiantes = Array.isArray(res) ? res : []
    } catch {
      const db = readDbData()
      estudiantes = Array.isArray(db.estudiantes) ? db.estudiantes : []
    }

    const grado = String(body.grade || body.grado || '4')
    let estudiante = estudiantes.find((e: any) => 
      e.nombre?.toLowerCase() === nombre.toLowerCase() &&
      (String(e.docenteId) === String(docenteEncontrado.id) || e.codigo?.toUpperCase() === codigoIngresado) &&
      String(e.grado || '4') === grado
    )

    if (!estudiante) {
      const nuevoEstudiante = {
        id: `est-${Date.now()}`,
        nombre,
        escuela: (body.school || body.escuela || docenteEncontrado.institucion || 'Institución Educativa').trim(),
        grado,
        codigo: codigoIngresado,
        docenteId: docenteEncontrado.id,
        docenteNombre: docenteEncontrado.nombre
      }

      try {
        // Guardar nuevo estudiante en json-server
        estudiante = await $fetch('http://localhost:3001/estudiantes', {
          method: 'POST',
          body: nuevoEstudiante
        })
      } catch (error) {
        // Respaldo directo en db.json si json-server está apagado
        const db = readDbData()
        if (!Array.isArray(db.estudiantes)) {
          db.estudiantes = []
        }
        db.estudiantes.push(nuevoEstudiante)
        writeDbData(db)
        estudiante = nuevoEstudiante
      }
    }

    return {
      success: true,
      message: `¡Bienvenido(a) ${nombre}! Has ingresado con el docente ${docenteEncontrado.nombre}.`,
      user: { role: 'estudiante', ...estudiante },
      redirectTo: '/estudiante'
    }
  }

  // 2. LOGIN DE DOCENTE
  if (role === 'docente') {
    const email = (body.email || '').trim().toLowerCase()
    const password = (body.password || '').trim()

    if (!email) {
      throw createError({ statusCode: 400, statusMessage: 'Por favor ingresa tu correo institucional.' })
    }
    if (!password) {
      throw createError({ statusCode: 400, statusMessage: 'Por favor ingresa tu contraseña.' })
    }

    const docente = docentes.find((d: any) => d.email && d.email.trim().toLowerCase() === email)

    if (!docente) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No existe un usuario docente con este correo. Por favor crea una cuenta primero.'
      })
    }

    if (docente.password && docente.password !== password) {
      throw createError({ statusCode: 401, statusMessage: 'Contraseña incorrecta. Por favor verifica tus credenciales.' })
    }

    return {
      success: true,
      message: `¡Bienvenido(a) Prof. ${docente.nombre}!`,
      user: {
        role: 'docente',
        id: docente.id,
        nombre: docente.nombre,
        email: docente.email,
        institucion: docente.institucion,
        codigo: docente.codigo
      },
      redirectTo: '/docente'
    }
  }

  throw createError({ statusCode: 400, statusMessage: 'Rol inválido. Debe ser estudiante o docente.' })
})
