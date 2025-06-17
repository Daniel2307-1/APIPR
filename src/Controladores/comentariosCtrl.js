import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de Comentarios');
};
export const insertarComentario = async (req, res) => {
  try {
    const { id_usuario, id_fragmento, id_lenguaje, comentario } = req.params;

    if (!id_usuario || !id_fragmento || !id_lenguaje || !comentario) {
      return res.status(400).json({ message: "Faltan parámetros obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO comentarios (id_usuario, id_fragmento, id_lenguaje, comentario) VALUES (?, ?, ?, ?)`,
      [id_usuario, id_fragmento, id_lenguaje, comentario]
    );

    res.status(201).json({
      id_comentarios: result.insertId,
      message: "Comentario insertado correctamente"
    });

  } catch (error) {
    console.error("Error insertando comentario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
export const actualizarComentario = async (req, res) => {
  try {
    const { id_comentarios, comentario } = req.params;

    if (!id_comentarios || !comentario) {
      return res.status(400).json({ message: "Faltan parámetros obligatorios" });
    }

    const [result] = await sql.query(
      `UPDATE comentarios SET comentario = ? WHERE id_comentarios = ?`,
      [comentario, id_comentarios]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.json({ message: "Comentario actualizado correctamente" });

  } catch (error) {
    console.error("Error actualizando comentario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
export const eliminarComentario = async (req, res) => {
  try {
    const { id_comentarios } = req.params;

    if (!id_comentarios) {
      return res.status(400).json({ message: "Falta el parámetro id_comentarios" });
    }

    const [result] = await sql.query(
      `DELETE FROM comentarios WHERE id_comentarios = ?`,
      [id_comentarios]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.json({ message: "Comentario eliminado correctamente" });

  } catch (error) {
    console.error("Error eliminando comentario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
export const obtenerComentariosPorFragmento = async (req, res) => {
  try {
    const { id_fragmento } = req.params;

    if (!id_fragmento) {
      return res.status(400).json({ message: "Falta el parámetro id_fragmento" });
    }

    const [result] = await sql.query(
      `SELECT * FROM comentarios WHERE id_fragmento = ? ORDER BY id_comentarios DESC`,
      [id_fragmento]
    );

    res.json({ data: result });

  } catch (error) {
    console.error("Error obteniendo comentarios:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
