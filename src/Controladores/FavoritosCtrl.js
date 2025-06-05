import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de favortios');
};
export const obetenerdatosporusuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [result] = await sql.query(
      'SELECT * FROM Favoritos WHERE id_usuario = ?',
      [id_usuario]
    );

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
export const postFavoritos = async (req, res) => {
  try {
    const { id_usuario, id_lenguaje } = req.body;

    if (!id_usuario || !id_lenguaje) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO Favoritos (id_usuario, id_lenguaje) VALUES (?, ?)`,
      [id_usuario, id_lenguaje]
    );

    res.status(201).json({
      id_favorito: result.insertId,
      message: "Lenguaje añadido a favoritos"
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

