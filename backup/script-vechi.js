"use strict";

// Pune fotografiile în folderul images/ și denumește-le ca mai jos.
// Poți schimba titlurile în orice moment. Nu trebuie modificat alt cod.
const PHOTOS = [

  // EXTERIOR
  {src:"images/exterior-01.jpg",category:"exterior",title:"Fațada bisericii",note:""},
  {src:"images/exterior-02.jpg",category:"exterior",title:"Biserica în peisaj",note:""},
  {src:"images/exterior-03.jpg",category:"exterior",title:"Turnul bisericii",note:""},
  {src:"images/exterior-05.jpg",category:"exterior",title:"Vedere laterală",note:""},
  {src:"images/exterior-06.jpg",category:"exterior",title:"Fântâna din curtea bisericii",note:""},

  // INTERIOR
  {src:"images/interior-01.jpg",category:"interior",title:"Interior – vedere generală I",note:""},
  {src:"images/interior-02.jpg",category:"interior",title:"Interior – vedere generală II",note:""},
  {src:"images/interior-03.jpg",category:"interior",title:"Interior – vedere generală III",note:""},
  {src:"images/interior-04.jpg",category:"interior",title:"Interior – Strana de lectura",note:""},
  {src:"images/interior-05.jpg",category:"interior",title:"Altarul bisericii",note:""},
  {src:"images/interior-06.jpg",category:"interior",title:"Iconostasul",note:""},
  {src:"images/interior-09.jpg",category:"interior",title:"Pictura murală I",note:""},
  {src:"images/interior-10.jpg",category:"interior",title:"Pictura cu sfinți ierarhi",note:""},
  {src:"images/interior-11.jpg",category:"interior",title:"Pictura murală II",note:""},
  {src:"images/interior-12.jpg",category:"interior",title:"Pictura murală III",note:""},
  {src:"images/interior-13.jpg",category:"interior",title:"Bolta pictată I",note:""},
  {src:"images/interior-14.jpg",category:"interior",title:"Bolta pictată II",note:""},
  {src:"images/interior-15.jpg",category:"interior",title:"Icoane și obiecte de cult",note:""},
  {src:"images/interior-18.jpg",category:"interior",title:"Detalii din interior",note:""},

  // DETALII
  {src:"images/detalii-01.jpg",category:"detalii",title:"Îmbinarea bârnelor",note:""},
  {src:"images/detalii-03.jpg",category:"detalii",title:"Toaca bisericii",note:""},
  {src:"images/detalii-04.jpg",category:"detalii",title:"Intrarea in Biserica",note:""},
  {src:"images/detalii-05.jpg",category:"detalii",title:"Poarta tradițională sculptată",note:""},
  {src:"images/detalii-06.webp",category:"detalii",title:"Poarta tradițională din lemn",note:""},

  // CAPELA MORTUARĂ (clădirea alăturată bisericii)
  {src:"images/capela-01.jpg",category:"capela",title:"Exteriorul capelei",note:"Exteriorul capelei mortuare"},
  {src:"images/capela-02.jpg",category:"capela",title:"Prapuri și icoane din capelă",note:"Prapuri tradiționali și icoane"},
  {src:"images/capela-03.jpg",category:"capela",title:"Interiorul capelei – icoane și mobilier",note:"Detalii din interiorul capelei"},
  {src:"images/capela-04.jpg",category:"capela",title:"Amenajarea interioară a capelei",note:"Mobilier și obiecte religioase"}
];

// Video opțional: lipește linkul de embed YouTube ("https://www.youtube.com/embed/ID_VIDEO").
// Cât timp rămâne "", secțiunea video nu apare deloc în pagină.
const VIDEO_URL = "";

