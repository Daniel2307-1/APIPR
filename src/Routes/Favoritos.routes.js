import express from 'express';
import {obetenerdatosporusuario,postFavoritos } from '../Controladores/FavoritosCtrl.js'
const router = express.Router();
router.get('/favoritos/:id',obetenerdatosporusuario)
router.post('/favoritosA/',postFavoritos)

export default router
