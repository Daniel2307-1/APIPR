import express from 'express';
const router = express.Router();

router.post('/validar-codigo', async (req, res) => {
  const { codigo, lenguaje, id_reto } = req.body;

  if (!codigo || !lenguaje || !id_reto) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const resultados = await validarCodigoConJudge0(codigo, lenguaje, id_reto, sql); // sql: tu conexión MySQL

    const exito = resultados.every(r => r.correcto);

    res.json({ exito, resultados });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
