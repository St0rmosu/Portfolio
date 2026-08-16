"use client";

import { useState, useEffect } from "react";
import { type Cert } from "@/lib/content";
import { getCertDetail, type CertDetail } from "@/lib/certDetails";

interface CertDetailWinProps {
  cert: Cert;
  onClose: () => void;
}

export default function CertDetailWin({ cert, onClose }: CertDetailWinProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const detail: CertDetail = getCertDetail(cert.name);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <div className="pdetail-container cert-pure-viewer">
      {/* Top header inside cert detail window */}
      <div className="pdetail-header">
        <div className="pdetail-header-left">
          <button
            onClick={onClose}
            className="pdetail-back-btn"
            title="Torna alla griglia certificazioni (Esc)"
            aria-label="Torna alla griglia certificazioni"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Torna alla griglia</span>
          </button>
          <span className="pdetail-name">{cert.name}</span>
          <span className="pdetail-badge cert-badge">{cert.issuer}</span>
        </div>

        <div className="pdetail-header-right">
          {detail.previewImg && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="pdetail-pdf-btn"
              title="Ingrandisci a schermo intero"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              <span>Ingrandisci</span>
            </button>
          )}

          {detail.pdfUrl && (
            <a
              href={detail.pdfUrl}
              download
              className="pdetail-pdf-btn"
              title="Scarica PDF Ufficiale"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Scarica PDF ↓</span>
            </a>
          )}

          <a
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="pdetail-gh-btn cert-verify-btn"
            title="Verifica Credenziale Online"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <span>Verifica Online ↗</span>
          </a>
        </div>
      </div>

      {/* Main Certificate View Area */}
      <div className="cert-pure-body">
        {detail.previewImg ? (
          <div className="cert-pure-img-box" onClick={() => setLightboxOpen(true)} role="button" tabIndex={0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={detail.previewImg}
              alt={detail.name}
              className="cert-pure-img"
              loading="eager"
            />
            <div className="cert-pure-overlay">
              <span className="cert-doc-zoom-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                Clicca per ingrandire
              </span>
            </div>
          </div>
        ) : (
          /* Verification Card for certifications without local image */
          <div className="cert-verify-box" style={{ maxWidth: 640, margin: "auto" }}>
            <div className="cert-verify-info">
              <span className="cert-verify-badge">● Credenziale Ufficiale Verificata</span>
              <h3 style={{ margin: "4px 0", color: "var(--text)", fontSize: "0.85rem" }}>{detail.name}</h3>
              <p className="cert-verify-text">
                Certificato accademico conseguito presso {detail.issuer}. La credenziale è registrata e consultabile sul portale ufficiale Cisco NetAcad con ID{" "}
                <code className="md-inline-code">{detail.credentialId}</code>.
              </p>
            </div>
            <div className="cert-verify-actions">
              <a href={cert.href} target="_blank" rel="noreferrer" className="cert-verify-cta cert-lightbox-primary">
                Verifica sul Portale Ufficiale Cisco NetAcad ↗
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && detail.previewImg && (
        <div className="cert-lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cert-lightbox-header">
              <span className="cert-lightbox-title">{detail.name}</span>
              <div className="cert-lightbox-header-actions">
                {detail.pdfUrl && (
                  <a href={detail.pdfUrl} download className="cert-lightbox-btn">
                    Scarica PDF ↓
                  </a>
                )}
                <a href={detail.href} target="_blank" rel="noreferrer" className="cert-lightbox-btn cert-lightbox-primary">
                  Verifica Online ↗
                </a>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="cert-lightbox-close"
                  title="Chiudi (Esc)"
                  aria-label="Chiudi"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="cert-lightbox-img-wrapper" onClick={() => setLightboxOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={detail.previewImg}
                alt={detail.name}
                className="cert-lightbox-img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
