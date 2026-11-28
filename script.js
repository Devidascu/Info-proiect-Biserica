"use strict";

const PHOTOS = [
  { src: "images/exterior-01.jpg", category: "exterior", title: "Fațada bisericii", note: "Vedere frontală a bisericii de lemn." },
  { src: "images/exterior-02.jpg", category: "exterior", title: "Biserica în peisaj", note: "Lăcașul în cadrul satului Brătești." },
  { src: "images/exterior-03.jpg", category: "exterior", title: "Turnul bisericii", note: "Turnul-clopotniță cu acoperiș înalt." },
  { src: "images/exterior-05.jpg", category: "exterior", title: "Vedere laterală", note: "Bârnele și proporțiile construcției." },
  { src: "images/exterior-06.jpg", category: "exterior", title: "Fântâna din curtea bisericii", note: "Detaliu din curtea lăcașului." },
  { src: "images/interior-01.jpg", category: "interior", title: "Interior – vedere generală I", note: "Spațiul interior al bisericii." },
  { src: "images/interior-02.jpg", category: "interior", title: "Interior – vedere generală II", note: "Perspectivă spre iconostas." },
  { src: "images/interior-03.jpg", category: "interior", title: "Interior – vedere generală III", note: "Lemn, lumină și pictură." },
  { src: "images/interior-04.jpg", category: "interior", title: "Strana de lectură", note: "Mobilier bisericesc tradițional." },
  { src: "images/interior-05.jpg", category: "interior", title: "Altarul bisericii", note: "Zona altarului." },
  { src: "images/interior-06.jpg", category: "interior", title: "Iconostasul", note: "Element central al interiorului." },
  { src: "images/interior-09.jpg", category: "interior", title: "Pictura murală I", note: "Detaliu de pictură murală." },
  { src: "images/interior-10.jpg", category: "interior", title: "Pictura cu sfinți ierarhi", note: "Reprezentări de sfinți." },
  { src: "images/interior-11.jpg", category: "interior", title: "Pictura murală II", note: "Scene și detalii pictate." },
  { src: "images/interior-12.jpg", category: "interior", title: "Pictura murală III", note: "Pictura interioară a bisericii." },
  { src: "images/interior-13.jpg", category: "interior", title: "Bolta pictată I", note: "Pictură pe bolta bisericii." },
  { src: "images/interior-14.jpg", category: "interior", title: "Bolta pictată II", note: "Detalii din zona bolții." },
  { src: "images/interior-15.jpg", category: "interior", title: "Icoane și obiecte de cult", note: "Obiecte păstrate în interior." },
  { src: "images/interior-18.jpg", category: "interior", title: "Detalii din interior", note: "Elemente de meșteșug și decor." },
  { src: "images/detalii-01.jpg", category: "detalii", title: "Îmbinarea bârnelor", note: "Tehnică tradițională de îmbinare." },
  { src: "images/detalii-03.jpg", category: "detalii", title: "Toaca bisericii", note: "Obiect tradițional folosit la slujbe." },
  { src: "images/detalii-04.jpg", category: "detalii", title: "Intrarea în biserică", note: "Accesul în lăcaș." },
  { src: "images/detalii-05.jpg", category: "detalii", title: "Poarta tradițională sculptată", note: "Detaliu de lemn sculptat." },
  { src: "images/detalii-06.webp", category: "detalii", title: "Poarta tradițională din lemn", note: "Meșteșug local în lemn." },
  { src: "images/capela-01.jpg", category: "capela", title: "Exteriorul capelei", note: "Capela mortuară de lângă biserică." },
  { src: "images/capela-02.jpg", category: "capela", title: "Prapuri și icoane din capelă", note: "Prapuri tradiționale și icoane." },
  { src: "images/capela-03.jpg", category: "capela", title: "Interiorul capelei – icoane și mobilier", note: "Detalii din interiorul capelei." },
  { src: "images/capela-04.jpg", category: "capela", title: "Amenajarea interioară a capelei", note: "Mobilier și obiecte religioase." }
];

