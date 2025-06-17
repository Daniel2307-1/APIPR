import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de fragmentos');
};
export const obtenerfragmentosxid = async (req, res) => {
    try {
        const ID = req.params.id;
        const [result] = await sql.query('select * from fragmentos where id_lenguaje=?', [ID]);
        if (result.length <= 0) return res.status(400).json({
            cli_id: 0,
            message: "fragmento no encontrado"
        });
        res.json({ cant: result.length, data: result });
    } catch {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
export const putFragmento = async (req, res) => {
  try {
    const id = req.params.id;
    const { id_lenguaje, descripcion, codigo } = req.body;

    if (!id_lenguaje || !descripcion || !codigo) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Verifica si existe el fragmento
    const [existing] = await sql.query('SELECT * FROM fragmentos WHERE id_fragmento = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Fragmento no encontrado" });
    }

    // Ejecuta la actualización
    await sql.query(
      `UPDATE fragmentos SET id_lenguaje = ?, descripcion = ?, codigo = ? WHERE id_fragmento = ?`,
      [id_lenguaje, descripcion, codigo, id]
    );

    res.json({ message: "Fragmento actualizado con éxito" });
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
export const postFragmento = async (req, res) => {
  try {
    const { id_lenguaje, descripcion, codigo, id_usuario } = req.body;

    // Validación de campos obligatorios
    if (!id_lenguaje || !descripcion || !codigo || !id_usuario) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Inserción en la base de datos
    const [result] = await sql.query(
      `INSERT INTO fragmentos (id_lenguaje, descripcion, codigo, id_usuario)
       VALUES (?, ?, ?, ?)`,
      [id_lenguaje, descripcion, codigo, id_usuario]
    );

    res.status(201).json({
      id_fragmento: result.insertId,
      message: "Fragmento insertado con éxito"
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


