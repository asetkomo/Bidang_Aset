/**
 * forms.js — logika bersama untuk keempat formulir Bidang Aset.
 *
 * CATATAN PROTOTIPE:
 * GitHub Pages hanya melayani berkas statis (tidak ada server/database).
 * Skrip ini MENYIMPAN DATA DI PERANGKAT PENGGUNA (localStorage) sebagai
 * simulasi alur kerja, membuat nomor tanda terima, dan menyiapkan ringkasan
 * cetak/PDF. Ini BUKAN penyimpanan resmi/terpusat.
 *
 * Untuk produksi, sambungkan `saveSubmission()` ke salah satu:
 *  - Google Apps Script Web App + Google Sheets, atau
 *  - backend/API internal Diskominfo Kota Mojokerto, atau
 *  - layanan formulir pihak ketiga yang disetujui (mis. Formspree),
 * lalu ganti bagian "TODO(backend)" di bawah dengan pemanggilan fetch().
 */

const STORAGE_KEY = 'aset-mojokerto:pengajuan';

function loadSubmissions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function persistSubmissions(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function pad(n, w) { return String(n).padStart(w, '0'); }

function generateReceiptNo(prefix) {
  const list = loadSubmissions();
  const year = new Date().getFullYear();
  const countThisYear = list.filter(s => s.receiptNo.includes(`/${year}/`)).length + 1;
  return `${prefix}/${year}/${pad(countThisYear, 4)}`;
}

/* ---------------------------- Validasi ---------------------------------- */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('.field').forEach(field => field.classList.remove('has-error'));

  const controls = form.querySelectorAll('input[required], select[required], textarea[required]');
  controls.forEach(ctrl => {
    const fieldWrap = ctrl.closest('.field');
    let ok = true;
    if (ctrl.type === 'radio' || ctrl.type === 'checkbox') {
      const groupName = ctrl.name;
      ok = !!form.querySelector(`input[name="${groupName}"]:checked`);
    } else {
      ok = ctrl.value.trim() !== '';
    }
    if (!ok) {
      valid = false;
      if (fieldWrap) fieldWrap.classList.add('has-error');
    }
  });

  if (!valid) {
    const firstError = form.querySelector('.has-error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return valid;
}

/* ---------------------- Baris tabel dinamis (repeatable) ---------------- */
function initRepeatable(tableBodySelector, addBtnSelector, rowFactory) {
  const tbody = document.querySelector(tableBodySelector);
  const addBtn = document.querySelector(addBtnSelector);
  if (!tbody || !addBtn) return;

  function addRow() {
    const tr = document.createElement('tr');
    tr.innerHTML = rowFactory();
    tbody.appendChild(tr);
    tr.querySelector('.rm-row')?.addEventListener('click', () => {
      if (tbody.children.length > 1) tr.remove();
    });
  }
  addBtn.addEventListener('click', addRow);
  if (tbody.children.length === 0) addRow();
}

function collectRepeatable(tableBodySelector, columns) {
  const rows = document.querySelectorAll(`${tableBodySelector} tr`);
  const out = [];
  rows.forEach(row => {
    const obj = {};
    columns.forEach(col => {
      const el = row.querySelector(`[data-col="${col}"]`);
      obj[col] = el ? el.value : '';
    });
    out.push(obj);
  });
  return out;
}

/* ------------------------------- Unggah file (tampilan saja) ------------ */
function initFileDrop(dropSelector) {
  document.querySelectorAll(dropSelector).forEach(drop => {
    const input = drop.querySelector('input[type=file]');
    const label = drop.querySelector('.fname');
    if (!input) return;
    drop.addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      if (input.files.length) {
        const names = Array.from(input.files).map(f => f.name).join(', ');
        if (label) label.textContent = names;
      }
    });
  });
}

/* ------------------------------- Simpan pengajuan ------------------------ */
function saveSubmission({ prefix, formType, formTitle, summaryFields }) {
  const receiptNo = generateReceiptNo(prefix);
  const record = {
    receiptNo,
    formType,
    formTitle,
    tanggal: new Date().toISOString(),
    status: 'Tersimpan (lokal)',
    summaryFields, // [{label, value}]
  };

  // TODO(backend): ganti simulasi localStorage ini dengan pemanggilan API
  // resmi ketika sistem sudah terhubung ke server BPKPD, contoh:
  // await fetch('/api/pengajuan', { method:'POST', body: JSON.stringify(record) });
  const list = loadSubmissions();
  list.unshift(record);
  persistSubmissions(list);
  return record;
}

/* ------------------------------- Riwayat lokal ---------------------------*/
function renderHistory(formType, tbodySelector, emptySelector) {
  const tbody = document.querySelector(tbodySelector);
  const empty = document.querySelector(emptySelector);
  if (!tbody) return;
  const list = loadSubmissions().filter(s => s.formType === formType);
  tbody.innerHTML = '';
  if (!list.length) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.forEach(item => {
    const tr = document.createElement('tr');
    const tgl = new Date(item.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    tr.innerHTML = `
      <td><strong>${item.receiptNo}</strong></td>
      <td>${tgl}</td>
      <td><span class="status-chip">${item.status}</span></td>`;
    tbody.appendChild(tr);
  });
}

/* ------------------------------- Ringkasan cetak -------------------------*/
function buildPrintSummary(containerSelector, record) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  const rows = record.summaryFields
    .filter(f => f.value)
    .map(f => `<tr><th>${f.label}</th><td>${f.value}</td></tr>`)
    .join('');
  el.innerHTML = `
    <div class="print-only-summary">
      <h2>${record.formTitle}</h2>
      <p><strong>No. Tanda Terima:</strong> ${record.receiptNo}<br>
      <strong>Tanggal:</strong> ${new Date(record.tanggal).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</p>
      <table class="print-summary-table">${rows}</table>
      <p style="margin-top:24px;font-size:12px;color:#666;">
        Dokumen ini adalah ringkasan pengajuan yang tersimpan pada perangkat pengaju
        (prototipe front-end). Bukan bukti resmi tanpa verifikasi Bidang Aset BPKPD Kota Mojokerto.
      </p>
    </div>`;
}

/* ------------------------------- Modal konfirmasi -------------------------*/
function openModal(record) {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;
  overlay.querySelector('[data-receipt]').textContent = record.receiptNo;
  overlay.classList.add('open');
  const printBtn = overlay.querySelector('[data-action="print"]');
  if (printBtn) printBtn.onclick = () => window.print();
  const closeBtns = overlay.querySelectorAll('[data-action="close"]');
  closeBtns.forEach(b => b.onclick = () => overlay.classList.remove('open'));
}

/* ------------------------------- Wiring generik untuk halaman form ------- */
function wireFormPage({ form, prefix, formType, formTitle, getSummaryFields, onReset }) {
  if (!form) return;
  initFileDrop('.file-drop');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const summaryFields = getSummaryFields();
    const record = saveSubmission({ prefix, formType, formTitle, summaryFields });
    buildPrintSummary('#print-area', record);
    openModal(record);
    renderHistory(formType, '#history-body', '#history-empty');
    if (onReset) onReset();
  });

  renderHistory(formType, '#history-body', '#history-empty');
}
