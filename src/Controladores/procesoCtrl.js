import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de proceso');
};
export const obtenerProcesoPorId = async (req, res) => {
  try {
    const ID = req.params.id;
    const [result] = await sql.query('SELECT * FROM proceso WHERE id_proceso = ?', [ID]);

    if (result.length <= 0) {
      return res.status(400).json({
        cli_id: 0,
        message: "Proceso no encontrado"
      });
    }
    res.json({ cant: result.length, data: result });
  } catch {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearProceso = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;

    if (!id_usuario) {
      return res.status(400).json({ message: 'Falta el id_usuario' });
    }

    const [resultado] = await sql.query(
      'INSERT INTO proceso (id_usuario, puntaje, id_rango) VALUES (?, ?, ?)',
      [id_usuario, 0, 1]
    );

    res.status(201).json({
      message: 'Proceso creado correctamente',
      id_proceso: resultado.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el proceso' });
  }
};
