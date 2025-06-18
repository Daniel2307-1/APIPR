import express from 'express';
import {obetenerrespuestaporusuario} from '../Controladores/respuestaCtrl.js'
const router = express.Router();
router.get('/respuestaRp/:id',obetenerrespuestaporusuario)
export default router
