//#region Animation code
import {
  startStartscreenAnimation,
  stopStartscreenAnimation
} from './startsceneAnimation.js';

const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resize() {
  const el = document.getElementById('scene');
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.round(el.clientWidth * dpr);
  canvas.height = Math.round(el.clientHeight * dpr);

  canvas.style.width = el.clientWidth + 'px';
  canvas.style.height = el.clientHeight + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const fs = Math.max(10, Math.round(el.clientWidth * 0.022));

  document.querySelectorAll('.btn-inner').forEach(b => {
    b.style.fontSize = fs + 'px';
    b.style.width = Math.round(el.clientWidth * 0.22) + 'px';
    b.style.padding =
      `${Math.round(el.clientHeight * 0.018)}px ${Math.round(el.clientWidth * 0.04)}px`;
  });

  document.querySelectorAll('.btn-divider').forEach(b => {
    b.style.height = Math.round(el.clientHeight * 0.012) + 'px';
  });
}

resize();
window.addEventListener('resize', resize);

const W = () => canvas.clientWidth;
const H = () => canvas.clientHeight;

const buildings = [
  { x: 0.02, w: 0.08, h: 0.18, color: '#1a2f5e', lit: 0.3, layer: 0 }, { x: 0.09, w: 0.06, h: 0.22, color: '#1e3568', lit: 0.35, layer: 0 },
  { x: 0.14, w: 0.09, h: 0.16, color: '#17295a', lit: 0.25, layer: 0 }, { x: 0.22, w: 0.07, h: 0.20, color: '#1c3060', lit: 0.3, layer: 0 },
  { x: 0.30, w: 0.05, h: 0.25, color: '#1a2f5e', lit: 0.2, layer: 0 }, { x: 0.34, w: 0.08, h: 0.18, color: '#18286e', lit: 0.35, layer: 0 },
  { x: 0.44, w: 0.04, h: 0.30, color: '#182870', lit: 0.4, layer: 0 }, { x: 0.47, w: 0.06, h: 0.22, color: '#1a2f5e', lit: 0.3, layer: 0 },
  { x: 0.55, w: 0.07, h: 0.17, color: '#1c3060', lit: 0.25, layer: 0 }, { x: 0.62, w: 0.05, h: 0.19, color: '#17295a', lit: 0.3, layer: 0 },
  { x: 0.68, w: 0.08, h: 0.21, color: '#1a2f5e', lit: 0.35, layer: 0 }, { x: 0.76, w: 0.07, h: 0.18, color: '#18286e', lit: 0.3, layer: 0 },
  { x: 0.83, w: 0.09, h: 0.16, color: '#1c3060', lit: 0.25, layer: 0 }, { x: 0.90, w: 0.05, h: 0.20, color: '#17295a', lit: 0.3, layer: 0 },
  { x: 0.94, w: 0.06, h: 0.17, color: '#1a2f5e', lit: 0.28, layer: 0 },
  { x: 0.0, w: 0.10, h: 0.28, color: '#0f1e40', winColor: '#c87830', lit: 0.5, layer: 1 },
  { x: 0.08, w: 0.06, h: 0.32, color: '#0e1c3c', winColor: '#4080c0', lit: 0.45, layer: 1 },
  { x: 0.13, w: 0.11, h: 0.25, color: '#101f42', winColor: '#c87030', lit: 0.5, layer: 1 },
  { x: 0.23, w: 0.05, h: 0.30, color: '#0d1a38', winColor: '#3070b0', lit: 0.4, layer: 1 },
  { x: 0.27, w: 0.09, h: 0.27, color: '#0f2045', winColor: '#c87830', lit: 0.5, layer: 1 },
  { x: 0.35, w: 0.04, h: 0.38, color: '#0c1835', winColor: '#2878c8', lit: 0.55, layer: 1, glass: true },
  { x: 0.38, w: 0.06, h: 0.30, color: '#0e1c3c', winColor: '#c07028', lit: 0.45, layer: 1 },
  { x: 0.43, w: 0.08, h: 0.26, color: '#101f42', winColor: '#c87030', lit: 0.5, layer: 1 },
  { x: 0.50, w: 0.06, h: 0.29, color: '#0f1e40', winColor: '#3878c0', lit: 0.4, layer: 1 },
  { x: 0.56, w: 0.07, h: 0.24, color: '#0d1a38', winColor: '#c87030', lit: 0.45, layer: 1 },
  { x: 0.62, w: 0.05, h: 0.28, color: '#0f2045', winColor: '#2870b8', lit: 0.5, layer: 1 },
  { x: 0.67, w: 0.09, h: 0.26, color: '#0c1835', winColor: '#c87830', lit: 0.4, layer: 1 },
  { x: 0.75, w: 0.07, h: 0.30, color: '#0e1c3c', winColor: '#3878c0', lit: 0.45, layer: 1, glass: true },
  { x: 0.82, w: 0.06, h: 0.25, color: '#101f42', winColor: '#c07028', lit: 0.5, layer: 1 },
  { x: 0.87, w: 0.08, h: 0.28, color: '#0f1e40', winColor: '#c87030', lit: 0.55, layer: 1 },
  { x: 0.94, w: 0.06, h: 0.24, color: '#0d1a38', winColor: '#3070b0', lit: 0.4, layer: 1 },
  { x: 0.0, w: 0.12, h: 0.35, color: '#080f20', winColor: '#c86020', lit: 0.6, layer: 2 },
  { x: 0.10, w: 0.09, h: 0.30, color: '#070d1c', winColor: '#a05020', lit: 0.55, layer: 2 },
  { x: 0.18, w: 0.13, h: 0.32, color: '#080f20', winColor: '#c86020', lit: 0.6, layer: 2 },
  { x: 0.30, w: 0.08, h: 0.28, color: '#070d1c', winColor: '#8040a0', lit: 0.5, layer: 2 },
  { x: 0.37, w: 0.10, h: 0.36, color: '#080f20', winColor: '#c86828', lit: 0.65, layer: 2 },
  { x: 0.46, w: 0.07, h: 0.31, color: '#070d1c', winColor: '#a05020', lit: 0.55, layer: 2 },
  { x: 0.52, w: 0.11, h: 0.33, color: '#080f20', winColor: '#c86020', lit: 0.6, layer: 2 },
  { x: 0.62, w: 0.09, h: 0.29, color: '#070d1c', winColor: '#a05820', lit: 0.5, layer: 2 },
  { x: 0.70, w: 0.12, h: 0.34, color: '#080f20', winColor: '#c86020', lit: 0.6, layer: 2 },
  { x: 0.81, w: 0.10, h: 0.30, color: '#070d1c', winColor: '#8850a0', lit: 0.55, layer: 2 },
  { x: 0.90, w: 0.10, h: 0.28, color: '#080f20', winColor: '#c06020', lit: 0.6, layer: 2 },
];

