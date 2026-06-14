// ── PARTICLES ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
for (let i = 0; i < 55; i++) {
  particles.push({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, r: Math.random()*1.4+0.3, dx: (Math.random()-0.5)*0.3, dy: (Math.random()-0.5)*0.3, alpha: Math.random()*0.4+0.1 });
}
function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(201,168,76,${p.alpha})`; ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x<0||p.x>canvas.width) p.dx*=-1;
    if (p.y<0||p.y>canvas.height) p.dy*=-1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── LANGUAGE ──
let isUrdu = false;
const translations = {
  en: {
    heroEyebrow: 'Microsoft Agents League Hackathon 2026',
    heroLine1: 'Craft Worlds', heroLine2: 'With Words',
    heroSub: 'Enter a spark of imagination. StoryForge AI weaves it into a full narrative — in seconds.',
    labelLeft: 'YOUR IMAGINATION', labelRight: 'YOUR STORY',
    labelCharacter: '🎭 Character Name', labelPremise: 'Story Premise',
    labelGenre: 'Genre', labelLength: 'Story Length', labelTone: 'Narrative Tone',
    btnText: 'Forge My Story', langLabel: 'اردو',
    g1:'Adventure',g2:'Sci-Fi',g3:'Horror',g4:'Romance',g5:'Fantasy',g6:'Mystery',
    sl1:'Flash',sl2:'Short',sl3:'Epic',
    t1:'Cinematic',t2:'Lyrical',t3:'Gritty',t4:'Whimsical',
    statW:'words',statR:'min read',statS:'sentences',
    historyTitle:'📖 Story History', noHistoryText:'No stories saved yet.',
    clearBtn:'🗑️ Clear All', emptyText:'Your story will appear here',
    emptySmall:'Choose a genre, set the tone, and forge your narrative',
    ratingLabel:'Rate this story:',
    charPlaceholder:'e.g. Zara, Marcus, Elena...',
    premisePlaceholder:'e.g. A lone astronaut discovers a signal from 1977...',
    loadingPhrases:['Weaving your narrative...','Building the world...','Finding the right words...','Crafting your characters...','Setting the scene...']
  },
  ur: {
    heroEyebrow: 'مائیکروسافٹ ایجنٹس لیگ ہیکاتھون ۲۰۲۶',
    heroLine1: 'الفاظ سے', heroLine2: 'دنیائیں بناؤ',
    heroSub: 'اپنے خیال کی چنگاری دیں۔ StoryForge AI اسے چند سیکنڈ میں مکمل کہانی میں بدل دے گا۔',
    labelLeft: 'آپ کا تخیل', labelRight: 'آپ کی کہانی',
    labelCharacter: '🎭 کردار کا نام', labelPremise: 'کہانی کا خلاصہ',
    labelGenre: 'صنف', labelLength: 'کہانی کی لمبائی', labelTone: 'انداز بیان',
    btnText: 'کہانی بنائیں', langLabel: 'English',
    g1:'مہم جوئی',g2:'سائنس فکشن',g3:'ہارر',g4:'رومانس',g5:'فنتاسی',g6:'معمہ',
    sl1:'مختصر',sl2:'درمیانی',sl3:'طویل',
    t1:'سینماٹک',t2:'شاعرانہ',t3:'سخت',t4:'خیالی',
    statW:'الفاظ',statR:'منٹ پڑھنا',statS:'جملے',
    historyTitle:'📖 کہانی کی تاریخ', noHistoryText:'ابھی تک کوئی کہانی محفوظ نہیں۔',
    clearBtn:'🗑️ سب صاف کریں', emptyText:'آپ کی کہانی یہاں ظاہر ہوگی',
    emptySmall:'صنف منتخب کریں، انداز طے کریں، کہانی بنائیں',
    ratingLabel:'اس کہانی کو ریٹ کریں:',
    charPlaceholder:'مثلاً زارا، مارکس، ایلینا...',
    premisePlaceholder:'مثلاً ایک تنہا خلاباز کو ۱۹۷۷ کا ایک پیغام خلاء میں ملتا ہے...',
    loadingPhrases:['کہانی بن رہی ہے...','دنیا تعمیر ہو رہی ہے...','الفاظ ڈھونڈے جا رہے ہیں...','کردار تشکیل پا رہے ہیں...','منظر سجایا جا رہا ہے...']
  }
};

function toggleLanguage() { isUrdu = !isUrdu; applyTranslations(isUrdu ? 'ur' : 'en'); }
function applyTranslations(lang) {
  const t = translations[lang];
  ['heroEyebrow','heroLine1','heroLine2','heroSub','labelLeft','labelRight',
   'labelCharacter','labelPremise','labelGenre','labelLength','labelTone','btnText','langLabel',
   'g1','g2','g3','g4','g5','g6','sl1','sl2','sl3','t1','t2','t3','t4',
   'statW','statR','statS','historyTitle','noHistoryText','clearBtn',
   'emptyText','emptySmall','ratingLabel'].forEach(id => {
    const el = document.getElementById(id); if (el && t[id]) el.textContent = t[id];
  });
  document.getElementById('characterInput').placeholder = t.charPlaceholder;
  document.getElementById('topicInput').placeholder = t.premisePlaceholder;
  document.getElementById('storyOutput').classList.toggle('urdu', lang==='ur');
  document.querySelector('.hero').classList.toggle('urdu', lang==='ur');
  document.querySelector('html').setAttribute('dir', lang==='ur' ? 'rtl' : 'ltr');
}

// ── SOUND ──
let soundEnabled = false;
let soundNodes = [];
let selectedSound = 'forest';

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('soundBtn');
  const bar = document.getElementById('ambientBar');
  if (soundEnabled) {
    btn.textContent = '🔊'; btn.classList.add('active');
    bar.style.display = 'flex';
    startAmbientSound();
  } else {
    btn.textContent = '🔇'; btn.classList.remove('active');
    bar.style.display = 'none';
    stopAmbientSound();
  }
}

function startAmbientSound() {
  stopAmbientSound();
  const urls = {
    forest: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
    rain:   'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
    ocean:  'https://assets.mixkit.co/active_storage/sfx/2520/2520-preview.mp3',
    fire:   'https://assets.mixkit.co/active_storage/sfx/1234/1234-preview.mp3',
    space:  'https://assets.mixkit.co/active_storage/sfx/2517/2517-preview.mp3'
  };
  try {
    const audio = new Audio(urls[selectedSound] || urls.forest);
    audio.loop = true; audio.volume = 0.3; audio.play();
    soundNodes = [audio];
  } catch(e) { showToast('⚠️ Sound blocked by browser'); }
}

function stopAmbientSound() {
  soundNodes.forEach(n => { try { if (n.pause) { n.pause(); n.src=''; } } catch(e){} });
  soundNodes = [];
}

function selectSound(type) {
  selectedSound = type;
  document.querySelectorAll('.sound-opt').forEach(b => b.classList.toggle('active', b.dataset.sound===type));
  if (soundEnabled) startAmbientSound();
}

function setVolume(val) {
  soundNodes.forEach(n => { try { if (n.volume !== undefined) n.volume = val/100; } catch(e){} });
}

// ── GENRE & TONE ──
let selectedGenre = 'adventure';
let selectedTone = 'cinematic';
document.querySelectorAll('.genre-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); selectedGenre = btn.dataset.genre;
  });
});
document.querySelectorAll('.tone-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); selectedTone = btn.dataset.tone;
  });
});

// ── CHAR COUNTER ──
document.getElementById('topicInput').addEventListener('input', () => {
  const len = document.getElementById('topicInput').value.length;
  document.getElementById('charCount').textContent = len;
  if (len > 300) document.getElementById('topicInput').value = document.getElementById('topicInput').value.slice(0,300);
});

// ── SLIDER ──
const lengthSlider = document.getElementById('lengthSlider');
lengthSlider.addEventListener('input', () => {
  const pct = ((lengthSlider.value-1)/2)*100;
  lengthSlider.style.background = `linear-gradient(to right,#c9a84c ${pct}%,rgba(255,255,255,0.08) ${pct}%)`;
});

