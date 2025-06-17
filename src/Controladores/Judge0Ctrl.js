// src/controllers/Judge0Ctrl.js
import { sql } from '../bd.js';
import { validarCodigoConJudge0 } from '../Controladores/validateJudge0.js';
// Asegúrate de que el nombre del fichero que exporta `validarCodigoConJudge0` esté bien

export async function validarCodigo(req, res) {
  console.log('Validar código - req.body:', req.body);

  const { codigo, lenguaje, id_reto } = req.body;

  if (!codigo || !lenguaje || !id_reto) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const resultados = await validarCodigoConJudge0(codigo, lenguaje, id_reto, sql);
    console.log('Resultados:', resultados);
    const exito = resultados.every(r => r.correcto);
    res.json({ exito, resultados });
  } catch (error) {
    console.error('Error en validarCodigo:', error);
    res.status(500).json({ error: error.message });
  }
}


