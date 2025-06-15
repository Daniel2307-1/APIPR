import express from 'express';
import {obtenerProcesoPorId,crearProceso } from '../Controladores/procesoCtrl.js'

const router = express.Router();

router.get('/proceso/:id',obtenerProcesoPorId)
router.get('/procesoA/:id_usuario',crearProceso)
   
export default router