const clouds = [
  { x: 0.03, y: 0.20, size: 0.12 }, { x: 0.22, y: 0.15, size: 0.15 },
  { x: 0.42, y: 0.13, size: 0.18 }, { x: 0.65, y: 0.18, size: 0.14 }, { x: 0.82, y: 0.14, size: 0.16 },
];

const stars = [];
for (let i = 0; i < 60; i++) stars.push({ x: Math.random(), y: Math.random() * 0.55, size: Math.random() < 0.3 ? 2 : 1 });

function easeOutBack(t) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

const buildingOffsets = buildings.map(b => ({
  delay: b.x * 0.4 + b.layer * 0.05 + Math.random() * 0.08,
  duration: 0.55 + Math.random() * 0.15
}));

const winPatterns = buildings.map(b => {
  const p = [];
  for (let j = 0; j < 400; j++) p.push(Math.random() < b.lit);
  return p;
});

const RAIN_COUNT = 280;
const raindrops = [];
for (let i = 0; i < RAIN_COUNT; i++) {
  raindrops.push({
    x: Math.random(),
    y: Math.random(),
    len: 0.012 + Math.random() * 0.018,
    speed: 0.008 + Math.random() * 0.006,
    alpha: 0.3 + Math.random() * 0.5
  });
}

const debris = [];

