"use client";

import { useEffect, useState } from "react";
import { fetchRepos, FALLBACK_REPOS, type Repo } from "@/lib/github";
import ProjectDetailWin from "@/components/wins/ProjectDetailWin";

const LANG_BADGE: Record<string, { cls?: string; style?: React.CSSProperties; label: string }> = {
  Java: { cls: "bj", label: "Java" },
  Python: {
    style: { color: "#8faabf", borderColor: "rgba(143,170,191,0.3)", background: "rgba(143,170,191,0.08)" },
    label: "Python",
  },
  Shell: { cls: "bb", label: "Bash" },
  JavaScript: {
    style: { color: "#c4a96a", borderColor: "rgba(196,169,106,0.3)", background: "rgba(196,169,106,0.08)" },
    label: "JS",
  },
  TypeScript: {
    style: { color: "#8faabf", borderColor: "rgba(143,170,191,0.3)", background: "rgba(143,170,191,0.08)" },
    label: "TS",
  },
  PHP: {
    style: { color: "#d4c9b0", borderColor: "rgba(212,201,176,0.3)", background: "rgba(212,201,176,0.08)" },
    label: "PHP",
  },
  CSS: {
    style: { color: "#7a9e72", borderColor: "rgba(122,158,114,0.3)", background: "rgba(122,158,114,0.08)" },
    label: "CSS",
  },
  HTML: { cls: "bj", label: "HTML" },
  QML: {
    style: { color: "#c0a2e8", borderColor: "rgba(192,162,232,0.3)", background: "rgba(192,162,232,0.08)" },
    label: "QML",
  },
  Lua: {
    style: { color: "#8fa8d6", borderColor: "rgba(143,168,214,0.3)", background: "rgba(143,168,214,0.08)" },
    label: "Lua",
  },
  "Emacs Lisp": {
    style: { color: "#d4c9b0", borderColor: "rgba(212,201,176,0.3)", background: "rgba(212,201,176,0.08)" },
    label: "Emacs",
  },
  Nix: {
    style: { color: "#8faabf", borderColor: "rgba(143,170,191,0.3)", background: "rgba(143,170,191,0.08)" },
    label: "Nix",
  },
  SCSS: {
    style: { color: "#d8a8c0", borderColor: "rgba(216,168,192,0.3)", background: "rgba(216,168,192,0.08)" },
    label: "SCSS",
  },
  GLSL: {
    style: { color: "#c08a6a", borderColor: "rgba(192,138,106,0.3)", background: "rgba(192,138,106,0.08)" },
    label: "GLSL",
  },
};

const REPO_LANGS: Record<string, string[]> = {
  "dots-hyprland": ["QML", "Shell", "Python", "JavaScript", "Lua", "Nix"],
};

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "-1px", marginRight: 3 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-1px", marginRight: 3 }}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function Badge({ lang }: { lang: string | null }) {
  const b = lang ? LANG_BADGE[lang] : undefined;
  if (!b) {
    return (
      <span className="pbadge" style={{ color: "var(--dim)", borderColor: "var(--border2)" }}>
        {lang || "—"}
      </span>
    );
  }
  return (
    <span className={"pbadge" + (b.cls ? " " + b.cls : "")} style={b.style}>
      {b.label}
    </span>
  );
}

function cleanDescription(desc: string | null): string {
  if (!desc) return "No description.";
  // Strip emojis from raw GitHub descriptions
  return desc
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, "")
    .trim();
}

interface ProjectsWinProps {
  onOpenChange?: (open: boolean) => void;
}

