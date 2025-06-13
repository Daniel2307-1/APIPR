import express from 'express';
import {obtenerfragmentosxid,postFragmento} from '../Controladores/fragmentosCtrl.js'

const router = express.Router();

router.get('/fragmentos/:id',obtenerfragmentosxid)
router.post('/fragmentosA/',postFragmento)
export default router
