// One shared requestAnimationFrame loop for every scroll-linked effect.
// Components subscribe and receive { y, vh, velocity, motionOff } each frame,
// so everything is a pure function of the scroll position: scrolling back up
// plays every animation in reverse.

const subscribers = new Set();
let frame = 0;
let started = false;
let lastTime = 0;
let lastY = 0;
let velocity = 0;

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const mix = (a, b, t) => a + (b - a) * t;

function tick(time) {
  frame = 0;

  const dt = clamp((time - lastTime) || 16, 1, 50);
  lastTime = time;

  const y = window.scrollY;
  const raw = clamp(((y - lastY) * 16) / dt, -45, 45);
  lastY = y;
  velocity = mix(velocity, raw, 1 - Math.exp(-dt / 100));

  const state = {
    y,
    vh: window.innerHeight,
    velocity,
    motionOff: document.documentElement.dataset.motion === "reduced"
  };

  subscribers.forEach((callback) => callback(state));

  if (Math.abs(velocity) > 0.02) wake();
}

export function wake() {
  if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
}

function start() {
  if (started) return;
  started = true;
  lastY = window.scrollY;
  window.addEventListener("scroll", wake, { passive: true });
  window.addEventListener("resize", wake);
  document.addEventListener("visibilitychange", wake);
}

export function subscribe(callback) {
  start();
  subscribers.add(callback);
  wake();
  return () => subscribers.delete(callback);
}
