import { useEffect, useMemo, useRef } from "react";
import Mark from "../Mark/Mark";
import profileData from "../../../data/profileData";
import { subscribe } from "../../../hooks/scrollEngine";
import "./Emblem.css";

const TICKS = 72;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Interactive emblem: a 3D-tilting seal built from layered SVG rings around
// the "AR" monogram. It leans toward the pointer, spins faster when you hover
// or scroll, reverses on click and drifts gently when idle.
function Emblem() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const textRingRef = useRef(null);
  const tickRingRef = useRef(null);
  const orbitRef = useRef(null);
  const coreRef = useRef(null);
  const glintRef = useRef(null);

  const ringText = useMemo(() => {
    const words = [
      ...profileData.heroVisual.technologies,
      profileData.heroVisual.label
    ];
    return `${words.join("  ✦  ")}  ✦  `.toUpperCase();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const motion = {
      rx: 0,
      ry: 0,
      angle: 0,
      dir: 1,
      velocity: 0,
      visible: true,
      pointerX: 0,
      pointerY: 0,
      hover: false,
      pointerSeen: false
    };

    let frame = 0;
    let last = performance.now();

    const render = (now) => {
      frame = 0;
      if (!motion.visible) return;

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const reduced = document.documentElement.dataset.motion === "reduced";
      const idleX = Math.cos(now / 3100) * 5;
      const idleY = Math.sin(now / 2400) * 4;
      const targetRY = reduced ? 0 : motion.pointerSeen ? motion.pointerX * 16 : idleX;
      const targetRX = reduced ? 0 : motion.pointerSeen ? -motion.pointerY * 12 : idleY;

      const ease = 1 - Math.exp(-dt * 7);
      motion.rx += (targetRX - motion.rx) * ease;
      motion.ry += (targetRY - motion.ry) * ease;

      const speed = reduced ? 0 : 6 + (motion.hover ? 30 : 0) + Math.abs(motion.velocity) * 3.2;
      motion.angle += motion.dir * speed * dt;

      stageRef.current.style.transform = `rotateX(${motion.rx}deg) rotateY(${motion.ry}deg)`;
      textRingRef.current.style.transform = `translateZ(36px) rotate(${motion.angle}deg)`;
      tickRingRef.current.style.transform = `translateZ(14px) rotate(${-motion.angle * 1.5}deg)`;
      orbitRef.current.style.transform = `translateZ(64px) rotate(${motion.angle * 2.3}deg)`;
      coreRef.current.style.transform = `translateZ(92px) rotate(${motion.ry * -0.35}deg)`;

      // The spotlight is a layer that moves (GPU), not a gradient that repaints.
      const reach = root.clientWidth * 0.28;
      glintRef.current.style.transform = `translate3d(${motion.pointerX * reach}px, ${motion.pointerY * reach}px, -30px)`;

      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event) => {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      motion.pointerX = clamp((event.clientX - cx) / (rect.width * 1.1), -1, 1);
      motion.pointerY = clamp((event.clientY - cy) / (rect.height * 1.1), -1, 1);
      motion.pointerSeen = true;
      motion.hover =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
    };

    const handlePointerLeave = () => {
      motion.hover = false;
      motion.pointerSeen = false;
    };

    const observer = new IntersectionObserver(([entry]) => {
      motion.visible = entry.isIntersecting;
      if (entry.isIntersecting) start();
    });
    observer.observe(root);

    const unsubscribe = subscribe(({ velocity }) => {
      motion.velocity = velocity;
    });

    const handleClick = () => {
      motion.dir *= -1;
      root.classList.remove("is-pulsing");
      void root.offsetWidth;
      root.classList.add("is-pulsing");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    root.addEventListener("click", handleClick);
    start();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      unsubscribe();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      root.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="emblem" ref={rootRef} aria-hidden="true">
      <div className="emblem-stage" ref={stageRef}>
        <div className="emblem-halo" />
        <div className="emblem-glint" ref={glintRef} />

        <svg className="emblem-layer" ref={textRingRef} viewBox="0 0 400 400">
          <defs>
            <path
              id="emblem-text-path"
              d="M200,200 m-166,0 a166,166 0 1,1 332,0 a166,166 0 1,1 -332,0"
            />
          </defs>
          <circle className="emblem-line" cx="200" cy="200" r="190" />
          <circle className="emblem-line emblem-line-faint" cx="200" cy="200" r="144" />
          <text className="emblem-text">
            <textPath
              href="#emblem-text-path"
              textLength="1038"
              lengthAdjust="spacing"
            >
              {ringText}
            </textPath>
          </text>
        </svg>

        <svg className="emblem-layer" ref={tickRingRef} viewBox="0 0 400 400">
          {Array.from({ length: TICKS }).map((_, index) => {
            const angle = (index / TICKS) * Math.PI * 2;
            const long = index % 6 === 0;
            const inner = long ? 126 : 132;
            const outer = 140;
            return (
              <line
                key={index}
                className={long ? "emblem-tick emblem-tick-long" : "emblem-tick"}
                x1={200 + Math.cos(angle) * inner}
                y1={200 + Math.sin(angle) * inner}
                x2={200 + Math.cos(angle) * outer}
                y2={200 + Math.sin(angle) * outer}
              />
            );
          })}
        </svg>

        <svg className="emblem-layer" ref={orbitRef} viewBox="0 0 400 400">
          <circle className="emblem-orbit-line" cx="200" cy="200" r="104" />
          <circle className="emblem-node" cx="304" cy="200" r="7" />
          <circle className="emblem-node emblem-node-alt" cx="148" cy="290" r="5" />
          <circle className="emblem-node emblem-node-ring" cx="148" cy="110" r="9" />
        </svg>

        <div className="emblem-core" ref={coreRef}>
          <Mark className="emblem-mark" />
        </div>
      </div>
    </div>
  );
}

export default Emblem;
