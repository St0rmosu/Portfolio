"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import TopBar from "@/components/TopBar";
import Window from "@/components/Window";
import { SEC_WS, WS_SEC, type Section } from "@/lib/content";
import { applyAccent, applyBg, WP_DEFAULT_BLUR, WP_DEFAULT_DARK } from "@/lib/themes";
import ProfileWin from "@/components/wins/ProfileWin";
import ContentsWin from "@/components/wins/ContentsWin";
import AboutWin from "@/components/wins/AboutWin";
import ProjectsWin from "@/components/wins/ProjectsWin";
import CertsWin from "@/components/wins/CertsWin";
import ContactWin from "@/components/wins/ContactWin";

const SEC_TITLES: Record<Section, string> = {
  about: "about — Hi, I'm Lorenzo",
  projects: "projects — St0rmosu",
  certs: "certs — certificazioni",
  contact: "contact — lorenzo@portfolio",
};

const WS_NAMES: Record<number, string> = { 1: "about", 2: "projects", 3: "certs", 4: "contact" };
const SEC_CYCLE: Section[] = ["about", "projects", "certs", "contact"];

interface WinData {
  key: string;
  box: "left" | "main";
  sec?: Section;
  ws?: number;
  minimized: boolean;
  maximized: boolean;
}

const LEFT_INIT: string[] = ["profile", "contents"];

function initWins(): Record<string, WinData> {
  return {
    profile: { key: "profile", box: "left", minimized: false, maximized: false },
    contents: { key: "contents", box: "left", minimized: false, maximized: false },
    "about:1": { key: "about:1", box: "main", sec: "about", ws: 1, minimized: false, maximized: false },
    "projects:2": { key: "projects:2", box: "main", sec: "projects", ws: 2, minimized: false, maximized: false },
    "certs:3": { key: "certs:3", box: "main", sec: "certs", ws: 3, minimized: false, maximized: false },
    "contact:4": { key: "contact:4", box: "main", sec: "contact", ws: 4, minimized: false, maximized: false },
  };
}

function initMainOrder(): Record<number, string[]> {
  return { 1: ["about:1"], 2: ["projects:2"], 3: ["certs:3"], 4: ["contact:4"] };
}

function SectionContent({
  sec,
  onProjectOpenChange,
  onCertOpenChange,
}: {
  sec: Section;
  onProjectOpenChange?: (open: boolean) => void;
  onCertOpenChange?: (open: boolean) => void;
}) {
  switch (sec) {
    case "about":
      return <AboutWin />;
    case "projects":
      return <ProjectsWin onOpenChange={onProjectOpenChange} />;
    case "certs":
      return <CertsWin onOpenChange={onCertOpenChange} />;
    case "contact":
      return <ContactWin />;
  }
}

