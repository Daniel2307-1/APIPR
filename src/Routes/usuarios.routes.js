import express from 'express';
import {obetenerdatos} from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuarios',obetenerdatos)
export default router;