// ── COVER IMAGE ──
const genreColors = {
  adventure:['#c9a84c','#a0720f','#2a1a05'], scifi:['#4a9eff','#1a4a8a','#050a1a'],
  horror:['#8b1a1a','#3a0a0a','#0a0505'], romance:['#e8709a','#a03060','#1a0510'],
  fantasy:['#a688e8','#5a3a9a','#0a0518'], mystery:['#7a8a9a','#3a4a5a','#080a0c']
};
const genreEmojis = { adventure:'⚔️',scifi:'🚀',horror:'👁️',romance:'🌹',fantasy:'🔮',mystery:'🕵️' };

function generateCoverImage(genre, character, premise) {
  const cvs = document.getElementById('coverCanvas');
  const c = cvs.getContext('2d');
  const colors = genreColors[genre]||genreColors.adventure;
  const w=cvs.width, h=cvs.height;
  const grad = c.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,colors[2]); grad.addColorStop(0.5,colors[1]); grad.addColorStop(1,colors[0]+'33');
  c.fillStyle=grad; c.fillRect(0,0,w,h);
  for(let i=0;i<80;i++){
    c.beginPath(); c.arc(Math.random()*w,Math.random()*h,Math.random()*1.5,0,Math.PI*2);
    c.fillStyle=`rgba(255,255,255,${Math.random()*0.4+0.1})`; c.fill();
  }
  const glow=c.createRadialGradient(w*0.7,h*0.5,10,w*0.7,h*0.5,150);
  glow.addColorStop(0,colors[0]+'44'); glow.addColorStop(1,'transparent');
  c.fillStyle=glow; c.fillRect(0,0,w,h);
  c.font=`${h*0.45}px serif`; c.textAlign='right'; c.textBaseline='middle';
  c.globalAlpha=0.25; c.fillText(genreEmojis[genre]||'✦',w-30,h/2); c.globalAlpha=1;
  c.fillStyle=colors[0]; c.fillRect(30,h-50,120,3);
  if(character){
    c.font='bold 28px serif'; c.fillStyle=colors[0]; c.textAlign='left'; c.textBaseline='middle';
    c.shadowColor=colors[0]; c.shadowBlur=15;
    c.fillText(character.toUpperCase(),30,h/2-18); c.shadowBlur=0;
  }
  if(premise){
    c.font='14px sans-serif'; c.fillStyle='rgba(255,255,255,0.6)'; c.textAlign='left'; c.textBaseline='top';
    const words=premise.split(' '); let line='', y=character?h/2+12:h/2-10;
    words.forEach(word=>{
      const test=line+word+' ';
      if(c.measureText(test).width>w*0.55&&line){ if(y<h-40){c.fillText(line,30,y);y+=20;} line=word+' '; }
      else line=test;
    });
    if(y<h-40) c.fillText(line,30,y);
  }
  c.font='bold 11px sans-serif'; c.fillStyle=colors[0]; c.textAlign='left'; c.textBaseline='middle';
  c.fillText('STORYFORGE AI',30,h-30);
  document.getElementById('coverImageBox').style.display='block';
}

