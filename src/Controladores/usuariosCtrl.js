import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de usuarios');
};

export const obetenerdatos = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM usuarios');
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
export const obetenerdatosA = async (req, res) => {
  const { usuario, clave } = req.params;
  try {
    let [result] = await sql.query(
      'SELECT * FROM usuarios WHERE alias = ? AND contrasena = ? LIMIT 1',
      [usuario, clave]
    );
    if (result.length === 0) {
      [result] = await sql.query(
        'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ? LIMIT 1',
        [usuario, clave]
      );
    }
    if (result.length > 0) {
      const usuarioData = result[0];

      res.json({
        success: true,
        usuario: usuarioData
      });
    } else {
      res.json({
        success: false,
        message: 'Usuario, correo o clave incorrectos'
      });
    }
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message
    });
  }
};
export const postUsuarios = async (req, res) => {
  try {
    const {
      alias,
      nombre,
      apellido,
      correo,
      contrasena,
      fecha_registro,
      estado,
      foto
    } = req.body;

    if (!alias || !nombre || !apellido || !correo || !contrasena || estado === undefined) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO usuarios 
      (alias, nombre, apellido, correo, contrasena, fecha_registro, estado, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [alias, nombre, apellido, correo, contrasena, fecha_registro, estado, foto]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Usuario registrado con éxito"
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
