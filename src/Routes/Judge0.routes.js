import express from 'express';
const router = express.Router();

import { validarCodigo } from '../Controladores/Judge0Ctrl.js';

router.post('/validar-codigo', validarCodigo);

export default router;
