import express from 'express';
const router = express.Router();

import { validarCodigo } from '../controllers/Judge0Ctrl.js';

router.post('/validar-codigo', validarCodigo);

export default router;
