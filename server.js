const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const Item = require('./models/Item') // Importar el modelo

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
// app.use(async (req, res, next) => {
//   await connectDB()
//   next()
// })

// Conexión a la Base de Datos con Fallback
let isConnected = false

const connectDB = async () => {
  if (isConnected) return

  // 1. Intento con MongoDB Atlas (Nube)
  try {
    console.log('⏳ Intentando conectar a MongoDB Atlas...')
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Si en 5s no hay internet, salta al catch
    })
    isConnected = db.connections[0].readyState
    console.log('✅ ¡Conectado a MongoDB Atlas (Nube)!')
  } catch (atlasError) {
    // 2. Si Atlas falla, intento con Compass (Local)
    console.warn('⚠️ Atlas falló. Intentando conectar a Compass (Local)...')

    try {
      const localDb = await mongoose.connect(process.env.MONGO_URI_COMPASS)
      isConnected = localDb.connections[0].readyState
      console.log('🏠 ¡Conectado a Base de Datos Local (Compass)!')
    } catch (localError) {
      console.error(
        '❌ Error crítico: No se pudo conectar ni a Atlas ni a Local.',
      )
      console.error('Detalle Local:', localError.message)
    }
  }
}

// Conexión a la Base de Datos
// let isConnected = false
// const connectDB = async () => {
//   if (isConnected) return
//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI)
//     isConnected = db.connections[0].readyState
//     console.log('¡Conectado a Base de Datos!')
//   } catch (error) {
//     console.error('Error conectando a Base de Datos: ', error.message)
//   }
// }

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ ¡Conectado a Base de Datos!'))
//   .catch((err) => {
//     console.error('❌ Error conectando a Base de Datos: ', err.message)
//   })

// Añade esto antes de tus rutas de /items
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'API de Práctica MERN funcionando',
    endpoints: ['/items'],
  })
})

// Obtener todos los items con Get
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find()
    res.json({ message: '¡Items obtenidos con éxito!', item: items })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los items' })
  }
})

// Obtener un solo item con Get
app.get('/items/:id', async (req, res) => {
  try {
    const id = req.params.id
    const item = await Item.findById(id)

    if (!item) {
      return res.status(404).json({ message: 'No se encontró el item' })
    }
    res.json({ message: '¡Item obtenido con éxito!', item: item })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el item' })
  }
})

// Crear un item con Post
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body)
    const savedItem = await newItem.save()
    res
      .status(201) // 201 porque "creamos" algo
      .json({ message: '¡Item creado con éxito!', item: savedItem })
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el item' })
  }
})

// Eliminar un item con Delete
app.delete('/items/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedItem = await Item.findByIdAndDelete(id)

    if (!deletedItem) {
      return res
        .status(404)
        .json({ message: 'No se encontró el item para eliminar' })
    }

    res.json({ message: '¡Item eliminado con éxito!', item: deletedItem })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar el item', error: error.message })
  }
})

// Actualizar un item con Put
app.put('/items/:id', async (req, res) => {
  const { id } = req.params

  // Si el ID no es válido para MongoDB, respondemos rápido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'El formato del ID no es válido' })
  }

  try {
    const { name, priority } = req.body // Los nuevos datos, ej.: el nuevo nombre

    // { new: true } sirve para que MongoDB nos devuelva el objeto YA actualizado
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, priority },
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedItem) {
      return res
        .status(404)
        .json({ message: 'No se encontró el item para actualizar' })
    }

    res.json({ message: '¡Item actualizado con éxito!', item: updatedItem })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error al actualizar el item', error: error.message })
  }
})

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`🚀 Servidor encendido en el puerto ${PORT}`)
// })

// module.exports = app

const PORT = process.env.PORT || 5000

// Nueva lógica de inicio
const startServer = async () => {
  try {
    // Intentamos conectar antes de abrir el puerto
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Servidor encendido en el puerto ${PORT}`)
    })
  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor debido a la BD', error)
  }
}

startServer()
