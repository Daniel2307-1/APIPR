import express from 'express';
import {obetenerdatos,obtenerlenguajeid} from '../Controladores/lenguajesCtrl.js'

const router = express.Router();
router.get('/lenguajes',obetenerdatos)
router.get('/lenguajes/:id',obtenerlenguajeid)

export default router
