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
