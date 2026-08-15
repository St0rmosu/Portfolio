"use client";

import TechIcon from "@/components/TechIcon";
import { SKILL_GROUPS } from "@/lib/content";

export default function AboutWin() {
  return (
    <div className="about-grid">
      <div className="about-text">
        <div className="ah1">
          Hi, I&apos;m Lorenzo<span className="blink">_</span>
        </div>
        <div className="arole">
          Software Developer &amp; Systems Enthusiast
        </div>
        <div className="abody">
          Graduated from <strong>IISS Luigi Dell&apos;Erba</strong> in{" "}
          <strong>Informatica e Telecomunicazioni</strong> (diploma tecnico, 2026). Curious and
          motivated to continuously explore new technologies.
        </div>
        <div className="abody">
          Tirocinante at <strong>Galileo Italia S.R.L.</strong>: progettato e sviluppato da zero{" "}
          <strong>Textile-Inspector</strong>, applicazione Java con integrazione di modelli AI
          locali (Ollama) per l&apos;analisi dei tessuti.
        </div>
        <div className="abody">
          I manage a <strong>Proxmox VE</strong> home lab with VMs, LXC containers and self-hosted
          services. Active on GitHub as <strong>St0rmosu</strong>.
        </div>
        <div className="aitalic">Outside work: homelab, hi-fi audio, vinyl records, Formula 1.</div>
        {SKILL_GROUPS.map(({ title, skills }) => (
          <div key={title}>
            <div className="wlabel" style={{ marginTop: 14, marginBottom: 10 }}>
              {title}
            </div>
            <div className="techgrid">
              {skills.map((s) => (
                <a
                  className="titem"
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`Visita ${s.label} (${s.href})`}
                >
                  <div className="ticon">
                    <TechIcon skill={s} />
                  </div>
                  <div className="tname">{s.label}</div>
                  <span className="titem-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 16, fontSize: "0.62rem", color: "var(--dim)", lineHeight: 1.6 }}>
          <span style={{ color: "var(--green)" }}>● available for collab</span>
        </div>
        <div style={{ marginTop: 8, fontSize: "0.58rem", color: "var(--dim)" }}>
          languages: <span style={{ color: "var(--text2)" }}>Italiano (native)</span> ·{" "}
          <span style={{ color: "var(--text2)" }}>English (B2)</span>
        </div>
      </div>
      <div className="photo-side">
        <div className="photoframe">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo.jpg"
            alt="Lorenzo Recchia"
            className="pfimg"
            width={270}
            height={330}
          />
        </div>
        <div className="pfbar">
          <span className="pfmeta">f/1.0 · 12 MP · 26mm · ISO 50 · 1/500s</span>
          <span className="pfcap">Shot on Xiaomi 11T</span>
        </div>
      </div>
    </div>
  );
}
