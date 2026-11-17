const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const catalogue = {
  coldbrew: [
    {name:'Малина',label:'МАЛИНА',color:'#c83465',liquid:'#60201e',description:'Мягкий кофе и яркое ягодное настроение.',volume:'250 мл',type:'COLD BREW',tag:'ЯГОДНЫЙ',fruit:'raspberry'},
    {name:'Смородина',label:'СМОРОДИНА',color:'#64368a',liquid:'#3c2428',description:'Глубокий вкус с характером чёрной смородины.',volume:'250 мл',type:'COLD BREW',tag:'НАСЫЩЕННЫЙ',fruit:'currant'},
    {name:'Гранат',label:'ГРАНАТ',color:'#a42d2b',liquid:'#672720',description:'Кофейная основа. Выразительный гранатовый акцент.',volume:'250 мл',type:'COLD BREW',tag:'ЯРКИЙ',fruit:'pomegranate'}
  ],
  tonic: [
    {name:'Арбуз · маракуйя',label:'АРБУЗ — МАРАКУЙЯ',color:'#d45039',liquid:'#793d26',description:'Летнее сочетание для твоего тропического ритма.',volume:'300 мл',type:'ТОНИК',tag:'ТРОПИЧЕСКИЙ',fruit:'watermelon'},
    {name:'Ананас · черника',label:'АНАНАС — ЧЕРНИКА',color:'#d3a126',liquid:'#744722',description:'Солнечный ананас встречает лесную чернику.',volume:'300 мл',type:'ТОНИК',tag:'СОЛНЕЧНЫЙ',fruit:'pineapple'},
    {name:'Киви · манго',label:'КИВИ — МАНГО',color:'#588737',liquid:'#66452a',description:'Сочетание, с которым легко сменить привычный маршрут.',volume:'300 мл',type:'ТОНИК',tag:'СВЕЖИЙ',fruit:'kiwi'}
  ],
  shot: [{name:'Имбирь · виноград',label:'ВИНОГРАД',color:'#68409a',liquid:'#5d253a',description:'Пряный имбирный характер в маленьком формате.',volume:'50 мл',type:'SHOT',tag:'ИМБИРНЫЙ',fruit:'currant'}]
};
let renderId=0;
function bottleSVG(p,category){
  const id=`b${++renderId}`;
  const tonic=category==='tonic', shot=category==='shot';
  const cap=tonic?'#292b20':shot?'#e0e1d9':'#cbb06d';
  let berries='';
  for(let i=0;i<17;i++){
    const x=50+(i*29)%120,y=293+(i*17)%53,r=10+(i%4)*2;
    const fill=p.fruit==='pineapple'?'#e7b52f':p.fruit==='kiwi'?(i%2?'#7ca345':'#e4ac29'):p.fruit==='watermelon'?(i%2?'#d54843':'#efb64a'):p.color;
    berries+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="#ffffff35" stroke-width="1"/><ellipse cx="${x-3}" cy="${y-4}" rx="${r/3}" ry="${r/5}" fill="#fff" opacity=".3"/>`;
  }
  let drops='';
  for(let i=0;i<24;i++){const x=47+(i*37)%128,y=90+(i*43)%260;drops+=`<ellipse cx="${x}" cy="${y}" rx="${1+i%3}" ry="${2+i%3}" fill="#ffffff13" stroke="#ffffff50" stroke-width=".5"/>`;}
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 410" role="img" aria-label="COLABA ${p.type} ${p.name}"><defs><linearGradient id="${id}glass" x1="0" x2="1"><stop stop-color="#211e14"/><stop offset=".12" stop-color="${p.liquid}"/><stop offset=".3" stop-color="#bc7963"/><stop offset=".4" stop-color="${p.liquid}"/><stop offset=".78" stop-color="${p.liquid}"/><stop offset=".92" stop-color="#bf8a64"/><stop offset="1" stop-color="#301a11"/></linearGradient><linearGradient id="${id}cap"><stop stop-color="#4d442e"/><stop offset=".2" stop-color="${cap}"/><stop offset=".4" stop-color="${tonic?'#5b5e4c':'#efe1b4'}"/><stop offset=".7" stop-color="${cap}"/><stop offset="1" stop-color="#665438"/></linearGradient><linearGradient id="${id}label"><stop stop-color="#ded9c8"/><stop offset=".3" stop-color="#f4efdf"/><stop offset=".72" stop-color="#f1ecde"/><stop offset="1" stop-color="#c9c5b6"/></linearGradient><clipPath id="${id}clip"><path d="M35 203Q110 209 185 203V345Q110 357 35 345Z"/></clipPath></defs><ellipse cx="110" cy="392" rx="65" ry="7" fill="#182a2020"/><path d="M75 53H145L151 106Q153 124 171 140Q190 154 192 185L194 365Q194 389 169 390H51Q26 389 26 365L28 185Q30 154 49 140Q67 124 69 106Z" fill="url(#${id}glass)" stroke="#d8c6a480" stroke-width="1.5"/><path d="M80 68H140L146 112Q149 133 167 150" fill="none" stroke="#f5efe48a" stroke-width="3"/><path d="M80 69L77 112Q74 132 52 153L45 179V360" fill="none" stroke="#fff" stroke-width="4" opacity=".23"/><path d="M57 377Q110 384 174 375" fill="none" stroke="#d1b787" stroke-width="5" opacity=".5"/><path d="M74 55H146V104Q111 98 74 104Z" fill="#e1e5dc" opacity=".45"/><rect x="68" y="27" width="84" height="42" rx="9" fill="url(#${id}cap)" stroke="#ddd3b6" stroke-width="1"/><ellipse cx="110" cy="30" rx="38" ry="4" fill="${tonic?'#404535':'#e3d0a0'}"/><path d="M70 63H150V73Q110 78 70 73Z" fill="${tonic?'#25271e':'#e8e7df'}"/><path d="M35 203Q110 209 185 203V345Q110 357 35 345Z" fill="url(#${id}label)" stroke="#6d5345" stroke-width=".7"/><g clip-path="url(#${id}clip)"><path d="M35 280H185V357H35Z" fill="${p.color}"/>${berries}<path d="M32 345Q110 353 190 345" stroke="#eee9d1" fill="none" stroke-width="3"/></g><text x="46" y="224" fill="#222b1f" font-family="Arial,sans-serif" font-size="8" font-weight="700">COLABA<tspan fill="${p.color}"> TRIX</tspan></text><text x="171" y="223" text-anchor="end" fill="#443f34" font-family="Arial,sans-serif" font-size="5">${p.volume}</text>${category==='coldbrew'?`<text x="45" y="247" fill="#22251a" font-family="Georgia,serif" font-weight="900" font-size="25">COLD</text><text x="45" y="269" fill="#22251a" font-family="Georgia,serif" font-weight="900" font-size="25">BREW</text>`:`<text x="45" y="${shot?244:260}" fill="#22251a" font-family="Arial,sans-serif" font-weight="900" font-size="${shot?12:29}">${shot?'ИМБИРНЫЙ':'ТОНИК'}</text>${shot?'<text x="45" y="268" fill="#22251a" font-family="Arial,sans-serif" font-weight="900" font-size="29">SHOT</text>':''}`}<rect x="44" y="281" width="132" height="15" rx="2" fill="${p.color}"/><text x="50" y="291" fill="#fff" font-family="Arial,sans-serif" font-weight="700" font-size="${tonic?7:8}">${p.label}</text>${drops}<path d="M187 182L188 362" stroke="#fff" stroke-width="2" opacity=".15"/></svg>`;
}
function renderProducts(category){
  const grid=$('#product-grid');
  grid.setAttribute('aria-labelledby',`tab-${category}`);
  grid.innerHTML=catalogue[category].map((p,i)=>`<article class="product-card" style="--product-color:${p.color}"><div class="product-visual"><span class="product-tag">${p.tag}</span><span class="product-index">0${i+1}</span>${bottleSVG(p,category)}</div><div class="product-info"><div class="product-meta"><span>${p.type}</span><span>${p.volume}</span></div><h3>${p.name}</h3><p>${p.description}</p><button class="product-order" data-order="${p.type} · ${p.name} · ${p.volume}">Хочу попробовать <span><svg class="icon" aria-hidden="true" focusable="false"><use href="icons.svg#arrow-up-right"></use></svg></span></button></div></article>`).join('');
  $$('.tab').forEach(tab=>{const active=tab.dataset.category===category;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
}
$$('.tab').forEach((tab,i)=>{
  tab.addEventListener('click',()=>renderProducts(tab.dataset.category));
  tab.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('.tab');const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();renderProducts(tabs[next].dataset.category);}});
});
renderProducts('coldbrew');

