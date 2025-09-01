// Section navigation
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Typing effect in About
const aboutText = "Passionate about offensive security, web exploitation and red teaming. Ranked top 5% on TryHackMe with 100+ labs completed. Always learning, always hacking.";
let i = 0;
function typing() {
  if (i < aboutText.length) {
    document.getElementById("typing").innerHTML += aboutText.charAt(i);
    i++;
    setTimeout(typing, 50);
  }
}
typing();

// Matrix rain effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZアニメハッカー";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);

    if(drops[i]*fontSize > canvas.height && Math.random()>0.975){
      drops[i]=0;
    }
    drops[i]++;
  }
}
setInterval(draw,33);

window.addEventListener("resize",()=>{
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
