import axios from 'axios';
import { obtenerIdLenguaje } from './obtenerIdLenguaje.js';

export async function validarCodigoConJudge0(codigo, lenguaje, id_reto, sql) {
  // Obtener casos de prueba
  const [casos] = await sql.query(
    'SELECT input_prueba, output_esperado FROM casos_pruebas WHERE id_reto = ?',
    [id_reto]
  );
  if (casos.length === 0) {
  console.error(`No se encontraron casos de prueba para el reto ${id_reto}.`);
  return []; // o lanza un error si así lo deseas
}
  console.log('casos!', casos);
  const resultados = [];

  for (const caso of casos) {
    const body = {
      source_code: codigo,
    stdin: caso.input_prueba.replace(/\\n/g, '\n'), // <- aquí
      language_id: obtenerIdLenguaje(lenguaje),
    expected_output: caso.output_esperado.trim(), // opcional
      // para no codificar base64
      base64_encoded: false
    };

    try {
      const res = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        body,
        {
          headers: {
            'X-RapidAPI-Key': '2bcd298037mshbeda24207a6015bp1d54b1jsnddc92a616711',
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
       console.error(error);
  console.error(error.response?.data);
  
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
