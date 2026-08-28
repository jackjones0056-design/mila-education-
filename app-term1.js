(() => {
'use strict';

const STORAGE_KEY='kg-math-mission-harrison-t1-v1';
const el=id=>document.getElementById(id);
const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

const weeks=[
 {title:'Count Objects Correctly',standards:'K.CC.4a–c • K.CC.5',goal:'One-to-one counting, cardinality, stable order, and one more.',days:[
  ['Touch, Count, Tell','Count each object once and tell how many.',['count10','count10','count10','conservation','count10']],
  ['Build the Set','Make a requested quantity with a ten-frame.',['build10','build10','build10','count10','build10']],
  ['Same Number, New Layout','Know that rearranging objects does not change the total.',['conservation','conservation','conservation','count10','conservation']],
  ['One More','Connect the next counting word to one additional object.',['oneMore','oneMore','oneMore','count10','oneMore']]
 ]},
 {title:'Counting Sequence & Numerals',standards:'K.CC.1a–b • K.CC.2 • K.CC.3',goal:'Term 1 benchmark work: count by ones toward 25, by tens to 100, count on, and write/recognize early numerals.',days:[
  ['Count On to 25','Continue the counting sequence from a given number.',['countForward25','countForward25','countForward25','sequence25','countForward25']],
  ['Tens to 100','Build the decade sequence 10, 20, …, 100.',['countTens','countTens','countTens','countTens','countTens']],
  ['Numerals 0–10','Recognize numerals out of order and connect them to quantities.',['numeral10','count10','numeral10','build10','numeral10']],
  ['Write & Find 0–5','Finger-trace the current writing range, then identify the numeral.',['trace05','trace05','trace05','trace05','trace05']]
 ]},
 {title:'Compare Quantities',standards:'K.CC.6',goal:'Compare two groups up to 10 as greater than, less than, or equal.',days:[
  ['More','Choose the group with more objects.',['compareMore','compareMore','compareMore','compareMore','compareMore']],
  ['Fewer','Choose the group with fewer objects.',['compareFewer','compareFewer','compareFewer','compareFewer','compareFewer']],
  ['Equal','Decide whether two groups have the same number.',['compareEqual','compareEqual','conservation','compareEqual','compareEqual']],
  ['Mixed Quantity Compare','Switch among more, fewer, and equal without comparing numerals yet.',['compareMixed','compareMixed','compareMixed','compareMixed','compareMixed']]
 ]},
 {title:'Shapes & Position',standards:'K.G.1 • K.G.2 • K.G.3',goal:'Use position words and identify 2D and 3D shapes regardless of size or orientation.',days:[
  ['Where Is It?','Use above, below, beside, in front of, and behind.',['position','position','position','position','position']],
  ['2D Shape Hunt','Name circles, squares, rectangles, triangles, and hexagons.',['shape2d','shape2d','shape2d','shape2d','shape2d']],
  ['3D Shape Hunt','Name spheres, cubes, cylinders, and cones.',['shape3d','shape3d','shape3d','shape3d','shape3d']],
  ['Shape Mix','Tell flat shapes from solid shapes and ignore orientation/size.',['shapeMix','shapeMix','shape2d','shape3d','shapeMix']]
 ]},
 {title:'Compare & Build Shapes',standards:'K.G.4 • K.G.5 • K.G.6',goal:'Describe shape attributes and compose larger shapes from smaller ones.',days:[
  ['Shape Clues','Use sides, corners, curves, and flat/solid clues.',['shapeClue','shapeClue','shapeClue','shapeClue','shapeClue']],
  ['Same & Different','Compare two shapes by their attributes.',['shapeCompare','shapeCompare','shapeCompare','shapeCompare','shapeCompare']],
  ['Build a Bigger Shape','Choose smaller shapes that can compose a larger shape.',['shapeCompose','shapeCompose','shapeCompose','shapeCompose','shapeCompose']],
  ['Geometry Review','Mix naming, position, comparison, and composition.',['shape2d','position','shape3d','shapeCompare','shapeCompose']]
 ]},
 {title:'Measurement Language',standards:'K.MD.1',goal:'Describe measurable attributes such as length and weight without jumping ahead to formal comparison.',days:[
  ['Can We Measure It?','Tell measurable attributes from non-measurable descriptions.',['attribute','attribute','attribute','attribute','attribute']],
  ['Length Words','Use length language: long, short, tall, and height.',['lengthWords','lengthWords','lengthWords','lengthWords','lengthWords']],
  ['Weight Words','Use weight language: heavy, light, and weight.',['weightWords','weightWords','weightWords','weightWords','weightWords']],
  ['Measurement + Counting','Spiral measurement vocabulary with counting practice.',['attribute','count10','lengthWords','countForward25','weightWords']]
 ]},
 {title:'Model Join & Separate Stories',standards:'K.OA.1',goal:'Represent addition and subtraction situations with objects or drawings; formal fluency comes later.',days:[
  ['Show the Joining Story','Choose the picture model that matches objects joining.',['modelJoin','modelJoin','modelJoin','modelJoin','modelJoin']],
  ['Show the Separating Story','Choose the picture model that matches objects leaving.',['modelSeparate','modelSeparate','modelSeparate','modelSeparate','modelSeparate']],
  ['Join or Separate?','Decide what kind of action the story describes.',['operationType','operationType','operationType','operationType','operationType']],
  ['Modeling Mix','Represent stories without requiring equations or memorized facts.',['modelJoin','modelSeparate','operationType','modelJoin','modelSeparate']]
 ]},
 {title:'Term 1 Mastery',standards:'Harrison County Kindergarten • Term 1',goal:'Verify the standards currently introduced before moving into later-term decomposition, fluency, and base-ten work.',days:[
  ['Counting Check','Independent counting/cardinality check.',['count10','conservation','oneMore','countForward25','countTens']],
  ['Quantity Check','Independent quantity and numeral check.',['numeral10','build10','compareMixed','trace05','sequence25']],
  ['Geometry & Measurement Check','Independent current geometry and measurement check.',['position','shape2d','shape3d','shapeCompare','attribute']],
  ['Term 1 Final Mission','Balanced current-school mastery check.',['countForward25','compareMixed','shapeClue','modelJoin','weightWords','count10']]
 ]}
];

function blankProgress(){
 const lessons={};for(let w=0;w<weeks.length;w++)for(let d=0;d<weeks[w].days.length;d++)lessons[`${w}-${d}`]={complete:false,bestPct:0,correct:0,attempts:0,stars:0};
 return {lessons,totalCorrect:0,totalAttempts:0,totalStars:0,streak:0,lastCompleted:null};
}
function load(){try{const p=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');return p?{...blankProgress(),...p,lessons:{...blankProgress().lessons,...(p.lessons||{})}}:blankProgress();}catch{return blankProgress();}}
let progress=load();
let st={week:0,day:0,round:0,correct:0,attempts:0,stars:0,locked:false,prompt:'',hint:'',timer:null,deferredInstall:null};
const save=()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));renderHomeStats();};
const current=()=>weeks[st.week].days[st.day];

function showView(v){['home','lesson','parent'].forEach(x=>el(x+'View').classList.toggle('active',x===v));window.scrollTo({top:0,behavior:'smooth'});}
function speak(t){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.86;u.pitch=1.02;u.lang='en-US';speechSynthesis.speak(u);}
function clearTimer(){if(st.timer){clearTimeout(st.timer);st.timer=null;}}
function feedback(t,kind=''){const f=el('feedback');f.textContent=t;f.className='feedback'+(kind?' '+kind:'');}
function prompt(t,h=''){st.prompt=t;st.hint=h;el('promptText').textContent=t;}
function resetStage(){clearTimer();st.locked=false;el('activityStage').innerHTML='';feedback('');el('hintBtn').classList.add('hidden');el('nextBtn').classList.add('hidden');}
function record(ok){st.attempts++;progress.totalAttempts++;if(ok){st.correct++;st.stars++;progress.totalCorrect++;progress.totalStars++;st.locked=true;feedback('Correct. Nice work.','good');el('nextBtn').classList.remove('hidden');el('hintBtn').classList.add('hidden');}else{feedback('Not yet. Try again carefully.','bad');el('hintBtn').classList.remove('hidden');}save();header();}
function choices(items,answer,text=true){const g=document.createElement('div');g.className='choice-grid';shuffle(items).forEach(x=>{const b=document.createElement('button');b.type='button';b.className='choice'+(text?' smalltext':'');b.textContent=x.label??x;b.onclick=()=>{if(!st.locked)record((x.value??x)===answer)};g.appendChild(b)});el('activityStage').appendChild(g);}
function nums(correct,min,max,count=4){let a=[];for(let n=min;n<=max;n++)a.push(n);a=shuffle(a).slice(0,Math.min(count,a.length));if(!a.includes(correct)){a[0]=correct;a=shuffle(a)}return a;}
function dots(n){const w=document.createElement('div');w.className='dots';for(let i=0;i<n;i++){const d=document.createElement('span');d.className='dot';w.appendChild(d)}return w;}
function big(t){const d=document.createElement('div');d.className='prompt-big';d.textContent=t;el('activityStage').appendChild(d);return d;}

const A={
 numeral10(){const n=rand(0,10);prompt(`Tap the number ${n}.`,`Say ${n} aloud, then look at every numeral.`);big(`Find ${n}`);choices(nums(n,0,10,6),n,false);},
 count10(){const n=rand(1,10);prompt('Count the objects. How many are there?','Touch each object once. The last number you say tells how many.');el('activityStage').appendChild(dots(n));choices(nums(n,1,10,4),n,false);},
 build10(){const n=rand(1,10);prompt(`Build ${n}.`,`Tap one space for each object. Stop when you say ${n}.`);big(`Build ${n}`);const frame=document.createElement('div');frame.className='ten-frame';const cells=[];for(let i=0;i<10;i++){const b=document.createElement('button');b.type='button';b.className='ten-cell';b.onclick=()=>b.classList.toggle('on');cells.push(b);frame.appendChild(b)}el('activityStage').appendChild(frame);const c=document.createElement('button');c.className='btn primary';c.type='button';c.style.marginTop='16px';c.textContent='Check my set';c.onclick=()=>{if(!st.locked)record(cells.filter(x=>x.classList.contains('on')).length===n)};el('activityStage').appendChild(c);},
 conservation(){const n=rand(2,8),same=Math.random()<.55,m=same?n:Math.max(1,Math.min(10,n+(Math.random()<.5?-1:1)));prompt('Do these groups have the same number?','Count each group once. Moving objects apart does not change the total.');const wrap=document.createElement('div');wrap.className='compare-wrap';const l=document.createElement('div');l.className='compare-box';l.appendChild(dots(n));const mid=document.createElement('div');mid.className='vs';mid.textContent='and';const r=document.createElement('div');r.className='compare-box';const dd=dots(m);dd.style.gap=same?'26px':'8px';r.appendChild(dd);wrap.append(l,mid,r);el('activityStage').appendChild(wrap);choices([{label:'Same number',value:true},{label:'Different number',value:false}],same);},
 oneMore(){const n=rand(0,9);prompt(`What is one more than ${n}?`,'Add exactly one object, then count the new total.');if(n)el('activityStage').appendChild(dots(n));else big('0 objects');choices(nums(n+1,0,10,4),n+1,false);},
 countForward25(){const n=rand(1,24);prompt(`What number comes right after ${n}?`,'Keep counting from the number you see.');big(n);choices(nums(n+1,Math.max(1,n-2),Math.min(25,n+3),4),n+1,false);},
 sequence25(){const start=rand(1,20),miss=rand(1,3),arr=[start,start+1,start+2,start+3,start+4],ans=arr[miss];prompt('What number is missing?','Count forward one number at a time.');const row=document.createElement('div');row.className='sequence';arr.forEach((n,i)=>{const x=document.createElement('div');x.className='seq-item'+(i===miss?' blank':'');x.textContent=i===miss?'?':n;row.appendChild(x)});el('activityStage').appendChild(row);choices(nums(ans,Math.max(1,ans-2),Math.min(25,ans+2),4),ans,false);},
 countTens(){const seq=[10,20,30,40,50,60,70,80,90,100],miss=rand(1,8),ans=seq[miss];prompt('Count by tens. What number is missing?','Say: 10, 20, 30, 40…');const row=document.createElement('div');row.className='sequence';seq.slice(Math.max(0,miss-2),Math.min(10,miss+3)).forEach(n=>{const x=document.createElement('div');x.className='seq-item'+(n===ans?' blank':'');x.textContent=n===ans?'?':n;row.appendChild(x)});el('activityStage').appendChild(row);choices(shuffle([ans,Math.max(10,ans-10),Math.min(100,ans+10),rand(1,9)*10]).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4),ans,false);},
 trace05(){const n=rand(0,5);prompt(`Trace ${n} with your finger, then find it below.`,'Start at the top. Use your finger to follow the large numeral before answering.');const c=document.createElement('canvas');c.width=260;c.height=200;c.style.cssText='width:260px;max-width:90%;height:200px;border:2px dashed #98a2b3;border-radius:18px;background:#fff;touch-action:none';const ctx=c.getContext('2d');ctx.font='160px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#d0d5dd';ctx.fillText(n,130,105);let draw=false;const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};c.onpointerdown=e=>{draw=true;c.setPointerCapture(e.pointerId);const [x,y]=pos(e);ctx.beginPath();ctx.moveTo(x,y)};c.onpointermove=e=>{if(!draw)return;const [x,y]=pos(e);ctx.lineWidth=10;ctx.lineCap='round';ctx.strokeStyle='#111827';ctx.lineTo(x,y);ctx.stroke()};c.onpointerup=()=>draw=false;el('activityStage').appendChild(c);choices(nums(n,0,5,4),n,false);},
 compare(type){let a=rand(1,10),b=rand(1,10);if(type!=='equal')while(a===b)b=rand(1,10);if(type==='equal'&&Math.random()<.5)b=a;const ask=type==='more'?'Which group has MORE?':type==='fewer'?'Which group has FEWER?':'Do the groups have the SAME number?';prompt(ask,'Count each group, then compare the amounts.');const wrap=document.createElement('div');wrap.className='compare-wrap';const L=document.createElement('button');L.type='button';L.className='compare-box';L.appendChild(dots(a));const mid=document.createElement('div');mid.className='vs';mid.textContent='vs';const R=document.createElement('button');R.type='button';R.className='compare-box';R.appendChild(dots(b));wrap.append(L,mid,R);el('activityStage').appendChild(wrap);if(type==='equal'){choices([{label:'Yes',value:true},{label:'No',value:false}],a===b)}else{const ans=type==='more'?(a>b?'Left':'Right'):(a<b?'Left':'Right');choices(['Left','Right'],ans)}},
 compareMore(){A.compare('more')},compareFewer(){A.compare('fewer')},compareEqual(){A.compare('equal')},compareMixed(){A.compare(shuffle(['more','fewer','equal'])[0])},
 position(){const kind=shuffle(['above','below','beside','in front of','behind'])[0];prompt('Which position word completes the sentence?','Listen to the sentence and choose the location word.');const d=document.createElement('div');d.className='story';d.textContent=`The star is ${kind} the box.`;el('activityStage').appendChild(d);choices(['above','below','beside','in front of','behind'],kind);},
 shape2d(){const s=[['○','circle'],['□','square'],['▭','rectangle'],['△','triangle'],['⬡','hexagon']],p=s[rand(0,s.length-1)];prompt('What 2D shape is this?','Name the shape by its sides, corners, or curved edge.');big(p[0]);const opts=shuffle([p[1],...s.filter(x=>x[1]!==p[1]).map(x=>x[1])]).slice(0,4);choices(opts,p[1]);},
 shape3d(){const s=[['⚽','sphere'],['🧊','cube'],['🥫','cylinder'],['🍦','cone']],p=s[rand(0,s.length-1)];prompt('What 3D solid shape does this object model?','Think about whether it can roll, stack, or has flat faces.');big(p[0]);choices(s.map(x=>x[1]),p[1]);},
 shapeMix(){if(Math.random()<.5)A.shape2d();else A.shape3d();},
 shapeClue(){const q=shuffle([['Which shape has 3 straight sides?','triangle',['triangle','square','circle','hexagon']],['Which shape has no corners?','circle',['circle','triangle','square','rectangle']],['Which shape has 6 sides?','hexagon',['hexagon','square','triangle','circle']],['Which solid can roll and has no flat face?','sphere',['sphere','cube','cylinder','cone']],['Which solid has two flat circular faces?','cylinder',['cylinder','sphere','cube','cone']]])[0];prompt(q[0],'Use sides, corners, curves, and faces as clues.');choices(q[2],q[1]);},
 shapeCompare(){const q=shuffle([['How are a square and rectangle alike?','Both have 4 sides',['Both have 4 sides','Both are circles','Both have 3 sides']],['How are a circle and triangle different?','Only the triangle has corners',['Only the triangle has corners','Both have 4 corners','Both are solid shapes']],['How are a sphere and cube different?','A sphere can roll easily',['A sphere can roll easily','Both are flat shapes','A cube has no faces']],['How are a square and triangle different?','They have different numbers of sides',['They have different numbers of sides','Both have no corners','Both are spheres']]])[0];prompt(q[0],'Compare the attributes, not the size or color.');choices(q[2],q[1]);},
 shapeCompose(){const q=shuffle([['Which two shapes can be put side by side to make a rectangle?','two squares',['two squares','two circles','two cones']],['Which two shapes can join to make a larger square?','two triangles',['two triangles','two spheres','two cylinders']],['Which pieces can build a larger triangle?','smaller triangles',['smaller triangles','spheres','cylinders']]])[0];prompt(q[0],'Imagine moving and joining the smaller shapes.');choices(q[2],q[1]);},
 attribute(){const q=shuffle([['Which is a measurable attribute of a pencil?','length',['length','favorite color','name']],['Which is a measurable attribute of a backpack?','weight',['weight','owner','picture']],['Which pair names measurable attributes?','length and weight',['length and weight','red and blue','happy and sad']]])[0];prompt(q[0],'A measurable attribute is something we can compare or measure, such as length or weight.');choices(q[2],q[1]);},
 lengthWords(){const q=shuffle([['Which word describes length?','long',['long','heavy','loud']],['Which word describes height?','tall',['tall','soft','round']],['A short crayon and a long crayon differ in what attribute?','length',['length','weight','sound']]])[0];prompt(q[0],'Think about how far an object extends from one end to the other.');choices(q[2],q[1]);},
 weightWords(){const q=shuffle([['Which word describes weight?','heavy',['heavy','long','blue']],['A feather can be described as…','light',['light','tall','square']],['A rock and a feather can both have what measurable attribute?','weight',['weight','letter sound','shape name']]])[0];prompt(q[0],'Weight tells how heavy or light something is.');choices(q[2],q[1]);},
 modelStory(join=true){const a=rand(1,4),b=rand(1,Math.max(1,5-a));const text=join?`There are ${a} birds. ${b} more birds join them. Which picture models the story?`:`There are ${a+b} birds. ${b} birds fly away. Which picture models the story?`;prompt(text,'Choose the drawing that shows the action in the story.');const correct=join?`${'●'.repeat(a)}  |  ${'●'.repeat(b)} join`:`${'●'.repeat(a+b)}  →  ${'×'.repeat(b)} leave`;const wrong1=join?`${'●'.repeat(a+1)}  |  ${'●'.repeat(Math.max(1,b-1))} join`:`${'●'.repeat(a+b+1)} → ${'×'.repeat(b)} leave`;const wrong2=join?`${'●'.repeat(a)}  →  ${'×'.repeat(b)} leave`:`${'●'.repeat(a)} | ${'●'.repeat(b)} join`;choices([correct,wrong1,wrong2],correct);},
 modelJoin(){A.modelStory(true)},modelSeparate(){A.modelStory(false)},
 operationType(){const join=Math.random()<.5;const text=join?'Mia has 2 blocks. Her friend gives her 1 more block. What action is happening?':'There are 4 ducks. One duck swims away. What action is happening?';prompt(text,'Listen for whether objects are joining the group or leaving the group.');choices(['joining','separating'],join?'joining':'separating');}
};