const scenes=[
  {word:'ОБЫЧНОГО.',description:'Холодный кофе. Ягодные акценты.<br>Твой маленький выход за рамки.',image:'hero-bottles.png',background:'mountains.jpg',alt:'Три вкуса COLABA Cold Brew: малина, гранат и смородина'},
  {word:'ПРИВЫЧНОГО.',description:'Тропические сочетания. Кофейный характер.<br>Смени маршрут. Поймай свой ритм.',image:'hero-tonics.png',background:'forest.jpg',alt:'Фруктовые тоники COLABA TRIX: арбуз-маракуйя, ананас-черника, киви-манго'},
  {word:'ОЖИДАЕМОГО.',description:'Имбирный шот. Виноградный акцент.<br>Большой характер в маленькой бутылке.',image:'hero-shot.png',background:'water.jpg',alt:'Имбирный шот COLABA TRIX со вкусом винограда'}
];
let currentScene=0,sceneTimer;
const imageCache=new Map();
function preloadImage(src){if(!imageCache.has(src)){imageCache.set(src,new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(true);image.onerror=()=>{imageCache.delete(src);resolve(false);};image.src=src;}));}return imageCache.get(src);}
scenes.forEach(s=>{preloadImage(s.image);preloadImage(s.background);});
async function setScene(index){
  if(index===currentScene)return;
  currentScene=index;
  const scene=scenes[index];
  $('#home').classList.add('switching');
  $$('.scene-button').forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-pressed',String(i===index));});
  $('#scene-progress').style.transform=`translateX(${index*100}%)`;
  await new Promise(resolve=>setTimeout(resolve,reducedMotion?0:250));
  if(currentScene!==index)return;
  $('#hero-word').textContent=scene.word;
  $('#hero-description').innerHTML=scene.description;
  $('#scene-number').textContent=`0${index+1}`;
  $('#home').dataset.scene=index;
  $('#landscape').style.backgroundImage=`url("${scene.background}")`;
  if(await preloadImage(scene.image)){$('#hero-bottles').src=scene.image;$('#hero-bottles').alt=scene.alt;}
  $('#home').classList.remove('switching');
}
$$('.scene-button').forEach(b=>b.addEventListener('click',()=>{clearInterval(sceneTimer);setScene(Number(b.dataset.scene));}));
if(!reducedMotion)sceneTimer=setInterval(()=>{if(!document.hidden&&scrollY<innerHeight*.5)setScene((currentScene+1)%3);},11000);
const stage=$('#product-stage');
if(!reducedMotion&&matchMedia('(pointer:fine)').matches){
  $('#home').addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);stage.style.setProperty('--px',`${x*22}px`);stage.style.setProperty('--py',`${y*16}px`);stage.style.setProperty('--ry',`${x*9}deg`);stage.style.setProperty('--rx',`${-y*6}deg`);});
  $('#home').addEventListener('pointerleave',()=>{['--px','--py','--ry','--rx'].forEach(p=>stage.style.removeProperty(p));});
}
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});
if(!reducedMotion)$$('.reveal').forEach(el=>{el.classList.add('js-reveal');observer.observe(el);});
const menu=$('.menu-button'),mobileNav=$('#mobile-nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mobileNav.hidden=!open;});
$$('a',mobileNav).forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');mobileNav.hidden=true;}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');menu.focus();}});

const dialog=$('#order-dialog'),quantity=$('#quantity');
document.addEventListener('click',e=>{const button=e.target.closest('[data-order]');if(button){$('#order-product').value=button.dataset.order;quantity.value='12';$('#whatsapp-fallback').hidden=true;dialog.showModal();}});
$('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
$('#quantity-minus').addEventListener('click',()=>quantity.value=Math.max(1,Number(quantity.value)-1));
$('#quantity-plus').addEventListener('click',()=>quantity.value=Math.min(999,Number(quantity.value)+1));
$('#order-form').addEventListener('submit',e=>{e.preventDefault();if(!e.target.reportValidity())return;const message=`Здравствуйте! Интересует COLABA TRIX.\n${$('#order-product').value}\nКоличество: ${quantity.value} шт.\nПодскажите, пожалуйста, наличие, стоимость и условия доставки.`;const url=`https://wa.me/79290000941?text=${encodeURIComponent(message)}`;const fallback=$('#whatsapp-fallback');fallback.href=url;fallback.hidden=false;window.open(url,'_blank','noopener,noreferrer');});
$('#year').textContent=new Date().getFullYear();
