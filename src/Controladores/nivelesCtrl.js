import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de niveles');
};
export const obtenerNivelPorId = async (req, res) => {
  try {
    const ID = req.params.id;
    const [result] = await sql.query('SELECT * FROM nivel WHERE id_nivel = ?', [ID]);

    if (result.length <= 0) {
      return res.status(400).json({
        cli_id: 0,
        message: "Nivel no encontrado"
      });
    }
    res.json({ cant: result.length, data: result });
  } catch {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