const PLACES = [
  { name: "Biserica Sf. Teodor Tiron – Brătești", coords: [46.76266, 22.19016], short: "Monument istoric: BH-II-m-B-01122", text: "Biserica de lemn din Brătești, comuna Răbăgani. Construită în secolul al XVIII-lea la Sitani și mutată la Brătești în anii 1976–1978." },
  { name: "Beiuș", coords: [46.667, 22.353], short: "Orașul din apropiere", text: "Oraș din județul Bihor, situat pe Crișul Negru." },
  { name: "Lazuri de Beiuș", coords: [46.593, 22.404], short: "Comună pe Crișul Negru", text: "Reședința comunei cu același nume, pe cursul superior al Crișului Negru, între Beiuș și Ștei." },
  { name: "Peștera Meziad", coords: [46.7626, 22.4784], short: "Peșteră turistică", text: "Peșteră din Munții Apuseni, în satul Meziad, cu aproape 4,75 km de galerii; declarată rezervație naturală în 2000. Se vizitează doar cu ghid." },
  { name: "Stâna de Vale", coords: [46.693, 22.667], short: "Stațiune montană", text: "Stațiune din Munții Apuseni; poziția marcajului este aproximativă." }
];

const QUIZ = [
  { q: "Care este hramul Bisericii de lemn din Brătești?", options: ["Sfântul Nicolae", "Sfântul Teodor Tiron", "Sfântul Gheorghe", "Sfântul Ilie"], correct: 1, why: "Biserica din Brătești are hramul „Sfântul Teodor Tiron”." },
  { q: "În ce secol este datată biserica de lemn din Brătești?", options: ["Secolul al XVI-lea", "Secolul al XVII-lea", "Secolul al XVIII-lea", "Secolul al XIX-lea"], correct: 2, why: "Sursele indică ani diferiți, dar datarea sigură folosită în proiect este secolul al XVIII-lea." },
  { q: "Din ce sat a fost adusă biserica la Brătești?", options: ["Sitani", "Meziad", "Lazuri de Beiuș", "Răbăgani"], correct: 0, why: "Biserica a fost construită inițial în satul Sitani, apoi mutată la Brătești." },
  { q: "În ce perioadă a fost mutată biserica din Sitani la Brătești?", options: ["1900–1902", "1956–1958", "1976–1978", "2009–2010"], correct: 2, why: "Mutarea și reconstrucția la Brătești au avut loc între anii 1976 și 1978." },
  { q: "Ce parte a bisericii adăpostește clopotele?", options: ["Pridvorul", "Altarul", "Turnul-clopotniță", "Naosul"], correct: 2, why: "Clopotele se află în turnul-clopotniță, elementul vertical caracteristic al bisericii." },
  { q: "Ce lucrări importante au fost realizate în restaurarea din 2009?", options: ["Au fost schimbate șarpanta și învelitoarea", "A fost reconstruită fundația din piatră", "A fost înlocuit iconostasul vechi", "A fost adăugat un pridvor nou de beton"], correct: 0, why: "Restaurarea din 2009 a schimbat șarpanta și învelitoarea, readucând biserica mai aproape de imaginea inițială." },
  { q: "Cine a realizat proiectul de restaurare din 2009?", options: ["Arhitectul orădean Cristian Pușcaș", "Pictorul bisericii din Sitani", "Preotul paroh din Brătești", "Un meșter anonim din Beiuș"], correct: 0, why: "Proiectul de restaurare a fost realizat de arhitectul orădean Cristian Pușcaș, la cererea Parohiei Brătești." },
  { q: "Ce element decorativ din lemn se remarcă la biserica din Brătești?", options: ["Brâul median din lemn", "Cupola din piatră", "Vitraliile gotice", "Colonadele de marmură"], correct: 0, why: "Brâul median din lemn este un element distinctiv care evidențiază meșteșugul tradițional." }
];

const FORMSPREE_ENDPOINT = "";
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

/* Scroll to top on load */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
window.addEventListener("load", () => { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, { once: true });

/* Theme */
const themeBtn = $("#themeToggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const mqTheme = window.matchMedia("(prefers-color-scheme: dark)");
function getSavedTheme() { try { return localStorage.getItem("theme"); } catch { return null; } }
function applyTheme(theme, save) {
  const t = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  if (themeMeta) themeMeta.content = t === "dark" ? "#171311" : "#f3ece0";
  if (themeBtn) {
    const dark = t === "dark";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Activează tema luminoasă" : "Activează tema întunecată");
  }
  if (save) { try { localStorage.setItem("theme", t); } catch {} }
}
applyTheme(getSavedTheme() || (mqTheme.matches ? "dark" : "light"), false);
themeBtn?.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true));
mqTheme.addEventListener?.("change", (e) => { if (!getSavedTheme()) applyTheme(e.matches ? "dark" : "light", false); });