function spawnDebris(stormT) {
  if (Math.random() < 0.007 && debris.length < 6) {
    const isBox = Math.random() < 0.4;
    debris.push({
      x: 1.05,
      y: 0.1 + Math.random() * 0.65,
      vx: -(0.004 + Math.random() * 0.005),
      vy: (Math.random() - 0.5) * 0.002,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      isBox,
      size: isBox ? (0.02 + Math.random() * 0.025) : (0.03 + Math.random() * 0.04),
      wobble: Math.random() * Math.PI * 2
    });
  }

  for (let i = debris.length - 1; i >= 0; i--) {
    if (debris[i].x < -0.15) debris.splice(i, 1);
  }
}

let lightning = { active: false, alpha: 0, x: 0.5, nextAt: 8.5 };

function drawPixelCloud(cx, cy, size, stormT) {
  const w = W(), h = H(), px = Math.max(1, Math.round(w / 220)), blobW = Math.round(size * w);
  const blobs = [{ ox: 0, oy: 0, r: 0.45 }, { ox: -0.3, oy: 0.1, r: 0.30 }, { ox: 0.32, oy: 0.08, r: 0.35 }, { ox: -0.55, oy: 0.2, r: 0.22 }, { ox: 0.58, oy: 0.18, r: 0.25 }];
  const light = `rgb(${Math.round(63 - 40 * stormT)},${Math.round(160 - 80 * stormT)},${Math.round(200 - 100 * stormT)})`;
  const dark = `rgb(${Math.round(45 - 30 * stormT)},${Math.round(127 - 70 * stormT)},${Math.round(160 - 80 * stormT)})`;

  for (const blob of blobs) {
    const bx = Math.round(cx * w + blob.ox * blobW), by = Math.round(cy * h + blob.oy * blobW * 0.45);
    const rx = Math.round(blob.r * blobW), ry = Math.round(rx * 0.6);

    for (let dy = -ry; dy <= ry; dy += px) {
      for (let dx = -rx; dx <= rx; dx += px) {
        if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1) {
          ctx.fillStyle = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) < 0.5 ? light : dark;
          ctx.fillRect(bx + dx, by + dy, px, px);
        }
      }
    }
  }
}

function drawBuilding(b, idx, rawProgress) {
  if (rawProgress <= 0) return;

  const progress = Math.min(1, rawProgress), bounced = easeOutBack(progress);
  const w = W(), h = H(), bx = Math.round(b.x * w), fullH = Math.round(b.h * h), bh = Math.round(fullH * bounced), bw = Math.round(b.w * w), by = Math.round(h * 0.95) - bh;

  ctx.fillStyle = b.color;
  ctx.fillRect(bx, by, bw, bh);

  if (progress < 0.85) return;

  ctx.globalAlpha = Math.min(1, (progress - 0.85) / 0.15);

  const winW = Math.max(2, Math.round(bw * 0.06)), winH = Math.max(2, Math.round(bw * 0.04));
  const gapX = Math.max(2, Math.round(bw * 0.08)), gapY = Math.max(2, Math.round(bh * 0.07));
  const cols = Math.max(1, Math.floor(bw / (winW + gapX))), rows = Math.max(1, Math.floor(fullH / (winH + gapY)));
  const offX = Math.round((bw - cols * (winW + gapX)) / 2), offY = Math.round((fullH - rows * (winH + gapY)) / 2);
  const pat = winPatterns[idx];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = bx + offX + c * (winW + gapX), wy = by + offY + r * (winH + gapY);
      if (wy < by) continue;

      const lit = pat[(r * cols + c) % pat.length];

      if (b.glass) {
        ctx.fillStyle = lit ? '#4090e0' : '#1a3060';
        ctx.fillRect(wx, wy, winW, winH);
      } else if (lit) {
        ctx.fillStyle = b.winColor || '#c87030';
        ctx.fillRect(wx, wy, winW, winH);
      }
    }
  }

  ctx.globalAlpha = 1;

  if (b.layer >= 1) {
    ctx.fillStyle = '#ff2020';
    const rl = Math.max(2, Math.round(w * 0.003));
    ctx.fillRect(bx + Math.round(bw / 2) - rl, by - rl, rl * 2, rl * 2);
  }
}

