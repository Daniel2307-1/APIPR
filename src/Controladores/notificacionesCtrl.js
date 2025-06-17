import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de notificaciones');
};
export const obtenerNotificacionesPorUsuario = async (req, res) => {
  try {
    const id_usuario_destino = req.params.id;

    const [result] = await sql.query(
      'SELECT * FROM notificaciones WHERE id_usuario_destino = ? ORDER BY fecha DESC',
      [id_usuario_destino]
    );

    res.json({
      cant: result.length,
      data: result
    });

  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearNotificacion = async (req, res) => {
  try {
    const { id_usuario_destino, id_usuario_origen, tipo, mensaje, fecha } = req.body;

    if (!id_usuario_destino || !id_usuario_origen || !tipo || !mensaje || !fecha) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO notificaciones 
      (id_usuario_destino, id_usuario_origen, tipo, mensaje, fecha, leido) 
      VALUES (?, ?, ?, ?, ?, 0)`,
      [id_usuario_destino, id_usuario_origen, tipo, mensaje, fecha]
    );

    res.status(201).json({
      id_notificacion: result.insertId,
      message: "Notificación creada correctamente"
    });

  } catch (error) {
    console.error("Error al crear notificación:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const marcarNotificacionLeida = async (req, res) => {
  try {
    const id_notificacion = req.params.id;

    const [result] = await sql.query(
      'UPDATE notificaciones SET leido = 1 WHERE id_notificaciones = ?',
      [id_notificacion]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.json({ message: "Notificación marcada como leída" });

  } catch (error) {
    console.error("Error al actualizar notificación:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const eliminarNotificacion = async (req, res) => {
  try {
    const id_notificacion = req.params.id;

    const [result] = await sql.query(
      'DELETE FROM notificaciones WHERE id_notificaciones = ?',
      [id_notificacion]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.json({ message: "Notificación eliminada correctamente" });

  } catch (error) {
    console.error("Error al eliminar notificación:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
