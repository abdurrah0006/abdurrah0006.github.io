import { useEffect, useRef, useState } from "react";
import "./CursorScrollbar.css";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']";

/* ------------------------------ Cursor ------------------------------ */

const clampAngle = (from, to, amount) => {
  const difference = ((to - from + 540) % 360) - 180;
  return from + difference * amount;
};

// A small arrowhead sits on the pointer and turns to face the way you move.
// A larger outline arrowhead trails behind it.
export function CustomCursor() {
  const arrowRef = useRef(null);
  const trailRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: -100, y: -100, previousX: -100, previousY: -100 };
    const trail = { x: -100, y: -100 };
    let target = 0;
    let angle = 0;
    let trailAngle = 0;
    let frame = 0;

    const onMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      wake();
      setVisible(true);
      setHovering(!!event.target.closest?.(HOVER_SELECTOR));
    };

    // The loop runs only while the pointer moves or the trail is still
    // catching up, then goes to sleep until the next movement.
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const tick = () => {
      frame = 0;

      const reduced = document.documentElement.dataset.motion === "reduced";
      const dx = mouse.x - mouse.previousX;
      const dy = mouse.y - mouse.previousY;
      mouse.previousX = mouse.x;
      mouse.previousY = mouse.y;

      // Only turn when actually moving, so it keeps its heading when you stop.
      if (Math.hypot(dx, dy) > 1.2) {
        target = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      }

      angle = clampAngle(angle, target, reduced ? 1 : 0.28);
      trailAngle = clampAngle(trailAngle, target, reduced ? 1 : 0.12);

      const ease = reduced ? 1 : 0.16;
      trail.x += (mouse.x - trail.x) * ease;
      trail.y += (mouse.y - trail.y) * ease;

      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) rotate(${angle}deg)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) rotate(${trailAngle}deg)`;
      }

      const settled =
        Math.abs(mouse.x - trail.x) < 0.2 &&
        Math.abs(mouse.y - trail.y) < 0.2 &&
        Math.abs(((target - trailAngle + 540) % 360) - 180) < 0.3 &&
        Math.hypot(dx, dy) < 0.05;

      if (!settled) wake();
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    wake();

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const state = `${visible ? "cc-visible" : ""} ${hovering ? "cc-hover" : ""} ${pressed ? "cc-down" : ""}`;

  return (
    <>
      <div ref={trailRef} className={`cc-trail ${state}`} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 2.5 21 21.5 12 17 3 21.5Z" />
        </svg>
      </div>
      <div ref={arrowRef} className={`cc-arrow ${state}`} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 2.5 21 21.5 12 17 3 21.5Z" />
        </svg>
      </div>
    </>
  );
}

/* ----------------------------- Scrollbar ---------------------------- */

export function CustomScrollbar() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const hideTimer = useRef(null);
  const dragState = useRef({ startY: 0, startScroll: 0 });

  // Size and position the thumb from the page's scroll state
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!track || !thumb) return;

      const viewH = window.innerHeight;
      const totalH = doc.scrollHeight;
      if (totalH <= viewH + 1) {
        track.style.display = "none";
        return;
      }
      track.style.display = "";

      const thumbH = Math.max(40, (viewH / totalH) * viewH);
      const maxScroll = totalH - viewH;
      const maxThumbTop = viewH - thumbH;
      const top = (window.scrollY / maxScroll) * maxThumbTop;

      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${top}px)`;
    };

    const onScroll = () => {
      update();
      setActive(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setActive(false), 900);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    // Re-measure when page height changes (route changes, images loading)
    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      ro.disconnect();
      clearTimeout(hideTimer.current);
    };
  }, []);

  // Drag the thumb to scroll
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e) => {
      const doc = document.documentElement;
      const viewH = window.innerHeight;
      const thumbH = thumbRef.current.offsetHeight;
      const maxScroll = doc.scrollHeight - viewH;
      const maxThumbTop = viewH - thumbH;
      const delta = e.clientY - dragState.current.startY;
      // "instant" so global.css `scroll-behavior: smooth` doesn't make dragging lag
      window.scrollTo({
        top: dragState.current.startScroll + (delta / maxThumbTop) * maxScroll,
        behavior: "instant",
      });
    };
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.userSelect = "";
    };
  }, [dragging]);

  const onThumbDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragState.current = { startY: e.clientY, startScroll: window.scrollY };
    setDragging(true);
  };

  // Click the empty track to jump to that position
  const onTrackDown = (e) => {
    if (e.target !== trackRef.current) return;
    const doc = document.documentElement;
    const ratio = e.clientY / window.innerHeight;
    window.scrollTo({
      top: ratio * (doc.scrollHeight - window.innerHeight),
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={trackRef}
      className={`cs-track ${active ? "cs-active" : ""} ${dragging ? "cs-dragging cs-active" : ""}`}
      onMouseDown={onTrackDown}
      aria-hidden="true"
    >
      <div ref={thumbRef} className="cs-thumb" onMouseDown={onThumbDown} />
    </div>
  );
}