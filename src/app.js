import express from 'express'
import cors from 'cors'
import usuarioRoutes from './Routes/usuarios.routes.js'
import lenguajesRoutes from './Routes/lenguajes.routes.js'
import FavoritosRoutes from './Routes/Favoritos.routes.js'
import LikesRoutes from './Routes/Like.routes.js'
import fragmentosRoutes from './Routes/fragmentos.routes.js'
import recuperacionRoutes from './Routes/recuperacion.routes.js'
import nivelesRoutes from './Routes/niveles.routes.js'
import retosRoutes from './Routes/retos.routes.js'
import rangoRoutes from './Routes/rango.routes.js'
import procesoRoutes from './Routes/proceso.routes.js'
import comentariosRoutes from './Routes/comentarios.routes.js'

import mailRoutes from './Routes/mail.routes.js'


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
app.use('/api', recuperacionRoutes)
app.use('/api', nivelesRoutes)
app.use('/api', recuperacionRoutes)
app.use('/api', retosRoutes)
app.use('/api', rangoRoutes)
app.use('/api', procesoRoutes)
app.use('/api', comentariosRoutes)
app.use('/api', mailRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'PÁGINA NO ENCONTRADA'
  })
})

export default app;
