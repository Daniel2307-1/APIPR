import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de retos');
};
export const obtenerRetosActivos = async (req, res) => {
  try {
    const [result] = await sql.query('SELECT * FROM retos WHERE estado = ?', ['A']);

    if (result.length <= 0) {
      return res.status(400).json({
        cli_id: 0,
        message: "No hay retos activos"
      });
    }

    res.json({ cant: result.length, data: result });
  } catch {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const obtenerRetos = async (req, res) => {
  try {
    const [result] = await sql.query('SELECT * FROM retos ');

    if (result.length <= 0) {
      return res.status(400).json({
        cli_id: 0,
        message: "No hay retos activos"
      });
    }

    res.json({ cant: result.length, data: result });
  } catch {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

