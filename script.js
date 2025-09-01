/* ==========================
   script.js — interactions
   ========================== */

/* --- Section navigation (folder-like) --- */
const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
const panels = Array.from(document.querySelectorAll('.panel'));

// Show initial section (about)
function showSectionById(id){
  panels.forEach(p => {
    const is = p.getAttribute('data-id') === id;
    p.classList.toggle('active', is);
    p.setAttribute('aria-hidden', !is);
  });
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
  // focus first interactive element in active panel for keyboard users
  const activePanel = document.querySelector(`.panel[data-id="${id}"]`);
  const focusable = activePanel ? activePanel.querySelector('[tabindex], a, button, input') : null;
  if(focusable) focusable.focus({preventScroll:true});
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    showSectionById(btn.dataset.target);
  });
  // keyboard support
  btn.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
  });
});

// default
showSectionById('about');


/* --- Typing effect for About terminal --- */
const aboutText = `Offensive Security Specialist with hands-on experience in penetration testing, vulnerability assessment, red team operations and adversary simulation.
Strong command of MITRE ATT&CK, OWASP Top 10 and PTES methodology. Focused on web exploitation, Active Directory attacks and automation.
Top 5% global on TryHackMe with 100+ labs completed. Always learning — building tools and publishing writeups.`;
let aboutIndex = 0;
const aboutDestination = document.getElementById('about-typing');

function typeAbout(nextDelay = 18){
  if(!aboutDestination) return;
  if(aboutIndex < aboutText.length){
    // write one char, preserve newlines
    const ch = aboutText.charAt(aboutIndex);
    aboutDestination.textContent += ch;
    aboutIndex++;
    setTimeout(() => typeAbout(nextDelay), nextDelay + Math.random()*20);
  } else {
    // done
  }
}
typeAbout();

/* --- Skill hover note (small subtle) --- */
const skills = document.querySelectorAll('.skill');
skills.forEach(s => {
  s.addEventListener('mouseenter', () => {
    const note = s.dataset.note || '';
    const noteBox = document.getElementById('skill-note');
    if(noteBox){ noteBox.textContent = note; }
  });
  s.addEventListener('focus', () => {
    const note = s.dataset.note || '';
    const noteBox = document.getElementById('skill-note');
    if(noteBox){ noteBox.textContent = note; }
  });
  s.addEventListener('mouseleave', () => {
    const noteBox = document.getElementById('skill-note');
    if(noteBox){ noteBox.textContent = ''; }
  });
});

/* --- Matrix background: reduced intensity & overlay friendly --- */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

const fontSize = 14;
let columns = Math.floor(W / fontSize);
let drops = Array.from({length: columns}, () => Math.random() * -50);

const letters = "01アカサタナハマヤラワンSECURITYHACKER"; // short mixed set

function resizeMatrix(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  columns = Math.floor(W / fontSize);
  drops = Array.from({length: columns}, () => Math.random() * -50);
}
window.addEventListener('resize', resizeMatrix);

// Draw with reduced opacity and slower frame for calmer effect
function drawMatrix(){
  // faint trail for soft look
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0,0,W,H);

  ctx.fillStyle = 'rgba(0,255,138,0.18)'; // low-opacity neon
  ctx.font = `${fontSize}px monospace`;

  for(let i=0;i<drops.length;i++){
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    ctx.fillText(text, x, y);

    if(y > H && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.6 + Math.random()*0.8; // slow drift
  }
  requestAnimationFrame(drawMatrix);
}
drawMatrix();

/* --- Accessibility: allow hash navigation to change sections --- */
if(location.hash){
  const id = location.hash.replace('#','');
  const valid = Array.from(navButtons).some(b => b.dataset.target === id);
  if(valid) showSectionById(id);
}
document.querySelectorAll('.cta').forEach(c => {
  c.addEventListener('click', () => {
    const t = c.dataset.target;
    if(t) showSectionById(t);
  });
});
