import express from 'express'
import cors from 'cors'
import usuarioRoutes from './Routes/usuarios.routes.js'
import lenguajesRoutes from './Routes/lenguajes.routes.js'
import FavoritosRoutes from './Routes/Favoritos.routes.js'
import LikesRoutes from './Routes/Like.routes.js'
import fragmentosRoutes from './Routes/fragmentos.routes.js'

const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', usuarioRoutes)
app.use('/api', lenguajesRoutes)
app.use('/api', FavoritosRoutes)
app.use('/api', LikesRoutes)
app.use('/api', fragmentosRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'PÁGINA NO ENCONTRADA'
  })
})

export default app;
