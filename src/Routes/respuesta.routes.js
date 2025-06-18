import express from 'express';
import {obetenerrespuestaporusuario,obetenerrespuestaporusuario2,crearRespuesta} from '../Controladores/respuestaCtrl.js'
const router = express.Router();
router.get('/respuestaRp/:id',obetenerrespuestaporusuario)
router.get('/respuestaRp2/:id',obetenerrespuestaporusuario2)
router.post('/respuesta/:id_usuario/:id_reto', crearRespuesta);

export default router
