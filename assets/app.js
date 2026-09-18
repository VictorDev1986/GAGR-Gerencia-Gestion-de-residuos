(() => {
  'use strict';

  const reports = Array.isArray(window.REPORTS) ? window.REPORTS : [];
  const $ = (selector) => document.querySelector(selector);
  const list = $('#report-list');
  const viewer = $('#viewer');
  const viewerContent = $('#viewer-content');
  const search = $('#report-search');
  const loader = $('#page-loader');
  const mainArea = $('.main-area');
  let activeId = null;
  let toastTimeout;
  let loadSequence = 0;
  let loaderShownAt = 0;
  let loaderTimeout;
  let loaderHideTimeout;

  function beginLoading(report) {
    const sequence = ++loadSequence;
    clearTimeout(loaderTimeout);
    clearTimeout(loaderHideTimeout);
    loaderShownAt = performance.now();
    $('#loader-title').textContent = report.url ? 'Cargando tablero' : 'Preparando vista';
    $('#loader-detail').textContent = report.title;
    loader.classList.remove('is-hidden');
    loader.setAttribute('aria-hidden', 'false');
    mainArea.setAttribute('aria-busy', 'true');
    // Una respuesta lenta de Power BI no debe bloquear el portal indefinidamente.
    loaderTimeout = setTimeout(() => finishLoading(sequence), 12000);
    return sequence;
  }

  function finishLoading(sequence) {
    if (sequence !== loadSequence) return;
    clearTimeout(loaderTimeout);
    clearTimeout(loaderHideTimeout);
    const remaining = Math.max(0, 800 - (performance.now() - loaderShownAt));
    loaderHideTimeout = setTimeout(() => {
      if (sequence !== loadSequence) return;
      loader.classList.add('is-hidden');
      loader.setAttribute('aria-hidden', 'true');
      mainArea.setAttribute('aria-busy', 'false');
    }, remaining);
  }

  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

  function normalizeReportActions() {
    $('#copy-link')?.remove();
    if ($('.schedule-button')) return;
    const actions = $('.report-actions');
    if (!actions) return;
    const scheduleButton = document.createElement('a');
    scheduleButton.className = 'action-button schedule-button';
    scheduleButton.href = './cronograma-tableros.html';
    scheduleButton.title = 'Abrir cronograma de tableros';
    scheduleButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18M8 14h3M8 17h5"/></svg><span>Cronograma</span>';
    actions.prepend(scheduleButton);
  }

  function reportNumber(report) {
    return String(reports.indexOf(report) + 1).padStart(2, '0');
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  function renderList() {
    const term = search.value.trim().toLocaleLowerCase('es');
    const visible = reports.filter(report => `${report.title} ${report.description}`.toLocaleLowerCase('es').includes(term));
    list.replaceChildren();
    for (const report of visible) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `report-item${report.id === activeId ? ' active' : ''}`;
      button.setAttribute('aria-current', report.id === activeId ? 'page' : 'false');
      const number = document.createElement('span');
      number.className = 'report-item-number';
      number.textContent = reportNumber(report);
      const copy = document.createElement('span');
      copy.className = 'report-item-copy';
      const title = document.createElement('strong');
      title.textContent = report.title;
      const state = document.createElement('small');
      state.textContent = report.url ? 'Tablero disponible' : 'Pendiente de publicación';
      copy.append(title, state);
      const arrow = document.createElement('span');
      arrow.className = 'report-item-arrow';
      arrow.innerHTML = icon;
      button.append(number, copy, arrow);
      button.addEventListener('click', () => selectReport(report.id));
      list.append(button);
    }
    $('#empty-search').hidden = visible.length !== 0;
  }

  function selectReport(id, updateHash = true) {
    const report = reports.find(item => item.id === id) || reports[0];
    if (!report) {
      loader.classList.add('is-hidden');
      return;
    }
    const loadingSequence = beginLoading(report);
    activeId = report.id;
    const number = reportNumber(report);
    const available = Boolean(report.url);
    $('#report-title').textContent = report.title;
    $('#report-description').textContent = report.description;
    $('#report-index').textContent = `${number} / ${String(reports.length).padStart(2, '0')}`;
    $('#report-status').classList.toggle('pending', !available);
    $('#report-status').lastChild.textContent = available ? ' DISPONIBLE' : ' PENDIENTE';
    $('#viewer-label').textContent = available ? 'TABLERO INTERACTIVO' : 'TABLERO PENDIENTE';

    const openButton = $('#open-report');
    const fullscreenButton = $('#fullscreen-button');
    openButton.hidden = !available;
    fullscreenButton.hidden = !available;
    if (available) openButton.href = report.url;

    viewerContent.replaceChildren();
    if (available) {
      const iframe = document.createElement('iframe');
      iframe.addEventListener('load', () => finishLoading(loadingSequence), { once: true });
      iframe.title = `Tablero de Power BI: ${report.title}`;
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'eager');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.src = report.url;
      viewerContent.append(iframe);
    } else {
      const empty = document.createElement('div');
      empty.className = 'viewer-empty';
      empty.innerHTML = `<div class="empty-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="10" y="7" width="28" height="34" rx="4"/><path d="M17 17h14M17 23h14M17 29h8"/></svg></div><span class="empty-kicker">ANÁLISIS EN PREPARACIÓN</span><h4>Tablero pendiente de publicación</h4><p>Este espacio mostrará el análisis de datos del contrato cuando esté disponible en Power BI.</p>`;
      viewerContent.append(empty);
      finishLoading(loadingSequence);
    }
    renderList();
    if (updateHash) history.replaceState(null, '', `#${report.id}`);
    closeSidebar();
  }

  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    $('#mobile-backdrop').hidden = true;
  }

  const availableCount = reports.filter(report => report.url).length;
  $('#sidebar-count').textContent = `${String(availableCount).padStart(2, '0')} / ${String(reports.length).padStart(2, '0')}`;
  $('#progress-bar').style.width = `${reports.length ? availableCount / reports.length * 100 : 0}%`;

  search.addEventListener('input', renderList);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === 'Escape') closeSidebar();
  });
  $('#open-sidebar').addEventListener('click', () => {
    document.body.classList.add('sidebar-open');
    $('#mobile-backdrop').hidden = false;
  });
  $('#close-sidebar').addEventListener('click', closeSidebar);
  $('#mobile-backdrop').addEventListener('click', closeSidebar);
  normalizeReportActions();
  $('#fullscreen-button').addEventListener('click', async () => {
    try {
      await viewer.requestFullscreen();
    } catch {
      showToast('La pantalla completa no está disponible en este navegador');
    }
  });
  $('#exit-fullscreen').addEventListener('click', () => document.exitFullscreen?.());
  window.addEventListener('hashchange', () => selectReport(location.hash.slice(1), false));
  selectReport(location.hash.slice(1), false);
})();