export default function ProjectsWin({ onOpenChange }: ProjectsWinProps) {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK_REPOS);
  const [error, setError] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const handleSelectRepo = (r: Repo | null) => {
    setSelectedRepo(r);
    onOpenChange?.(r !== null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedRepo) {
        e.preventDefault();
        handleSelectRepo(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRepo]);

  useEffect(() => {
    let cancelled = false;
    fetchRepos()
      .then((r) => {
        if (!cancelled) {
          setRepos(r);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const total = repos?.length ?? 0;

  return (
    <div className="p proj-root">
      {/* If split mode with selected project */}
      {selectedRepo ? (
        <div className="proj-split-layout">
          {/* Left list column */}
          <div className="proj-list-col">
            <div className="proj-list-header">
              <button
                className="proj-back-grid-btn"
                onClick={() => handleSelectRepo(null)}
                title="Torna alla griglia completa dei progetti (Esc)"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Torna alla griglia</span>
                <span className="proj-kbd-hint">ESC</span>
              </button>
              <div className="stitle">
                Projects/<span className="blink">_</span>
              </div>
              <div className="ssub">{`// ${total} repo · seleziona per dettagli`}</div>
            </div>

            <div className="proj-compact-list">
              {repos?.map((r) => {
                const isSelected = selectedRepo.name === r.name;
                return (
                  <div
                    key={r.name}
                    className={"pcard compact" + (isSelected ? " active" : "")}
                    onClick={() => handleSelectRepo(r)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectRepo(r);
                      }
                    }}
                  >
                    <div className="phead">
                      <span className="pname2">{r.name}</span>
                      <Badge lang={REPO_LANGS[r.name] ? REPO_LANGS[r.name][0] : r.language} />
                    </div>
                    <div className="pdesc">{cleanDescription(r.description)}</div>
                    <div className="proj-footer">
                      {r.stargazers_count > 0 && (
                        <span style={{ fontSize: "0.60rem", color: "var(--yellow)" }}>
                          <StarIcon />
                          {r.stargazers_count}
                        </span>
                      )}
                      {isSelected ? (
                        <span className="proj-active-pill">Aperto →</span>
                      ) : (
                        <span className="proj-open-hint">Apri →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right details column */}
          <div className="proj-detail-col">
            <ProjectDetailWin repo={selectedRepo} onClose={() => handleSelectRepo(null)} />
          </div>
        </div>
      ) : (
        /* Full grid view when no project is open */
        <>
          <div className="stitle">
            Projects/<span className="blink">_</span>
          </div>
          <div className="ssub">
            {repos
              ? `// ${total} repo pubblici · clicca per aprire README & Keypoints`
              : "// caricamento da GitHub..."}
          </div>
          <div className="projgrid">
            {!repos && !error && (
              <div className="projload">
                <div style={{ marginBottom: 8 }}>⟳ caricamento repo...</div>
              </div>
            )}
            {error && (
              <div className="projload">
                Errore di caricamento — riprova con una connessione attiva
              </div>
            )}
            {repos?.map((r) => (
              <div
                key={r.name}
                className="pcard"
                onClick={() => handleSelectRepo(r)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectRepo(r);
                  }
                }}
              >
                <div className="phead">
                  <span className="pname2">{r.name}</span>
                  <Badge lang={REPO_LANGS[r.name] ? REPO_LANGS[r.name][0] : r.language} />
                </div>
                <div className="pdesc">{cleanDescription(r.description)}</div>
                <div className="proj-footer">
                  {r.stargazers_count > 0 && (
                    <span style={{ fontSize: "0.62rem", color: "var(--yellow)" }}>
                      <StarIcon />
                      {r.stargazers_count}
                    </span>
                  )}
                  {r.forks_count > 0 && (
                    <span style={{ fontSize: "0.62rem", color: "var(--dim)" }}>
                      <ForkIcon />
                      {r.forks_count}
                    </span>
                  )}
                  {(REPO_LANGS[r.name] || [])
                    .slice(1)
                    .map((l) => (
                      <Badge key={l} lang={l} />
                    ))}
                  {(r.topics || []).slice(0, 3).map((t) => (
                    <span key={t} className="ptag">
                      {t}
                    </span>
                  ))}
                  <span className="proj-open-action">Dettagli & README →</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
