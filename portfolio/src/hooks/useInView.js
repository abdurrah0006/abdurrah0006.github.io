import { useEffect, useRef, useState } from "react";

// True while the element is on screen. Unlike a one-shot observer it turns
// false again when the element leaves through the bottom, so the entrance
// animation replays when you scroll back up.
export default function useInView({ threshold = 0.25, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else if (entry.boundingClientRect.top > 0) setInView(false);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