function header(){const [name,goal,rounds]=current();el('lessonEyebrow').textContent=`Term 1 • Week ${st.week+1} • ${weeks[st.week].standards}`;el('lessonTitle').textContent=name;el('lessonGoal').textContent=goal;el('lessonScore').textContent=`⭐ ${st.stars}`;el('roundLabel').textContent=`Round ${Math.min(st.round+1,rounds.length)} of ${rounds.length}`;el('lessonBar').style.width=`${Math.round(100*st.round/rounds.length)}%`;}
function round(){resetStage();header();const rounds=current()[2];if(st.round>=rounds.length){finish();return}const fn=A[rounds[st.round]];if(!fn)throw new Error('Unknown activity '+rounds[st.round]);fn();}
function start(w,d){st.week=w;st.day=d;st.round=0;st.correct=0;st.attempts=0;st.stars=0;showView('lesson');round();}
function finish(){resetStage();const key=`${st.week}-${st.day}`,pct=st.attempts?Math.round(100*st.correct/st.attempts):0,rec=progress.lessons[key];const first=!rec.complete;Object.assign(rec,{complete:true,correct:st.correct,attempts:st.attempts,stars:st.stars,bestPct:Math.max(rec.bestPct||0,pct)});if(first){const today=new Date().toISOString().slice(0,10);if(progress.lastCompleted){const diff=Math.round((Date.parse(today)-Date.parse(progress.lastCompleted))/86400000);progress.streak=diff===1?(progress.streak||0)+1:diff===0?(progress.streak||1):1}else progress.streak=1;progress.lastCompleted=today}save();el('lessonBar').style.width='100%';el('roundLabel').textContent='Lesson complete';el('promptText').textContent='Mission complete';const decision=pct>=90?'Secure — advance':pct>=80?'Advance with review':pct>=70?'Repeat once':'Reteach at an easier range';el('activityStage').innerHTML=`<div style="text-align:center"><div style="font-size:4rem">🏅</div><div class="prompt-big" style="margin:6px 0">${pct}% accuracy</div><div style="font-weight:900;font-size:1.25rem">${decision}</div><p class="muted">${st.correct} correct across ${st.attempts} attempts</p><button id="doneHome" class="btn primary" type="button">Back to lessons</button></div>`;el('doneHome').onclick=()=>{renderHome();showView('home')};speak('Great job. You finished the math mission.');}
function renderHome(){const grid=el('weekGrid');grid.innerHTML='';weeks.forEach((w,wi)=>{const card=document.createElement('section');card.className='week-card card';const done=w.days.filter((_,d)=>progress.lessons[`${wi}-${d}`].complete).length;card.innerHTML=`<div class="eyebrow">TERM 1 • WEEK ${wi+1}</div><h3>${w.title}</h3><p class="muted">${w.goal}</p><div class="badge mid" style="margin-bottom:12px">${w.standards}</div>`;const list=document.createElement('div');list.className='lesson-list';w.days.forEach((d,di)=>{const rec=progress.lessons[`${wi}-${di}`];const b=document.createElement('button');b.type='button';b.className='lesson-row'+(rec.complete?' complete':'');b.innerHTML=`<span class="day">DAY ${di+1}</span><span class="name">${d[0]}</span><span class="status">${rec.complete?rec.bestPct+'% ✓':'Start'}</span>`;b.onclick=()=>start(wi,di);list.appendChild(b)});card.appendChild(list);const foot=document.createElement('div');foot.className='week-progress';foot.textContent=`${done}/4 lessons complete`;card.appendChild(foot);grid.appendChild(card)});renderHomeStats();}
function renderHomeStats(){const completed=Object.values(progress.lessons).filter(x=>x.complete).length,total=weeks.reduce((n,w)=>n+w.days.length,0);el('overallPct').textContent=Math.round(100*completed/total)+'%';el('overallBar').style.width=100*completed/total+'%';}
function renderParent(){const recs=Object.values(progress.lessons),completed=recs.filter(x=>x.complete).length,total=recs.length;el('statLessons').textContent=`${completed}/${total}`;el('statAccuracy').textContent=progress.totalAttempts?Math.round(100*progress.totalCorrect/progress.totalAttempts)+'%':'—';el('statStreak').textContent=progress.streak||0;el('statStars').textContent=progress.totalStars||0;let html='<table class="progress-table"><thead><tr><th>Week</th><th>Standards</th><th>Completed</th><th>Best avg.</th><th>Decision</th></tr></thead><tbody>';weeks.forEach((w,wi)=>{const r=w.days.map((_,d)=>progress.lessons[`${wi}-${d}`]),done=r.filter(x=>x.complete),avg=done.length?Math.round(done.reduce((n,x)=>n+(x.bestPct||0),0)/done.length):0;const decision=!done.length?'Not enough data':avg>=90?'Secure / advance':avg>=80?'Advance + review':avg>=70?'Repeat':'Reteach';const cls=!done.length||avg<70?'low':avg<90?'mid':'good';html+=`<tr><td><strong>Week ${wi+1}: ${w.title}</strong></td><td>${w.standards}</td><td>${done.length}/4</td><td>${done.length?avg+'%':'—'}</td><td><span class="badge ${cls}">${decision}</span></td></tr>`});html+='</tbody></table>';el('parentTableWrap').innerHTML=html;}

el('backBtn').onclick=()=>{clearTimer();renderHome();showView('home')};
el('parentBackBtn').onclick=()=>{renderHome();showView('home')};
el('parentBtn').onclick=()=>{renderParent();showView('parent')};
el('speakBtn').onclick=()=>speak(st.prompt||'Math mission');
el('hintBtn').onclick=()=>feedback(st.hint||'Use objects, count carefully, and try again.','hint');
el('nextBtn').onclick=()=>{st.round++;round()};
el('resetBtn').onclick=()=>{if(confirm('Reset all Math Mission progress on this device?')){progress=blankProgress();save();renderParent();renderHome()}};
el('installBtn').onclick=async()=>{if(st.deferredInstall){st.deferredInstall.prompt();await st.deferredInstall.userChoice;st.deferredInstall=null}else el('installModal').classList.remove('hidden')};
el('closeInstall').onclick=()=>el('installModal').classList.add('hidden');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();st.deferredInstall=e});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
renderHome();
})();