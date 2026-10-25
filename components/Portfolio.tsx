"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const areas = {
  Sistemi: {
    center: "Linux",
    nodes: ["Hyprland", "QML / C++", "Proxmox", "Self-hosting"],
    text: "Un desktop da ripensare. Un server da configurare. Mi piace capire cosa succede sotto l’interfaccia.",
  },
  Web: {
    center: "Web",
    nodes: ["Next.js", "TypeScript", "React", "CSS"],
    text: "Dall’idea a un’interfaccia utilizzabile: sviluppo esperienze web e curo il modo in cui prendono forma.",
  },
  AI: {
    center: "AI locale",
    nodes: ["Ollama", "Gemma", "Java", "Computer vision"],
    text: "Modelli locali, problemi concreti: esploro come portare l’intelligenza artificiale dentro gli strumenti di lavoro.",
  },
};
type Area = keyof typeof areas;

const projects = [
  {
    name: "Dynamic Island",
    repo: "dynamic-island-hyprland",
    category: "Desktop / Linux",
    stack: "Quickshell, QML, C++20",
    kind: "island",
    intro: "Un nuovo punto di incontro tra te e il tuo desktop.",
    description:
      "Una shell modulare per Hyprland con Dynamic Island, schermata di blocco e centro di controllo. Un’esplorazione di come rendere più immediata l’interazione con Linux.",
    tags: ["Hyprland", "Quickshell", "C++20"],
  },
  {
    name: "GALILEO",
    repo: "GALILEO-ITA",
    category: "AI / Applicazione desktop",
    stack: "Java, Ollama, Gemma",
    kind: "galileo",
    intro: "L’intelligenza artificiale incontra il tessuto.",
    description:
      "Un’applicazione per l’analisi dei difetti tessili, sviluppata durante il percorso PCTO presso Galileo Italia. Java e modelli eseguiti in locale con Ollama collegano l’interfaccia al processo di analisi.",
    tags: ["Java", "Ollama", "AI locale"],
  },
  {
    name: "hyprfm",
    repo: "hyprfm",
    category: "Utility / Open source",
    stack: "Qt6, QML, Hyprland",
    kind: "files",
    intro: "I tuoi file, senza complicazioni.",
    description:
      "Un file manager leggero in Qt6 e QML pensato per Hyprland. Un progetto per esplorare gli strumenti quotidiani del desktop attraverso un’interfaccia essenziale.",
    tags: ["Qt6", "QML", "Linux"],
  },
  {
    name: "RE-LIFE",
    repo: "sitogpo",
    category: "Web / Progetto scolastico",
    stack: "Next.js, React, TypeScript",
    kind: "relife",
    intro: "Una seconda vita. Anche sul web.",
    description:
      "Una piattaforma dedicata al recupero e alla rigenerazione dei mobili, accompagnata da un business plan. Un progetto scolastico che unisce sviluppo web e un’idea di economia circolare.",
    tags: ["Next.js", "TypeScript", "E-commerce"],
  },
];
const credentials = [
  {
    title: "Google AI Professional Certificate",
    issuer: "Google / Coursera",
    year: "2026",
    url: "https://coursera.org/verify/professional-cert/LQSK7W3FKUQY",
  },
  {
    title: "DevOps, Cloud & Agile Foundations",
    issuer: "IBM / Coursera",
    year: "2026",
    url: "https://coursera.org/verify/specialization/GH5A85B9C4YZ",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco / NetAcad",
    year: "2025",
    url: "https://www.netacad.com/certificates?issuanceId=f486fe7f-c3de-42ae-85a6-80bae59dbe73",
  },
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  // Solar arrow-right-up / arrow-right, MIT licensed (Solar Icons).
  return (
    <svg className="arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={diagonal ? "M7 17 17 7M7 7h10v10" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ProjectVisual({ kind }: { kind: string }) {
  return (
    <div className={`project-visual ${kind}`} aria-hidden="true">
      {kind === "island" && (
        <>
          <div className="island-desktop">
            <div className="desktop-line">
              <span>hyprland</span>
              <span>18:42</span>
            </div>
            <div className="island-pill">
              <span className="music-bars">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>
                Il desktop, al tuo ritmo.
                <small>Dynamic Island · Quickshell</small>
              </span>
              <span className="disc" />
            </div>
            <div className="island-word">
              Less noise.
              <br />
              More flow.
            </div>
            <div className="desktop-line bottom">
              <span>Workspace 1</span>
              <span>Linux / Wayland</span>
            </div>
          </div>
          <span className="visual-caption">
            Studio tipografico del progetto
          </span>
        </>
      )}
      {kind === "galileo" && (
        <>
          <div className="textile-grid">
            <div className="scan-box">
              <span>Area di analisi</span>
              <b>+</b>
            </div>
          </div>
          <div className="galileo-word">
            GALILEO<span>Osservare. Comprendere.</span>
          </div>
          <span className="visual-caption">
            Diagramma concettuale · AI locale
          </span>
        </>
      )}
      {kind === "files" && (
        <>
          <div className="file-composition">
            <div className="folder-shape">~/</div>
            <div className="file-label">
              <b>hyprfm</b>
              <span>Un posto per ogni cosa.</span>
            </div>
            <div className="file-path">home / lorenzo / projects</div>
          </div>
          <span className="visual-caption">Studio grafico del progetto</span>
        </>
      )}
      {kind === "relife" && (
        <>
          <span className="relife-kicker">Ripensare il presente.</span>
          <div className="relife-word">
            RE<span>—</span>
            <br />
            LIFE
          </div>
          <span className="relife-sub">
            Mobili con una storia.
            <br />
            Una storia che continua.
          </span>
          <span className="visual-caption">
            Studio tipografico del progetto
          </span>
        </>
      )}
    </div>
  );
}
export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const diagram = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState<Area>("Sistemi");
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero-title .word", {
          yPercent: 105,
          rotation: 3,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".orbit-map", {
          rotation: -15,
          scale: 0.9,
          duration: 1.3,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".hero-bottom", {
          y: 16,
          duration: 0.8,
          delay: 0.3,
          clearProps: "all",
        });
      }, root);
      // Lenis keeps native document scrolling. Locomotive's container abstraction
      // is unnecessary for this layout; only this single scroll engine is used.
      const lenis = new Lenis({
        duration: 0.85,
        anchors: true,
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      let active = true;
      document.fonts.ready.then(() => {
        if (active) ScrollTrigger.refresh();
      });
      return () => {
        active = false;
        gsap.ticker.remove(tick);
        lenis.destroy();
        context.revert();
      };
    });
    return () => {
      media.revert();
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  function selectArea(next: Area) {
    setArea(next);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        diagram.current,
        { rotate: -5, scale: 0.97 },
        {
          rotate: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        },
      );
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("rccialrnzo605@gmail.com");
      setCopied("Indirizzo copiato");
    } catch {
      setCopied("Puoi copiare l’indirizzo dal link email qui accanto.");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(""), 4000);
  }
  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        Vai al contenuto
      </a>
      <header className="site-header wrap">
        <a className="wordmark" href="#" aria-label="Lorenzo Recchia, inizio">
          lr<span>.</span>
        </a>
        <span className="header-role">
          Sviluppatore software
          <br />
          <span>Curioso, per natura.</span>
        </span>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Chiudi" : "Menu"}
          <span aria-hidden="true">{menu ? "−" : "+"}</span>
        </button>
        <nav
          id="navigation"
          className={menu ? "navigation is-open" : "navigation"}
          aria-label="Navigazione principale"
        >
          <a href="#progetti" onClick={() => setMenu(false)}>
            Progetti
          </a>
          <a href="#profilo" onClick={() => setMenu(false)}>
            Chi sono
          </a>
          <a
            className="nav-contact"
            href="#contatti"
            onClick={() => setMenu(false)}
          >
            Parliamone <Arrow diagonal />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-top">
            <span>Lorenzo Recchia</span>
            <span>Software developer / St0rmosu</span>
          </div>
          <div className="hero-composition">
            <div className="hero-copy">
              <h1 id="hero-heading" className="hero-title">
                <span>
                  <span className="word">Un’idea.</span>
                </span>
                <span>
                  <span className="word">Il codice.</span>
                </span>
                <span>
                  <span className="word">Si parte.</span>
                </span>
              </h1>
              <p>
                Costruisco applicazioni web e desktop.
                <br />
                Esploro tutto quello che c’è sotto.
              </p>
              <a className="round-link light" href="#progetti">
                <span>Esplora i progetti</span>
                <span className="circle">
                  <Arrow />
                </span>
              </a>
            </div>
            <div className="hero-explorer">
              <div
                className="orbit-map"
                ref={diagram}
                role="img"
                aria-label={`${area}: ${areas[area].nodes.join(", ")}`}
              >
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />
                <span className="orbit-center">
                  {areas[area].center}
                  <small>In esplorazione</small>
                </span>
                {areas[area].nodes.map((node, i) => (
                  <span className={`orbit-node node-${i}`} key={i}>
                    {node}
                  </span>
                ))}
                <span className="orbit-axis axis-h" />
                <span className="orbit-axis axis-v" />
              </div>
              <div
                className="area-controls"
                aria-label="Esplora le aree di interesse"
              >
                {(Object.keys(areas) as Area[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => selectArea(key)}
                    aria-pressed={key === area}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <p className="area-description" aria-live="polite">
                {areas[area].text}
              </p>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              <span className="status-dot" /> Aperto a nuove collaborazioni
            </span>
            <span>Web, Linux & un po’ di sana curiosità</span>
            <a href="#progetti" aria-label="Scorri ai progetti">
              Scorri per esplorare <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section
          id="progetti"
          className="work-section wrap"
          aria-labelledby="work-heading"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">Dall’idea alla pratica</span>
              <h2 id="work-heading">
                Codice che
                <br />
                prende forma.
              </h2>
            </div>
            <p>
              Interfacce, strumenti e piccoli esperimenti.
              <br />
              Una selezione di ciò che sto costruendo.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project" key={project.repo}>
                <a
                  className="visual-link"
                  href={`https://github.com/St0rmosu/${project.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Esplora ${project.name} su GitHub (nuova scheda)`}
                >
                  <ProjectVisual kind={project.kind} />
                  <span className="project-open">
                    <Arrow diagonal />
                  </span>
                </a>
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.stack}</span>
                </div>
                <h3>
                  <a
                    href={`https://github.com/St0rmosu/${project.repo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.name}
                    <Arrow diagonal />
                  </a>
                </h3>
                <p className="project-intro">{project.intro}</p>
                <details>
                  <summary>
                    Dentro il progetto <span aria-hidden="true">+</span>
                  </summary>
                  <div className="project-detail">
                    <p>{project.description}</p>
                    <ul className="tags">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <a
                      href={`https://github.com/St0rmosu/${project.repo}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Leggi il codice su GitHub <Arrow diagonal />
                    </a>
                  </div>
                </details>
              </article>
            ))}
          </div>
          <a
            className="archive-link"
            href="https://github.com/St0rmosu?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              C’è altro da esplorare.<small>Tutti i repository su GitHub</small>
            </span>
            <span className="circle">
              <Arrow diagonal />
            </span>
          </a>
        </section>
        <section
          id="profilo"
          className="about-section"
          aria-labelledby="about-heading"
        >
          <div className="wrap about-grid">
            <div className="about-title">
              <span className="section-label">Dietro il codice</span>
              <h2 id="about-heading">
                Piacere,
                <br />
                Lorenzo<span>.</span>
              </h2>
              <div className="personal-note">
                <span aria-hidden="true">↳</span>
                <p>
                  Nel tempo libero?
                  <br />
                  Homelab, vinili e Formula 1.
                </p>
              </div>
            </div>
            <div className="about-copy">
              <p className="big-copy">
                Mi piace costruire cose.
                <br />E capire come funzionano.
              </p>
              <p>
                Sono uno sviluppatore software con un diploma in Informatica e
                Telecomunicazioni all’IISS Luigi Dell’Erba, conseguito nel 2026.
                Mi muovo tra applicazioni web, strumenti desktop e sistemi
                Linux.
              </p>
              <p>
                Durante il tirocinio presso Galileo Italia ho lavorato a
                un’applicazione Java per l’analisi dei tessuti con modelli AI
                locali. A casa, il mio laboratorio è un homelab Proxmox:
                macchine virtuali, container e servizi da gestire in prima
                persona.
              </p>
              <div className="capabilities">
                <div>
                  <h3>Interfacce & web</h3>
                  <p>TypeScript, React, Next.js, HTML e CSS</p>
                </div>
                <div>
                  <h3>Software & AI</h3>
                  <p>Java, Python, C++, Ollama</p>
                </div>
                <div>
                  <h3>Sistemi & dati</h3>
                  <p>Linux, Proxmox, SQL, Git</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="learning-section wrap"
          aria-labelledby="learning-heading"
        >
          <div className="learning-intro">
            <span className="section-label">Continuare a imparare</span>
            <h2 id="learning-heading">
              Sempre in
              <br />
              costruzione.
            </h2>
            <p>
              La curiosità è il punto di partenza.
              <br />
              Lo studio le dà una direzione.
            </p>
          </div>
          <div className="credentials">
            {credentials.map((cert) => (
              <a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Verifica ${cert.title} (nuova scheda)`}
              >
                <span className="credential-year">{cert.year}</span>
                <span>
                  <small>{cert.issuer}</small>
                  <h3>{cert.title}</h3>
                </span>
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </section>
        <section
          id="contatti"
          className="contact-section"
          aria-labelledby="contact-heading"
        >
          <div className="wrap">
            <div className="contact-top">
              <span className="section-label">La prossima idea?</span>
              <span>
                <span className="status-dot" /> Inizia con una conversazione.
              </span>
            </div>
            <a className="contact-title" href="mailto:rccialrnzo605@gmail.com">
              <h2 id="contact-heading">
                Facciamola
                <br />
                succedere.
              </h2>
              <span className="contact-arrow">
                <Arrow diagonal />
              </span>
            </a>
            <div className="contact-bottom">
              <div className="email-group">
                <a href="mailto:rccialrnzo605@gmail.com">
                  rccialrnzo605@gmail.com
                </a>
                <button onClick={copyEmail} aria-label="Copia indirizzo email">
                  Copia
                </button>
                <span className="copy-status" role="status">
                  {copied}
                </span>
              </div>
              <a
                href="https://www.linkedin.com/in/lorenzo-recchia-ba0093366/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <Arrow diagonal />
              </a>
              <a
                href="https://github.com/St0rmosu"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="#" aria-label="Torna all’inizio">
          lr<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Lorenzo Recchia</span>
        <a href="#">
          Ci vediamo in cima <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </div>
  );
}
