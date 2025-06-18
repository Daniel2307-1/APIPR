import OpenAI from 'openai';

export async function validarCodigo(req, res) {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return res.status(500).json({ error: 'API key no configurada' });
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey
    });

    const { codigo, titulo, descripcion, lenguaje } = req.body;

    const prompt = `Este es el reto: ${titulo}\nDescripción: ${descripcion}\nVerifica si este código cumple con el reto:\n${codigo}\nSolo responde "Correcto" o "Incorrecto".`;
      console.log('PROMPT ENVIADO A OPENAI:\n', prompt);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    const respuesta = completion.choices[0].message.content.trim();

    res.json({ resultado: respuesta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la validación' });
  }
}
