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
  contrato(3, 'PTAR Salitre', 'https://app.powerbi.com/view?r=eyJrIjoiNGU3YTdkNTctODBmNi00ZmE3LTk1MTEtOThkMTliMWE3ZTA1IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Tratamiento de aguas residuales del norte de Bogotá para contribuir al saneamiento del Río Bogotá.'),
  contrato(4, 'Desbuild Embajada', 'https://app.powerbi.com/view?r=eyJrIjoiODZkNTc2OTYtNTZkMy00MjQ5LWE2MTEtN2IxNDc4NzIzOTcwIiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Transporte y disposición final de residuos.'),
  contrato(5, 'RENOBO', 'https://app.powerbi.com/view?r=eyJrIjoiYTQ2YzZkMjQtNzZkMC00MTVhLTg2ODgtNzc1YWIzNTNiNTRmIiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Intervención y adecuación de lotes, incluyendo labores de poda y alambrado.'),
  contrato(6, 'FDL de Suba', 'https://app.powerbi.com/view?r=eyJrIjoiYTQ5OTAwYjAtYzJkNS00YjEwLWE1NjMtMGU1MzEzYTI3Y2YyIiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Restauración ecológica, renaturalización y mantenimiento del arbolado en Suba.'),
  contrato(8, 'Soacha 2358-2024', 'https://app.powerbi.com/view?r=eyJrIjoiMWEzZDk2Y2UtZDA2OC00NTczLTgxMDAtMGJmMTI0ODMxNDE1IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9'),
  contrato(11, 'Apoyo Labores Red Troncal EAAB', 'https://app.powerbi.com/view?r=eyJrIjoiMWI2ZjU0OGMtNWY3Ny00OGZkLWEzMzQtNjJhMzM3MjQzZGRlIiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Apoyo al mantenimiento de la red troncal de alcantarillado y recuperación del espacio público.'),
  contrato(9, 'Soacha 2949-2024', 'https://app.powerbi.com/view?r=eyJrIjoiODk1NDI3OTEtNTMzZS00NTU3LTg4ZTUtYjU0ZmVjNWI3NTI3IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Gerencia integral de obras de alcantarillado sanitario y pluvial.'),
  contrato(17, 'Idutaches', ''),
  contrato(7, 'Arboretto', 'https://app.powerbi.com/view?r=eyJrIjoiMDQ4ZmJiOTctZmQ5ZS00NGJhLTg5NGMtNTNhZTMwZWYzYTY3IiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9'),
  contrato(18, 'Maquinaria y mantenimiento GAGR', 'https://app.powerbi.com/view?r=eyJrIjoiYjdjOTAwYzEtM2M4YS00NTAyLWIyY2MtMjk2YjhkZDgxYzNkIiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Seguimiento de maquinaria, mantenimiento y operación de la Gerencia de Aguas y Gestión de Residuos.'),
  contrato(19, 'FDL de Teusaquillo', 'https://app.powerbi.com/view?r=eyJrIjoiYzZhMmZiMWYtOTFmMS00MDZiLWJmMjktYjhiOTgyMzk2NGRlIiwidCI6ImMzNmY1Mzg5LTkyMmMtNGMxZS1iNDI2LTUwYmJmNmExOWNmZiIsImMiOjR9', 'Restauración ecológica, renaturalización y mantenimiento del arbolado en Teusaquillo.'),
];
