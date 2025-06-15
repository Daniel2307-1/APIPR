import express from 'express';
import {obtenerRetosActivos ,obtenerRetos} from '../Controladores/retosCtrl.js'

const router = express.Router();

router.get('/retos/activos', obtenerRetosActivos);
router.get('/retos/',obtenerRetos)
export default router