/* Navigation */
const header = $("#siteHeader");
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");
function setMenu(open) {
  navMenu?.classList.toggle("open", open);
  navToggle?.setAttribute("aria-expanded", String(open));
  navToggle?.setAttribute("aria-label", open ? "Închide meniul" : "Deschide meniul");
  if (open) header?.classList.remove("nav-hidden");
}
navToggle?.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
$$("a[href^='#']", navMenu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", (e) => { if (navMenu?.classList.contains("open") && !header.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && navMenu?.classList.contains("open")) { setMenu(false); navToggle?.focus(); } });
window.addEventListener("resize", () => { if (window.innerWidth > 860 && navMenu?.classList.contains("open")) setMenu(false); });

/* Header + back top */
const backTop = $("#backTop");
let lastScrollY = window.scrollY;
let scrollTicking = false;
function updateHeaderOnScroll() {
  const y = window.scrollY;
  const menuOpen = navMenu?.classList.contains("open");
  const scrollingDown = y > lastScrollY;
  const pastThreshold = y > 80;

  header?.classList.toggle("scrolled", y > 20);
  backTop?.classList.toggle("visible", y > 500);

  if (menuOpen || !pastThreshold || !scrollingDown) {
    header?.classList.remove("nav-hidden");
  } else if (scrollingDown && pastThreshold) {
    header?.classList.add("nav-hidden");
  }

  lastScrollY = y;
  scrollTicking = false;
}
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateHeaderOnScroll);
    scrollTicking = true;
  }
}, { passive: true });
updateHeaderOnScroll();
backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));

