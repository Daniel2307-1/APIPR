import axios from 'axios';
import { obtenerIdLenguaje } from './obtenerIdLenguaje.js';

export async function validarCodigoConJudge0(codigo, lenguaje, id_reto, sql) {
  // Obtener casos de prueba
  const [casos] = await sql.query(
    'SELECT input_prueba, output_esperado FROM casos_pruebas WHERE id_reto = ?',
    [id_reto]
  );
  console.log('Casos originales:', casos);

  const resultados = [];

  for (const caso of casos) {
    // Limpiar dobles escapes "\n" => salto de línea real
    const inputLimpio = caso.input_prueba.replace(/\\n/g, '\n');
    const outputLimpio = caso.output_esperado.replace(/\\n/g, '\n');
    console.log('Input limpio:', JSON.stringify(inputLimpio));
    console.log('Output limpio:', JSON.stringify(outputLimpio));

    const body = {
      source_code: codigo,
      stdin: inputLimpio,
      language_id: obtenerIdLenguaje(lenguaje),
      expected_output: outputLimpio,
      base64_encoded: false,
    };

    try {
      const res = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        body,
        {
          headers: {
            'X-RapidAPI-Key': '2bcd298037mshbeda24207a6015bp1d54b1jsnddc92a616711',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Respuesta Judge0:', res.data);

      resultados.push({
        input: inputLimpio,
        output_esperado: outputLimpio,
        salida_usuario: res.data.stdout?.trim(),
        correcto: res.data.status.description === 'Accepted',
      });

    } catch (error) {
      console.error('Error Judge0:', error.response?.data || error.message);
      resultados.push({
        input: inputLimpio,
        output_esperado: outputLimpio,
        salida_usuario: null,
        correcto: false,
        error: error.message,
      });
    }
  }

  return resultados;
}
