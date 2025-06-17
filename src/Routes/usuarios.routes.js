import express from 'express';
import {obetenerdatos,obetenerdatosA,postUsuarios,putUsuarios,verificarCorreo,actualizarContrasena,obtenerUsuarioPorId} from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuarios',obetenerdatos)
router.get('/usuariosA/:usuario/:clave', obetenerdatosA);
router.post('/usuariosG/',postUsuarios)
router.put('/usuarioA/:id',putUsuarios)
router.get('/usuariosC/:correo', verificarCorreo);
router.put('/usuarios/clave/:id/:clave', actualizarContrasena);

router.get('/usuariosR/:id', obtenerUsuarioPorId);
export default router;
