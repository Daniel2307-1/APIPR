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
export const putUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      alias,
      nombre,
      apellido,
      correo,
      contrasena,
      estado,
      foto
    } = req.body;

    // Validar campos mínimos necesarios
    if (!alias || !nombre || !apellido || !correo || estado === undefined) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `UPDATE usuarios 
       SET alias = ?, nombre = ?, apellido = ?, correo = ?, contrasena = ?, estado = ?, foto = ?
       WHERE id = ?`,
      [alias, nombre, apellido, correo, contrasena, estado, foto, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [updatedUser] = await sql.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    res.json({
      message: "Usuario actualizado correctamente",
      usuario: updatedUser[0]
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
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
export const verificarCorreo = async (req, res) => {
  const { correo } = req.params;

  if (!correo) {
    return res.status(400).json({ message: "Falta el parámetro 'correo'" });
  }

  try {
    const [result] = await sql.query(
      'SELECT *FROM usuarios WHERE correo = ? LIMIT 1',
      [correo]
    );

    if (result.length > 0) {
      // Retorna que existe y además los datos del usuario
      return res.json({ existe: true, usuario: result[0] });
    } else {
      return res.json({ existe: false });
    }

  } catch (error) {
    console.error('Error al verificar correo:', error);
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
export const actualizarContrasena = async (req, res) => {
  const { id, clave } = req.params;

  if (!id || !clave) {
    return res.status(400).json({ message: "Faltan parámetros: id o clave" });
  }

  try {
    const [result] = await sql.query(
      'UPDATE usuarios SET contrasena = ? WHERE id = ?',
      [clave, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
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



