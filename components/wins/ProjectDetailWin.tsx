"use client";

import { useEffect, useState } from "react";
import { type Repo } from "@/lib/github";
import { fetchRepoReadme, getProjectKeypoints, type ProjectKeypoints, type KeypointItem } from "@/lib/projectDetails";
import MarkdownViewer from "@/components/MarkdownViewer";

interface ProjectDetailWinProps {
  repo: Repo;
  onClose: () => void;
}

function KeypointIcon({ type }: { type?: KeypointItem["icon"] }) {
  switch (type) {
    case "ai":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v1a4 4 0 0 0 8 0v-1h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2v-2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z" />
          <path d="M9 10h.01" />
          <path d="M15 10h.01" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </svg>
      );
    case "scan":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <line x1="7" y1="12" x2="17" y2="12" />
        </svg>
      );
    case "db":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "ui":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="M3 9h18" />
          <path d="M7 13h2" />
          <path d="M11 13h4" />
        </svg>
      );
    case "mobile":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="20" x="5" y="2" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "speed":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "link":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case "eco":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "cart":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      );
    case "doc":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "video":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      );
    case "math":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 4H6l6 8-6 8h12" />
        </svg>
      );
    case "audio":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      );
    case "clock":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "chart":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      );
  }
}

export default function ProjectDetailWin({ repo, onClose }: ProjectDetailWinProps) {
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const keypoints: ProjectKeypoints = getProjectKeypoints(repo.name);

  useEffect(() => {
    let cancelled = false;
    fetchRepoReadme(repo.name)
      .then((text) => {
        if (!cancelled) {
          setReadme(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [repo.name]);

  return (
    <div className="pdetail-container">
      {/* Top header inside detail window */}
      <div className="pdetail-header">
        <div className="pdetail-header-top-row">
          <button
            onClick={onClose}
            className="pdetail-back-btn"
            title="Torna alla griglia progetti (Esc)"
            aria-label="Torna alla griglia progetti"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Torna alla griglia</span>
          </button>
        </div>

        <div className="pdetail-header-main-row">
          <div className="pdetail-header-left">
            <span className="pdetail-name">{repo.name}</span>
            {repo.language && <span className="pdetail-badge">{repo.language}</span>}
          </div>

          <div className="pdetail-header-right">
            {keypoints.liveDemoUrl && (
              <a
                href={keypoints.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="pdetail-live-header-btn"
                title="Apri Demo Live in nuova scheda"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Demo Live ↗</span>
              </a>
            )}

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="pdetail-gh-btn"
              title="Apri su GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Apri GitHub ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scrollable detail body */}
      <div className="pdetail-body">
        {/* Quick Summary / Keypoints Block directly on top */}
        <div className="pdetail-summary-card">
          <div className="pdetail-summary-header">
            <div className="pdetail-summary-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <h3 className="pdetail-summary-title">{keypoints.title}</h3>
              <p className="pdetail-summary-tagline">{keypoints.tagline}</p>
            </div>
          </div>

          <p className="pdetail-summary-desc">{keypoints.description}</p>

          {/* Stack chips */}
          <div className="pdetail-stack-list">
            <span className="pdetail-stack-label">Stack:</span>
            {keypoints.stack.map((s) => (
              <span key={s} className="pdetail-stack-chip">
                {s}
              </span>
            ))}
          </div>

          {/* Keypoints list */}
          <div className="pdetail-keypoints-box">
            <div className="pdetail-keypoints-title">{"// KEYPOINTS & FUNZIONALITÀ"}</div>
            <ul className="pdetail-keypoints-ul">
              {keypoints.keypoints.map((item, idx) => {
                const isObj = typeof item !== "string";
                const iconType = isObj ? item.icon : "generic";
                const textContent = isObj ? item.text : item;

                return (
                  <li key={idx} className="pdetail-keypoint-item">
                    <span className="pdetail-kp-icon">
                      <KeypointIcon type={iconType} />
                    </span>
                    <span className="pdetail-kp-text">{textContent}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Metrics cards */}
          {keypoints.metrics && keypoints.metrics.length > 0 && (
            <div className="pdetail-metrics-grid">
              {keypoints.metrics.map((m, idx) => (
                <div key={idx} className="pdetail-metric-card">
                  <div className="pdetail-metric-lbl">{m.label}</div>
                  <div className="pdetail-metric-val">{m.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Live Web Demo Browser Frame */}
        {keypoints.liveDemoUrl && (
          <div className="pdetail-live-demo-card">
            <div className="pdetail-browser-bar">
              <div className="pdetail-browser-dots">
                <span className="pdetail-bdot" />
                <span className="pdetail-bdot" />
                <span className="pdetail-bdot" />
              </div>
              <div className="pdetail-browser-url">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>{keypoints.liveDemoUrl}</span>
              </div>
              <a
                href={keypoints.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="pdetail-browser-popout"
                title="Apri demo a schermo intero in nuova scheda"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>Nuova Scheda ↗</span>
              </a>
            </div>
            <div className="pdetail-iframe-wrapper">
              <iframe
                src={keypoints.liveDemoUrl}
                title={`${repo.name} Live Demo`}
                className="pdetail-live-iframe"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
              />
            </div>
          </div>
        )}

        {/* README Section directly below summary */}
        <div className="pdetail-readme-section">
          <div className="pdetail-readme-header">
            <div className="pdetail-readme-title-group">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pdetail-readme-ico">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="pdetail-readme-title">README.md da GitHub</span>
            </div>
            {loading && <span className="pdetail-readme-loading">⟳ sincronizzazione...</span>}
          </div>

          {readme ? (
            <MarkdownViewer markdown={readme} repoName={repo.name} />
          ) : loading ? (
            <div className="pdetail-loading-box">
              <div>⟳ Caricamento README da GitHub...</div>
            </div>
          ) : (
            <div className="pdetail-empty-box">Nessun README trovato per questo repository.</div>
          )}
        </div>
      </div>
    </div>
  );
}
