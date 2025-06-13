import express from 'express';
import { crearRecuperacion, verificarCodigo } from '../Controladores/recuperacionCtrl.js';

const router = express.Router();

// Ruta para crear un código de recuperación
router.post('/recuperacion/:id_usuario', crearRecuperacion);

// Ruta para verificar el código de recuperación
router.post('/recuperacion/verificar', verificarCodigo);

export default router;