const PLACES = [
  {name:"Biserica Sf. Teodor Tiron – Brătești",coords:[46.76266,22.19016],short:"Monument istoric: BH-II-m-B-01122",text:"Biserica de lemn din Brătești, comuna Răbăgani. Construită în secolul al XVIII-lea la Sitani și mutată la Brătești în anii 1976–1978."},
  {name:"Beiuș",coords:[46.667,22.353],short:"Orașul din apropiere",text:"Oraș din județul Bihor, situat pe Crișul Negru."},
  {name:"Lazuri de Beiuș",coords:[46.593,22.404],short:"Comună pe Crișul Negru",text:"Reședința comunei cu același nume, pe cursul superior al Crișului Negru, între Beiuș și Ștei."},
  {name:"Peștera Meziad",coords:[46.7626,22.4784],short:"Peșteră turistică",text:"Peșteră din Munții Apuseni, în satul Meziad, cu aproape 4,75 km de galerii; declarată rezervație naturală în 2000. Se vizitează doar cu ghid."},
  {name:"Stâna de Vale",coords:[46.693,22.667],short:"Stațiune montană",text:"Stațiune din Munții Apuseni; poziția marcajului este aproximativă."}
];

const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

// Meniu mobil, temă, header și an curent.
if("scrollRestoration" in history) history.scrollRestoration="manual";
if(!location.hash) window.scrollTo(0,0);
window.addEventListener("load",()=>{ if(!location.hash) window.scrollTo(0,0); },{once:true});
const navToggle=$("#navToggle"), navLinks=$("#navLinks"), header=$("#siteHeader"), themeToggle=$("#themeToggle"), backTop=$("#backTop");
const themeMq=window.matchMedia("(prefers-color-scheme: dark)");
const getSavedTheme=()=>{ try { return localStorage.getItem("theme"); } catch { return null; } };
const applyTheme=(theme,save)=>{
  const t=theme==="dark"?"dark":"light";
  document.documentElement.dataset.theme=t;
  const metaTheme=document.querySelector('meta[name="theme-color"]');
  if(metaTheme) metaTheme.content=t==="dark"?"#171311":"#f3ece0";
  if(themeToggle){
    const dark=t==="dark";
    themeToggle.setAttribute("aria-pressed",String(dark));
    themeToggle.setAttribute("aria-label",dark?"Activează tema luminoasă":"Activează tema întunecată");
    themeToggle.title=dark?"Comută la tema luminoasă":"Comută la tema întunecată";
  }
  if(save){ try { localStorage.setItem("theme",t); } catch {} }
};
applyTheme(getSavedTheme() || (themeMq.matches?"dark":"light"), false);
themeToggle?.addEventListener("click",()=>applyTheme(document.documentElement.dataset.theme==="dark"?"light":"dark", true));
themeMq.addEventListener?.("change",e=>{ if(!getSavedTheme()) applyTheme(e.matches?"dark":"light", false); });

const setMenu=(open)=>{
  navLinks.classList.toggle("open",open);
  navToggle.setAttribute("aria-expanded",String(open));
  navToggle.setAttribute("aria-label",open?"Închide meniul":"Deschide meniul");
  header.classList.toggle("menu-open",open);
};
navToggle.addEventListener("click",()=>setMenu(!navLinks.classList.contains("open")));
$$("a",navLinks).forEach(a=>a.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{
  if(e.key==="Escape" && navLinks.classList.contains("open")){ setMenu(false); navToggle.focus(); }
});
document.addEventListener("click",e=>{
  if(navLinks.classList.contains("open") && !header.contains(e.target)) setMenu(false);
});
const syncHeader=()=>{
  header.classList.toggle("scrolled", window.scrollY > 24);
  backTop?.classList.toggle("visible", window.scrollY > 520);
};
window.addEventListener("scroll",syncHeader,{passive:true});
syncHeader();
backTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
$("#year").textContent=new Date().getFullYear();

