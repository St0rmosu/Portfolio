"use client";

import { useState, useEffect } from "react";
import { CERTS, type Cert } from "@/lib/content";
import CertDetailWin from "@/components/wins/CertDetailWin";

function certSite(href: string) {
  try {
    return new URL(href).hostname;
  } catch {
    return href;
  }
}

interface CertsWinProps {
  onOpenChange?: (open: boolean) => void;
}

export default function CertsWin({ onOpenChange }: CertsWinProps) {
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);

  const handleSelectCert = (c: Cert | null) => {
    setSelectedCert(c);
    onOpenChange?.(c !== null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        e.preventDefault();
        handleSelectCert(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCert]);

  return (
    <div className="p proj-root">
      {selectedCert ? (
        <div className="proj-split-layout">
          {/* Left list column */}
          <div className="proj-list-col">
            <div className="proj-list-header">
              <button
                className="proj-back-grid-btn cert-back-grid-btn"
                onClick={() => handleSelectCert(null)}
                title="Torna alla griglia completa delle certificazioni (Esc)"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Torna alla griglia</span>
                <span className="proj-kbd-hint">ESC</span>
              </button>
              <div className="stitle">
                Certificazioni/<span className="blink">_</span>
              </div>
              <div className="ssub">{"// 3 certificati · seleziona per dettagli"}</div>
            </div>

            <div className="proj-compact-list">
              {CERTS.map((c) => {
                const isSelected = selectedCert.name === c.name;
                return (
                  <div
                    key={c.name}
                    className={"certcard compact" + (isSelected ? " active" : "")}
                    onClick={() => handleSelectCert(c)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectCert(c);
                      }
                    }}
                  >
                    <div className="certhead">
                      <span className="certico">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="8" r="6" />
                          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                      </span>
                      <div>
                        <div className="certname">{c.name}</div>
                        <div className="certmeta">
                          <b>{c.issuer}</b> · {c.year}
                        </div>
                      </div>
                    </div>
                    <div className="proj-footer">
                      {isSelected ? (
                        <span className="proj-active-pill cert-active-pill">Aperto →</span>
                      ) : (
                        <span className="proj-open-hint">Dettagli →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right detail column */}
          <div className="proj-detail-col">
            <CertDetailWin cert={selectedCert} onClose={() => handleSelectCert(null)} />
          </div>
        </div>
      ) : (
        /* Full list view */
        <>
          <div className="stitle">
            Certificazioni/<span className="blink">_</span>
          </div>
          <div className="ssub">{"// 3 certificati · clicca per dettagli & verifica"}</div>
          <div className="certgrid">
            {CERTS.map((c) => (
              <div
                key={c.name}
                className="certcard"
                onClick={() => handleSelectCert(c)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectCert(c);
                  }
                }}
              >
                <div className="certhead">
                  <span className="certico">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </span>
                  <div>
                    <div className="certname">{c.name}</div>
                    <div className="certmeta">
                      <b>{c.issuer}</b> · {c.year}
                    </div>
                  </div>
                </div>
                <div className="certtags">
                  {c.tags.map((t) => (
                    <span key={t.label} className={`btag2 ${t.cls}`}>
                      {t.label}
                    </span>
                  ))}
                </div>
                <div className="certfoot">
                  <span>↗ verifica su {certSite(c.href)}</span>
                  <span className="proj-open-action cert-open-action">Dettagli & Credenziale →</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