export default function Desktop() {
  const [currentWs, setCurrentWs] = useState<number>(1);
  const [currentSec, setCurrentSec] = useState<Section>("about");
  const [wins, setWins] = useState<Record<string, WinData>>(initWins);
  const [leftOrder, setLeftOrder] = useState<string[]>(LEFT_INIT);
  const [mainOrder, setMainOrder] = useState<Record<number, string[]>>(initMainOrder);
  const [focused, setFocused] = useState<string | null>("about:1");
  const [leftW, setLeftW] = useState<number>(320);
  const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);

  useEffect(() => {
    applyAccent("orange");
    applyBg("mocha");
  }, []);

  const handleFocus = (id: string) => setFocused(id);

  const handleClose = (id: string) => {
    const w = wins[id];
    if (!w) return;
    if (w.box === "left") {
      setWins((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setLeftOrder((prev) => prev.filter((x) => x !== id));
      return;
    }
    const targetWs = w.ws ?? 1;
    setWins((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setMainOrder((prev) => {
      return { ...prev, [targetWs]: (prev[targetWs] ?? []).filter((x) => x !== id) };
    });
    if (targetWs > 1 && currentWs === targetWs) {
      switchWs(1, false);
    }
  };

  const handleMinimize = (id: string) => {
    setWins((prev) => {
      const w = prev[id];
      if (!w) return prev;
      const minimized = !w.minimized;
      if (minimized) setFocused(null);
      return { ...prev, [id]: { ...w, minimized } };
    });
  };

  const handleMaximize = (id: string) => {
    setWins((prev) => {
      const w = prev[id];
      if (!w) return prev;
      return { ...prev, [id]: { ...w, maximized: !w.maximized } };
    });
    setFocused(id);
  };

  const handleLeftWidth = (px: number) => {
    setLeftW(Math.max(240, px));
  };

  const switchWs = (ws: number, spawnIfNew: boolean) => {
    if (ws === currentWs && !spawnIfNew) return;
    const dir = ws > currentWs ? "forward" : "back";

    const doSwitch = () => {
      let nextWins = wins;
      let nextMain = mainOrder;
      let nextFocused = focused;
      const sec = WS_SEC[String(ws)];
      if (spawnIfNew && sec && (mainOrder[ws] ?? []).length === 0) {
        const key = `${sec}:${ws}`;
        nextWins = {
          ...wins,
          [key]: { key, box: "main", sec, ws, minimized: false, maximized: false },
        };
        nextMain = { ...mainOrder, [ws]: [key] };
        nextFocused = key;
      }
      setCurrentWs(ws);
      setCurrentSec(sec as Section);
      if (nextWins !== wins) setWins(nextWins);
      if (nextMain !== mainOrder) setMainOrder(nextMain);
      if (nextFocused !== focused) setFocused(nextFocused);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (doc.startViewTransition) {
      document.documentElement.setAttribute("data-vt", dir);
      const t = doc.startViewTransition(() => flushSync(doSwitch));
      t.finished.then(() => document.documentElement.removeAttribute("data-vt"));
    } else {
      flushSync(doSwitch);
    }
  };

  const openSec = (sec: Section) => {
    const ws = Number(SEC_WS[sec]);
    if (!ws) return;
    setCurrentSec(sec);
    switchWs(ws, true);
  };

  const resetDesktop = () => {
    const doReset = () => {
      setWins(initWins());
      setLeftOrder(LEFT_INIT);
      setMainOrder(initMainOrder());
      setFocused("about:1");
      setCurrentWs(1);
      setCurrentSec("about");
      setIsProjectOpen(false);
      setIsCertOpen(false);
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (doc.startViewTransition) {
      document.documentElement.setAttribute("data-vt", "back");
      const t = doc.startViewTransition(() => flushSync(doReset));
      t.finished.then(() => document.documentElement.removeAttribute("data-vt"));
    } else {
      flushSync(doReset);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      openSec(SEC_CYCLE[(SEC_CYCLE.indexOf(currentSec) + 1) % SEC_CYCLE.length]);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSec]);

  const activeMain = mainOrder[currentWs] ?? [];
  const leftEmpty = leftOrder.length === 0;
  const mainEmpty = activeMain.length === 0;

  // Left box (kitty + contents) is visible on all workspaces, but hides when a project detail (ws 2) or cert detail (ws 3) is open
  const isDetailOpen = (currentWs === 2 && isProjectOpen) || (currentWs === 3 && isCertOpen);
  let leftVisible = !isDetailOpen;
  let leftFull = false;
  let mainVisible = true;
  if (leftVisible) {
    if (leftEmpty && mainEmpty) {
      leftVisible = false;
      mainVisible = false;
    } else if (mainEmpty) {
      leftFull = true;
      mainVisible = false;
    }
  }

  const occupied = [1, 2, 3, 4].filter((ws) => (mainOrder[ws] ?? []).length > 0);
  const pillLabels = [1, 2, 3, 4].reduce((acc, ws) => {
    const busy = (mainOrder[ws] ?? []).length > 0;
    acc[ws] = busy ? `${ws}: ${WS_NAMES[ws]}` : String(ws);
    return acc;
  }, {} as Record<number, string>);

  return (
    <>
      <TopBar
        currentWs={currentWs}
        onSwitch={(ws) => switchWs(ws, true)}
        occupied={occupied}
        pillLabels={pillLabels}
        onReset={resetDesktop}
      />
      <div
        id="wallpaper"
        style={
          {
            backgroundImage: 'url("/wallpaper.jpg?v=2")',
            "--wp-dark": WP_DEFAULT_DARK / 100,
            "--wp-blur": `${WP_DEFAULT_BLUR}px`,
          } as React.CSSProperties
        }
      />
      <div id="desktop" data-ws={currentWs}>
        {leftOrder.length > 0 && (
          <div
            id="left-box"
            className={`left-box ${!leftVisible ? "is-hidden" : ""}`}
            style={{ width: leftFull ? "100%" : `${leftW}px` }}
          >
            {leftOrder.map((id) => {
              const w = wins[id];
              if (!w) return null;
              return (
                <Window
                  key={id}
                  id={id}
                  box="left"
                  title={
                    id === "profile"
                      ? "kitty — lorenzo@portfolio"
                      : "Contents — portfolio"
                  }
                  focused={focused === id}
                  minimized={w.minimized}
                  maximized={w.maximized}
                  onFocus={handleFocus}
                  onClose={handleClose}
                  onMinimize={handleMinimize}
                  onMaximize={handleMaximize}
                  onLeftWidth={handleLeftWidth}
                >
                  {id === "profile" ? (
                    <ProfileWin />
                  ) : (
                    <ContentsWin currentSec={currentSec} onOpen={openSec} />
                  )}
                </Window>
              );
            })}
          </div>
        )}
        {[1, 2, 3, 4].map((ws) => (
          <div
            key={ws}
            id={`ws-main-${ws}`}
            className="ws-main"
            style={{
              display: ws === currentWs && mainVisible ? "flex" : "none",
              viewTransitionName: ws === currentWs && mainVisible ? "ws-content" : "none",
            }}
          >
            {(mainOrder[ws] ?? []).map((id) => {
              const w = wins[id];
              if (!w || !w.sec) return null;
              return (
                <Window
                  key={id}
                  id={id}
                  box="main"
                  title={SEC_TITLES[w.sec]}
                  focused={focused === id}
                  minimized={w.minimized}
                  maximized={w.maximized}
                  back={false}
                  onFocus={handleFocus}
                  onClose={handleClose}
                  onMinimize={handleMinimize}
                  onMaximize={handleMaximize}
                  onLeftWidth={handleLeftWidth}
                >
                  <SectionContent
                    sec={w.sec}
                    onProjectOpenChange={setIsProjectOpen}
                    onCertOpenChange={setIsCertOpen}
                  />
                </Window>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