// Galerie: toate fotografiile din PHOTOS, panou aerisit, note, linii SVG, filtre și lightbox.
function placeholder(p){
  const title=p.title.replace(/[&<>"']/g,"");
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600"><rect width="900" height="600" fill="#d3c0a3"/><rect x="30" y="30" width="840" height="540" fill="none" stroke="#997857" stroke-width="2"/><text x="450" y="280" font-family="Georgia" font-size="34" text-anchor="middle" fill="#493828">${title}</text><text x="450" y="330" font-family="sans-serif" font-size="19" text-anchor="middle" fill="#6d5744">Adaugă fotografia în folderul images/</text></svg>`;
  return "data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg);
}
function setImg(img,p){img.onerror=()=>{img.onerror=null;img.src=placeholder(p);};img.src=p.src;}
const gallery=$("#gallery"), galleryPanel=$("#galleryPanel"), galleryLinks=$("#galleryLinks"), galleryStatus=$("#galleryStatus"), dialog=$("#lb");
let visiblePhotos=[], photoIndex=0, lastGalleryFocus=null;
const CATEGORY_LABELS={exterior:"Exterior",interior:"Interior",detalii:"Detalii și tradiții",capela:"Capela mortuară"};
const CATEGORY_NOTES={exterior:"Exterior · lemn și acoperiș",interior:"Interior · pictură și credință",detalii:"Detaliu · meșteșug local",capela:"Capelă · memorie și tradiție"};

const GALLERY_NOTES=[
  {id:"note-origin",title:"Secolul XVIII",text:"Biserica de lemn a fost ridicată în secolul al XVIII-lea, înainte de mutarea la Brătești.",cats:["toate","exterior","detalii"],tilt:-.8},
  {id:"note-move",title:"Mutare 1976–1978",text:"Lăcașul a fost adus din satul Sitani și reconstruit la Brătești între 1976 și 1978.",cats:["toate","exterior"],tilt:1.1},
  {id:"note-brau",title:"Brâul median",text:"Brâul median din lemn înconjoară biserica și evidențiază meșteșugul tradițional.",cats:["toate","exterior","detalii"],tilt:-.7},
  {id:"note-rest",title:"Restaurare 2009",text:"Restaurarea din 2009 a refăcut șarpanta și învelitoarea, păstrând spiritul vechi.",cats:["toate","interior","capela"],tilt:1}
];

function makePhoto(p,idx){
  const fig=document.createElement("figure");
  fig.className="item"; fig.tabIndex=0; fig.dataset.id=p.src; fig.dataset.category=p.category;
  fig.style.setProperty("--tilt",`${((idx%5)-2)*0.6}deg`);
  fig.setAttribute("role","button"); fig.setAttribute("aria-label","Mărește fotografia: "+p.title);
  const frame=document.createElement("div"); frame.className="frame";
  const img=document.createElement("img"); img.alt=p.title; img.loading="lazy"; setImg(img,p); frame.append(img);
  const cap=document.createElement("figcaption");
  const meta=document.createElement("div"); meta.className="item-meta";
  const tag=document.createElement("span"); tag.className="item-tag"; tag.textContent=CATEGORY_LABELS[p.category]||p.category;
  const mark=document.createElement("span"); mark.className="item-mark"; mark.textContent="Brătești";
  meta.append(tag,mark);
  const title=document.createElement("b"); title.textContent=p.title;
  const note=document.createElement("p"); note.className="item-note"; note.textContent=p.note||CATEGORY_NOTES[p.category]||"Detaliu din ansamblu";
  cap.append(meta,title,note); fig.append(frame,cap);
  const open=()=>{photoIndex=visiblePhotos.indexOf(p);if(photoIndex<0)return;lastGalleryFocus=fig;renderLightbox();if(!dialog.open)dialog.showModal();};
  fig.addEventListener("click",open);
  fig.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  return {type:"photo",id:p.src,category:p.category,el:fig,p};
}
function makeNote(n){
  const card=document.createElement("article");
  card.className="gallery-note"; card.dataset.id=n.id;
  card.style.setProperty("--tilt",`${n.tilt}deg`);
  const b=document.createElement("b"); b.textContent=n.title;
  const p=document.createElement("p"); p.textContent=n.text;
  card.append(b,p);
  return {type:"note",id:n.id,cats:n.cats,el:card,n};
}

const photoItems=PHOTOS.map(makePhoto);
const noteItems=GALLERY_NOTES.map(makeNote);
const photoBySrc=new Map(photoItems.map(it=>[it.id,it]));
const noteById=new Map(noteItems.map(it=>[it.id,it]));

function buildOrder(category){
  const photos=photoItems.filter(it=>category==="toate"||it.category===category);
  const notes=noteItems.filter(it=>it.cats.includes(category));
  const order=[]; const used=new Set();
  const pushNote=id=>{const n=noteById.get(id); if(n && !used.has(id) && notes.includes(n)){used.add(id); order.push(n);}};
  const pushPhoto=it=>{if(!used.has(it.id)){used.add(it.id); order.push(it);}};

  if(category==="toate"){
    photos.forEach((it,i)=>{
      pushPhoto(it);
      if(it.id==="images/exterior-03.jpg") pushNote("note-origin");
      if(it.id==="images/exterior-06.jpg") pushNote("note-move");
      if(it.id==="images/interior-10.jpg") pushNote("note-rest");
      if(it.id==="images/detalii-05.jpg") pushNote("note-brau");
    });
  } else {
    photos.forEach((it,i)=>{ pushPhoto(it); if(i===1) notes.forEach(n=>pushNote(n.id)); });
  }
  notes.forEach(n=>pushNote(n.id));
  return order;
}

function getConnections(category, visibleIds){
  const has=id=>visibleIds.has(id);
  const conns=[];
  const link=(a,b,soft=false)=>{ if(has(a)&&has(b)) conns.push({from:a,to:b,soft}); };
  if(category==="toate"||category==="exterior"){
    link("images/exterior-01.jpg","images/exterior-03.jpg"); link("images/exterior-03.jpg","images/exterior-05.jpg");
    link("images/exterior-01.jpg","note-origin",true); link("images/exterior-05.jpg","note-move",true);
  }
  if(category==="toate"||category==="interior"){
    link("images/interior-01.jpg","images/interior-06.jpg"); link("images/interior-06.jpg","images/interior-10.jpg");
    link("images/interior-10.jpg","note-rest",true);
  }
  if(category==="toate"||category==="detalii"){
    link("images/detalii-01.jpg","images/detalii-04.jpg"); link("images/detalii-04.jpg","note-brau",true);
  }
  if(category==="toate"||category==="capela"){
    link("images/capela-01.jpg","images/capela-03.jpg"); link("images/capela-03.jpg","note-rest",true);
  }
  if(category==="toate"){
    link("images/exterior-05.jpg","images/detalii-01.jpg"); link("images/detalii-05.jpg","images/interior-01.jpg"); link("images/interior-15.jpg","images/capela-01.jpg");
  }
  return conns;
}

function drawGalleryLinks(category){
  if(!galleryLinks||!galleryPanel) return;
  const mobile=window.matchMedia("(max-width: 699px)").matches;
  if(mobile){galleryLinks.replaceChildren();galleryLinks.style.display="none";return;}
  galleryLinks.style.display="block";
  const panelRect=galleryPanel.getBoundingClientRect();
  const w=panelRect.width, h=panelRect.height;
  galleryLinks.setAttribute("viewBox",`0 0 ${w} ${h}`);
  galleryLinks.setAttribute("width",w); galleryLinks.setAttribute("height",h);
  galleryLinks.replaceChildren();
  const visibleIds=new Set([...gallery.querySelectorAll(".item:not([hidden]), .gallery-note:not([hidden])")].map(el=>el.dataset.id));
  const byId=new Map([...photoItems,...noteItems].map(it=>[it.id,it.el]));
  getConnections(category,visibleIds).forEach(conn=>{
    const a=byId.get(conn.from), b=byId.get(conn.to);
    if(!a||!b||a.hidden||b.hidden) return;
    const ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect();
    const ax=ra.left-panelRect.left+ra.width/2, ay=ra.top-panelRect.top+ra.height/2;
    const bx=rb.left-panelRect.left+rb.width/2, by=rb.top-panelRect.top+rb.height/2;
    const dx=(bx-ax)*0.2, dy=Math.max(24, Math.abs(by-ay)*0.2);
    const path=document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d",`M ${ax} ${ay} C ${ax+dx} ${ay+dy}, ${bx-dx} ${by-dy}, ${bx} ${by}`);
    if(conn.soft) path.classList.add("is-soft");
    galleryLinks.append(path);
    [[ax,ay],[bx,by]].forEach(([cx,cy])=>{
      const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
      c.setAttribute("cx",cx); c.setAttribute("cy",cy); c.setAttribute("r","3.5"); galleryLinks.append(c);
    });
  });
}

let currentCategory="toate";
function filterGallery(category){
  currentCategory=category; visiblePhotos=[];
  const order=buildOrder(category);
  const visible=new Set(order.map(it=>it.id));
  [...photoItems,...noteItems].forEach(it=>{ it.el.hidden=!visible.has(it.id); });
  order.forEach(it=>gallery.append(it.el));
  order.forEach(it=>{ if(it.type==="photo") visiblePhotos.push(it.p); });
  $$(".filters button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===category)));
  if(galleryStatus) galleryStatus.textContent=`Se afișează ${visiblePhotos.length} fotografii pentru filtrul ${CATEGORY_LABELS[category]||category}.`;
  requestAnimationFrame(()=>drawGalleryLinks(category));
}
$$(".filters button").forEach(b=>b.addEventListener("click",()=>filterGallery(b.dataset.filter)));
filterGallery("toate");
window.addEventListener("resize",()=>requestAnimationFrame(()=>drawGalleryLinks(currentCategory)));
window.addEventListener("load",()=>drawGalleryLinks(currentCategory));
if("ResizeObserver" in window && galleryPanel) new ResizeObserver(()=>drawGalleryLinks(currentCategory)).observe(galleryPanel);

function renderLightbox(){
  const p=visiblePhotos[photoIndex]; if(!p) return;
  setImg($("#lbImg"),p); $("#lbImg").alt=p.title;
  const cat=CATEGORY_LABELS[p.category]||p.category;
  $("#lbTitle").textContent=p.title;
  $("#lbMeta").textContent=[cat,p.note].filter(Boolean).join(" · ") + ` · ${photoIndex+1}/${visiblePhotos.length}`;
}
function movePhoto(delta){if(!visiblePhotos.length)return;photoIndex=(photoIndex+delta+visiblePhotos.length)%visiblePhotos.length;renderLightbox();}
$("#lbPrev").addEventListener("click",()=>movePhoto(-1));
$("#lbNext").addEventListener("click",()=>movePhoto(1));
$("#lbClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener("close",()=>{ if(lastGalleryFocus && document.contains(lastGalleryFocus)) lastGalleryFocus.focus(); });
dialog.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft"){ e.preventDefault(); movePhoto(-1); }
  if(e.key==="ArrowRight"){ e.preventDefault(); movePhoto(1); }
  if(e.key!=="Tab") return;
  const focusable=$$("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",dialog).filter(el=>el.offsetParent!==null);
  if(!focusable.length) return;
  const first=focusable[0], last=focusable[focusable.length-1];
  if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
});
let touchStart=null;
dialog.addEventListener("touchstart",e=>{touchStart=e.touches[0].clientX;},{passive:true});
dialog.addEventListener("touchend",e=>{if(touchStart===null)return;const dx=e.changedTouches[0].clientX-touchStart;if(Math.abs(dx)>50)movePhoto(dx<0?1:-1);touchStart=null;},{passive:true});

// Meniul marchează secțiunea în care te afli.
if("IntersectionObserver" in window){
  const links=$$("a",navLinks);
  const spy=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      links.forEach(a=>a.setAttribute("aria-current",String(a.getAttribute("href")==="#"+en.target.id)));
    });
  },{rootMargin:"-45% 0px -50% 0px"});
  $$("main section[id]").forEach(s=>spy.observe(s));
}

