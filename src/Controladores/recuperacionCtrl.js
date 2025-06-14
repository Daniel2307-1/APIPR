import { sql } from '../bd.js';
import crypto from 'crypto';

export const crearRecuperacion = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    if (!id_usuario) {
      return res.status(400).json({ message: "Falta el ID del usuario" });
    }
    const codigo = crypto.randomInt(100000, 999999).toString();
    const fecha_creacion = new Date();
   await sql.query(
  `INSERT INTO recuperacion (id_usuario, codigo_de_recuperacion, fecha_envio) VALUES (?, ?, ?)`,
  [id_usuario, codigo, fecha_creacion]
);
    res.status(201).json({
      message: "Código de recuperación generado",
      codigo 
    });
  } catch (error) {
    console.error("Error en crearRecuperacion:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
export const verificarCodigo = async (req, res) => {
  try {
    const { id_usuario, codigo } = req.params;

    if (!id_usuario || !codigo) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `SELECT * FROM recuperacion WHERE id_usuario = ? AND codigo_de_recuperacion = ? ORDER BY fecha_envio DESC LIMIT 1`,
      [id_usuario, codigo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Código inválido" });
    }

    const registro = result[0];
    const fecha_creacion = new Date(registro.fecha_envio);
    const ahora = new Date();

    const diferencia = (ahora - fecha_creacion) / 1000; // Diferencia en segundos

    if (diferencia > 60) {
      return res.status(400).json({ message: "El código ha expirado" });
    }

    res.status(200).json({ message: "Código válido, procede con el cambio de contraseña" });
  } catch (error) {
    console.error("Error al verificar código:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
export const almacenarcodigoRecuperacion = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    if (!id_usuario) {
      return res.status(400).json({ message: "Falta el ID del usuario" });
    }

    const [result] = await sql.query(
      `SELECT codigo_de_recuperacion, fecha_envio 
       FROM recuperacion 
       WHERE id_usuario = ? 
       ORDER BY fecha_envio DESC 
       LIMIT 1`,
      [id_usuario]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontró un código para este usuario" });
    }

    res.status(200).json({
      codigo: result[0].codigo_de_recuperacion,
      fecha_envio: result[0].fecha_envio
    });

  } catch (error) {
    console.error("Error al obtener código de recuperación:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

