const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('celebrateBtn');

let pieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createBurst(x, y) {
  const colors = ['#ffd166', '#ff4d8d', '#ffffff', '#8cffda', '#a78bfa'];

  for (let i = 0; i < 160; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    pieces.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      gravity: 0.08 + Math.random() * 0.05,
      size: 2 + Math.random() * 5,
      life: 70 + Math.random() * 45,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.25,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces = pieces.filter((p) => p.life > 0);

  pieces.forEach((p) => {
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  requestAnimationFrame(animate);
}

btn.addEventListener('click', () => {
  const rect = btn.getBoundingClientRect();
  createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  setTimeout(() => createBurst(window.innerWidth * 0.2, window.innerHeight * 0.25), 150);
  setTimeout(() => createBurst(window.innerWidth * 0.8, window.innerHeight * 0.28), 300);
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
animate();