// ── STORY DATA ──
const storyData = {
  adventure:{
    cinematic:["The mountain had no name on any map. {hero} discovered that on the morning {pronoun} found the compass — the one pointing south, always south, no matter where {pronoun} turned.","Three days into the climb, the air thinned and the silence deepened. Every foothold was a negotiation with gravity, every breath a small victory. The summit was not a destination. It was a reckoning.","On the fifth night, {hero} found a lantern still burning inside the abandoned waystation. Someone had been there — someone who left in a hurry, leaving half a meal and a map covered in warnings written in red.","The descent was harder than the climb. Not because of the terrain, but because {pronoun} now knew what was at the top — and what it had cost others to reach it.","By the time the valley came into view, the compass finally spun free. {hero} understood then: the journey had never been about reaching somewhere. It had been about becoming someone who could."],
    gritty:["{hero} had done harder things than this. Or at least that was the lie {pronoun} kept telling {reflexive} as the trail turned to mud and the sky turned to iron.","The pack weighed forty pounds. The mission weighed more. Nobody sent {pronoun} here — {pronoun} chose this, which somehow made it worse.","By nightfall the rain had stopped pretending. It came in curtains. {hero} built a fire with wet wood and sheer stubbornness. It caught on the third try.","The camp was closer than the map suggested. {hero} counted seven fires and planned a route through darkness that required calm {pronoun} wasn't sure {pronoun} possessed.","{hero} made it through. Not cleanly, not without cost. {pronoun} allowed {reflexive} sixty seconds to feel something. Then {pronoun} moved on."],
    lyrical:["There is a particular quality to light in high places. {hero} had lived in that light for four days, and was beginning to suspect it was changing {pronoun}.","The stones remembered feet older than history. Each step {hero} placed was a conversation with all who came before.","Wind in the passes spoke in a tongue {pronoun} was only beginning to learn. It told stories of migrations, catastrophes, seasons that lasted years.","On the high ridge at dusk, the world fell away and {hero} understood what it meant to be small — not diminished, but scaled.","Returning to the lowlands, {hero} carried something that had no weight but occupied {pronoun} completely. A frequency. A way of hearing the world the mountain had tuned {pronoun} to."],
    whimsical:["{hero} set off on a Tuesday because Tuesdays seemed underrated. The road sparkled differently, as if waiting for someone to notice.","The first magical creature {pronoun} encountered was a fox reading a newspaper. It said: 'You're going the right direction, but for entirely the wrong reasons.'","The enchanted forest had a gift shop. The sign read: All enchantments complimentary. Please return when done.","At the centre of the adventure was something so obvious that {hero} had walked past it three times. The treasure was waiting for the right kind of attention.","{hero} arrived home with mud on {pronoun} boots, stars in {pronoun} hair, and an explanation no one quite believed — exactly how the best adventures ended."]
  },
  scifi:{
    cinematic:["The signal had traveled 47 light-years to reach a receiver almost no one remembered to check. {hero} was the only one in the building when it arrived.","The message decoded in eleven minutes — symbols into language, language into meaning, meaning into something that sat in {pronoun} chest like a held breath. It was not a warning. It was an address.","Mission prep took six months. The crew was small. The silence between them grew large.","First contact lasted four hours and seventeen minutes. Later, {hero} would struggle to explain it — human language had been built for a human world.","The journey home took longer than expected. {hero} wrote down everything before memory could soften it. The stars were the same. But {pronoun} no longer saw them the same way."],
    gritty:["The station was supposed to be decommissioned three years ago. {hero} had the memo. What {pronoun} didn't have was an explanation for the life-sign reading still blinking.","In space, problems accumulate quietly until one small thing tips the balance. {hero} found the breach at 0300 hours, alone, with fourteen minutes of patch compound.","{pronoun} fixed it. The patch held. The hand {pronoun} used wouldn't grip properly for a week.","The distress signal led to a ship that shouldn't have been in this sector. {hero} made the call: they were coming aboard.","Command filed it 'Incident Resolved.' {hero} filed it differently: The day I remembered why I signed up, and what it costs to stay."],
    lyrical:["Space is not empty. {hero} had been told this in training. But knowing and perceiving are different countries.","The universe communicates in light always arriving from the past. Every star {hero} observed was a letter from a sender who might no longer exist.","The anomaly had no name. {hero} gave it one — quietly — because things without names felt too much like absences.","What {pronoun} discovered rewrote something interior: the assumption that {pronoun} knew the scale of things. {hero} had been wrong.","Returning to gravity after months without it is a gradual reacquaintance with weight. {hero} found it strange how quickly {pronoun} had forgotten."],
    whimsical:["{hero} had not expected the alien to be so enthusiastic about biscuits. Three parsecs from Earth, locked in a diplomatic incident involving a snack tin.","The translation matrix had ninety-seven languages but no setting for enthusiastic misunderstanding.","A breakthrough arrived when {hero} realized the alien wasn't threatening {pronoun} — it was doing an impression. A very accurate impression.","They communicated through shared curiosity: pointing at things, raising eyebrows, meaning I find you genuinely interesting.","{hero} filed the mission report carefully: it had been ridiculous, wonderful, and the best day of {pronoun} life."]
  },
  horror:{
    cinematic:["The house had been empty for eleven years. {hero} had checked three times. The certainty lasted until {pronoun} saw the kitchen table.","A meal had been set out — not old, not rotting — set with care, for two, candles burned to a precise middle height. {hero} counted backward from ten.","The sounds began on the second night. Small sounds. Domestic sounds. The creak of weight on specific floorboards. Water running in a distant room.","{hero} told {reflexive} there were explanations. Old houses settle. {pronoun} told {reflexive} this at 2am, 3am, and by 5am had stopped finding it convincing.","The last journal entry: I understand now it isn't threatening me. It is waiting. The distinction matters, but I am no longer sure it matters in my favour. {hero} looked at the doorway and did not look away."],
    gritty:["Nobody hires an investigator to find good news. {hero} knew the people who knocked on {pronoun} door were hoping to be wrong.","This client wasn't hoping to be wrong. This client wanted to know — with the ferocity of someone lied to for a long time.","{hero} took the case. {pronoun} always took the ones where someone's life would be different depending on what {pronoun} found.","Whatever was in that building had been there longer than the building. Cold from the wrong direction. Silence with texture.","{hero} solved the case. What {pronoun} never told anyone was what {pronoun} agreed to in order to walk back out."],
    lyrical:["Fear in its oldest form is not about monsters. It is about the wrong kind of attention — something vast noticing you specifically.","The sounds were not silence but a subtraction — all small frequencies of being alive removed from the air.","The figure stood at the end of the corridor. {hero} stood at the other end. Neither moved. A courtesy extended before the negotiation ended.","When it moved, it moved the way certain memories move: sideways, never quite where you were looking.","{hero} left at dawn. But there is a category of experience that does not return to before — only to a before with something permanently changed."],
    whimsical:["The ghost was the most apologetic thing {hero} had ever encountered. It manifested with a small oh dear, embarrassed to be haunting at all.","'I don't actually want to frighten anyone,' it explained. 'It's terribly embarrassing. I keep coming back out of habit.'","{hero} made it tea. They sat while the ghost described everything it had tried — including a meditation class that left it spectral but no more resolved.","They arranged: manifestations confined to Tuesday evenings, radio left on so it had something to listen to.","Visitors said the house felt like somewhere someone had been very happy for a long time. This, {hero} concluded, was accurate."]
  },
  romance:{
    cinematic:["The library closed at nine. {hero} was still there at eight fifty-seven, having lost track of time — the way that only happened in rooms full of books, and occasionally a particular person.","That person was returning books to the wrong shelf. {hero} noticed this first as an offense against order, and second as an opportunity.","What {pronoun} said was: That one belongs in the next section. What {pronoun} meant was something considerably longer. The response suggested the other person understood both.","They talked until the librarian asked them to leave. Outside, the city had turned to evening, and neither had a convincing reason to go in a different direction.","Later, {hero} would try to identify the exact moment the evening changed from ordinary to the kind you remember with warmth, and conclude there wasn't one — only small moments accumulating into something with its own gravity."],
    lyrical:["Some people arrive with the quality of a key — not for a lock you knew you had, but for one you discover only when it opens.","{hero} was not looking for anyone. This is when the finding happens — as a gradual realization that something has shifted in daily life.","What {pronoun} noticed first was the attention — the real kind, meaning someone is listening rather than waiting. Rarer than it should be.","Love in its working form is less like lightning than a tide — arriving in increments until you look up and the landscape has been remade.","{hero} looked up one such day and realized. The word for what {pronoun} felt existed in several languages. None were adequate. {pronoun} decided that was fine."],
    whimsical:["{hero} had not intended to fall in love at a farmers market. The universe arranged for them to reach for the same unusual carrots at the exact same moment.","There followed an exchange about carrot quality both found amusing, and the discovery they were parked adjacently heading to the same part of town.","The universe arranged for the coffee shop they both stopped at to have only one table free, in a window with particularly favorable afternoon light.","They talked for two hours about things that seemed ordinary. From inside, it was the conversation that occurs when two people discover the other one makes sense.","{hero} drove home with carrots forgotten on the seat and a phone number on a receipt and the feeling the day had been completely unremarkable and also the best one in recent memory."]
  },
  fantasy:{
    cinematic:["The old kingdoms had three rules about magic: source, cost, limit. {hero} was about to break all three, and {pronoun} understood exactly what that would mean.","The spell required something that could not be returned — the part of {pronoun} that had believed, without reservation, that {pronoun} would succeed.","It worked. The darkness receded. Three hundred thousand souls continued turning toward morning, never knowing what happened in this chamber.","What remained was enough. Not everything {pronoun} had been, but enough to continue in a different shape toward purposes that needed rebuilding.","History would call it triumph. {hero} would have corrected them: it was sufficiency — and in its own way, the harder thing."],
    lyrical:["Magic in the oldest traditions is not separate from the world — it is the world's deeper grammar, the syntax beneath stone and water and sky.","The forest knew {pronoun}. Not through encounter, but in the way landscapes know those who have spent themselves inside them.","The prophecy had been written to resist interpretation — because certainty about the future made people careless. {hero} had been careless. {pronoun} was done with that.","The dragon's scales held light the way water holds it — translating rather than reflecting. {hero} had been told to fear this creature. {pronoun} felt recognition instead.","When the age ended — and ages end as quietly as they begin — {hero} was there, as {pronoun} had been there for many things that mattered."],
    whimsical:["The dragon was small enough to sit on {hero}'s shoulder, which the dragon found deeply undignified. {hero} found it convenient. The dragon acknowledged this with grumpiness.","They had been companions three years, navigating a kingdom not adjusted to either of them — certainly not both simultaneously.","The quest seemed simple: recover the artifact, restore the balance. From inside: twelve misunderstandings, one accidental coronation, a village excited about cheese.","The artifact was guarded by a wizard who had been waiting for exactly this visitor and had spent the time developing opinions about narrative convenience.","{hero} carried the artifact home through an evening like the last page of a story — everything resolved, just the walk home and the knowledge of having been, against odds, adequate."]
  },
  mystery:{
    cinematic:["Three facts {hero} knew: the victim alive at seven, the clock stopped at nine, and everyone's alibi just slightly too good. That last detail was most interesting.","Witnesses lie in predictable patterns — truth and memory contradict each other under stress in ways that leave marks. {hero} had learned to read those marks.","The second interview broke at three when {pronoun} asked about the color of a coat. Small question. The pause before the answer was enormous.","Evidence properly read tells a story its creators never intended. {hero} laid it out in sequence and watched the true story emerge.","The arrest was quiet. Just the moment when accumulated fact became heavier than whatever held it back, and the structure collapsed into truth."],
    gritty:["Nobody hires a detective to find good news. {hero} knew the people who knocked were hoping to be wrong.","This client wasn't hoping to be wrong — wanting to know with the ferocity of someone lied to for a long time.","{hero} took the case. {pronoun} always took the ones where someone's life would be different depending on what {pronoun} found.","What {pronoun} found was worse than suspected and in one specific way better. The truth rarely arrives as one thing.","{hero} delivered it straight. The client sat with it a long time. Then said: Thank you. And meant it."],
    whimsical:["{hero} had not expected the mystery to involve a prize marrow. Here was the marrow, the victim merely unconscious, and the fete committee looking collectively guilty.","The marrow had a complicated history. One person had very strong feelings — the kind leading to things at 8am you regret all day.","{hero} conducted interviews with careful neutrality, doing {pronoun} professional best not to find it entertaining. It was very entertaining.","The culprit confessed with the relief of someone glad to be free of a secret both very serious and very silly at once.","{hero} closed the case. The marrow placed third, which most agreed was about right. Village life offered the full complexity of human existence at reduced scale."]
  }
};

