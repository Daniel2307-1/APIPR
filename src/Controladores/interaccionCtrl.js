import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de like');
};

export const postInteraccion = async (req, res) => {
  try {
    const { id_usuario, id_fragmento, tipo } = req.body;

    if (!id_usuario || !id_fragmento || !tipo) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO interaccion (id_usuario, id_fragmento, tipo) VALUES (?, ?, ?)`,
      [id_usuario, id_fragmento, tipo]
    );

    res.status(201).json({
      id_interaccion: result.insertId,
      message: "Interacción registrada correctamente"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      }
    });
  }
};
export const deleteInteraccion = async (req, res) => {
  try {
    const { id_usuario, id_fragmento, tipo } = req.params;

    const [result] = await sql.query(
      `DELETE FROM interaccion WHERE id_usuario = ? AND id_fragmento = ? AND tipo = ?`,
      [id_usuario, id_fragmento, tipo]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Interacción no encontrada"
      });
    }

    res.json({
      message: "Interacción eliminada correctamente"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      }
    });
  }
};
export const obtenerInteraccionesPorUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id;

    const [result] = await sql.query(
      `SELECT * FROM interaccion WHERE id_fragmento = ?`,
      [id_usuario]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "No se encontraron interacciones"
      });
    }

    res.json({
      cant: result.length,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      }
    });
  }
};
