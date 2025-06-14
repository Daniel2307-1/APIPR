import express from 'express';
import {obtenerNivelPorId} from '../Controladores/nivelesCtrl.js'

const router = express.Router();

router.get('/niveles/:id',obtenerNivelPorId)

export default router
