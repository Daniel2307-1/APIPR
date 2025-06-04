import express from 'express';
import {obetenerdatos,obetenerdatosA,postUsuarios} from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuarios',obetenerdatos)
router.get('/usuariosA/:usuario/:clave', obetenerdatosA);
router.post('/usuariosG/',postUsuarios)
export default router;