// Video: apare doar dacă VIDEO_URL este completat; iframe-ul se încarcă la click.
(function initVideo(){
  const block=$("#videoBlock");if(!block)return;
  if(!VIDEO_URL){block.hidden=true;return;}
  $("#videoBtn").addEventListener("click",()=>{
      const f=document.createElement("iframe");
      f.src=VIDEO_URL+(VIDEO_URL.includes("?")?"&":"?")+"autoplay=1";
      f.title="Video despre biserica de lemn";f.loading="lazy";f.allow="autoplay; encrypted-media; picture-in-picture";f.allowFullscreen=true;
      $("#videoBox").replaceChildren(f);
  });
})();

// Hartă interactivă (secțiunea 01 Locul).
(function initMap(){
  const list=$("#poiList");let map=null,markers=[];
  if(typeof L!=="undefined"){
    const mapEl=$("#map");
    map=L.map(mapEl,{scrollWheelZoom:false});
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    markers=PLACES.map(p=>{
      const marker=L.marker(p.coords).addTo(map);
      const popup=document.createElement("div"),strong=document.createElement("strong"),descr=document.createElement("p");
      strong.textContent=p.name;descr.textContent=p.text;popup.append(strong,descr);marker.bindPopup(popup);
      return marker;
    });
    map.setView(PLACES[0].coords,11);
    map.on("click",()=>map.scrollWheelZoom.enable());map.on("mouseout",()=>map.scrollWheelZoom.disable());
    const refreshMap=()=>map.invalidateSize();
    window.addEventListener("load",refreshMap);
    window.addEventListener("resize",refreshMap);
    if("ResizeObserver" in window) new ResizeObserver(refreshMap).observe(mapEl);
  }else{$("#mapNote").hidden=false;$("#map").hidden=true;}
  PLACES.forEach((p,i)=>{
    const li=document.createElement("li"),btn=document.createElement("button"),b=document.createElement("b"),span=document.createElement("span");
    btn.type="button";b.textContent=p.name;span.textContent=p.short;btn.append(b,span);li.append(btn);
    const osm=document.createElement("a");osm.className="poi-osm";osm.textContent="Vezi pe OpenStreetMap";osm.target="_blank";osm.rel="noopener noreferrer";
    osm.href=`https://www.openstreetmap.org/?mlat=${p.coords[0]}&mlon=${p.coords[1]}#map=15/${p.coords[0]}/${p.coords[1]}`;
    li.append(osm);list.append(li);
    btn.addEventListener("click",()=>{
      $$("button",list).forEach(x=>x.classList.remove("on"));btn.classList.add("on");
      if(map){map.invalidateSize();map.flyTo(p.coords,12,{duration:.8});markers[i].openPopup();}
    });
  });
})();