const urduStories = {
  adventure:["مہم کا آغاز اس صبح ہوا جب {hero} کو وہ قدیم نقشہ ملا جس پر کوئی جگہ نہیں بتائی گئی تھی — صرف ایک نشان تھا جو جنوب کی طرف اشارہ کرتا تھا۔","پہاڑ کی چوٹی تک پہنچنا آسان نہیں تھا۔ ہر قدم ایک امتحان تھا، ہر سانس ایک فتح۔ لیکن {hero} کے قدم نہیں رکے۔","پانچویں رات کو {pronoun} کو ایک روشن لالٹین ملی۔ کوئی ابھی وہاں سے گیا تھا — جلدی میں، آدھا کھانا اور ایک نقشہ چھوڑ کر۔","واپسی چڑھائی سے بھی مشکل تھی — {hero} اب جانتا تھا کہ اوپر کیا ہے اور اسے پانے کی کیا قیمت ادا کرنی پڑتی ہے۔","جب وادی نظر آئی تو قطب نما آزاد ہو گیا۔ {hero} کو سمجھ آئی: یہ سفر کہیں پہنچنے کے لیے نہیں — کوئی اور بننے کے لیے تھا۔"],
  scifi:["سگنل ۴۷ نوری سال کا سفر طے کر کے آیا۔ {hero} تنہا دفتر میں تھا جب یہ پہنچا۔","پیغام گیارہ منٹ میں ڈی کوڈ ہوا۔ یہ خطرے کی بات نہیں تھی — یہ ایک پتہ تھا۔","مشن کی تیاری میں چھ ماہ لگے۔ عملہ چھوٹا تھا۔ ان کے درمیان خاموشی بڑی ہوتی گئی۔","پہلا رابطہ چار گھنٹے کا رہا۔ {hero} کو بعد میں اسے بیان کرنے میں مشکل ہوئی۔","گھر واپسی توقع سے زیادہ وقت لی۔ باہر وہی ستارے تھے۔ لیکن {pronoun} اب انہیں پہلے جیسا نہیں دیکھتا تھا۔"],
  horror:["گھر گیارہ سال سے خالی تھا۔ {hero} نے تین بار جانچا تھا۔ یہ یقین اس وقت تک رہا جب تک {pronoun} نے کچن کی میز نہیں دیکھی۔","دسترخوان بچھا ہوا تھا — تازہ کھانا، دو لوگوں کے لیے۔ {hero} نے آہستہ آہستہ دس سے ایک تک گنا۔","آوازیں دوسری رات شروع ہوئیں — چھوٹی، گھریلو آوازیں۔ مخصوص فرش پر قدموں کی چرچراہٹ۔","{hero} نے خود کو بتایا کہ وجہ ہوگی۔ رات کے دو بجے، پھر تین بجے — صبح پانچ بجے یہ یقین نہیں رہا۔","ڈائری کی آخری سطر: یہ مجھے ڈراتا نہیں — یہ انتظار کر رہا ہے۔ {hero} نے دروازے کی طرف دیکھا اور نظر نہیں ہٹائی۔"],
  romance:["لائبریری نو بجے بند ہوتی تھی۔ {hero} ابھی وہیں تھا — وقت گزرنے کا احساس کھو بیٹھا تھا۔","وہ شخص کتابیں غلط جگہ رکھ رہا تھا۔ {hero} نے پہلے اسے غلطی سمجھا — پھر ایک موقع۔","{pronoun} نے کہا: یہ اگلے حصے میں جانی چاہیے۔ مطلب کہیں زیادہ لمبا تھا۔","وہ لائبریرین کے جانے تک باتیں کرتے رہے۔ باہر شہر شام میں ڈوب چکا تھا۔","بعد میں {hero} نے وہ لمحہ ڈھونڈنے کی کوشش کی جب شام بدلی — اور سمجھا کہ کوئی ایک لمحہ نہیں تھا۔"],
  fantasy:["پرانی سلطنتوں میں جادو کے تین اصول تھے: ماخذ، قیمت، حد۔ {hero} تینوں توڑنے والا تھا۔","جادو کے لیے وہ حصہ دینا پڑتا تھا جو یہ مانتا تھا کہ {hero} کامیاب ہو گا۔","کام ہو گیا۔ اندھیرا ہٹ گیا۔ شہر صبح کی طرف مڑتا رہا — بے خبر۔","جو بچا وہ کافی تھا۔ سب کچھ نہیں — لیکن آگے بڑھنے کے لیے کافی۔","یہ فتح نہیں تھی — یہ کفایت تھی۔ اور اپنے طور پر، یہ زیادہ مشکل کام تھا۔"],
  mystery:["تین باتیں {hero} کو یقین سے معلوم تھیں: مقتول سات بجے زندہ، گھڑی نو بجے رکی، سب کا بہانہ تھوڑا زیادہ مکمل۔","گواہ مخصوص طریقوں سے جھوٹ بولتے ہیں۔ {hero} نے وہ نشانات پڑھنا سیکھ لیا تھا۔","دوپہر تین بجے دوسرا انٹرویو ٹوٹا — کوٹ کے رنگ کے بارے میں ایک چھوٹے سوال پر۔","ثبوت ترتیب سے رکھنے پر اصل کہانی سامنے آئی — وہ نہیں جو کسی نے بتائی تھی۔","گرفتاری خاموشی سے ہوئی۔ بس وہ لمحہ جب جمع شدہ حقائق اس چیز سے بھاری ہو گئے جو انہیں روک رہی تھی۔"]
};

