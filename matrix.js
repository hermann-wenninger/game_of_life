// 1. Create canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// 2. Rain
const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px arial";

  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(Math.random() * 128);
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 33);
