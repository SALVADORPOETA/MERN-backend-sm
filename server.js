const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const Item = require('./models/Item') // Importar el modelo

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(async (req, res, next) => {
  await connectDB()
  next()
})

// Conexión a la Base de Datos
let isConnected = false
const connectDB = async () => {
  if (isConnected) return
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    isConnected = db.connections[0].readyState
    console.log('¡Conectado a Base de Datos!')
  } catch (error) {
    console.error('Error conectando a Base de Datos: ', error.message)
  }
}

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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Servidor encendido en el puerto ${PORT}`)
})

module.exports = app
