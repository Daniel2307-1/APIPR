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
