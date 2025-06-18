import { sql } from '../bd.js';

// Mensaje de prueba
export const enviarmensajedebasededatosU = (req, res) => {
    res.send('Lista de retos de usuarios');
};

// Obtener todos los retos subidos por usuarios
export const obtenerRetosUsuarios = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM retosU');

        if (result.length <= 0) {
            return res.status(400).json({
                message: "No hay retos subidos por usuarios"
            });
        }

        res.json({ cant: result.length, data: result });
    } catch (error) {
        console.error('Error al obtener los retos de usuarios:', error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

// Obtener un reto específico por ID
export const obtenerRetoUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await sql.query('SELECT * FROM retosU WHERE id_reto = ?', [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Reto no encontrado" });
        }

        res.json({ data: result[0] });
    } catch (error) {
        console.error('Error al obtener el reto por ID:', error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

// Crear un nuevo reto
export const crearRetoUsuario = async (req, res) => {
    try {
        const { id_usuario, titulo, descripcion, id_lenguaje, id_nivel, puntos } = req.body;

        if (!id_usuario || !titulo || !descripcion || !id_lenguaje || !id_nivel || puntos == null) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos' });
        }

        const [resultado] = await sql.query(
            'INSERT INTO retosU (id_usuario, titulo, descripcion, id_lenguaje, id_nivel, puntos) VALUES (?, ?, ?, ?, ?, ?)',
            [id_usuario, titulo, descripcion, id_lenguaje, id_nivel, puntos]
        );

        res.status(201).json({
            message: 'Reto creado correctamente',
            id_reto: resultado.insertId
        });
    } catch (error) {
        console.error('Error al crear el reto:', error);
        res.status(500).json({ message: 'Error al crear el reto' });
    }
};

// Actualizar un reto existente
export const actualizarRetoUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, descripcion, id_lenguaje, id_nivel, puntos } = req.body;

        const [result] = await sql.query(
            'UPDATE retosU SET titulo = ?, descripcion = ?, id_lenguaje = ?, id_nivel = ?, puntos = ? WHERE id_reto = ?',
            [titulo, descripcion, id_lenguaje, id_nivel, puntos, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reto no encontrado' });
        }

        res.json({ message: 'Reto actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el reto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar un reto (opcional)
export const eliminarRetoUsuario = async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await sql.query('DELETE FROM retosU WHERE id_reto = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reto no encontrado' });
        }

        res.json({ message: 'Reto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el reto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
