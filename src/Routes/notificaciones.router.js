import express from 'express';
import {obtenerNotificacionesPorUsuario,crearNotificacion,marcarNotificacionLeida,eliminarNotificacion
} from '../controllers/notificacionesCtrl.js';
const router = express.Router();
router.get('/notificaciones/usuario/:id', obtenerNotificacionesPorUsuario);
router.post('/notificaciones', crearNotificacion);
router.put('/notificaciones/:id/leido', marcarNotificacionLeida);
router.delete('/notificaciones/:id', eliminarNotificacion);

export default router