function getStoryParagraphs(genre, tone) {
  if (isUrdu) return urduStories[genre] || urduStories['adventure'];
  const g = storyData[genre] || storyData['adventure'];
  return g[tone] || g['cinematic'] || Object.values(g)[0];
}

function personalize(text, topic, character) {
  const heroName = character || (topic.trim().split(/\s+/)[0].charAt(0).toUpperCase() + topic.trim().split(/\s+/)[0].slice(1)) || 'The wanderer';
  return text.replace(/\{hero\}/g, heroName).replace(/\{pronoun\}/g, 'they').replace(/\{reflexive\}/g, 'themselves');
}

function getLengthCount(val) { return val==1?2:val==2?4:5; }

let currentStory = '';
let currentRating = 0;

async function generateStory() {
  const topic = document.getElementById('topicInput').value.trim();
  const character = document.getElementById('characterInput').value.trim();
  if (!topic) { showToast('✦ Add a story premise to begin'); document.getElementById('topicInput').focus(); return; }
  const btn = document.getElementById('generateBtn');
  btn.classList.add('loading');
  document.getElementById('btnText').textContent = isUrdu ? 'بن رہی ہے...' : 'Forging...';
  document.getElementById('storyOutput').style.display = 'none';
  document.getElementById('storyHeader').style.display = 'none';
  document.getElementById('statsRow').style.display = 'none';
  document.getElementById('ratingBox').style.display = 'none';
  document.getElementById('coverImageBox').style.display = 'none';
  document.getElementById('loadingState').style.display = 'flex';
  currentRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
  const t = translations[isUrdu?'ur':'en'];
  let li = 0;
  const loadingInterval = setInterval(() => { li=(li+1)%t.loadingPhrases.length; document.getElementById('loadingText').textContent = t.loadingPhrases[li]; }, 900);
  await new Promise(r => setTimeout(r, 1800+Math.random()*800));
  clearInterval(loadingInterval);
  const response = await fetch(
  "http://localhost:3000/generate-story",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: topic,
      genre: selectedGenre,
      tone: selectedTone,
    }),
  }
);