// Quiz: corectare imediată și reluare. Întrebările se bazează pe textul din secțiunile Locul și Biserica.
const QUIZ=[
  {q:"Care este hramul Bisericii de lemn din Brătești?",options:["Sfântul Nicolae","Sfântul Teodor Tiron","Sfântul Gheorghe","Sfântul Ilie"],correct:1,why:"Biserica din Brătești are hramul „Sfântul Teodor Tiron”."},
  {q:"În ce secol este datată biserica de lemn din Brătești?",options:["Secolul al XVI-lea","Secolul al XVII-lea","Secolul al XVIII-lea","Secolul al XIX-lea"],correct:2,why:"Sursele indică ani diferiți, dar datarea sigură folosită în proiect este secolul al XVIII-lea."},
  {q:"Din ce sat a fost adusă biserica la Brătești?",options:["Sitani","Meziad","Lazuri de Beiuș","Răbăgani"],correct:0,why:"Biserica a fost construită inițial în satul Sitani, apoi mutată la Brătești."},
  {q:"În ce perioadă a fost mutată biserica din Sitani la Brătești?",options:["1900–1902","1956–1958","1976–1978","2009–2010"],correct:2,why:"Mutarea și reconstrucția la Brătești au avut loc între anii 1976 și 1978."},
  {q:"Ce parte a bisericii adăpostește clopotele?",options:["Pridvorul","Altarul","Turnul-clopotniță","Naosul"],correct:2,why:"Clopotele se află în turnul-clopotniță, elementul vertical caracteristic al bisericii."},
  {q:"Ce lucrări importante au fost realizate în restaurarea din 2009?",options:["Au fost schimbate șarpanta și învelitoarea","A fost reconstruită fundația din piatră","A fost înlocuit iconostasul vechi","A fost adăugat un pridvor nou de beton"],correct:0,why:"Restaurarea din 2009 a schimbat șarpanta și învelitoarea, readucând biserica mai aproape de imaginea inițială."},
  {q:"Cine a realizat proiectul de restaurare din 2009?",options:["Arhitectul orădean Cristian Pușcaș","Pictorul bisericii din Sitani","Preotul paroh din Brătești","Un meșter anonim din Beiuș"],correct:0,why:"Proiectul de restaurare a fost realizat de arhitectul orădean Cristian Pușcaș, la cererea Parohiei Brătești."},
  {q:"Ce element decorativ din lemn se remarcă la biserica din Brătești?",options:["Brâul median din lemn","Cupola din piatră","Vitraliile gotice","Colonadele de marmură"],correct:0,why:"Brâul median din lemn este un element distinctiv care evidențiază meșteșugul tradițional."}
];
let question=0,points=0,answered=false;
// Amestecă ordinea răspunsurilor (Fisher–Yates), ca varianta corectă să nu fie mereu pe aceeași poziție.
function shuffleOptions(q){
  const items=q.options.map((text,i)=>({text,ok:i===q.correct}));
  for(let i=items.length-1;i>0;i--){const k=Math.floor(Math.random()*(i+1));[items[i],items[k]]=[items[k],items[i]];}
  return items;
}
function renderQuestion(focusFirst=true){
  const q=QUIZ[question];answered=false;
  const opts=shuffleOptions(q),correctText=q.options[q.correct];
  $("#qCount").textContent=`Întrebarea ${question+1} din ${QUIZ.length}`;
  $("#qScore").textContent=`${points} corecte`;
  $("#qBar").style.width=`${question/QUIZ.length*100}%`;
  $("#qText").textContent=q.q;$("#qWhy").textContent="";$("#qNext").hidden=true;
  const wrap=$("#qOptions");wrap.replaceChildren();
  opts.forEach((opt,i)=>{
    const btn=document.createElement("button");btn.type="button";btn.className="q-opt";btn.textContent=opt.text;
    btn.addEventListener("click",()=>{
      if(answered)return;answered=true;
      $$("button",wrap).forEach(b=>{b.disabled=true;if(b.textContent===correctText)b.classList.add("right");});
      if(opt.ok){points++;$("#qWhy").textContent="Corect! "+q.why;}
      else{btn.classList.add("wrong");$("#qWhy").textContent="Răspunsul corect: "+correctText+". "+q.why;}
      $("#qScore").textContent=`${points} corecte`;
      $("#qBar").style.width=`${(question+1)/QUIZ.length*100}%`;
      $("#qNext").textContent=question===QUIZ.length-1?"Vezi rezultatul":"Următoarea";
      $("#qNext").hidden=false;
      $("#qNext").focus();
    });
    wrap.append(btn);
    if(i===0 && focusFirst) requestAnimationFrame(()=>btn.focus());
  });
}
$("#qNext").addEventListener("click",()=>{
  if(!answered)return;question++;
  if(question<QUIZ.length){renderQuestion(false);return;}
  $("#quizBox").hidden=true;$("#quizResult").hidden=false;
  $("#rScore").textContent=`${points} din ${QUIZ.length}`;
  const ratio=points/QUIZ.length;
  $("#rMsg").textContent=ratio===1?"Excelent! Ai răspuns corect la toate întrebările.":ratio>=0.6?"Bine! Mai poți reciti explicațiile și încerca din nou.":"Recitește secțiunile Locul și Biserica, apoi încearcă din nou.";
  $("#qRestart").focus();
});
$("#qRestart").addEventListener("click",()=>{question=0;points=0;$("#quizResult").hidden=true;$("#quizBox").hidden=false;renderQuestion();});
renderQuestion(false);

