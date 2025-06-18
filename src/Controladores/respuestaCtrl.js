import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de respuesta');
};
export const obetenerrespuestaporusuario = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await sql.query('SELECT *FROM respuesta WHERE id_usuario = ?', [id]);

    if (result.length <= 0) {
      return res.status(404).json({
        id: 0,
        message: "respuesta no encontrado"
      });
    }

 res.json({ cant: result.length, data: result });
  } catch (error) {
    console.error("Error al obtener el respuesta:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
