// Para activar un contrato, cambia su nombre y pega el enlace de Power BI
// entre las comillas del tercer valor. Deja '' si el tablero aún no existe.
function contrato(numero, nombre, url = '', descripcion = 'Tablero de análisis de la Gerencia de Gestión de Residuos') {
  return {
    id: `contrato-${String(numero).padStart(2, '0')}`,
    title: nombre,
    description: descripcion,
    url,
  };
}

window.REPORTS = [
  contrato(1, 'Contrato CL 457-2025 UAESP', 'https://app.powerbi.com/view?r=eyJrIjoiZGRiN2M4NWUtNDYyYi00ZDI3LWE4NzctNTBmNGFiYzcwZWQ2IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Recolección y gestión de residuos especiales; recuperación del espacio público.'),
  contrato(2, 'Contrato 469-2024', '', 'Limpieza y mantenimiento de predios de la Empresa de Renovación y Desarrollo Urbano de Bogotá.'),
  contrato(3, 'Contrato 1668-2024', '', 'Apoyo al mantenimiento de la red troncal de alcantarillado y recuperación del espacio público.'),
  contrato(4, 'Contrato 2949-2024', '', 'Gerencia integral de obras de alcantarillado sanitario y pluvial.'),
  contrato(5, 'Contrato 185-2025', '', 'Transporte y disposición final de residuos.'),
  contrato(6, 'Contrato 306-2025', '', 'Procesos ambientales, consumo responsable, separación en la fuente y reciclaje.'),
  contrato(7, 'Contrato 384-2025', '', 'Educación ambiental, restauración ecológica y jardinería urbana en Teusaquillo.'),
  contrato(8, 'Contrato 736-2025', '', 'Restauración ecológica, renaturalización y mantenimiento del arbolado en Suba.'),
  contrato(9, 'Contrato 1475-2025', '', 'Estudios, diseños y construcción de redes locales del tanque El Vínculo en Soacha.'),
  contrato(10, 'Contrato 2509-2025', '', 'Recolección y disposición de residuos sólidos en puntos críticos de Soacha.'),
  contrato(11, 'Contrato 3799 2025', '', 'Aseo y servicios conexos en parques, jardines y piscinas.'),
  contrato(12, 'Contrato 01-2025', '', 'Gestión del servicio público domiciliario de agua potable de Aguas de Bogotá.'),
  contrato(13, 'Contrato 13', ''),
  contrato(14, 'Contrato 14', ''),
];
