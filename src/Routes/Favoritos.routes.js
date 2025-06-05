import express from 'express';
import {obetenerdatosporusuario,postFavoritos,deleteFavorito} from '../Controladores/FavoritosCtrl.js'
const router = express.Router();
router.get('/favoritos/:id',obetenerdatosporusuario)
router.post('/favoritosA/',postFavoritos)
router.delete('/favoritosE/:id_usuario/:id_lenguaje', deleteFavorito);
export default router
