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

const PLACES = [
  {name:"Biserica Sf. Teodor Tiron – Brătești",coords:[46.76266,22.19016],short:"Monument istoric: BH-II-m-B-01122",text:"Biserica de lemn din Brătești, comuna Răbăgani. Construită în secolul al XVIII-lea la Sitani și mutată la Brătești în anii 1976–1978."},
  {name:"Beiuș",coords:[46.65,22.35],short:"Orașul central",text:"Oraș din județul Bihor, situat pe Crișul Negru."},
  {name:"Lazuri de Beiuș",coords:[46.583,22.4],short:"Patrimoniu religios",text:"Localitate din Țara Beiușului, cu tradiții de arhitectură în lemn."},
  {name:"Peștera Meziad",coords:[46.751,22.428],short:"Obiectiv natural",text:"Peșteră cunoscută din apropierea Beiușului."},
  {name:"Stâna de Vale",coords:[46.693,22.667],short:"Stațiune montană",text:"Stațiune din Munții Apuseni; poziția marcajului este aproximativă."}
];

const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

// Meniu mobil și an curent.
const navToggle=$("#navToggle"), navLinks=$("#navLinks"), header=$("#siteHeader");
navToggle.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded",String(open));
  header.classList.toggle("menu-open",open);
});
$$("a",navLinks).forEach(a=>a.addEventListener("click",()=>{
  navLinks.classList.remove("open"); navToggle.setAttribute("aria-expanded","false"); header.classList.remove("menu-open");
}));
$("#year").textContent=new Date().getFullYear();

