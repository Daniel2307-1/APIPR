import express from 'express';
import {obetenerdatos,obetenerdatosA} from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuarios',obetenerdatos)
router.get('/usuariosA/:usuario/:clave', obetenerdatosA);

export default router;
