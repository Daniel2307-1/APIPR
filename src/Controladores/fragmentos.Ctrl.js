import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de fragmentos');
};
export const obtenerfragmentosxid = async (req, res) => {
    try {
        const ID = req.params.id;
        const [result] = await sql.query('select * from productos where prod_id=?', [ID]);
        if (result.length <= 0) return res.status(400).json({
            cli_id: 0,
            message: "producto no encontrado"
        });
        res.json(result[0]);
    } catch {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
