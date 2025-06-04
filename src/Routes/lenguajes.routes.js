import express from 'express';
import {obetenerdatos} from '../Controladores/lenguajesCtrl.js'

const router = express.Router();
router.get('/lenguajes',obetenerdatos)

export default router
