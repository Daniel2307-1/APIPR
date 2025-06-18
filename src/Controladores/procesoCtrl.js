import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de proceso');
};
export const obtenerProcesoPorId = async (req, res) => {
  try {
    const ID = req.params.id;
    const [result] = await sql.query('SELECT * FROM proceso WHERE id_usuario = ?', [ID]);

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
    const id= req.params.id;

    if (!id) {
      return res.status(400).json({ message: 'Falta el id_usuario' });
    }

    const [resultado] = await sql.query(
      'INSERT INTO proceso (id_usuario, puntaje, id_rango) VALUES (?, ?, ?)',
      [id, 1, 1]
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
export const actualizarProceso = async (req, res) => {
  try {
    const id_usuario = req.params.id;
    const { puntosGanados } = req.body;

    if (!id_usuario || puntosGanados == null) {
      return res.status(400).json({ message: 'Faltan parámetros requeridos' });
    }

    // Obtener proceso actual
    const [procesoResult] = await sql.query(
      'SELECT * FROM proceso WHERE id_usuario = ?',
      [id_usuario]
    );

    if (procesoResult.length === 0) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }

    const proceso = procesoResult[0];
    const nuevoPuntaje = proceso.puntaje + puntosGanados;

    // Obtener el nuevo rango según el nuevo puntaje
    const [rangoResult] = await sql.query(
      'SELECT id_rango FROM rango WHERE ? BETWEEN puntaje_min AND puntaje_max LIMIT 1',
      [nuevoPuntaje]
    );

    if (rangoResult.length === 0) {
      return res.status(400).json({ message: 'No se encontró un rango para ese puntaje' });
    }

    const nuevoRango = rangoResult[0].id_rango;

    // Actualizar proceso con nuevo puntaje y rango
    await sql.query(
      'UPDATE proceso SET puntaje = ?, id_rango = ? WHERE id_usuario = ?',
      [nuevoPuntaje, nuevoRango, id_usuario]
    );

    res.json({
      message: 'Proceso actualizado correctamente',
      puntaje: nuevoPuntaje,
      id_rango: nuevoRango
    });
  } catch (error) {
    console.error('Error al actualizar proceso:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
