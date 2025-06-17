import express from 'express';
import { obtenerInteraccionesPorUsuario,postInteraccion,deleteInteraccion } from '../Controladores/interaccionCtrl.js'; 

const router = express.Router();
router.get('/interaccion/:id', obtenerInteraccionesPorUsuario);
router.post('/interaccionA', postInteraccion);
router.delete('/interaccionE/:id_usuario/:id_fragmento/:tipo', deleteInteraccion);

export default router;
