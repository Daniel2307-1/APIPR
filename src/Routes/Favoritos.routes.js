import express from 'express';
import {obetenerdatosporusuario } from '../Controladores/FavoritosCtrl.js'
const router = express.Router();
router.get('/favoritos/:id',obetenerdatosporusuario)
export default router
