(() => {
  'use strict';

  const FASES = [
    'Levantamiento de requerimientos',
    'Identificación de KPIs',
    'Revisión de fuentes de datos',
    'Análisis y perfilamiento de datos',
    'Limpieza y transformación de datos / ETL',
    'Modelado de datos',
    'Construcción de medidas e indicadores',
    'Diseño del tablero',
    'Desarrollo de visualizaciones',
    'Validación con responsable del contrato',
    'Ajustes',
    'Publicación y entrega',
  ];

  const STORAGE_KEY = 'gagr-cronograma-tableros-v4';
  const PLAN_START = new Date('2026-09-21T00:00:00');
  const ESTADOS_TABLERO = ['Pendiente', 'En proceso', 'Completado', 'Bloqueado'];
  const contratosIniciales = [
    { id: '457-2025', proyecto: 'UAESP', responsable: 'Gabriela Canal', fechaTerminacion: '2026-11-10', fechaInicioPlaneada: '2026-09-21', fechaFinPlaneada: '2026-09-23', semana: 1, prioridad: 'Alta', estado: 'En proceso', estadosFases: ['Completado', 'Completado', 'Completado', 'Completado', 'Completado', 'Completado', 'Completado', 'Completado', 'Completado', 'Completado', 'Completado', 'Pendiente'] },
    { id: '3799', proyecto: 'IDRD', responsable: 'Angie Totaitive / Geraldine Fonseca', fechaTerminacion: '2027-12-28', fechaInicioPlaneada: '2026-09-24', fechaFinPlaneada: '2026-09-27', semana: 1, prioridad: 'Alta', estado: 'Pendiente', estadosFases: ['Completado', 'Completado', 'Completado', 'En proceso', ...Array(8).fill('Pendiente')] },
    { id: '1475-2025', proyecto: 'PTAR El Salitre', responsable: 'Ancizar Ramirez', fechaTerminacion: '2027-09-30', fechaInicioPlaneada: '2026-09-28', fechaFinPlaneada: '2026-10-01', semana: 2, prioridad: 'Media', estado: 'Pendiente' },
    { id: '185-2025', proyecto: 'Desbuild Embajada', responsable: 'Gabriela Canal', fechaTerminacion: '2027-04-30', fechaInicioPlaneada: '2026-10-02', fechaFinPlaneada: '2026-10-05', semana: 2, prioridad: 'Media', estado: 'Pendiente' },
    { id: '01-2025', proyecto: 'Alboreto', responsable: 'Ricardo Bermudez', fechaTerminacion: '2026-12-31', fechaInicioPlaneada: '2026-10-06', fechaFinPlaneada: '2026-10-08', semana: 3, prioridad: 'Media', estado: 'Pendiente' },
    { id: '736-2025', proyecto: 'Fondo de desarrollo Local de Suba', responsable: 'Angie Alexandra Totaitive Beltran', fechaTerminacion: '2026-12-03', fechaInicioPlaneada: '2026-10-09', fechaFinPlaneada: '2026-10-12', semana: 3, prioridad: 'Media', estado: 'Pendiente' },
    { id: '469-2024', proyecto: 'RENOBO', responsable: 'Guillermo Trejos', fechaTerminacion: '2026-12-05', fechaInicioPlaneada: '2026-10-13', fechaFinPlaneada: '2026-10-15', semana: 4, prioridad: 'Media', estado: 'Pendiente' },
    { id: '2358-2025', proyecto: 'Soacha', responsable: 'Jaime Tovar', fechaTerminacion: '2026-11-29', fechaInicioPlaneada: '2026-10-16', fechaFinPlaneada: '2026-10-19', semana: 4, prioridad: 'Media', estado: 'Pendiente' },
    { id: '2949-2024', proyecto: 'Soacha Gerenciamiento', responsable: 'Jaime Tovar', fechaTerminacion: '2026-11-30', fechaInicioPlaneada: '2026-10-20', fechaFinPlaneada: '2026-10-22', semana: 5, prioridad: 'Media', estado: 'Pendiente' },
    { id: '384-2025', proyecto: 'Fondo de Desarrollo Local de Teusaquillo', responsable: 'Andrea López Peña', fechaTerminacion: '2026-11-17', fechaInicioPlaneada: '2026-10-23', fechaFinPlaneada: '2026-10-26', semana: 5, prioridad: 'Media', estado: 'Pendiente' },
    { id: '1668-2024', proyecto: 'Apoyo Labores Red Troncal EAAB', responsable: 'Wilson Riveros', fechaTerminacion: '2026-10-02', fechaInicioPlaneada: '2026-10-27', fechaFinPlaneada: '2026-10-29', semana: 6, prioridad: 'Alta', estado: 'Pendiente' },
    { id: '306-2025', proyecto: 'Chapinero', responsable: 'Paola Dulce Diaz', fechaTerminacion: '2026-09-26', fechaInicioPlaneada: '2026-10-30', fechaFinPlaneada: '2026-11-02', semana: 6, prioridad: 'Alta', estado: 'Pendiente' },
    { id: '2509-2025', proyecto: 'Alcaldía de Soacha - Puntos Críticos', responsable: 'Gabriela Canal', fechaTerminacion: '2026-09-30', fechaInicioPlaneada: '2026-11-03', fechaFinPlaneada: '2026-11-05', semana: 7, prioridad: 'Alta', estado: 'Pendiente' },
    { id: '411-2025', proyecto: 'Fondo de Desarrollo Local de La Candelaria', responsable: 'Andrea López', fechaTerminacion: '2026-09-30', fechaInicioPlaneada: '2026-11-06', fechaFinPlaneada: '2026-11-09', semana: 7, prioridad: 'Alta', estado: 'Pendiente' },
    { id: '840-2025', proyecto: 'Ministerio del Deporte', responsable: 'Leonardo Reyes', fechaTerminacion: '2026-09-30', fechaInicioPlaneada: '2026-11-10', fechaFinPlaneada: '2026-11-13', semana: 8, prioridad: 'Alta', estado: 'Pendiente' },
    { id: '1561-2026', proyecto: 'Idutaches', responsable: 'Juliana Pinzon', fechaTerminacion: '2026-12-31', fechaInicioPlaneada: '2026-11-14', fechaFinPlaneada: '2026-11-16', semana: 8, prioridad: 'Media', estado: 'Pendiente' },
  ];

  const $ = (selector) => document.querySelector(selector);
  const cloneIniciales = () => contratosIniciales.map((contrato) => ({ ...contrato, fases: FASES.map((nombre, index) => ({ nombre, estado: contrato.estadosFases?.[index] || 'Pendiente' })) }));
  let contratos = cargarContratos();
  let chart;
  let contratoDetalleId = null;
  let filtroEstado = 'Todos';

  function cargarContratos() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (error) {
      console.warn('No fue posible leer el cronograma guardado.', error);
    }
    return cloneIniciales();
  }

  function guardarContratos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contratos));
  }

  function calcularProgreso(contrato) {
    const fases = contrato.fases || [];
    return fases.length ? Math.round(fases.filter((fase) => fase.estado === 'Completado').length / fases.length * 100) : 0;
  }

  function estadoCalculado(contrato) {
    const progreso = calcularProgreso(contrato);
    if (progreso === 100) return 'Completado';
    if (progreso > 0) return 'En desarrollo';
    return contrato.estado === 'Bloqueado' ? 'Bloqueado' : 'Pendiente';
  }

  function estadoContrato(fechaTerminacion) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fin = new Date(`${fechaTerminacion}T00:00:00`);
    const dias = Math.ceil((fin - hoy) / 86400000);
    if (dias < 0) return { label: 'Contrato finalizado', tone: 'finalizado' };
    if (dias <= 30) return { label: 'Próximo a finalizar', tone: 'alerta' };
    return { label: 'Vigente', tone: 'vigente' };
  }

  function formatDate(date, options = { day: '2-digit', month: 'short' }) {
    return new Intl.DateTimeFormat('es-CO', options).format(new Date(`${date}T00:00:00`)).replace('.', '');
  }

  function formatRange(start, end) {
    return `${formatDate(start)} - ${formatDate(end)}`;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function statusBadge(status) {
    const tone = status.toLowerCase().replace(' ', '-').replace('ó', 'o');
    return `<span class="status-badge status-${tone}"><span class="status-dot"></span>${escapeHTML(status)}</span>`;
  }

  function renderKPIs() {
    const total = contratos.length;
    const completados = contratos.filter((contrato) => estadoCalculado(contrato) === 'Completado').length;
    const desarrollo = contratos.filter((contrato) => estadoCalculado(contrato) === 'En desarrollo').length;
    const pendientes = contratos.filter((contrato) => estadoCalculado(contrato) === 'Pendiente').length;
    const avance = total ? Math.round(contratos.reduce((sum, contrato) => sum + calcularProgreso(contrato), 0) / total) : 0;
    [['total', total], ['completed', completados], ['progress', desarrollo], ['pending', pendientes], ['overall', `${avance}%`]].forEach(([id, value]) => { $(`#kpi-${id}`).textContent = value; });
    $('#overall-progress').style.width = `${avance}%`;
    $('#overall-progress-label').textContent = `${avance}%`;
  }

  function groupedWeeks() {
    return [...new Set(contratos.map((contrato) => contrato.semana))].sort((a, b) => a - b).map((semana) => ({ semana, contratos: contratos.filter((contrato) => contrato.semana === semana).sort((a, b) => a.fechaInicioPlaneada.localeCompare(b.fechaInicioPlaneada)) }));
  }

  function renderCronograma() {
    const container = $('#weekly-plan');
    container.innerHTML = groupedWeeks().map(({ semana, contratos: weekContracts }) => {
      const avances = weekContracts.map(calcularProgreso);
      const avance = Math.round(avances.reduce((sum, value) => sum + value, 0) / (avances.length || 1));
      return `<article class="week-card"><div class="week-heading"><div><span class="eyebrow">SEMANA ${semana}</span><h3>${formatRange(weekContracts[0].fechaInicioPlaneada, weekContracts[weekContracts.length - 1].fechaFinPlaneada)}</h3></div><strong>${avance}%</strong></div><div class="week-bar"><span style="width:${avance}%"></span></div><div class="week-contracts">${weekContracts.map((contrato) => `<button class="week-contract" type="button" data-detail="${escapeHTML(contrato.id)}"><span class="week-contract-number">${String(contrato.semana).padStart(2, '0')}</span><span><strong>${escapeHTML(contrato.proyecto)}</strong><small>${escapeHTML(contrato.id)} · ${calcularProgreso(contrato)}% avance</small></span><i data-lucide="arrow-up-right"></i></button>`).join('')}</div><div class="week-footer"><span>${weekContracts.length} ${weekContracts.length === 1 ? 'contrato asignado' : 'contratos asignados'}</span><span>${statusBadge(avance === 100 ? 'Completado' : avance > 0 ? 'En desarrollo' : 'Pendiente')}</span></div></article>`;
    }).join('');
    bindDetailButtons(container);
    renderIcons();
  }

  function renderTable() {
    const filter = filtroEstado;
    const search = $('#contract-search').value.trim().toLocaleLowerCase('es');
    const sort = $('#sort-by').value;
    let visible = contratos.filter((contrato) => {
      const estado = estadoCalculado(contrato);
      const matchesFilter = filter === 'Todos' || estado === filter;
      const matchesSearch = `${contrato.id} ${contrato.proyecto} ${contrato.responsable}`.toLocaleLowerCase('es').includes(search);
      return matchesFilter && matchesSearch;
    });
    visible.sort((a, b) => sort === 'terminacion' ? a.fechaTerminacion.localeCompare(b.fechaTerminacion) : sort === 'avance' ? calcularProgreso(b) - calcularProgreso(a) : sort === 'prioridad' ? a.prioridad.localeCompare(b.prioridad) : a.semana - b.semana);
    $('#table-count').textContent = `${visible.length} de ${contratos.length}`;
    $('#contracts-table-body').innerHTML = visible.length ? visible.map((contrato) => {
      const estado = estadoCalculado(contrato);
      const contractual = estadoContrato(contrato.fechaTerminacion);
      const progreso = calcularProgreso(contrato);
      return `<tr><td><strong>${escapeHTML(contrato.id)}</strong><small>${escapeHTML(contrato.prioridad)} prioridad</small></td><td><strong>${escapeHTML(contrato.proyecto)}</strong><small>${escapeHTML(contrato.responsable)}</small></td><td><span class="week-tag">S${contrato.semana}</span></td><td>${formatDate(contrato.fechaInicioPlaneada)}</td><td>${formatDate(contrato.fechaFinPlaneada)}</td><td><span class="contract-date">${formatDate(contrato.fechaTerminacion, { day: '2-digit', month: 'short', year: 'numeric' })}</span><small class="contract-status ${contractual.tone}">${contractual.label}</small></td><td>${statusBadge(estado)}</td><td><div class="table-progress"><div><span style="width:${progreso}%"></span></div><strong>${progreso}%</strong></div></td><td><button class="detail-button" type="button" data-detail="${escapeHTML(contrato.id)}"><i data-lucide="scan-eye"></i><span>Ver detalle</span></button></td></tr>`;
    }).join('') : '<tr><td class="empty-table" colspan="9">No hay contratos que coincidan con los filtros.</td></tr>';
    bindDetailButtons($('#contracts-table-body'));
    renderIcons();
  }

  function renderChart() {
    const labels = contratos.map((contrato) => contrato.proyecto);
    const values = contratos.map(calcularProgreso);
    if (!window.Chart) return;
    if (chart) chart.destroy();
    chart = new Chart($('#progress-chart'), { type: 'bar', data: { labels, datasets: [{ label: 'Avance', data: values, backgroundColor: values.map((value) => value === 100 ? '#208b75' : value > 0 ? '#f47d25' : '#cad4df'), borderRadius: 5, barThickness: 18 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => ` ${context.raw}%` } } }, scales: { x: { beginAtZero: true, max: 100, grid: { color: '#e8edf2' }, ticks: { callback: (value) => `${value}%`, color: '#8090a2', font: { family: 'DM Sans' } } }, y: { grid: { display: false }, ticks: { color: '#33455d', font: { family: 'DM Sans', size: 11 } } } } } });
  }

  function renderGantt() {
    const maxWeek = Math.max(...contratos.map((contrato) => contrato.semana));
    $('#gantt-head').innerHTML = `<span>Proyecto</span>${Array.from({ length: maxWeek }, (_, index) => `<span>S${index + 1}</span>`).join('')}`;
    $('#gantt-body').innerHTML = contratos.map((contrato) => `<div class="gantt-row"><strong title="${escapeHTML(contrato.proyecto)}">${escapeHTML(contrato.proyecto)}</strong>${Array.from({ length: maxWeek }, (_, index) => `<span class="gantt-cell ${index + 1 === contrato.semana ? 'active' : ''}" title="Semana ${index + 1}"></span>`).join('')}</div>`).join('');
  }

  function renderDetalleContrato() {
    const contrato = contratos.find((item) => item.id === contratoDetalleId);
    if (!contrato) return;
    const progreso = calcularProgreso(contrato);
    $('#detail-contract-id').textContent = `Contrato ${contrato.id}`;
    $('#detail-project').textContent = contrato.proyecto;
    $('#detail-responsible').textContent = contrato.responsable;
    $('#detail-progress').textContent = `${progreso}%`;
    $('#detail-progress-bar').style.width = `${progreso}%`;
    $('#detail-status').innerHTML = statusBadge(estadoCalculado(contrato));
    $('#detail-phases').innerHTML = contrato.fases.map((fase, index) => `<div class="phase-row"><span class="phase-number">${String(index + 1).padStart(2, '0')}</span><span class="phase-name">${escapeHTML(fase.nombre)}</span><select class="phase-select phase-${fase.estado.toLowerCase().replace(' ', '-')}" data-phase="${index}" aria-label="Estado de ${escapeHTML(fase.nombre)}">${ESTADOS_TABLERO.map((estado) => `<option ${estado === fase.estado ? 'selected' : ''}>${estado}</option>`).join('')}</select></div>`).join('');
    $('#detail-modal').classList.add('open');
    $('#detail-modal').setAttribute('aria-hidden', 'false');
    renderIcons();
  }

  function bindDetailButtons(container) {
    container.querySelectorAll('[data-detail]').forEach((button) => button.addEventListener('click', () => { contratoDetalleId = button.dataset.detail; renderDetalleContrato(); }));
  }

  function renderIcons() {
    window.lucide?.createIcons({ attrs: { 'stroke-width': 1.8 } });
  }

  function hidePageLoader() {
    const loader = $('#page-loader');
    if (!loader) return;
    loader.classList.add('is-hidden');
    loader.setAttribute('aria-hidden', 'true');
  }

  function exportarPDF() {
    if (!window.jspdf?.jsPDF) {
      window.alert('No fue posible cargar el generador de PDF. Verifica tu conexión a internet.');
      return;
    }
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const avance = contratos.length ? Math.round(contratos.reduce((sum, contrato) => sum + calcularProgreso(contrato), 0) / contratos.length) : 0;
    const orange = [244, 125, 37];
    pdf.setFillColor(11, 23, 43);
    pdf.rect(0, 0, 297, 27, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.text('Cronograma de Desarrollo de Tableros', 14, 12);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text('Seguimiento de proyectos de Analítica de Datos · GAGR', 14, 19);
    pdf.text(`Generado: ${new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date())}`, 205, 16);
    pdf.setTextColor(35, 52, 76);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(`Avance general: ${avance}%`, 14, 37);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(`${contratos.length} contratos · ${groupedWeeks().length} semanas planificadas · Incluye fines de semana`, 14, 43);
    pdf.setFillColor(229, 235, 240);
    pdf.roundedRect(14, 47, 269, 5, 2, 2, 'F');
    pdf.setFillColor(...orange);
    pdf.roundedRect(14, 47, 269 * avance / 100, 5, 2, 2, 'F');
    pdf.autoTable({
      startY: 59,
      head: [['Contrato', 'Proyecto', 'Responsable', 'Semana', 'Inicio', 'Fin', 'Terminación', 'Estado', 'Avance']],
      body: contratos.map((contrato) => [contrato.id, contrato.proyecto, contrato.responsable, `S${contrato.semana}`, formatDate(contrato.fechaInicioPlaneada), formatDate(contrato.fechaFinPlaneada), formatDate(contrato.fechaTerminacion, { day: '2-digit', month: 'short', year: 'numeric' }), estadoCalculado(contrato), `${calcularProgreso(contrato)}%`]),
      theme: 'grid',
      styles: { font: 'helvetica', fontSize: 7.5, textColor: [50, 67, 87], cellPadding: 3, lineColor: [225, 232, 238], lineWidth: .2 },
      headStyles: { fillColor: [11, 23, 43], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 251] },
      columnStyles: { 0: { cellWidth: 25 }, 1: { cellWidth: 42 }, 2: { cellWidth: 48 }, 3: { cellWidth: 15 }, 4: { cellWidth: 22 }, 5: { cellWidth: 22 }, 6: { cellWidth: 27 }, 7: { cellWidth: 28 }, 8: { cellWidth: 18, halign: 'right' } },
      didDrawPage: (data) => { pdf.setFontSize(8); pdf.setTextColor(120, 135, 150); pdf.text('GAGR · Plan de trabajo de tableros', 14, 202); pdf.text(`Página ${data.pageNumber}`, 270, 202); },
    });
    pdf.save('plan-trabajo-tableros-2026-09-21.pdf');
  }

  function actualizarFase(index, estado) {
    const contrato = contratos.find((item) => item.id === contratoDetalleId);
    if (!contrato) return;
    contrato.fases[index].estado = estado;
    contrato.estado = estado === 'Bloqueado' ? 'Bloqueado' : estadoCalculado(contrato);
    guardarContratos();
    renderKPIs();
    renderCronograma();
    renderTable();
    renderChart();
    renderGantt();
    renderDetalleContrato();
  }

  function bindEvents() {
    $('#sort-by').addEventListener('change', renderTable);
    $('#contract-search').addEventListener('input', renderTable);
    document.querySelectorAll('.filter-tab').forEach((button) => button.addEventListener('click', () => {
      filtroEstado = button.dataset.filter;
      document.querySelectorAll('.filter-tab').forEach((item) => item.classList.toggle('active', item === button));
      renderTable();
    }));
    $('#close-detail').addEventListener('click', closeModal);
    $('#detail-modal').addEventListener('click', (event) => { if (event.target === $('#detail-modal')) closeModal(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
    $('#detail-phases').addEventListener('change', (event) => { if (event.target.matches('.phase-select')) actualizarFase(Number(event.target.dataset.phase), event.target.value); });
    $('#export-pdf').addEventListener('click', exportarPDF);
  }

  function closeModal() {
    $('#detail-modal').classList.remove('open');
    $('#detail-modal').setAttribute('aria-hidden', 'true');
    contratoDetalleId = null;
  }

  function init() {
    $('#last-updated').textContent = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
    $('#year').textContent = new Date().getFullYear();
    renderKPIs();
    renderCronograma();
    renderTable();
    renderChart();
    renderGantt();
    bindEvents();
    renderIcons();
    requestAnimationFrame(hidePageLoader);
    setTimeout(hidePageLoader, 2500);
  }

  window.cargarContratos = cargarContratos;
  window.guardarContratos = guardarContratos;
  window.calcularProgreso = calcularProgreso;
  window.actualizarFase = actualizarFase;
  window.renderKPIs = renderKPIs;
  window.renderCronograma = renderCronograma;
  window.renderTabla = renderTable;
  window.renderGrafico = renderChart;
  window.renderDetalleContrato = renderDetalleContrato;
  init();
})();
