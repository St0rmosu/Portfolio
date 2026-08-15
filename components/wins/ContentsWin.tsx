"use client";

import type { Section } from "@/lib/content";

interface ContentsWinProps {
  currentSec: Section;
  onOpen: (sec: Section) => void;
}

const LABELS: Record<Section, string> = {
  about: "About",
  projects: "Projects/",
  certs: "Certificazioni/",
  contact: "Contact",
};

export default function ContentsWin({ currentSec, onOpen }: ContentsWinProps) {
  const items: { sec: Section; color: string; hasCarr: boolean; last: boolean }[] = [
    { sec: "about", color: "var(--orange)", hasCarr: false, last: false },
    { sec: "projects", color: "var(--green)", hasCarr: true, last: false },
    { sec: "certs", color: "var(--mauve)", hasCarr: true, last: false },
    { sec: "contact", color: "var(--blue)", hasCarr: false, last: true },
  ];

  return (
    <div className="p">
      <div className="ctitle">Contents</div>
      <div className="citems-list">
        {items.map((it) => (
          <div
            key={it.sec}
            className={"citem" + (it.sec === currentSec ? " active" : "")}
            data-open={it.sec}
            role="button"
            tabIndex={0}
            style={{ "--item-c": it.color } as React.CSSProperties}
            onClick={() => onOpen(it.sec)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(it.sec);
              }
            }}
          >
            <span className="cicon">{it.last ? "└─" : "├─"}</span>
            <span>{LABELS[it.sec]}</span>
            {it.hasCarr && <span className="carr">▶</span>}
          </div>
        ))}
      </div>
      <div className="chint">click → workspace · Tab to cycle</div>
    </div>
  );
}
