"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const WS_COLORS: Record<number, string> = {
  1: "var(--orange)",
  2: "var(--green)",
  3: "var(--mauve)",
  4: "var(--blue)",
};

const WS_NAMES: Record<number, string> = {
  1: "about",
  2: "projects",
  3: "certs",
  4: "contact",
};

/* About: browser/profile card window icon matching user mockup */
function AboutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="14" r="2" />
      <path d="M5.5 19a3 3 0 0 1 5 0" />
      <line x1="14" y1="13" x2="18" y2="13" />
      <line x1="14" y1="16.5" x2="17" y2="16.5" />
    </svg>
  );
}

/* Projects: code brackets / terminal icon */
function ProjectsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="11" y1="19" x2="13" y2="5" />
    </svg>
  );
}

/* Certs: certificate badge / ribbon icon */
function CertsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="M15.5 13.5L17 21l-5-2.5L7 21l1.5-7.5" />
      <polyline points="9.5 8.5 11 10 14.5 7" />
    </svg>
  );
}

/* Contact: email / message envelope icon */
function ContactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

const WS_ICONS: Record<number, React.ComponentType> = {
  1: AboutIcon,
  2: ProjectsIcon,
  3: CertsIcon,
  4: ContactIcon,
};

function VerticalClock() {
  const [hours, setHours] = useState("--");
  const [mins, setMins] = useState("--");
  const [date, setDate] = useState("--/--");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setHours(String(n.getHours()).padStart(2, "0"));
      setMins(String(n.getMinutes()).padStart(2, "0"));
      setDate(
        `${String(n.getDate()).padStart(2, "0")}/${String(n.getMonth() + 1).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="end4-vclock" title={`Data e Ora: ${hours}:${mins} - ${date}`}>
      <span className="end4-vclock-h">{hours}</span>
      <span className="end4-vclock-m">{mins}</span>
      <span className="end4-vclock-d">{date}</span>
    </div>
  );
}

export default function TopBar({
  currentWs,
  onSwitch,
  occupied,
  onReset,
}: {
  currentWs: number;
  onSwitch: (ws: number) => void;
  occupied: number[];
  pillLabels?: Record<number, string>;
  onReset: () => void;
}) {
  const navRef = useRef<HTMLElement>(null);
  const btnRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    ready: boolean;
  }>({ left: 0, top: 0, width: 0, height: 0, ready: false });

  const updateSlider = useCallback(() => {
    const nav = navRef.current;
    const btn = btnRefs.current[currentWs];
    if (nav && btn) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setSliderStyle({
        left: btnRect.left - navRect.left,
        top: btnRect.top - navRect.top,
        width: btnRect.width,
        height: btnRect.height,
        ready: true,
      });
    }
  }, [currentWs]);

  useLayoutEffect(() => {
    updateSlider();
  }, [updateSlider]);

  useEffect(() => {
    window.addEventListener("resize", updateSlider);
    const id = setTimeout(updateSlider, 50);
    return () => {
      window.removeEventListener("resize", updateSlider);
      clearTimeout(id);
    };
  }, [updateSlider]);

  return (
    <aside id="topbar" className="end4-vbar" aria-label="Sidebar">
      {/* Top: User / Home Action Chip */}
      <div className="end4-vtop">
        <button
          className="end4-vlogo-btn"
          onClick={onReset}
          title="Lorenzo Recchia · Reset Desktop"
          aria-label="Home / Reset"
        >
          <span>L</span>
        </button>
      </div>

      {/* Center: Workspaces Capsule with Fluid Sliding Active Indicator */}
      <nav ref={navRef} className="end4-vws-container" aria-label="Workspaces">
        {sliderStyle.ready && (
          <div
            className="end4-vws-slider"
            style={
              {
                transform: `translate3d(${sliderStyle.left}px, ${sliderStyle.top}px, 0)`,
                width: `${sliderStyle.width}px`,
                height: `${sliderStyle.height}px`,
                "--ws-c": WS_COLORS[currentWs],
              } as React.CSSProperties
            }
          />
        )}
        {[1, 2, 3, 4].map((ws) => {
          const isActive = ws === currentWs;
          const isOcc = occupied.includes(ws);
          const IconComp = WS_ICONS[ws];

          return (
            <button
              key={ws}
              ref={(el) => {
                btnRefs.current[ws] = el;
              }}
              className={
                "end4-vws-btn" +
                (isActive ? " active" : "") +
                (isOcc ? " occupied" : "")
              }
              style={{ "--ws-c": WS_COLORS[ws] } as React.CSSProperties}
              onClick={() => onSwitch(ws)}
              title={`Workspace ${ws}: ${WS_NAMES[ws]}`}
              aria-label={`Workspace ${ws}: ${WS_NAMES[ws]}`}
            >
              <span className="end4-vws-num">{ws}</span>
              {IconComp && (
                <span className="end4-vws-icon">
                  <IconComp />
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Stacked Clock & Date Module */}
      <div className="end4-vbottom">
        <VerticalClock />
      </div>
    </aside>
  );
}
