import express from 'express';
import {obtenerNivelPorId,obtenerNiveles} from '../Controladores/nivelesCtrl.js'

const router = express.Router();

router.get('/niveles/:id',obtenerNivelPorId)
router.get('/niveles/',obtenerNiveles)

export default router
