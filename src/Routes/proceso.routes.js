import express from 'express';
import {obtenerProcesoPorId} from '../Controladores/procesoCtrl.js'

const router = express.Router();

router.get('/proceso/:id',obtenerProcesoPorId)

export default router
