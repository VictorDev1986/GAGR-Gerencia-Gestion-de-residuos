const NOMBRE_HOJA = 'Cronograma';
const ESTADOS_PERMITIDOS = ['Pendiente', 'En proceso', 'Completado', 'Bloqueado'];
const ENCABEZADOS = [
  'id',
  'proyecto',
  'responsable',
  'fecha_terminacion',
  'fecha_inicio',
  'fecha_fin',
  'semana',
  'prioridad',
  'estado',
  'fase_01',
  'fase_02',
  'fase_03',
  'fase_04',
  'fase_05',
  'fase_06',
  'fase_07',
  'fase_08',
  'fase_09',
  'fase_10',
  'fase_11',
  'fase_12',
  'actualizado_en',
];

/**
 * Ejecuta esta funcion una sola vez desde el editor de Apps Script.
 * Crea la hoja y muestra en el registro la clave privada de edicion.
 */
function configurarCronograma() {
  const properties = PropertiesService.getScriptProperties();
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  if (!libro) throw new Error('Abre Apps Script desde la hoja de Google Sheets y vuelve a ejecutar esta funcion.');
  properties.setProperty('SPREADSHEET_ID', libro.getId());
  let clave = properties.getProperty('EDIT_KEY');
  if (!clave) {
    clave = Utilities.getUuid().replace(/-/g, '');
    properties.setProperty('EDIT_KEY', clave);
  }

  obtenerHoja_();
  console.log('Clave privada de edicion: ' + clave);
  return clave;
}

function doGet() {
  try {
    const hoja = obtenerHoja_();
    const ultimaFila = hoja.getLastRow();
    if (ultimaFila < 2) {
      return responder_({ ok: true, data: [], updatedAt: null });
    }

    const filas = hoja.getRange(2, 1, ultimaFila - 1, ENCABEZADOS.length).getDisplayValues();
    const contratos = filas.filter((fila) => fila[0]).map(filaAContrato_);
    const actualizaciones = filas.map((fila) => fila[21]).filter(Boolean).sort();
    return responder_({
      ok: true,
      data: contratos,
      updatedAt: actualizaciones.length ? actualizaciones[actualizaciones.length - 1] : null,
    });
  } catch (error) {
    return responder_({ ok: false, error: error.message });
  }
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const payload = JSON.parse((event.postData && event.postData.contents) || '{}');
    validarClave_(payload.key);

    if (payload.action === 'auth') {
      return responder_({ ok: true });
    }

    if (payload.action !== 'save' || !Array.isArray(payload.contratos)) {
      throw new Error('Solicitud de guardado no valida.');
    }
    if (!payload.contratos.length || payload.contratos.length > 500) {
      throw new Error('La cantidad de contratos no es valida.');
    }

    const ahora = new Date().toISOString();
    const filas = payload.contratos.map((contrato) => contratoAFila_(contrato, ahora));
    const hoja = obtenerHoja_();
    const filasExistentes = Math.max(hoja.getLastRow() - 1, 0);
    if (filasExistentes) hoja.getRange(2, 1, filasExistentes, ENCABEZADOS.length).clearContent();
    hoja.getRange(2, 1, filas.length, ENCABEZADOS.length).setValues(filas);
    SpreadsheetApp.flush();

    return responder_({ ok: true, updatedAt: ahora });
  } catch (error) {
    return responder_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function obtenerHoja_() {
  const properties = PropertiesService.getScriptProperties();
  const idLibro = properties.getProperty('SPREADSHEET_ID');
  const libro = idLibro ? SpreadsheetApp.openById(idLibro) : SpreadsheetApp.getActiveSpreadsheet();
  if (!libro) throw new Error('Primero ejecuta configurarCronograma() desde la hoja de Google Sheets.');
  let hoja = libro.getSheetByName(NOMBRE_HOJA);
  if (!hoja) hoja = libro.insertSheet(NOMBRE_HOJA);

  const encabezadosActuales = hoja.getRange(1, 1, 1, ENCABEZADOS.length).getDisplayValues()[0];
  if (encabezadosActuales.join('|') !== ENCABEZADOS.join('|')) {
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setValues([ENCABEZADOS]);
    hoja.setFrozenRows(1);
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight('bold').setBackground('#0b172b').setFontColor('#ffffff');
    hoja.autoResizeColumns(1, ENCABEZADOS.length);
  }
  const filasDisponibles = Math.max(hoja.getMaxRows() - 1, 1);
  [1, 4, 5, 6, 22].forEach((columna) => hoja.getRange(2, columna, filasDisponibles, 1).setNumberFormat('@'));
  return hoja;
}

function validarClave_(claveRecibida) {
  const claveGuardada = PropertiesService.getScriptProperties().getProperty('EDIT_KEY');
  if (!claveGuardada) throw new Error('Primero ejecuta configurarCronograma().');
  if (!claveRecibida || claveRecibida !== claveGuardada) throw new Error('Clave de edicion incorrecta.');
}

function contratoAFila_(contrato, ahora) {
  if (!contrato || !String(contrato.id || '').trim()) throw new Error('Hay un contrato sin identificador.');
  const fases = Array.isArray(contrato.fases) ? contrato.fases : [];
  const estados = Array.from({ length: 12 }, (_, indice) => normalizarEstado_(fases[indice] && fases[indice].estado));
  return [
    texto_(contrato.id),
    texto_(contrato.proyecto),
    texto_(contrato.responsable),
    texto_(contrato.fechaTerminacion),
    texto_(contrato.fechaInicioPlaneada),
    texto_(contrato.fechaFinPlaneada),
    Number(contrato.semana) || 0,
    texto_(contrato.prioridad),
    texto_(contrato.estado),
  ].concat(estados, [ahora]);
}

function filaAContrato_(fila) {
  return {
    id: fila[0],
    proyecto: fila[1],
    responsable: fila[2],
    fechaTerminacion: fila[3],
    fechaInicioPlaneada: fila[4],
    fechaFinPlaneada: fila[5],
    semana: Number(fila[6]) || 0,
    prioridad: fila[7],
    estado: fila[8],
    fases: fila.slice(9, 21).map((estado, indice) => ({
      nombre: 'Fase ' + String(indice + 1).padStart(2, '0'),
      estado: normalizarEstado_(estado),
    })),
  };
}

function normalizarEstado_(estado) {
  return ESTADOS_PERMITIDOS.indexOf(estado) >= 0 ? estado : 'Pendiente';
}

function texto_(valor) {
  return String(valor == null ? '' : valor).trim().slice(0, 500);
}

function responder_(contenido) {
  return ContentService
    .createTextOutput(JSON.stringify(contenido))
    .setMimeType(ContentService.MimeType.JSON);
}