// Formular: validare locală + trimitere reală prin Formspree când endpoint-ul este configurat.
// Completează endpoint-ul în data-formspree pe #contactForm (index.html) sau aici:
const FORMSPREE_ENDPOINT = ""; // Exemplu: "https://formspree.io/f/abcdwxyz"
const form=$("#contactForm");
const formOk=$("#formOk");
const formBtn=form?.querySelector('button[type="submit"]');
const formEndpoint=()=> (form?.dataset.formspree || FORMSPREE_ENDPOINT || "").trim();
function isFormspreeEndpoint(endpoint){
  return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+\/?$/.test(endpoint);
}
function setFormStatus(message,type="info"){
  if(!formOk) return;
  formOk.hidden=!message;
  formOk.textContent=message;
  formOk.classList.toggle("is-error",type==="error");
  formOk.classList.toggle("is-info",type==="info");
  formOk.classList.toggle("is-sending",type==="sending");
}
function formError(id,message){
  const input=$("#"+id),err=$("#"+id+"Err");
  err.textContent=message;
  input.setAttribute("aria-invalid",message?"true":"false");
  input.closest(".field").classList.toggle("bad",Boolean(message));
  return !message;
}
function validateContact(showFocus=true){
  const name=$("#name").value.trim(),email=$("#email").value.trim(),message=$("#message").value.trim();
  const checks=[
    ["name",name.length<2?"Introdu un nume de cel puțin 2 caractere.":""],
    ["email",/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)?"":"Introdu o adresă de email validă."],
    ["message",message.length<10?"Mesajul trebuie să conțină cel puțin 10 caractere.":""]
  ];
  const ok=checks.map(([id,msg])=>formError(id,msg));
  if(showFocus && !ok.every(Boolean)){
    const firstBad=checks.find(([,msg])=>msg);
    if(firstBad) $("#"+firstBad[0]).focus();
  }
  return {ok:ok.every(Boolean),name,email,message};
}
form?.addEventListener("submit",async e=>{
  e.preventDefault(); setFormStatus("");
  const {ok,name,email,message}=validateContact(true);
  if(!ok) return;
  const endpoint=formEndpoint();
  if(!endpoint || endpoint.includes("YOUR_FORM_ID")){
    setFormStatus("Datele sunt valide. Formularul nu este încă conectat: adaugă endpoint-ul Formspree în atributul data-formspree al formularului (#contactForm, index.html) sau în FORMSPREE_ENDPOINT din script.js.","info");
    return;
  }
  if(!isFormspreeEndpoint(endpoint)){
    setFormStatus("Endpoint-ul Formspree nu pare valid. Folosește formatul https://formspree.io/f/ID.","error");
    return;
  }
  if(formBtn){ formBtn.disabled=true; formBtn.textContent="Se trimite..."; formBtn.setAttribute("aria-busy","true"); }
  setFormStatus("Se trimite mesajul...","sending");
  try{
    const res=await fetch(endpoint,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name,email,message,_subject:"Mesaj nou de pe site-ul Biserica de lemn din Brătești",_replyto:email})});
    if(!res.ok){
      let errMsg="Mesajul nu a putut fi trimis acum. Verifică endpoint-ul Formspree sau conexiunea și încearcă din nou.";
      try{ const data=await res.json(); if(data?.errors?.[0]?.message) errMsg=data.errors[0].message; }catch{}
      throw new Error(errMsg);
    }
    form.reset();
    ["name","email","message"].forEach(id=>formError(id,""));
    setFormStatus("Mesajul a fost trimis cu succes. Mulțumesc!","info");
  }catch(err){
    setFormStatus(err?.message || "Mesajul nu a putut fi trimis acum. Verifică endpoint-ul Formspree sau conexiunea și încearcă din nou.","error");
  }finally{
    if(formBtn){ formBtn.disabled=false; formBtn.textContent="Trimite mesajul"; formBtn.removeAttribute("aria-busy"); }
  }
});
["name","email","message"].forEach(id=>$("#"+id)?.addEventListener("input",()=>formError(id,"")));