/* Current year */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Active nav section */
if ("IntersectionObserver" in window) {
  const links = $$("a[href^='#']", navMenu);
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* Gallery - pinboard style */
const galleryBoard = $("#galleryBoard");
const galleryPanel = $("#galleryPanel");
const galleryLinks = $("#galleryLinks");
const galleryStatus = $("#galleryStatus");
const filterBtns = $$(".filter-btn");
const lightbox = $("#lb");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbMeta = $("#lbMeta");
const lbPrev = $("#lbPrev");
const lbNext = $("#lbNext");
const lbClose = $("#lbClose");
const CAT_LABELS = { exterior: "Exterior", interior: "Interior", detalii: "Detalii și tradiții", capela: "Capela mortuară" };
const CAT_NOTES = { exterior: "Exterior · lemn și acoperiș", interior: "Interior · pictură și credință", detalii: "Detaliu · meșteșug local", capela: "Capelă · memorie și tradiție" };
const GALLERY_NOTES = [
  { id: "note-origin", title: "Secolul XVIII", text: "Biserica de lemn a fost ridicată în secolul al XVIII-lea, înainte de mutarea la Brătești.", cats: ["toate", "exterior", "detalii"], tilt: -0.8 },
  { id: "note-move", title: "Mutare 1976–1978", text: "Lăcașul a fost adus din satul Sitani și reconstruit la Brătești între 1976 și 1978.", cats: ["toate", "exterior"], tilt: 1.1 },
  { id: "note-brau", title: "Brâul median", text: "Brâul median din lemn înconjoară biserica și evidențiază meșteșugul tradițional.", cats: ["toate", "exterior", "detalii"], tilt: -0.7 },
  { id: "note-rest", title: "Restaurare 2009", text: "Restaurarea din 2009 a refăcut șarpanta și învelitoarea, păstrând spiritul vechi.", cats: ["toate", "interior", "capela"], tilt: 1 }
];

let visible = [...PHOTOS];
let lbIndex = 0;
let lastFocus = null;
let currentCategory = "toate";

function placeholder(p) {
  const title = p.title.replace(/[&<>"']/g, "");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600' viewBox='0 0 900 600'><rect width='900' height='600' fill='#d3c0a3'/><rect x='30' y='30' width='840' height='540' fill='none' stroke='#997857' stroke-width='2'/><text x='450' y='280' font-family='Georgia' font-size='34' text-anchor='middle' fill='#493828'>${title}</text><text x='450' y='330' font-family='sans-serif' font-size='19' text-anchor='middle' fill='#6d5744'>Imagine indisponibilă</text></svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}
function setImg(img, p) { img.onerror = () => { img.onerror = null; img.src = placeholder(p); }; img.src = p.src; }

function renderLightbox() {
  const p = visible[lbIndex];
  if (!p) return;
  setImg(lbImg, p);
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  const cat = CAT_LABELS[p.category] || p.category;
  lbMeta.textContent = [cat, p.note].filter(Boolean).join(" · ") + ` · ${lbIndex + 1}/${visible.length}`;
}
function moveLightbox(delta) {
  if (!visible.length) return;
  lbIndex = (lbIndex + delta + visible.length) % visible.length;
  renderLightbox();
}

function makePhoto(p, idx) {
  const fig = document.createElement("figure");
  fig.className = "item"; fig.tabIndex = 0; fig.dataset.id = p.src; fig.dataset.category = p.category;
  fig.style.setProperty("--tilt", `${((idx % 5) - 2) * 0.6}deg`);
  fig.setAttribute("role", "button"); fig.setAttribute("aria-label", "Mărește fotografia: " + p.title);
  const frame = document.createElement("div"); frame.className = "frame";
  const img = document.createElement("img"); img.alt = p.title; img.loading = "lazy"; setImg(img, p); frame.append(img);
  const cap = document.createElement("figcaption");
  const meta = document.createElement("div"); meta.className = "item-meta";
  const tag = document.createElement("span"); tag.className = "item-tag"; tag.textContent = CAT_LABELS[p.category] || p.category;
  const mark = document.createElement("span"); mark.className = "item-mark"; mark.textContent = "Brătești";
  meta.append(tag, mark);
  const title = document.createElement("b"); title.textContent = p.title;
  const note = document.createElement("p"); note.className = "item-note"; note.textContent = p.note || CAT_NOTES[p.category] || "Detaliu din ansamblu";
  cap.append(meta, title, note); fig.append(frame, cap);
  const open = () => { lbIndex = visible.indexOf(p); if (lbIndex < 0) return; lastFocus = fig; renderLightbox(); lightbox?.showModal?.(); };
  fig.addEventListener("click", open);
  fig.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  return { type: "photo", id: p.src, category: p.category, el: fig, p };
}
function makeNote(n) {
  const card = document.createElement("article");
  card.className = "gallery-note"; card.dataset.id = n.id;
  card.style.setProperty("--tilt", `${n.tilt}deg`);
  const b = document.createElement("b"); b.textContent = n.title;
  const p = document.createElement("p"); p.textContent = n.text;
  card.append(b, p);
  return { type: "note", id: n.id, cats: n.cats, el: card, n };
}

const photoItems = PHOTOS.map(makePhoto);
const noteItems = GALLERY_NOTES.map(makeNote);
const photoBySrc = new Map(photoItems.map((it) => [it.id, it]));
const noteById = new Map(noteItems.map((it) => [it.id, it]));

function buildOrder(category) {
  const photos = photoItems.filter((it) => category === "toate" || it.category === category);
  const notes = noteItems.filter((it) => it.cats.includes(category));
  const order = []; const used = new Set();
  const pushNote = (id) => { const n = noteById.get(id); if (n && !used.has(id) && notes.includes(n)) { used.add(id); order.push(n); } };
  const pushPhoto = (it) => { if (!used.has(it.id)) { used.add(it.id); order.push(it); } };
  if (category === "toate") {
    photos.forEach((it) => {
      pushPhoto(it);
      if (it.id === "images/exterior-03.jpg") pushNote("note-origin");
      if (it.id === "images/exterior-06.jpg") pushNote("note-move");
      if (it.id === "images/interior-10.jpg") pushNote("note-rest");
      if (it.id === "images/detalii-05.jpg") pushNote("note-brau");
    });
  } else {
    photos.forEach((it, i) => { pushPhoto(it); if (i === 1) notes.forEach((n) => pushNote(n.id)); });
  }
  notes.forEach((n) => pushNote(n.id));
  return order;
}

function getConnections(category, visibleIds) {
  const has = (id) => visibleIds.has(id);
  const conns = [];
  const link = (a, b, soft = false) => { if (has(a) && has(b)) conns.push({ from: a, to: b, soft }); };
  if (category === "toate" || category === "exterior") {
    link("images/exterior-01.jpg", "images/exterior-03.jpg"); link("images/exterior-03.jpg", "images/exterior-05.jpg");
    link("images/exterior-01.jpg", "note-origin", true); link("images/exterior-05.jpg", "note-move", true);
  }
  if (category === "toate" || category === "interior") {
    link("images/interior-01.jpg", "images/interior-06.jpg"); link("images/interior-06.jpg", "images/interior-10.jpg");
    link("images/interior-10.jpg", "note-rest", true);
  }
  if (category === "toate" || category === "detalii") {
    link("images/detalii-01.jpg", "images/detalii-04.jpg"); link("images/detalii-04.jpg", "note-brau", true);
  }
  if (category === "toate" || category === "capela") {
    link("images/capela-01.jpg", "images/capela-03.jpg"); link("images/capela-03.jpg", "note-rest", true);
  }
  if (category === "toate") {
    link("images/exterior-05.jpg", "images/detalii-01.jpg"); link("images/detalii-05.jpg", "images/interior-01.jpg"); link("images/interior-15.jpg", "images/capela-01.jpg");
  }
  return conns;
}

function drawGalleryLinks(category) {
  if (!galleryLinks || !galleryPanel) return;
  const mobile = window.matchMedia("(max-width: 699px)").matches;
  if (mobile) { galleryLinks.replaceChildren(); galleryLinks.style.display = "none"; return; }
  galleryLinks.style.display = "block";
  const panelRect = galleryPanel.getBoundingClientRect();
  const w = panelRect.width, h = panelRect.height;
  galleryLinks.setAttribute("viewBox", `0 0 ${w} ${h}`);
  galleryLinks.setAttribute("width", w); galleryLinks.setAttribute("height", h);
  galleryLinks.replaceChildren();
  const visibleIds = new Set([...galleryBoard.querySelectorAll(".item:not([hidden]), .gallery-note:not([hidden])")].map((el) => el.dataset.id));
  const byId = new Map([...photoItems, ...noteItems].map((it) => [it.id, it.el]));
  getConnections(category, visibleIds).forEach((conn) => {
    const a = byId.get(conn.from), b = byId.get(conn.to);
    if (!a || !b || a.hidden || b.hidden) return;
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    const ax = ra.left - panelRect.left + ra.width / 2, ay = ra.top - panelRect.top + ra.height / 2;
    const bx = rb.left - panelRect.left + rb.width / 2, by = rb.top - panelRect.top + rb.height / 2;
    const dx = (bx - ax) * 0.2, dy = Math.max(24, Math.abs(by - ay) * 0.2);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${ax} ${ay} C ${ax + dx} ${ay + dy}, ${bx - dx} ${by - dy}, ${bx} ${by}`);
    if (conn.soft) path.classList.add("is-soft");
    galleryLinks.append(path);
    [[ax, ay], [bx, by]].forEach(([cx, cy]) => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", "3.5"); galleryLinks.append(c);
    });
  });
}

function filterGallery(category) {
  currentCategory = category; visible = [];
  const order = buildOrder(category);
  const visibleSet = new Set(order.map((it) => it.id));
  [...photoItems, ...noteItems].forEach((it) => { it.el.hidden = !visibleSet.has(it.id); });
  order.forEach((it) => galleryBoard.append(it.el));
  order.forEach((it) => { if (it.type === "photo") visible.push(it.p); });
  filterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === category)));
  if (galleryStatus) galleryStatus.textContent = `Se afișează ${visible.length} fotografii pentru filtrul ${CAT_LABELS[category] || category}.`;
  requestAnimationFrame(() => drawGalleryLinks(category));
}
filterBtns.forEach((b) => b.addEventListener("click", () => filterGallery(b.dataset.filter)));
filterGallery("toate");
window.addEventListener("resize", () => requestAnimationFrame(() => drawGalleryLinks(currentCategory)));
window.addEventListener("load", () => drawGalleryLinks(currentCategory));
if ("ResizeObserver" in window && galleryPanel) new ResizeObserver(() => drawGalleryLinks(currentCategory)).observe(galleryPanel);

lbPrev?.addEventListener("click", () => moveLightbox(-1));
lbNext?.addEventListener("click", () => moveLightbox(1));
lbClose?.addEventListener("click", () => lightbox?.close());
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
lightbox?.addEventListener("close", () => { if (lastFocus && document.contains(lastFocus)) lastFocus.focus(); });
lightbox?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { e.preventDefault(); moveLightbox(-1); }
  if (e.key === "ArrowRight") { e.preventDefault(); moveLightbox(1); }
  if (e.key !== "Tab") return;
  const focusable = $$("button:not([disabled])", lightbox).filter((el) => el.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* Map */
(function initMap() {
  const mapEl = $("#map");
  const list = $("#poiList");
  const note = $("#mapNote");
  if (!mapEl || !list) return;
  let map = null;
  let markers = [];
  if (typeof L !== "undefined") {
    map = L.map(mapEl, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    markers = PLACES.map((p) => {
      const m = L.marker(p.coords).addTo(map);
      const popup = document.createElement("div");
      const strong = document.createElement("strong");
      const text = document.createElement("p");
      strong.textContent = p.name;
      text.textContent = p.text;
      popup.append(strong, text);
      m.bindPopup(popup);
      return m;
    });
    map.setView(PLACES[0].coords, 11);
    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());
    const refresh = () => map.invalidateSize();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    if ("ResizeObserver" in window) new ResizeObserver(refresh).observe(mapEl);
  } else {
    if (note) note.hidden = false;
    mapEl.hidden = true;
  }
  PLACES.forEach((p, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "poi-btn";
    const b = document.createElement("strong");
    b.textContent = p.name;
    const s = document.createElement("span");
    s.textContent = p.short;
    btn.append(b, s);
    btn.addEventListener("click", () => {
      $$(".poi-btn", list).forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      if (map) { map.invalidateSize(); map.flyTo(p.coords, 12, { duration: 0.8 }); markers[i].openPopup(); }
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
})();

/* Quiz */
const quizBox = $("#quizBox");
const quizResult = $("#quizResult");
const qCount = $("#qCount");
const qScore = $("#qScore");
const qBar = $("#qBar");
const qText = $("#qText");
const qOptions = $("#qOptions");
const qWhy = $("#qWhy");
const qNext = $("#qNext");
const qRestart = $("#qRestart");
const rScore = $("#rScore");
const rMsg = $("#rMsg");
let qIndex = 0, points = 0, answered = false;

function shuffleOptions(q) {
  const items = q.options.map((text, i) => ({ text, ok: i === q.correct }));
  for (let i = items.length - 1; i > 0; i--) { const k = Math.floor(Math.random() * (i + 1)); [items[i], items[k]] = [items[k], items[i]]; }
  return items;
}
function renderQuestion(focusFirst = true) {
  const q = QUIZ[qIndex];
  answered = false;
  const opts = shuffleOptions(q);
  const correctText = q.options[q.correct];
  qCount.textContent = `Întrebarea ${qIndex + 1} din ${QUIZ.length}`;
  qScore.textContent = `${points} corecte`;
  qBar.style.width = `${(qIndex / QUIZ.length) * 100}%`;
  qText.textContent = q.q;
  qWhy.textContent = "";
  qWhy.hidden = true;
  qNext.hidden = true;
  qOptions.replaceChildren();
  opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "q-opt";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      $$("button", qOptions).forEach((b) => { b.disabled = true; if (b.textContent === correctText) b.classList.add("right"); });
      if (opt.ok) { points++; qWhy.textContent = "Corect! " + q.why; }
      else { btn.classList.add("wrong"); qWhy.textContent = "Răspunsul corect: " + correctText + ". " + q.why; }
      qWhy.hidden = false;
      qScore.textContent = `${points} corecte`;
      qBar.style.width = `${((qIndex + 1) / QUIZ.length) * 100}%`;
      qNext.textContent = qIndex === QUIZ.length - 1 ? "Vezi rezultatul" : "Următoarea";
      qNext.hidden = false;
      qNext.focus();
    });
    qOptions.appendChild(btn);
    if (i === 0 && focusFirst) requestAnimationFrame(() => btn.focus());
  });
}
qNext?.addEventListener("click", () => {
  if (!answered) return;
  qIndex++;
  if (qIndex < QUIZ.length) { renderQuestion(false); return; }
  quizBox.hidden = true;
  quizResult.hidden = false;
  rScore.textContent = `${points} din ${QUIZ.length}`;
  const ratio = points / QUIZ.length;
  rMsg.textContent = ratio === 1 ? "Excelent! Ai răspuns corect la toate întrebările." : ratio >= 0.6 ? "Bine! Mai poți reciti informațiile și încerca din nou." : "Recitește secțiunile despre biserică, apoi încearcă din nou.";
  qRestart?.focus();
});
qRestart?.addEventListener("click", () => { qIndex = 0; points = 0; quizResult.hidden = true; quizBox.hidden = false; renderQuestion(); });
renderQuestion(false);

/* Contact */
const form = $("#contactForm");
const formStatus = $("#formStatus");
const formBtn = $("#submitBtn");
function endpoint() { return (form?.dataset.formspree || FORMSPREE_ENDPOINT || "").trim(); }
function isFormspree(u) { return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+\/?$/.test(u); }
function setStatus(msg, type = "") {
  if (!formStatus) return;
  formStatus.hidden = !msg;
  formStatus.textContent = msg;
  formStatus.className = "form-status" + (type ? " " + type : "");
}
function setFieldError(id, msg) {
  const input = $("#" + id);
  const err = $("#" + id + "Err");
  if (err) err.textContent = msg;
  input?.setAttribute("aria-invalid", msg ? "true" : "false");
  input?.closest(".field")?.classList.toggle("invalid", Boolean(msg));
  return !msg;
}
function validate(showFocus = true) {
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();
  const checks = [
    ["name", name.length < 2 ? "Introdu un nume de cel puțin 2 caractere." : ""],
    ["email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "Introdu o adresă de email validă."],
    ["message", message.length < 10 ? "Mesajul trebuie să conțină cel puțin 10 caractere." : ""]
  ];
  const ok = checks.map(([id, msg]) => setFieldError(id, msg));
  if (showFocus && !ok.every(Boolean)) { const first = checks.find(([, msg]) => msg); if (first) $("#" + first[0])?.focus(); }
  return { ok: ok.every(Boolean), name, email, message };
}
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("");
  const { ok, name, email, message } = validate(true);
  if (!ok) return;
  const url = endpoint();
  if (!url || url.includes("YOUR_FORM_ID")) {
    setStatus("Mesajul nu a putut fi trimis momentan. Încearcă din nou mai târziu.", "info");
    return;
  }
  if (!isFormspree(url)) { setStatus("Mesajul nu a putut fi trimis. Încearcă din nou mai târziu.", "error"); return; }
  if (formBtn) { formBtn.disabled = true; formBtn.textContent = "Se trimite..."; }
  setStatus("Se trimite mesajul...", "info");
  try {
    const res = await fetch(url, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message, _subject: "Mesaj nou de pe site-ul Biserica de lemn din Brătești", _replyto: email }) });
    if (!res.ok) {
      let errMsg = "Mesajul nu a putut fi trimis. Verifică endpoint-ul sau conexiunea.";
      try { const data = await res.json(); if (data?.errors?.[0]?.message) errMsg = data.errors[0].message; } catch {}
      throw new Error(errMsg);
    }
    form.reset();
    ["name", "email", "message"].forEach((id) => setFieldError(id, ""));
    setStatus("Mesajul a fost trimis cu succes. Mulțumesc!", "success");
  } catch (err) {
    setStatus(err?.message || "Mesajul nu a putut fi trimis. Încearcă din nou.", "error");
  } finally {
    if (formBtn) { formBtn.disabled = false; formBtn.textContent = "Trimite mesajul"; }
  }
});
["name", "email", "message"].forEach((id) => $("#" + id)?.addEventListener("input", () => setFieldError(id, "")));
