import express from 'express';
import {obetenerrespuestaporusuario,crearRespuesta} from '../Controladores/respuestaCtrl.js'
const router = express.Router();
router.get('/respuestaRp/:id',obetenerrespuestaporusuario)
router.post('/respuesta/:id_usuario/:id_reto', crearRespuesta);

export default router
