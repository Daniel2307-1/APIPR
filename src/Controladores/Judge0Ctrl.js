// src/controllers/Judge0Ctrl.js
import { db as sql } from '../db.js';
import { validarCodigoConJudge0 } from '../Controladores/validateJudge0.js';
// Asegúrate de que el nombre del fichero que exporta `validarCodigoConJudge0` esté bien

export async function validarCodigo(req, res) {
  const { codigo, lenguaje, id_reto } = req.body;

  if (!codigo || !lenguaje || !id_reto) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const resultados = await validarCodigoConJudge0(codigo, lenguaje, id_reto, sql);
    const exito = resultados.every(r => r.correcto);

    res.json({ exito, resultados });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

