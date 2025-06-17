import axios from 'axios';

async function validarCodigoConJudge0(codigo: string, lenguaje: string, id_reto: number, sql: any) {
  // Obtener casos de prueba
  const [casos] = await sql.query(
    'SELECT input_prueba, output_esperado FROM casos_prueba WHERE id_reto = ?',
    [id_reto]
  );

  const resultados = [];

  for (const caso of casos) {
    const body = {
      source_code: codigo,
      stdin: caso.input_prueba,
      language_id: obtenerIdLenguaje(lenguaje),
      expected_output: caso.output_esperado,
      // para no codificar base64
      base64_encoded: false
    };

    try {
      const res = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        body,
        {
          headers: {
            'X-RapidAPI-Key': 'TU_API_KEY_DE_RAPIDAPI',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
          }
        }
      );

      resultados.push({
        input: caso.input_prueba,
        output_esperado: caso.output_esperado,
        salida_usuario: res.data.stdout?.trim(),
        correcto: res.data.status.description === 'Accepted'
      });

    } catch (error) {
      resultados.push({
        input: caso.input_prueba,
        output_esperado: caso.output_esperado,
        salida_usuario: null,
        correcto: false,
        error: error.message
      });
    }
  }

  return resultados;
}
