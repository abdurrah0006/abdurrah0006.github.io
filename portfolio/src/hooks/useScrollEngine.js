import { useEffect, useRef } from "react";
import { subscribe } from "./scrollEngine";

// Runs `callback` on every animation frame while the page scrolls.
export default function useScrollEngine(callback) {
  const latest = useRef(callback);

  useEffect(() => {
    latest.current = callback;
  });

  useEffect(() => subscribe((state) => latest.current(state)), []);
}
