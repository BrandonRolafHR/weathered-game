let startTime = null;
let animationId = null;
let isRunning = false;

export function startStartscreenAnimation(drawFunction) {
  if (isRunning) return;

  isRunning = true;
  startTime = null;

  function animate(ts) {
    if (!isRunning) return;

    if (!startTime) startTime = ts;

    drawFunction((ts - startTime) / 1000);

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);
}

export function stopStartscreenAnimation() {
  isRunning = false;

  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}