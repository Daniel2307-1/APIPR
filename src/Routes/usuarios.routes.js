import express from 'express';
import {obetenerdatos,obetenerdatosA,postUsuarios,putUsuarios} from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuarios',obetenerdatos)
router.get('/usuariosA/:usuario/:clave', obetenerdatosA);
router.post('/usuariosG/',postUsuarios)
router.put('/usuarioA/:id',putUsuarios)
export default router;