const data = await response.json();

currentStory = data.story;

const processed = currentStory.split("\n\n");
  generateCoverImage(selectedGenre, character || topic.split(' ')[0], topic);
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('storyOutput').style.display = 'block';
  const genreLabels = {adventure:'⚔️ Adventure',scifi:'🚀 Sci-Fi',horror:'👁️ Horror',romance:'🌹 Romance',fantasy:'🔮 Fantasy',mystery:'🕵️ Mystery'};
  const genreLabelsUr = {adventure:'⚔️ مہم جوئی',scifi:'🚀 سائنس فکشن',horror:'👁️ ہارر',romance:'🌹 رومانس',fantasy:'🔮 فنتاسی',mystery:'🕵️ معمہ'};
  document.getElementById('storyGenreTag').textContent = (isUrdu?genreLabelsUr:genreLabels)[selectedGenre]||selectedGenre;
  document.getElementById('storyToneTag').textContent = selectedTone.charAt(0).toUpperCase()+selectedTone.slice(1);
  document.getElementById('storyHeader').style.display = 'flex';
  const output = document.getElementById('storyOutput');
  output.innerHTML = '';
  for (let i=0;i<processed.length;i++) {
    const para = document.createElement('p');
    output.appendChild(para);
    await typeText(para, processed[i]);
    await new Promise(r => setTimeout(r, 100));
  }
  const allText = processed.join(' ');
  const words = allText.split(/\s+/).filter(Boolean).length;
  const sentences = allText.split(/[.!?]+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(words/200));
  document.getElementById('wordCount').textContent = words;
  document.getElementById('readTime').textContent = readTime;
  document.getElementById('sentCount').textContent = sentences;
  document.getElementById('statsRow').style.display = 'flex';
  document.getElementById('ratingBox').style.display = 'flex';
  btn.classList.remove('loading');
  document.getElementById('btnText').textContent = isUrdu ? 'کہانی بنائیں' : 'Forge My Story';
  showToast(isUrdu ? '✦ کہانی تیار ہے' : '✦ Story forged successfully');
}

