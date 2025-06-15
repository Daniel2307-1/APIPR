import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de lenguajes');
};

export const obetenerdatos = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM lenguajesP');
        res.json({ cant: result.length, data: result });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            error: {
                message: error.message,
                code: error.code,
                stack: error.stack
            }
        });
    }
};
export const obtenerlenguajeid = async (req, res) => {
  try {
    const ID = req.params.id;
    const [result] = await sql.query('SELECT * FROM lenguajesP WHERE id_lenguaje = ?', [ID]);

    if (result.length <= 0) {
      return res.status(400).json({
        cli_id: 0,
        message: "lenguaje no encontrado"
      });
    }
    res.json({ cant: result.length, data: result });
  } catch {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