// Galerie: filtre funcționale + imagine de rezervă pentru fotografiile neadăugate.
function placeholder(p){
  const title=p.title.replace(/[&<>"']/g,"");
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600"><rect width="900" height="600" fill="#d3c0a3"/><rect x="30" y="30" width="840" height="540" fill="none" stroke="#997857" stroke-width="2"/><text x="450" y="280" font-family="Georgia" font-size="34" text-anchor="middle" fill="#493828">${title}</text><text x="450" y="330" font-family="sans-serif" font-size="19" text-anchor="middle" fill="#6d5744">Adaugă fotografia în folderul images/</text></svg>`;
  return "data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg);
}
function setImg(img,p){img.onerror=()=>{img.onerror=null;img.src=placeholder(p);};img.src=p.src;}
const gallery=$("#gallery"), dialog=$("#lb");
let visiblePhotos=PHOTOS.slice(),photoIndex=0;
const CATEGORY_LABELS={exterior:"Exterior",interior:"Interior",detalii:"Detalii și tradiții",capela:"Capela mortuară"};

const galleryItems=PHOTOS.map(p=>{
  const fig=document.createElement("figure");fig.className="item";fig.tabIndex=0;fig.setAttribute("role","button");fig.setAttribute("aria-label","Mărește fotografia: "+p.title);
  const frame=document.createElement("div");frame.className="frame";
  const img=document.createElement("img");img.alt=p.title;img.loading="lazy";setImg(img,p);frame.append(img);
  const cap=document.createElement("figcaption");const title=document.createElement("b"),category=document.createElement("span");
  title.textContent=p.title;category.textContent=CATEGORY_LABELS[p.category];cap.append(title,category);fig.append(frame,cap);
  const open=()=>{photoIndex=visiblePhotos.indexOf(p);if(photoIndex<0)return;renderLightbox();if(!dialog.open)dialog.showModal();};
  fig.addEventListener("click",open);fig.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  gallery.append(fig);return {p,fig};
});

function filterGallery(category){
  visiblePhotos=[];
  galleryItems.forEach(({p,fig})=>{const show=category==="toate"||p.category===category;fig.hidden=!show;if(show)visiblePhotos.push(p);});
  $$(".filters button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===category)));
}
$$(".filters button").forEach(b=>b.addEventListener("click",()=>filterGallery(b.dataset.filter)));
filterGallery("toate");

function renderLightbox(){const p=visiblePhotos[photoIndex];if(!p)return;setImg($("#lbImg"),p);$("#lbImg").alt=p.title;$("#lbCap").textContent=`${p.title}${p.note ? " · " + p.note : ""} (${photoIndex+1}/${visiblePhotos.length})`;}
function movePhoto(delta){if(!visiblePhotos.length)return;photoIndex=(photoIndex+delta+visiblePhotos.length)%visiblePhotos.length;renderLightbox();}
$("#lbPrev").addEventListener("click",()=>movePhoto(-1));
$("#lbNext").addEventListener("click",()=>movePhoto(1));
$("#lbClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")movePhoto(-1);if(e.key==="ArrowRight")movePhoto(1);});
let touchStart=null;
dialog.addEventListener("touchstart",e=>{touchStart=e.touches[0].clientX;},{passive:true});
dialog.addEventListener("touchend",e=>{if(touchStart===null)return;const dx=e.changedTouches[0].clientX-touchStart;if(Math.abs(dx)>50)movePhoto(dx<0?1:-1);touchStart=null;},{passive:true});

// Hartă interactivă (secțiunea 01 Locul).
(function initMap(){
  const list=$("#poiList");let map=null,markers=[];
  if(typeof L!=="undefined"){
    map=L.map("map",{scrollWheelZoom:false});
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    markers=PLACES.map(p=>{
      const marker=L.marker(p.coords).addTo(map);
      const popup=document.createElement("div"),strong=document.createElement("strong"),descr=document.createElement("p");
      strong.textContent=p.name;descr.textContent=p.text;popup.append(strong,descr);marker.bindPopup(popup);
      return marker;
    });
    map.setView(PLACES[0].coords,11);
    map.on("click",()=>map.scrollWheelZoom.enable());map.on("mouseout",()=>map.scrollWheelZoom.disable());
    // După încărcarea paginii, harta primește dimensiunea corectă.
    window.addEventListener("load",()=>map.invalidateSize());
  }else{$("#mapNote").hidden=false;$("#map").hidden=true;}
  PLACES.forEach((p,i)=>{
    const li=document.createElement("li"),btn=document.createElement("button"),b=document.createElement("b"),span=document.createElement("span");
    btn.type="button";b.textContent=p.name;span.textContent=p.short;btn.append(b,span);li.append(btn);list.append(li);
    btn.addEventListener("click",()=>{
      $$("button",list).forEach(x=>x.classList.remove("on"));btn.classList.add("on");
      if(map){map.invalidateSize();map.flyTo(p.coords,12,{duration:.8});markers[i].openPopup();}
    });
  });
})();

// Quiz: corectare imediată și reluare. Întrebările se bazează pe textul din secțiunile Locul și Biserica.
const QUIZ=[
 {q:"Cum se numește biserica de lemn din Brătești?",options:["Sfântul Nicolae","Sfântul Teodor Tiron","Sfântul Gheorghe","Sfântul Ilie"],correct:1,why:"Hramul bisericii din Brătești este Sfântul Teodor Tiron."},
 {q:"Din ce sat a fost adusă biserica în Brătești?",options:["Sitani","Meziad","Brădet","Ștei"],correct:0,why:"Biserica a fost construită la Sitani și apoi mutată."},
 {q:"În ce perioadă a fost mutată biserica?",options:["1900–1902","1976–1978","2009–2011","1850–1852"],correct:1,why:"Mutarea la Brătești a avut loc între 1976 și 1978."},
 {q:"Ce parte a bisericii adăpostește clopotele?",options:["Pridvorul","Altarul","Turnul-clopotniță","Naosul"],correct:2,why:"Turnul-clopotniță este partea înaltă a bisericii unde se află clopotele."},
 {q:"Ce a schimbat restaurarea din 2009?",options:["Șarpanta și învelitoarea","Fundația bisericii","Iconostasul","Ușa de la intrare"],correct:0,why:"Proiectul de restaurare din 2009 a schimbat șarpanta și învelitoarea, readucând biserica la imaginea inițială."},
 {q:"Cine a realizat proiectul de restaurare din 2009?",options:["Arhitectul orădean Cristian Pușcaș","Un pictor din Beiuș","Preotul din Sitani","Un inginer din Cluj"],correct:0,why:"Potrivit site-ului comunei Răbăgani, proiectul a fost făcut de arhitectul Cristian Pușcaș, la cererea Parohiei Brătești."},
 {q:"De ce folosește acest proiect formula „secolul al XVIII-lea” și nu un an exact?",options:["Sursele dau ani diferiți: 1718, 1738 și 1740","Anul este scris pe turn","Biserica a fost mutată","Nu există nicio sursă"],correct:0,why:"Sursele consultate indică ani diferiți, așa că singura datare sigură este secolul."},
 {q:"Potrivit unui document din 1756, cine a construit biserica la Sitani?",options:["Toți locuitorii satului, prin contribuție comună","Un singur boier","Episcopia Orăzii","Meșteri aduși din Maramureș"],correct:0,why:"În 1756, preotul Mihai arăta că biserica a fost construită din contribuția tuturor locuitorilor din Sitani."}
];
let question=0,points=0,answered=false;
function renderQuestion(){
  const q=QUIZ[question];answered=false;
  $("#qCount").textContent=`Întrebarea ${question+1} din ${QUIZ.length}`;
  $("#qScore").textContent=`${points} corecte`;
  $("#qBar").style.width=`${question/QUIZ.length*100}%`;
  $("#qText").textContent=q.q;$("#qWhy").textContent="";$("#qNext").hidden=true;
  const wrap=$("#qOptions");wrap.replaceChildren();
  q.options.forEach((option,i)=>{
    const btn=document.createElement("button");btn.type="button";btn.className="q-opt";btn.textContent=option;
    btn.addEventListener("click",()=>{
      if(answered)return;answered=true;
      $$("button",wrap).forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add("right");});
      if(i===q.correct){points++;$("#qWhy").textContent="Corect! "+q.why;}
      else{btn.classList.add("wrong");$("#qWhy").textContent="Răspunsul corect: "+q.options[q.correct]+". "+q.why;}
      $("#qScore").textContent=`${points} corecte`;
      $("#qBar").style.width=`${(question+1)/QUIZ.length*100}%`;
      $("#qNext").textContent=question===QUIZ.length-1?"Vezi rezultatul":"Următoarea";
      $("#qNext").hidden=false;
    });wrap.append(btn);
  });
}
$("#qNext").addEventListener("click",()=>{
  if(!answered)return;question++;
  if(question<QUIZ.length){renderQuestion();return;}
  $("#quizBox").hidden=true;$("#quizResult").hidden=false;
  $("#rScore").textContent=`${points} din ${QUIZ.length}`;
  const ratio=points/QUIZ.length;
  $("#rMsg").textContent=ratio===1?"Excelent! Ai răspuns corect la toate întrebările.":ratio>=0.6?"Bine! Mai poți reciti explicațiile și încerca din nou.":"Recitește secțiunile Locul și Biserica, apoi încearcă din nou.";
});
$("#qRestart").addEventListener("click",()=>{question=0;points=0;$("#quizResult").hidden=true;$("#quizBox").hidden=false;renderQuestion();});
renderQuestion();

// Formular demonstrativ: verifică intrările, nu trimite emailuri.
const form=$("#contactForm");
function formError(id,message){$("#"+id+"Err").textContent=message;$("#"+id).closest(".field").classList.toggle("bad",Boolean(message));return !message;}
form.addEventListener("submit",e=>{
  e.preventDefault();$("#formOk").hidden=true;
  const name=$("#name").value.trim(),email=$("#email").value.trim(),message=$("#message").value.trim();
  const a=formError("name",name.length<2?"Introdu un nume de cel puțin 2 caractere.":"");
  const b=formError("email",/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)?"":"Introdu o adresă de email validă.");
  const c=formError("message",message.length<10?"Mesajul trebuie să conțină cel puțin 10 caractere.":"");
  if(!(a&&b&&c))return;
  $("#formOk").textContent="Datele sunt valide! Aceasta este doar o demonstrație: mesajul nu a fost trimis.";
  $("#formOk").hidden=false;
});
["name","email","message"].forEach(id=>$("#"+id).addEventListener("input",()=>formError(id,"")));