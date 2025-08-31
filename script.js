// Galaxy background
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i=0; i<150; i++) {
  stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2});
}
function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
  });
}
setInterval(drawStars, 50);

// Music Player Visualizer
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playPauseBtn");
const vCanvas = document.getElementById("visualizer");
if (audio && playBtn && vCanvas) {
  const vCtx = vCanvas.getContext("2d");
  const audioCtx = new AudioContext();
  const src = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();
  src.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      audioCtx.resume();
      playBtn.textContent = "⏸";
      renderFrame();
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  });

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);
    vCtx.clearRect(0,0,vCanvas.width,vCanvas.height);
    let barWidth = (vCanvas.width / bufferLength) * 2.5;
    let barHeight; let x = 0;
    for (let i=0; i<bufferLength; i++) {
      barHeight = dataArray[i]/2;
      vCtx.fillStyle = "cyan";
      vCtx.fillRect(x,vCanvas.height-barHeight,barWidth,barHeight);
      x += barWidth+1;
    }
  }
}

// Typing effect (Tentang page)
const typing = document.querySelector(".typing");
if (typing) {
  let text = typing.textContent;
  typing.textContent = "";
  let i=0;
  function type() {
    if (i<text.length) {
      typing.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  type();
}

// Random quote
const quotes = [
  "Keep pushing forward 🚀",
  "Kreativitas adalah kunci 💡",
  "Hidup sekali, berkarya selamanya ✨"
];
const quoteEl = document.getElementById("quote");
if (quoteEl) {
  quoteEl.textContent = quotes[Math.floor(Math.random()*quotes.length)];
}

// Lightbox (Memory)
const galleryImgs = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
if (galleryImgs) {
  galleryImgs.forEach(img=>{
    img.addEventListener("click",()=>{
      lightbox.style.display="flex";
      lightboxImg.src = img.src;
    });
  });
}
if (closeBtn) {
  closeBtn.addEventListener("click",()=> lightbox.style.display="none");
}