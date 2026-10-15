// Para activar un contrato, cambia su nombre y pega el enlace de Power BI
// entre las comillas del tercer valor. Deja '' si el tablero aún no existe.
function contrato(numero, nombre, url = '', descripcion = 'Tablero de análisis de la Gerencia de Aguas y Gestión de Residuos') {
  return {
    id: `contrato-${String(numero).padStart(2, '0')}`,
    title: nombre,
    description: descripcion,
    url,
  };
}

window.REPORTS = [
  contrato(1, 'UAESP', 'https://app.powerbi.com/view?r=eyJrIjoiZGRiN2M4NWUtNDYyYi00ZDI3LWE4NzctNTBmNGFiYzcwZWQ2IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Recolección y gestión de residuos especiales; recuperación del espacio público.'),
  contrato(2, 'IDRD', 'https://app.powerbi.com/view?r=eyJrIjoiNDVkZjJhNmItMjhiOS00ZTI3LWJmYmQtMzEyYjIzYzU2NDQ2IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Limpieza y mantenimiento de predios de la Empresa de Renovación y Desarrollo Urbano de Bogotá.'),
  contrato(3, 'PTAR Salitre', 'https://app.powerbi.com/view?r=eyJrIjoiNGU3YTdkNTctODBmNi00ZmE3LTk1MTEtOThkMTliMWE3ZTA1IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Estudios, diseños y construcción de redes locales del tanque El Vínculo en Soacha.'),
  contrato(4, 'Desbuild Embajada', '', 'Transporte y disposición final de residuos.'),
  contrato(5, 'Alboreto', '', 'Gestión del servicio público domiciliario de agua potable de Aguas de Bogotá.'),
  contrato(6, 'Fondo de desarrollo Local de Suba', '', 'Restauración ecológica, renaturalización y mantenimiento del arbolado en Suba.'),
  contrato(7, 'RENOBO', ''),
  contrato(8, 'Soacha', ''),
  contrato(9, 'Soacha Gerenciamiento', '', 'Gerencia integral de obras de alcantarillado sanitario y pluvial.'),
  contrato(10, 'Fondo de Desarrollo Local de Teusaquillo', '', 'Educación ambiental, restauración ecológica y jardinería urbana en Teusaquillo.'),
  contrato(11, 'Apoyo Labores Red Troncal EAAB', '', 'Apoyo al mantenimiento de la red troncal de alcantarillado y recuperación del espacio público.'),
  contrato(12, 'Chapinero', '', 'Procesos ambientales, consumo responsable, separación en la fuente y reciclaje.'),
  contrato(13, 'Alcaldía de Soacha - Puntos Críticos', '', 'Recolección y disposición de residuos sólidos en puntos críticos de Soacha.'),
  contrato(14, 'Fondo de Desarrollo Local de La Candelaria', ''),
];
