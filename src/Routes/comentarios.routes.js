import express from 'express';
import {insertarComentario,actualizarComentario,eliminarComentario,obtenerComentariosPorFragmento} from '../Controladores/comentariosCtrl.js';

const router = express.Router();

router.get('/comentariosF/:id_fragmento', obtenerComentariosPorFragmento);
router.post('/comentariosA', insertarComentario);
router.put('/comentarios/:id_comentarios/:comentario', actualizarComentario);
router.delete('/comentarios/:id_comentarios', eliminarComentario);

export default router;
