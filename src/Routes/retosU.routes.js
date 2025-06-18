import express from 'express';
import {
    enviarmensajedebasededatosU,
    obtenerRetosUsuarios,
    obtenerRetoUsuarioPorId,
    crearRetoUsuario,
    actualizarRetoUsuario,
    eliminarRetoUsuario
} from '../Controladores/retosUCrtl.js';

const router = express.Router();

router.get('/retosU', obtenerRetosUsuarios);
router.get('/retosU/:id', obtenerRetoUsuarioPorId);
router.post('/retosU', crearRetoUsuario);
router.put('/retosU/:id', actualizarRetoUsuario);
router.delete('/retosU/:id', eliminarRetoUsuario);

export default router;