async function typeText(el, text) {
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);
  for (let i=0;i<text.length;i++) {
    el.insertBefore(document.createTextNode(text[i]), cursor);
    await new Promise(r => setTimeout(r, (text[i]==='.'||text[i]===',')?16:5));
  }
  cursor.remove();
}

function rateStory(n) {
  currentRating = n;
  document.querySelectorAll('.star').forEach((s,i) => s.classList.toggle('active', i<n));
  const labels = ['','⭐ Poor','⭐⭐ Fair','⭐⭐⭐ Good','⭐⭐⭐⭐ Great','⭐⭐⭐⭐⭐ Masterpiece!'];
  const labelsUr = ['','⭐ کمزور','⭐⭐ ٹھیک','⭐⭐⭐ اچھا','⭐⭐⭐⭐ بہترین','⭐⭐⭐⭐⭐ شاہکار!'];
  document.getElementById('ratingValue').textContent = (isUrdu?labelsUr:labels)[n];
  showToast(isUrdu ? `${n} ستارے` : `Rated ${n} star${n>1?'s':''}`);
}

function saveToHistory() {
  if (!currentStory) return;
  const topic = document.getElementById('topicInput').value.trim();
  const character = document.getElementById('characterInput').value.trim();
  const history = JSON.parse(localStorage.getItem('sfHistory')||'[]');
  history.unshift({id:Date.now(),topic,character,genre:selectedGenre,tone:selectedTone,story:currentStory,rating:currentRating,date:new Date().toLocaleDateString()});
  if (history.length>20) history.pop();
  localStorage.setItem('sfHistory', JSON.stringify(history));
  showToast(isUrdu ? '💾 کہانی محفوظ ہو گئی' : '💾 Story saved');
}

