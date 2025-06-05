import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de favortios');
};
export const obetenerdatosporusuario = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await sql.query('SELECT *FROM favoritos WHERE id_usuario = ?', [id]);

    if (result.length <= 0) {
      return res.status(404).json({
        id: 0,
        message: "Favorito no encontrado"
      });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error al obtener el favorito:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const postFavoritos = async (req, res) => {
  try {
    const { id_usuario, id_lenguaje } = req.body;

    if (!id_usuario || !id_lenguaje) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO favoritos (id_usuario, id_lenguaje) VALUES (?, ?)`,
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
export const deleteFavorito = async (req, res) => {
  try {
    const { id_usuario, id_lenguaje } = req.params;

    const [result] = await sql.query(
      'DELETE FROM favoritos WHERE id_usuario = ? AND id_lenguaje = ?',
      [id_usuario, id_lenguaje]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Favorito no encontrado"
      });
    }

    res.json({
      message: "Favorito eliminado correctamente"
    });
  } catch (error) {
    console.error(error);
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


