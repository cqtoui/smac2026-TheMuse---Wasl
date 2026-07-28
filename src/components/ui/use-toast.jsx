// Single, non-blocking, auto-dismissing toast store.
// One toast at a time; identical rapid messages are debounced; the toast
// auto-fades after 3s with no close button.
import { useState, useEffect } from "react";

const DURATION = 3000; // visible for exactly 3 seconds
const DEBOUNCE_MS = 1000; // ignore duplicate messages within this window

let listeners = [];
let state = { activeToast: null };
let timer = null;
let lastKey = "";
let lastTime = 0;

function notify() {
  listeners.forEach((l) => l(state));
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function dismiss() {
  clearTimer();
  state = { activeToast: null };
  notify();
}

function toast(props = {}) {
  const key = `${props.title || ""}::${props.description || ""}`;
  const now = Date.now();

  // Debounce: repeated rapid taps with the same message just refresh the timer
  // instead of producing a duplicate or stacked toast.
  if (key && key === lastKey && now - lastTime < DEBOUNCE_MS && state.activeToast) {
    clearTimer();
    timer = setTimeout(dismiss, DURATION);
    lastTime = now;
    return { id: state.activeToast.id, dismiss };
  }

  lastKey = key;
  lastTime = now;
  const id = Math.random().toString(36).slice(2);
  state = { activeToast: { ...props, id } };
  notify();
  clearTimer();
  timer = setTimeout(dismiss, DURATION);
  return { id, dismiss };
}

function useToast() {
  const [local, setLocal] = useState(state);

  useEffect(() => {
    listeners.push(setLocal);
    return () => {
      listeners = listeners.filter((l) => l !== setLocal);
    };
  }, []);

  return { activeToast: local.activeToast, toast, dismiss };
}

export { useToast, toast };