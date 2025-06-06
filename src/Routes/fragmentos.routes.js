import express from 'express';
import {obtenerfragmentosxid} from '../Controladores/fragmentosCtrl.js'

const router = express.Router();

router.get('/fragmentos/:id',obtenerfragmentosxid)

export default router