function openHistory() {
  const history = JSON.parse(localStorage.getItem('sfHistory')||'[]');
  const list = document.getElementById('historyList');
  const ge = {adventure:'⚔️',scifi:'🚀',horror:'👁️',romance:'🌹',fantasy:'🔮',mystery:'🕵️'};
  if (!history.length) {
    list.innerHTML = `<p class="no-history">${isUrdu?'ابھی تک کوئی کہانی محفوظ نہیں۔':'No stories saved yet.'}</p>`;
  } else {
    list.innerHTML = history.map((item,i) => `
      <div class="history-item" onclick="loadHistoryItem(${i})">
        <div class="history-item-header">
          <div class="history-item-tags">
            <span class="story-genre-tag">${ge[item.genre]||'✦'} ${item.genre}</span>
            <span class="story-tone-tag">${item.tone}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="history-item-date">${item.date}</span>
            <button class="history-delete" onclick="event.stopPropagation();deleteHistory(${item.id})">🗑</button>
          </div>
        </div>
        ${item.character?`<div class="history-item-premise">🎭 ${item.character}</div>`:''}
        <div class="history-item-premise">${item.topic}</div>
        <div class="history-item-preview">${item.story.slice(0,150)}...</div>
        ${item.rating?`<div class="history-item-stars">${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</div>`:''}
      </div>`).join('');
  }
  document.getElementById('historyModal').style.display = 'flex';
}

function loadHistoryItem(i) {
  const history = JSON.parse(localStorage.getItem('sfHistory')||'[]');
  const item = history[i]; if (!item) return;
  document.getElementById('topicInput').value = item.topic;
  document.getElementById('characterInput').value = item.character||'';
  currentStory = item.story; selectedGenre = item.genre; selectedTone = item.tone;
  document.querySelectorAll('.genre-btn').forEach(b => b.classList.toggle('active', b.dataset.genre===item.genre));
  document.querySelectorAll('.tone-btn').forEach(b => b.classList.toggle('active', b.dataset.tone===item.tone));
  const output = document.getElementById('storyOutput');
  output.innerHTML = item.story.split('\n\n').map(p=>`<p>${p}</p>`).join('');
  document.getElementById('storyHeader').style.display = 'flex';
  document.getElementById('coverImageBox').style.display = 'none';
  if (item.rating) { currentRating=item.rating; document.querySelectorAll('.star').forEach((s,idx)=>s.classList.toggle('active',idx<item.rating)); }
  document.getElementById('ratingBox').style.display = 'flex';
  closeHistoryBtn();
  showToast(isUrdu?'📖 کہانی لوڈ ہو گئی':'📖 Story loaded');
}

function deleteHistory(id) {
  let history = JSON.parse(localStorage.getItem('sfHistory')||'[]');
  history = history.filter(h=>h.id!==id);
  localStorage.setItem('sfHistory', JSON.stringify(history));
  openHistory();
}

function clearHistory() {
  if (confirm(isUrdu?'کیا آپ واقعی تمام کہانیاں مٹانا چاہتے ہیں؟':'Clear all saved stories?')) {
    localStorage.removeItem('sfHistory'); openHistory();
  }
}

function closeHistory(e) { if (e.target.id==='historyModal') closeHistoryBtn(); }
function closeHistoryBtn() { document.getElementById('historyModal').style.display='none'; }

function copyStory() {
  if (!currentStory) return;
  navigator.clipboard.writeText(currentStory).then(()=>showToast(isUrdu?'📋 کاپی ہو گیا':'📋 Copied'));
}

function downloadStory() {
  if (!currentStory) return;
  const topic = document.getElementById('topicInput').value.trim()||'story';
  const blob = new Blob([currentStory],{type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = topic.slice(0,30).replace(/\s+/g,'-').toLowerCase()+'.txt';
  a.click();
  showToast(isUrdu?'⬇️ محفوظ ہو گئی':'⬇️ Saved');
}

function shareStory() {
  if (!currentStory) return;
  if (navigator.share) { navigator.share({title:'StoryForge AI',text:currentStory}); }
  else { copyStory(); }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg; toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2800);
}

document.getElementById('topicInput').addEventListener('keydown', e => {
  if (e.key==='Enter'&&e.ctrlKey) generateStory();
});