function obtenerIdLenguaje(lenguaje) {
  if (lenguaje.toLowerCase() === 'javascript') return 63;
  if (lenguaje.toLowerCase() === 'python') return 71;
  if (lenguaje.toLowerCase() === 'cpp') return 54;
  if (lenguaje.toLowerCase() === 'java') return 62;

  // Por defecto
  return 71; // Por ejemplo, Python
}

export { obtenerIdLenguaje };
