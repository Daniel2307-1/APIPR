import express from 'express';
import {obtenerRangoPorId} from '../Controladores/rangoCtrl.js'

const router = express.Router();

router.get('/rango/:id',obtenerRangoPorId)

export default router
