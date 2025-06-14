import express from 'express';
import { crearRecuperacion, verificarCodigo,almacenarcodigoRecuperacion} from '../Controladores/recuperacionCtrl.js';

const router = express.Router();

router.post('/recuperacion/:id_usuario', crearRecuperacion);
router.post('/recuperacion/verificar', verificarCodigo);
router.get('/recuperacion/:id_usuario/:codigo', almacenarcodigoRecuperacion);

export default router;
