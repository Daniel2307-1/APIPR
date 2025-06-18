import express from 'express';
import {obtenerProcesoPorId,crearProceso, actualizarProceso } from '../Controladores/procesoCtrl.js'

const router = express.Router();

router.get('/proceso/:id',obtenerProcesoPorId)
router.post('/procesoA/:id',crearProceso)
router.put('/procesoU/:id', actualizarProceso); 
export default router
