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
export const crearRespuesta = async (req, res) => {
  try {
    const { id_usuario, id_reto, codigo_subido } = req.params;

    if (!id_usuario || !id_reto || !codigo_subido) {
      return res.status(400).json({ message: "Faltan parámetros en la URL" });
    }

    const [result] = await sql.query(
      'INSERT INTO respuesta (id_usuario, id_reto, codigo_subido, resultado, fecha_respuesta) VALUES (?, ?, ?, "C", NOW())',
      [id_usuario, id_reto, codigo_subido]
    );

    res.status(201).json({
      message: "Respuesta creada correctamente",
      id_respuesta: result.insertId
    });
  } catch (error) {
    console.error("Error al crear respuesta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
