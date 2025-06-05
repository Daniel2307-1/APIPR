import express from 'express';
import {obetenerdatosporusuario,postLike,deleteLike} from '../Controladores/LikeCtrl.js'
const router = express.Router();
router.get('/like/:id',obetenerdatosporusuario)
router.post('/likeA/',postLike)
router.delete('/likeE/:id_usuario/:id_lenguaje', deleteLike);

export default router