function drawRain(stormT, windT) {
  if (stormT <= 0) return;

  const w = W(), h = H(), windAngle = 0.32 * Math.min(1, windT);

  for (const d of raindrops) {
    d.y += d.speed * stormT;
    d.x -= windAngle * d.speed * 2.5 * stormT;

    if (d.y > 1) {
      d.y = -0.05;
      d.x = Math.random();
    }

    if (d.x < -0.05) {
      d.x = 1.05;
    }

    const x1 = d.x * w, y1 = d.y * h, len = d.len * h;
    const x2 = x1 - Math.sin(windAngle) * len, y2 = y1 + Math.cos(windAngle) * len;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `rgba(160,200,255,${d.alpha * stormT})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawDebrisItem(d) {
  const w = W(), h = H(), cx = d.x * w, cy = d.y * h, sz = d.size * w;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(d.rot);

  if (d.isBox) {
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(-sz / 2, -sz / 2, sz, sz);

    ctx.strokeStyle = '#3a2010';
    ctx.lineWidth = Math.max(1, Math.round(sz * 0.08));
    ctx.strokeRect(-sz / 2, -sz / 2, sz, sz);

    ctx.beginPath();
    ctx.moveTo(-sz / 2, 0);
    ctx.lineTo(sz / 2, 0);
    ctx.moveTo(0, -sz / 2);
    ctx.lineTo(0, sz / 2);
    ctx.strokeStyle = '#3a2010';
    ctx.lineWidth = Math.max(1, Math.round(sz * 0.05));
    ctx.stroke();
  } else {
    ctx.strokeStyle = '#4a2e10';
    ctx.lineWidth = Math.max(2, Math.round(sz * 0.06));
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(-sz / 2, 0);
    ctx.lineTo(sz / 2, sz * 0.1);
    ctx.stroke();

    ctx.lineWidth = Math.max(1, Math.round(sz * 0.04));
    ctx.beginPath();
    ctx.moveTo(-sz * 0.1, -sz * 0.05);
    ctx.lineTo(-sz * 0.25, -sz * 0.25);
    ctx.moveTo(sz * 0.15, sz * 0.05);
    ctx.lineTo(sz * 0.3, -sz * 0.2);
    ctx.stroke();

    ctx.fillStyle = '#2a4a15';
    for (const [lx, ly] of [[-sz * 0.25, -sz * 0.25], [sz * 0.3, -sz * 0.2], [-sz / 2, sz * 0.05]]) {
      const ls = Math.max(3, Math.round(sz * 0.12));
      ctx.fillRect(lx - ls / 2, ly - ls / 2, ls, ls);
    }
  }

  ctx.restore();
}

function drawLightning(elapsed) {
  const w = W(), h = H();

  if (elapsed >= lightning.nextAt) {
    lightning.active = true;
    lightning.alpha = 1;
    lightning.x = 0.2 + Math.random() * 0.6;
    lightning.nextAt = elapsed + 4 + Math.random() * 5;
  }

  if (!lightning.active) return;

  lightning.alpha -= 0.04;

  if (lightning.alpha <= 0) {
    lightning.active = false;
    return;
  }

  ctx.fillStyle = `rgba(200,220,255,${lightning.alpha * 0.18})`;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = lightning.alpha;
  ctx.strokeStyle = '#e0f0ff';
  ctx.lineWidth = Math.max(2, Math.round(w * 0.003));

  let cx2 = lightning.x * w, cy2 = 0;

  ctx.beginPath();
  ctx.moveTo(cx2, cy2);

  for (let i = 1; i <= 8; i++) {
    cx2 += (Math.random() - 0.5) * w * 0.04;
    cy2 = i * (h * 0.45 / 8);
    ctx.lineTo(cx2, cy2);
  }

  ctx.stroke();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = Math.max(1, Math.round(w * 0.001));
  ctx.stroke();

  ctx.restore();
}

function drawTitle(elapsed) {
  const w = W(), h = H();
  const t = Math.max(0, Math.min(1, (elapsed - 4.8) / 1.2));

  if (t <= 0) return;

  const eased = 1 - Math.pow(1 - t, 3);
  const dropOffset = (1 - eased) * h * 0.06;
  const fontSize = Math.round(w * 0.09);
  const titleY = Math.round(h * 0.38) - dropOffset;

  ctx.save();
  ctx.globalAlpha = eased;
  ctx.font = `900 ${fontSize}px 'Courier New', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const px = Math.max(2, Math.round(w / 300));

  for (const [ox, oy, col] of [[px * 3, px * 3, '#0a1535'], [px * 2, px * 2, '#0d1f4a'], [px, px, '#152858']]) {
    ctx.fillStyle = col;
    ctx.fillText('WEATHERED', w / 2 + ox, titleY + oy);
  }

  ctx.fillStyle = '#d8eaff';
  ctx.fillText('WEATHERED', w / 2, titleY);

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = eased * 0.4;
  ctx.fillText('WEATHERED', w / 2, titleY - px);

  ctx.restore();
}

let buttonsShown = false;

function draw(elapsed) {
  const w = W(), h = H();

  ctx.clearRect(0, 0, w, h);

  const STORM_START = 6.5;
  const stormT = Math.max(0, Math.min(1, (elapsed - STORM_START) / 3.0));
  const windT = Math.max(0, Math.min(1, (elapsed - STORM_START - 0.5) / 2.0));

  for (let i = 0; i < 12; i++) {
    const ratio = i / 12;
    ctx.fillStyle = `rgb(${Math.round((13 + 17 * ratio) * (1 - stormT * 0.5))},${Math.round((45 + 47 * ratio) * (1 - stormT * 0.5))},${Math.round((138 + 56 * ratio) * (1 - stormT * 0.35))})`;
    ctx.fillRect(0, Math.round(i * h / 12), w, Math.round(h / 12) + 1);
  }

  if (stormT > 0) {
    ctx.fillStyle = `rgba(10,15,30,${stormT * 0.45})`;
    ctx.fillRect(0, 0, w, h * 0.55);
  }

  ctx.fillStyle = '#0a1830';
  ctx.fillRect(0, Math.round(h * 0.95), w, Math.round(h * 0.05));

  ctx.globalAlpha = Math.min(1, elapsed / 1.5) * (1 - stormT);
  for (const s of stars) {
    const sz = Math.max(1, Math.round(s.size * w / 500));
    ctx.fillStyle = '#fff';
    ctx.fillRect(Math.round(s.x * w), Math.round(s.y * h), sz, sz);
  }
  ctx.globalAlpha = 1;

  ctx.globalAlpha = Math.min(1, elapsed / 1.2) * (1 - stormT);
  ctx.fillStyle = '#e8f0ff';

  const mx = Math.round(0.46 * w), my = Math.round(0.05 * h), mr = Math.max(4, Math.round(w * 0.012));

  ctx.beginPath();
  ctx.arc(mx, my, mr, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0d2d8a';
  ctx.beginPath();
  ctx.arc(mx + Math.round(mr * 0.4), my - Math.round(mr * 0.1), Math.round(mr * 0.85), 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;

  ctx.globalAlpha = Math.min(1, elapsed / 1.5);
  for (const c of clouds) drawPixelCloud(c.x, c.y, c.size, stormT);
  ctx.globalAlpha = 1;

  const bElapsed = Math.max(0, elapsed - 2.0);

  for (let layer = 0; layer <= 2; layer++) {
    buildings.forEach((b, idx) => {
      if (b.layer !== layer) return;
      const off = buildingOffsets[idx];
      drawBuilding(b, idx, Math.max(0, (bElapsed - off.delay) / off.duration));
    });
  }

  drawRain(stormT, windT);

  if (stormT > 0.3) {
    spawnDebris(stormT);

    for (const d of debris) {
      d.x += d.vx * (0.5 + stormT * 0.8);
      d.vy += 0.00005;
      d.y += d.vy;
      d.rot += d.rotSpeed * stormT;
      d.wobble += 0.05;
      d.y += Math.sin(d.wobble) * 0.0008 * stormT;
      drawDebrisItem(d);
    }
  }

  if (elapsed > STORM_START + 1) drawLightning(elapsed);

  drawTitle(elapsed);

  if (elapsed > 6.2 && !buttonsShown) {
    buttonsShown = true;
    setTimeout(() => document.getElementById('btnwrap').classList.add('visible'), 100);
  }
}

function safeSendPrompt(message) {
  if (typeof sendPrompt === 'function') {
    sendPrompt(message);
  } else {
    console.log(message);
  }
}

export function startMenuAnimation() {
  startStartscreenAnimation(draw);
}

export function stopMenuAnimation() {
  stopStartscreenAnimation();
}
//#endregion