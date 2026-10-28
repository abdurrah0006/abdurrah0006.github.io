import { useEffect, useRef, useState } from "react";
import "./CursorScrollbar.css";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']";

/* ------------------------------ Cursor ------------------------------ */

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    document.documentElement.classList.add("has-custom-cursor");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
      setHovering(!!e.target.closest?.(HOVER_SELECTOR));
    };

    const tick = () => {
      const ease = reduceMotion ? 1 : 0.18;
      ring.x += (mouse.x - ring.x) * ease;
      ring.y += (mouse.y - ring.y) * ease;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
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
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`cc-ring ${visible ? "cc-visible" : ""} ${hovering ? "cc-hover" : ""} ${pressed ? "cc-down" : ""}`}
        aria-hidden="true"
      />
      <div ref={dotRef} className={`cc-dot ${visible ? "cc-visible" : ""}`} aria-hidden="true" />
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
      window.scrollTo(0, dragState.current.startScroll + (delta / maxThumbTop) * maxScroll);
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