"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

interface WindowProps {
  id: string;
  title: string;
  box: "left" | "main";
  focused: boolean;
  minimized: boolean;
  maximized: boolean;
  back?: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onLeftWidth: (px: number) => void;
  children: React.ReactNode;
}

/* faithful port of the original anime.js entrance with snappy timing */
function animateWinIn(el: HTMLElement, delay: number) {
  el.classList.add("anim-in");
  anime({
    targets: el,
    opacity: [0, 1],
    scale: [0.94, 1],
    translateY: [16, 0],
    delay: delay * 1000,
    duration: 380,
    easing: "cubicBezier(0.05, 0.9, 0.1, 1.05)",
    begin: () => (el.style.transition = "none"),
    complete: () => {
      el.style.transition = "";
      el.classList.remove("anim-in");
      el.style.opacity = "";
    },
  });
}

function animePop(el: HTMLElement) {
  anime({
    targets: el,
    scale: [0.985, 1],
    duration: 450,
    easing: "easeOutElastic(1, .45)",
    begin: () => (el.style.transition = "none"),
    complete: () => (el.style.transition = ""),
  });
}

export default function Window({
  id,
  title,
  box,
  focused,
  minimized,
  maximized,
  back,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onLeftWidth,
  children,
}: WindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prevFocused = useRef<boolean>(focused);

  useEffect(() => {
    const el = ref.current;
    if (el) animateWinIn(el, box === "left" ? (id === "profile" ? 0 : 0.07) : 0.1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (focused && !prevFocused.current && el && !el.classList.contains("anim-in")) {
      animePop(el);
    }
    prevFocused.current = focused;
  }, [focused]);

  const handleFocus = () => onFocus(id);

  const stop = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
  };

  const startResize = (dir: string) => (e: React.PointerEvent) => {
    if (maximized) return;
    e.stopPropagation();
    e.preventDefault();
    const el = ref.current;
    if (!el) return;
    const target = e.currentTarget as HTMLElement;
    const pointerId = e.pointerId;
    target.setPointerCapture(pointerId);
    onFocus(id);

    const startX = e.clientX;
    const startY = e.clientY;
    const rect = el.getBoundingClientRect();
    const startW = rect.width;
    const startH = rect.height;
    const parent = el.parentElement as HTMLElement;

    document.documentElement.classList.add("resizing");

    let pending = false;
    let lastE: PointerEvent | React.PointerEvent = e;

    const apply = () => {
      pending = false;
      const dx = lastE.clientX - startX;
      const dy = lastE.clientY - startY;
      let newW = startW;
      let newH = startH;
      if (dir.includes("e")) newW = Math.max(180, startW + dx);
      if (dir.includes("w")) newW = Math.max(180, startW - dx);
      if (dir.includes("s")) newH = Math.max(60, startH + dy);
      if (dir.includes("n")) newH = Math.max(60, startH - dy);

      if (dir.includes("e") || dir.includes("w")) {
        if (box === "left") {
          onLeftWidth(newW);
        } else {
          el.style.flexBasis = newW + "px";
          el.style.flexGrow = "0";
        }
      }
      if (dir.includes("s") || dir.includes("n")) {
        el.style.flexBasis = newH + "px";
        el.style.flexGrow = "0";
        Array.from(parent.children)
          .filter((c) => c !== el && !c.classList.contains("wmin"))
          .forEach((s) => {
            (s as HTMLElement).style.flexBasis = "0";
            (s as HTMLElement).style.flexGrow = "1";
          });
      }
    };

    const onMove = (ev: PointerEvent) => {
      lastE = ev;
      if (!pending) {
        pending = true;
        requestAnimationFrame(apply);
      }
    };
    const onUp = () => {
      document.documentElement.classList.remove("resizing");
      try {
        target.releasePointerCapture(pointerId);
      } catch {
        /* pointer already released */
      }
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
  };

  const handles = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

  return (
    <div
      ref={ref}
      data-wkey={id}
      className={`win ${focused ? "focused" : ""} ${minimized ? "wmin" : ""} ${
        maximized ? "wmax" : ""
      } visible`}
      onPointerDown={handleFocus}
    >
      <div className="wtbar" onPointerDown={handleFocus}>
        <div className="wdots">
          <span
            className="wdot wd-r"
            title="chiudi"
            onPointerDown={stop}
            onClick={() => onClose(id)}
          />
          <span
            className="wdot wd-y"
            title="minimizza"
            onPointerDown={stop}
            onClick={() => onMinimize(id)}
          />
          <span
            className="wdot wd-g"
            title="maximizza/ripristina"
            onPointerDown={stop}
            onClick={() => onMaximize(id)}
          />
        </div>
        <div className="wtitle">{title}</div>
        {back && (
          <span
            className="wback"
            onPointerDown={stop}
            onClick={(e) => {
              stop(e);
              onClose(id);
            }}
          >
            ← back
          </span>
        )}
      </div>
      <div className="wbody" onPointerDown={handleFocus}>
        {children}
      </div>
      {!minimized &&
        handles.map((d) => (
          <div key={d} className={`rh rh-${d}`} onPointerDown={startResize(d)} />
        ))}
    </div>
  );
}
