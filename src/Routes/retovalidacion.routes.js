import express from 'express';
import { validarCodigo } from '../Controladores/retovalidacionCtrl.js';

const router = express.Router();

router.post('/validar-codigo', validarCodigo);

export default router;
