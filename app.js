(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => `$${n}`;
const escapeText = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const services = [
 {id:'fade',name:'Skin fade',price:36,minutes:40,desc:'Close sides. Clean blend. Finished your way.'},
 {id:'taper',name:'Classic taper',price:32,minutes:35,desc:'A little weight, a clean neckline, an easy finish.'},
 {id:'buzz',name:'Buzz cut',price:22,minutes:20,desc:'One length or a graduated buzz. Sharp edges included.'},
 {id:'beard',name:'Beard sculpt',price:18,minutes:20,desc:'Shape, line and finish. Keep your beard intentional.'},
 {id:'shave',name:'Hot towel shave',price:30,minutes:30,desc:'Warm towel prep, careful shave, cool finish.'},
 {id:'lineup',name:'Lineup',price:16,minutes:15,desc:'Clean up the edges between full cuts.'},
 {id:'kids',name:'Kids cut',price:24,minutes:30,desc:'Ages 5–12. Parent or guardian stays with the child.'},
 {id:'grey',name:'Grey blending',price:28,minutes:30,desc:'Subtle blend, wash and finish. No haircut included.'},
 {id:'design',name:'Simple design add-on',price:18,minutes:20,desc:'One simple pattern, added to a cut. Booked with a taper below.'},
 {id:'combo',name:'Cut + beard',price:48,minutes:60,desc:'Skin fade or taper, plus beard sculpt. One complete reset.'}
];
const people = [
 {id:'jace',nick:'JET',name:'Jace Miles',chair:1,years:8,specialty:'Skin fades · Precision lineups · Beard sculpting',image:'photo-1500648767791-00dcc994a43e',alt:'Stock portrait of a man with short hair and a beard'},
 {id:'morgan',nick:'MOSS',name:'Morgan Reed',chair:2,years:6,specialty:'Tapers · Texture · Patient kids cuts',image:'photo-1506794778202-cad84cf45f1d',alt:'Stock portrait of a man with dark hair'},
 {id:'theo',nick:'T',name:'Theo Lane',chair:3,years:10,specialty:'Patterns · Hot towel shaves · Classic cuts',image:'photo-1535713875002-d1d0cf377fde',alt:'Stock portrait of a smiling man with glasses'}
];
const photos = [
 {style:'Fades',title:'The close finish',image:'photo-1514336937476-a5b961020a5c',alt:'Barber cleaning the edges of a short haircut'},
 {style:'Tapers',title:'Clean at the edges',image:'photo-1622296089863-eb7fc530daa8',alt:'Barber shaping a short, graduated haircut'},
 {style:'Buzz',title:'Short. Sharp. Simple.',image:'photo-1761706733501-eb187831465d',alt:'Man with a close blond buzz cut, wearing a black tank top'},
 {style:'Beard',title:'Keep the shape',image:'photo-1503951914875-452162b0f3f1',alt:'Close view of a barber shaping a client’s beard'},
 {style:'Designs',title:'Start with a consultation',image:'photo-1593702275687-f8b402bf1fb5',alt:'Barber working on a client’s haircut; a consultation image, not a finished pattern'}
];
const goods = [
 {id:'paste',name:'Matte paste',price:18,desc:'Medium hold. Low shine. 75 g. Fictional product.',art:'paste',label:'MATTE<br>PASTE',size:'75 g / DEMO'},
 {id:'oil',name:'Beard oil',price:16,desc:'A softer finish. Cedar-inspired. 30 ml. Fictional product.',art:'oil',label:'BEARD<br>OIL',size:'30 ml / DEMO'},
 {id:'brush',name:'Pocket brush',price:14,desc:'Keep the shape on the go. Fictional product.',art:'brush',label:'SIGNAL III',size:'DEMO PRODUCT'}
];
const imageURL = (id,w=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
let chairCycle = 0, paused = false, currentFilter = 'All', photoIndex = 0;
let flowType = '', book = {}, queue = {}, cart = {}, stamps = 3;
const dialog = $('#flow');
const body = $('#flow-body');
let lastTrigger = null;
const todayISO = () => {
 const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).filter(v=>v.type!=='literal').map(v=>[v.type,v.value]));
 return `${p.year}-${p.month}-${p.day}`;
};
const addDays = (iso,n) => {const d=new Date(iso+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const weekday = iso => new Date(iso+'T12:00:00Z').getUTCDay();
const dateLabel = iso => new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
const timeLabel = m => `${Math.floor(m/60)%12||12}:${String(m%60).padStart(2,'0')} ${m<720?'AM':'PM'}`;
const phoneOK = n => {const d=n.replace(/\D/g,'');return d.length>=7&&d.length<=15};
const announce = s => {$('#announcement').textContent=s};
const runMotion = (element,frames) => {
 if(!paused&&!matchMedia('(prefers-reduced-motion: reduce)').matches) element.animate(frames,{duration:220,easing:'cubic-bezier(.23,1,.32,1)'});
};
function renderBoard(){
 const frames=[
  [{cut:'Skin fade',ticket:'A—21 cutting',next:'A—22 next',wait:'14 MIN'}, {cut:'Cut + beard',ticket:'B—15 cutting',next:'B—16 next',wait:'28 MIN'},{cut:'Chair ready',ticket:'No one waiting',next:'First available',wait:'0–5 MIN'}],
  [{cut:'Finishing up',ticket:'A—21 cutting',next:'A—22 next',wait:'10 MIN'},{cut:'Beard finish',ticket:'B—15 cutting',next:'B—16 next',wait:'20 MIN'},{cut:'Classic taper',ticket:'C—08 cutting',next:'C—09 next',wait:'25 MIN'}],
  [{cut:'Chair ready',ticket:'No one waiting',next:'First available',wait:'0–5 MIN'},{cut:'Lineup',ticket:'B—16 cutting',next:'B—17 next',wait:'15 MIN'},{cut:'Finishing up',ticket:'C—08 cutting',next:'C—09 next',wait:'12 MIN'}]
 ][chairCycle%3];
 $('#chairs').innerHTML=frames.map((f,i)=>`<div class="chair-row ${f.cut==='Chair ready'?'ready':''}"><div class="chair-person"><span class="chair-number">${i+1}</span><span class="chair-name">${people[i].nick}<small>${people[i].name}</small></span></div><div class="chair-work">${f.cut}<small>${f.ticket}<br>${f.next}</small></div><span class="chair-time">${f.wait}</span></div>`).join('');
 $('#mobile-wait').textContent=frames.some(f=>f.cut==='Chair ready')?'0–5 MIN':'10 MIN';
 $('#board-update').textContent=chairCycle?'Simulated update · no actual availability':'Sample board · updates while you browse';
}
function advanceBoard(manual=false){if(dialog.open&&!manual)return;chairCycle++;renderBoard();runMotion($('#chairs'),[{opacity:.5,transform:'translateY(-6px)'},{opacity:1,transform:'translateY(0)'}]);if(manual)announce('Sample chair board advanced. All availability is fictional.')}
$('#advance-board').addEventListener('click',()=>advanceBoard(true));
setInterval(()=>{if(!paused&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches)advanceBoard()},14000);
$$('.motion').forEach(btn=>btn.addEventListener('click',()=>{paused=!paused;document.body.classList.toggle('motion-paused',paused);$$('.motion').forEach(b=>{b.textContent=paused?'Resume motion':'Pause motion';b.setAttribute('aria-pressed',String(paused))});announce(paused?'Decorative motion and automatic board updates paused.':'Motion resumed.')}));
$('#services').innerHTML=services.map(s=>`<article class="price-item"><div><h3>${s.name}</h3><p>${s.minutes} MIN · ${s.desc}</p></div><div><strong>${money(s.price)}</strong><button class="text-button" data-service="${s.id}">${s.id==='design'?'Add to a taper':'Book this'} <svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></button></div></article>`).join('');
$('#barber-cards').innerHTML=people.map(p=>`<article class="barber"><div class="barber-photo"><img src="${imageURL(p.image,700)}" alt="${p.alt}; illustrative fictional staff profile" loading="lazy" width="600" height="800"><span class="barber-chair">CHAIR ${p.chair}</span></div><h3>“${p.nick}”</h3><p class="real-name">${p.name} · Fictional barber</p><p class="specialty">${p.specialty}</p><p class="experience">${p.years} fictional years behind the chair</p><button class="text-button" data-barber="${p.id}">Book with ${p.name.split(' ')[0]} <svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></button></article>`).join('');
$('#gallery-filters').innerHTML=['All','Fades','Tapers','Buzz','Beard','Designs'].map(s=>`<button data-filter="${s}" aria-pressed="${s==='All'}">${s}</button>`).join('');
function renderGallery(){
 $('#gallery').innerHTML=photos.map((p,i)=>({p,i})).filter(({p})=>currentFilter==='All'||p.style===currentFilter).map(({p,i})=>`<button class="cut" data-photo="${i}" aria-label="Open ${escapeText(p.title)}: ${p.style} inspiration"><div class="cut-photo"><img src="${imageURL(p.image)}" alt="${p.alt}; stock inspiration" loading="lazy" width="800" height="900"></div><span class="cut-caption"><span>${p.title}</span><span>${p.style} <svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></span></span></button>`).join('');
}
function showPhoto(i){photoIndex=(i+photos.length)%photos.length;const p=photos[photoIndex];$('#lightbox-image').src=imageURL(p.image,1400);$('#lightbox-image').alt=p.alt+'; stock inspiration, not actual work';$('#lightbox-caption').textContent=`${p.title} / ${p.style} · Stock inspiration (${photoIndex+1}/${photos.length})`}
$('#gallery-filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;currentFilter=b.dataset.filter;$$('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));renderGallery();runMotion($('#gallery'),[{opacity:.6,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}]);announce(`${currentFilter} inspiration shown.`)});
$('#gallery').addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(!b)return;lastTrigger=b;showPhoto(Number(b.dataset.photo));$('#lightbox').showModal()});
$('#close-lightbox').addEventListener('click',()=>$('#lightbox').close());$('#previous-photo').addEventListener('click',()=>showPhoto(photoIndex-1));$('#next-photo').addEventListener('click',()=>showPhoto(photoIndex+1));
$('#lightbox').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1)}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1)}});
$('#lightbox').addEventListener('close',()=>{lastTrigger?.focus();$('#lightbox-image').removeAttribute('src')});
function renderProducts(){
 $('#products').innerHTML=goods.map(g=>`<article class="product"><div class="product-art"><img src="assets/${g.id}.webp" alt="AI-generated fictional Signal Three ${g.name} product; not an actual item for sale" width="900" height="900" loading="lazy"></div><div class="product-top"><h3>${g.name}</h3><strong>${money(g.price)}</strong></div><p>${g.desc}</p><button class="text-button" data-add="${g.id}">Add to demo bag +</button></article>`).join('');
}
const cartTotal = () => goods.reduce((a,g)=>a+(cart[g.id]||0)*g.price,0);
function renderCartBar(){const n=Object.values(cart).reduce((a,b)=>a+b,0);$('#cart-count').textContent=n?`${n} ${n===1?'item':'items'} in your demo bag.`:'Your demo bag is empty.';$('#cart-total').textContent=money(cartTotal());$('#checkout').disabled=!n}
$('#products').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const id=b.dataset.add;cart[id]=Math.min(9,(cart[id]||0)+1);renderCartBar();announce(`${goods.find(g=>g.id===id).name} added. ${cart[id]} in bag.`);b.textContent=`In bag: ${cart[id]} · Add another +`});
function renderStamps(){
 $('#stamps').innerHTML=Array.from({length:10},(_,i)=>`<span class="stamp ${i<stamps?'filled':''} ${i===9?'reward':''}" aria-label="${i===9?'Reward':`Visit ${i+1}`}${i<stamps?' completed':''}">${i<stamps?'III':i===9?'FREE':i+1}</span>`).join('');
 $('#loyalty-status').textContent=stamps===10?'10 / 10 · Demo reward unlocked: one skin fade or taper up to $36.':`${stamps} / 10 · ${10-stamps} ${10-stamps===1?'visit':'visits'} from your reward.`;
 $('#add-stamp').disabled=stamps===10;
}
$('#add-stamp').addEventListener('click',()=>{stamps=Math.min(10,stamps+1);renderStamps();runMotion($('#stamps').children[stamps-1],[{transform:'scale(1.12)',opacity:.6},{transform:'scale(1)',opacity:1}])});$('#reset-stamps').addEventListener('click',()=>{stamps=0;renderStamps()});
let quietDay=addDays(todayISO(),1);while(![2,3,4].includes(weekday(quietDay)))quietDay=addDays(quietDay,1);$('#quiet-date').textContent=dateLabel(quietDay);
$('#quiet-book').addEventListener('click',e=>openFlow('booking',e.currentTarget,{service:'fade',barber:'jace',day:quietDay,time:660,step:3}));
function openFlow(type,trigger,options={}){
 lastTrigger=trigger;flowType=type;
 book={step:0,service:'',barber:'any',day:'',time:null,...options};queue={barber:'any',position:3,advanced:0};
 if(type==='queue')renderQueue();else if(type==='booking')renderBooking();else if(type==='checkout')renderCheckout();else if(type==='member')renderMember(options.plan);
 dialog.showModal();dialog.scrollTop=0;
}
function render(content){body.innerHTML=`<div class="dialog-content">${content}</div>`;dialog.scrollTop=0}
const backClose = (label='Close') => `<div class="dialog-actions"><button class="text-button" data-close-flow>${label}</button></div>`;
const personLabel = id => id==='any'?'First available':people.find(p=>p.id===id)?.name||'First available';
const personButtons=(selected,prefix='person')=>`<div class="options"><button type="button" class="option" data-${prefix}="any" aria-pressed="${selected==='any'}"><span>First available<small>Any of our three chairs</small></span></button>${people.map(p=>`<button type="button" class="option" data-${prefix}="${p.id}" aria-pressed="${selected===p.id}"><span>${p.name}<small>Chair ${p.chair} · ${p.nick}</small></span></button>`).join('')}</div>`;
function renderQueue(){
 render(`<h2 id="flow-title">JOIN THE LINE.</h2><p>Choose your chair. We’ll make you a sample ticket, then you can move it through a fictional queue.</p>${personButtons(queue.barber,'queue-person')}<form id="queue-form"><label class="field">Name for your ticket<input name="name" id="queue-name" autocomplete="off" maxlength="50" required placeholder="Use a fictional name"></label><label class="field">Phone number<input name="phone" id="queue-phone" type="tel" autocomplete="off" maxlength="25" required placeholder="202-555-0148"></label><label class="check-field"><input type="checkbox" required>I understand this is a demo. No place is held and no text is sent.</label><div id="queue-error"></div><button class="button" type="submit">Get a demo ticket <span aria-hidden="true"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button></form>`);
}
function renderQueueTicket(name){
 const pos=queue.position;render(`<h2 id="flow-title">YOU’RE IN. SORT OF.</h2><p>No real queue entry was created. Your name and phone are not saved or sent.</p><div class="confirmation-ticket"><div class="ticket-top"><span>${escapeText(name)}</span><span>DEMO / ${escapeText(personLabel(queue.barber))}</span></div><div class="ticket-number">A—24</div><p>${pos>1?`${pos}${pos===2?'ND':'RD'} IN LINE · ABOUT ${(pos-1)*12} MINUTES`:'YOUR DEMO CHAIR IS READY'}</p></div><p class="queue-progress">${pos>1?`${pos-1} AHEAD OF YOU.`:'YOUR TURN.'}</p><div class="phone-preview"><span>MOCK SMS / NOTHING SENT</span><div class="phone-message" id="queue-sms"></div></div><div class="queue-tools"><button class="button" id="advance-ticket" ${pos===1?'disabled':''}>Move one place closer <span aria-hidden="true"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button><button class="button secondary" id="leave-line">Leave demo line</button></div><p class="small">This simulation advances only when you press the button. It does not follow actual shop activity.</p>`);
 $('#queue-sms').textContent=pos===3?`${name}, you’re 3rd in the Signal Three demo line. Your sample ticket is A—24.`:pos===2?`${name}, you’re 2nd in line — head over. Signal Three demo only; no actual chair is reserved.`:`${name}, chair’s ready. Signal Three demo only. Please do not travel to the fictional address.`;
 $('#advance-ticket').addEventListener('click',()=>{queue.position=Math.max(1,queue.position-1);renderQueueTicket(name)});
 $('#leave-line').addEventListener('click',()=>{queue={};render(`<h2 id="flow-title">YOU’RE OUT OF THE LINE.</h2><p>Your demo ticket is cleared. No real queue was changed. No details were saved or sent.</p>${backClose()}`)});
}
function selectedService(){const s=services.find(s=>s.id===book.service);if(s?.id==='design')return {...s,name:'Classic taper + simple design',price:50,minutes:55};return s}
function slotList(){
 if(!book.day||[0,1].includes(weekday(book.day)))return [];
 const end=weekday(book.day)===6?900:1080,duration=selectedService()?.minutes||40;
 const index=Number(book.day.slice(-2))+(people.findIndex(p=>p.id===book.barber)+1);
 const result=[];for(let t=540;t+duration<=end;t+=30){if(((t/30)+index)%5!==0)result.push(t)}return result;
}
function summary(){const s=selectedService();return `<div class="summary"><p><strong>${escapeText(s.name)} · ${money(s.price)} · ${s.minutes} minutes</strong></p><p>${escapeText(personLabel(book.barber))}${book.day?` · ${dateLabel(book.day)}`:''}${book.time!==null?` · ${timeLabel(book.time)} Eastern`:''}</p></div>`}
function renderBooking(){
 const step=book.step;let content='';
 if(step===0){content=`<h2 id="flow-title">PICK YOUR CUT.</h2><p>Choose a service. All prices and times are fictional. No deposit or payment is taken.</p><div class="options">${services.map(s=>`<button class="option" data-select-service="${s.id}" aria-pressed="${book.service===s.id}"><span>${s.id==='design'?'Taper + simple design':s.name}<small>${s.id==='design'?'$50 total · 55 minutes':`${money(s.price)} · ${s.minutes} minutes`}</small></span></button>`).join('')}</div>`}
 if(step===1){content=`<h2 id="flow-title">PICK YOUR CHAIR.</h2><p>A regular face, or the next available set of hands. Every barber here is fictional.</p>${personButtons(book.barber)}${summary()}`}
 if(step===2){const min=addDays(todayISO(),1),max=addDays(todayISO(),60);content=`<h2 id="flow-title">PICK YOUR TIME.</h2><p>Sample availability. Tuesday–Friday 9–6, Saturday 9–3. All times Eastern.</p><label class="field">Day<input id="booking-day" type="date" min="${min}" max="${max}" value="${book.day}" required></label><p class="date-note">Tomorrow through the next 60 days. Closed Sunday and Monday.</p><div id="day-error"></div><div class="options time-options" id="times"></div>${summary()}`}
 if(step===3){content=`<h2 id="flow-title">MAKE IT YOURS.</h2><p>Use fictional details. No appointment is created, no number retained and no reminder sent.</p>${summary()}<form id="booking-form"><div class="form-grid"><label class="field">Name<input id="booking-name" maxlength="50" required autocomplete="off" placeholder="A fictional name"></label><label class="field">Phone<input id="booking-phone" type="tel" maxlength="25" required autocomplete="off" placeholder="202-555-0148"></label></div><label class="field">Your next-cut reminder preview<select id="reminder"><option value="0">No preview</option><option value="14">Two weeks after this cut</option><option value="21">Three weeks after this cut</option></select></label><div id="reminder-preview"></div><label class="check-field"><input id="booking-policy" type="checkbox" required>I understand this is a demo. No actual appointment, payment or text message.</label><div id="booking-error"></div></form>`}
 render(`<div class="flow-steps" aria-label="Booking progress">${['Cut','Chair','Time','Details'].map((s,i)=>`<span class="${i===step?'active':''}" ${i===step?'aria-current="step"':''}>${i+1}. ${s}</span>`).join('')}</div>${content}<div class="dialog-actions"><button class="text-button" id="book-back">${step?'Back':'Cancel'}</button><button class="button" id="book-next" ${step===0&&!book.service||step===2&&book.time===null?'disabled':''}>${step===3?'Confirm demo':'Continue'} <span aria-hidden="true"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button></div>`);
 if(step===2)renderSlots();
 $('#book-back').addEventListener('click',()=>{if(!book.step)dialog.close();else{book.step--;renderBooking()}});
 $('#book-next').addEventListener('click',()=>{if(book.step<3){book.step++;renderBooking()}else confirmBooking()});
 if(step===3){$('#booking-form').addEventListener('submit',e=>{e.preventDefault();confirmBooking()});$('#reminder').addEventListener('change',renderReminder);$('#booking-name').addEventListener('input',()=>{if($('#reminder').value!=='0')renderReminder()})}
}
function renderSlots(){
 const t=$('#times');if(!t)return;const slots=slotList();t.innerHTML=slots.map(m=>`<button class="option" data-time="${m}" aria-pressed="${book.time===m}">${timeLabel(m)}</button>`).join('');
 if(book.day&&!slots.length)$('#day-error').innerHTML='<p class="error">The shop is closed that day. Choose Tuesday through Saturday.</p>';
 else if(!book.day)t.innerHTML='<p class="small">Choose a day to see sample times.</p>';
}
function renderReminder(){const days=Number($('#reminder').value);const el=$('#reminder-preview');if(!days){el.innerHTML='';return}el.innerHTML='<div class="phone-preview"><span>MOCK SMS / NOTHING SENT</span><div class="phone-message" id="reminder-message"></div></div>';$('#reminder-message').textContent=`${$('#booking-name').value.trim()||'Hey'}, it’s been ${days===14?'two':'three'} weeks since your Signal Three cut. Your next good cut? Your call. Sample reminder for ${dateLabel(addDays(book.day,days))}. No message will be sent.`}
function confirmBooking(){
 const form=$('#booking-form');if(!form.reportValidity())return;const name=$('#booking-name').value.trim(),phone=$('#booking-phone').value;
 if(!name||!phoneOK(phone)){$('#booking-error').innerHTML='<p class="error">Use a name and a phone number containing 7–15 digits to try the demo.</p>';return}
 const reminder=Number($('#reminder').value),sum=summary();render(`<h2 id="flow-title">LOOKING SHARP.</h2><p>No real appointment was made. Nothing was saved, charged or sent.</p><div class="confirmation-ticket"><div class="ticket-top"><span>DEMO APPOINTMENT</span><span>SIGNAL THREE</span></div><div class="ticket-number">BOOKED*</div><p id="booking-greeting"></p></div>${sum}${reminder?`<p class="small">A ${reminder===14?'two':'three'}-week reminder was previewed. It is not scheduled and will not be sent.</p>`:''}<p class="small">*Fictional confirmation only. Please do not travel to the invented address.</p>${backClose()}`);$('#booking-greeting').textContent=`${name}, that’s how an online booking could feel.`;
}
function renderMember(plan){
 const isCut=plan==='cut';flowType='member';const label=isCut?'Cut Club':'Beard Club',price=isCut?64:20;
 render(`<h2 id="flow-title">TRY THE ${isCut?'CUT':'BEARD'} CLUB.</h2><p>Sample signup only. This is not a subscription and will never charge you.</p><div class="summary"><strong>${label} · ${money(price)} / month</strong><p>${isCut?'Two skin fades or tapers per month.':'Two beard sculpts per month, maximum one per week.'} Unused services expire at month end. Cancel before renewal in a real membership.</p></div><form id="member-form"><label class="field">Name<input id="member-name" maxlength="50" autocomplete="off" required placeholder="Fictional name"></label><label class="field">Email<input id="member-email" type="email" maxlength="120" autocomplete="off" required placeholder="demo@example.com"></label><label class="check-field"><input type="checkbox" required>I understand the sample monthly price and terms. No subscription is created.</label><button class="button" type="submit">Preview my membership <span aria-hidden="true"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button></form><p class="small" style="margin-top:20px">No card details requested. No information is saved or sent.</p>`);
 $('#member-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#member-name').value.trim();if(!name)return;render(`<h2 id="flow-title">CLUB LOOKS GOOD ON YOU.</h2><p id="member-greeting"></p><div class="confirmation-ticket"><div class="ticket-top"><span>DEMO MEMBER PASS</span><span>NOT VALID FOR SERVICES</span></div><p>${label.toUpperCase()} · ${money(price)} / MONTH</p></div><p>No membership was created. No payment was taken, no email sent and no details saved.</p>${backClose()}`);$('#member-greeting').textContent=`${name}, this is your ${label} preview.`})
}
function renderCheckout(){
 const items=goods.filter(g=>cart[g.id]);if(!items.length){render(`<h2 id="flow-title">BAG’S EMPTY.</h2><p>Add a sample product to try checkout. Nothing has been purchased.</p>${backClose('Back to the shop')}`);return}
 render(`<h2 id="flow-title">YOUR DEMO BAG.</h2><p>Mock checkout. No charge, order, shipping or email. No card details requested.</p><ul class="cart-items">${items.map(g=>`<li><span><strong>${g.name}</strong><br>${money(g.price)} each</span><span class="qty-control"><button data-qty="${g.id}" data-delta="-1" aria-label="Remove one ${g.name}">−</button><span>${cart[g.id]}</span><button data-qty="${g.id}" data-delta="1" aria-label="Add one ${g.name}" ${cart[g.id]>=9?'disabled':''}>+</button></span><strong>${money(g.price*cart[g.id])}</strong></li>`).join('')}</ul><div class="summary"><strong>Sample total: ${money(cartTotal())}</strong><p>No tax or shipping calculated because no purchase occurs.</p></div><form id="checkout-form"><label class="field">Name<input id="checkout-name" maxlength="50" autocomplete="off" required placeholder="Fictional name"></label><label class="field">Email<input id="checkout-email" type="email" maxlength="120" autocomplete="off" required placeholder="demo@example.com"></label><label class="check-field"><input type="checkbox" required>I understand this is a demonstration, not an actual purchase.</label><button class="button" type="submit">Finish mock checkout <span aria-hidden="true"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button></form>`);
 $('#checkout-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#checkout-name').value.trim(),total=cartTotal();if(!name)return;cart={};renderCartBar();renderProducts();render(`<h2 id="flow-title">ALL SET. ZERO CHARGED.</h2><p id="checkout-greeting"></p><div class="summary"><strong>${money(total)} sample basket · $0 charged</strong></div><p>No payment was taken. No order placed, package shipped, email sent or contact details saved.</p>${backClose()}`);$('#checkout-greeting').textContent=`Thanks for trying it, ${name}. That’s the checkout preview.`})
}
$('#checkout').addEventListener('click',e=>openFlow('checkout',e.currentTarget));
document.addEventListener('click',e=>{
 const open=e.target.closest('[data-open]');if(open){openFlow(open.dataset.open,open);return}
 const service=e.target.closest('[data-service]');if(service){openFlow('booking',service,{service:service.dataset.service,step:1});return}
 const barber=e.target.closest('[data-barber]');if(barber){openFlow('booking',barber,{barber:barber.dataset.barber});return}
 const plan=e.target.closest('[data-plan]');if(plan){openFlow('member',plan,{plan:plan.dataset.plan});return}
});
body.addEventListener('click',e=>{
 if(e.target.closest('[data-close-flow]')){dialog.close();return}
 const qp=e.target.closest('[data-queue-person]');if(qp){queue.barber=qp.dataset.queuePerson;$$('[data-queue-person]').forEach(el=>el.setAttribute('aria-pressed',String(el===qp)));return}
 const service=e.target.closest('[data-select-service]');if(service){book.service=service.dataset.selectService;book.time=null;$$('[data-select-service]').forEach(el=>el.setAttribute('aria-pressed',String(el===service)));$('#book-next').disabled=false;return}
 const person=e.target.closest('[data-person]');if(person){book.barber=person.dataset.person;book.time=null;$$('[data-person]').forEach(el=>el.setAttribute('aria-pressed',String(el===person)));return}
 const time=e.target.closest('[data-time]');if(time){book.time=Number(time.dataset.time);$$('[data-time]').forEach(el=>el.setAttribute('aria-pressed',String(el===time)));$('#book-next').disabled=false;return}
 const qty=e.target.closest('[data-qty]');if(qty){const id=qty.dataset.qty;cart[id]=Math.min(9,Math.max(0,cart[id]+Number(qty.dataset.delta)));renderCartBar();renderCheckout()}
});
body.addEventListener('change',e=>{
 if(e.target.id==='booking-day'){
  const value=e.target.value,min=addDays(todayISO(),1),max=addDays(todayISO(),60);book.time=null;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||value<min||value>max){book.day='';$('#day-error').innerHTML='<p class="error">Choose a date from tomorrow through the next 60 days.</p>';$('#times').innerHTML='';$('#book-next').disabled=true;return}
  book.day=value;$('#day-error').innerHTML='';renderSlots();$('#book-next').disabled=true;
 }
});
body.addEventListener('submit',e=>{
 if(e.target.id!=='queue-form')return;e.preventDefault();const name=$('#queue-name').value.trim();
 if(!name||!phoneOK($('#queue-phone').value)){$('#queue-error').innerHTML='<p class="error">Use a name and a phone number containing 7–15 digits for your sample ticket.</p>';return}renderQueueTicket(name);
});
$('#close-flow').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{body.innerHTML='';book={};queue={};flowType='';lastTrigger?.focus()});
for(const d of [dialog,$('#lightbox')])d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});
renderBoard();renderGallery();renderProducts();renderStamps();renderCartBar();
// Visible by default. A short, finite entrance adds rhythm without withholding content.
if('IntersectionObserver' in window){const seen=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const children=e.target.matches('.section-heading')?[...e.target.children]:[e.target];children.forEach((el,i)=>{if(!paused&&!matchMedia('(prefers-reduced-motion: reduce)').matches)el.animate([{transform:'translateY(16px)',opacity:.72},{transform:'translateY(0)',opacity:1}],{duration:280,delay:i*65,easing:'cubic-bezier(.23,1,.32,1)'});});seen.unobserve(e.target)}),{threshold:.12});$$('.section-heading,.barber,.sample-ticket,.club-plan,.product').forEach(el=>seen.observe(el))}
})();
