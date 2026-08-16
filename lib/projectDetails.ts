export interface KeypointItem {
  icon?: "ai" | "scan" | "db" | "ui" | "mobile" | "speed" | "link" | "eco" | "cart" | "doc" | "video" | "math" | "audio" | "clock" | "chart" | "generic";
  text: string;
}

export interface ProjectKeypoints {
  name: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  keypoints: (string | KeypointItem)[];
  metrics?: { label: string; value: string }[];
  liveDemoUrl?: string;
  videoUrl?: string;
}

export const PROJECT_KEYPOINTS: Record<string, ProjectKeypoints> = {
  "GALILEO-ITA": {
    name: "GALILEO-ITA",
    title: "GALILEO-ITA — Analizzatore Difetti nei Tessuti con AI",
    tagline: "Visione artificiale e LLM locali per il controllo qualità industriale tessile",
    description:
      "Applicazione desktop sviluppata nell'ambito del progetto PCTO per identificare, classificare e analizzare anomalie e imperfezioni nei tessuti mediante intelligenza artificiale eseguita interamente in locale.",
    stack: ["Java 21", "Swing / FlatLaf", "Ollama (Gemma 3:4b)", "SQLite", "OpenCV"],
    keypoints: [
      {
        icon: "ai",
        text: "AI Locale con Ollama: elaborazione immagini e generazione report diagnostici in tempo reale senza dipendenze cloud.",
      },
      {
        icon: "scan",
        text: "Rilevamento Difetti Tessili: scansione automatica per buchi, sfilacciature, nodi di trama e difetti cromatici.",
      },
      {
        icon: "db",
        text: "Reportistica e Storico SQLite: persistenza locale dei lotti analizzati con metriche di accuratezza ed export PDF/CSV.",
      },
      {
        icon: "ui",
        text: "Interfaccia Desktop Fluida: architettura Java moderna con tema scuro e visualizzazione interattiva delle imperfezioni.",
      },
    ],
    metrics: [
      { label: "Modello AI", value: "Gemma 3:4b (Ollama)" },
      { label: "Architettura", value: "Java Desktop / Local First" },
      { label: "Privacy", value: "100% Offline / No Cloud" },
    ],
  },
  "dots-hyprland": {
    name: "dots-hyprland",
    title: "dots-hyprland — Usability-first Hyprland Setup",
    tagline: "Configurazione Hyprland e graphical shell moderna su Wayland",
    description:
      "Configurazione avanzata ed elegante per Hyprland compositor su Wayland (end-4 dots). Include una graphical shell customizzata con QML, Lua, Shell scripts, widget di sistema, controllo multimediale e notifiche integrate.",
    stack: ["Hyprland / Wayland", "QML / AGS", "Lua", "Shell / Bash", "Python", "Nix"],
    keypoints: [
      {
        icon: "ui",
        text: "Graphical Shell Moderna: interfaccia desktop completa con barre di stato, launcher, notifiche e control center.",
      },
      {
        icon: "speed",
        text: "Wayland & Hyprland: tiling window management ultra-reattivo, animazioni fluide e dynamic workspaces.",
      },
      {
        icon: "link",
        text: "Integrazione di Sistema: controlli rapidi audio, luminosità, monitor di risorse, lettore multimediale e clipboard manager.",
      },
      {
        icon: "doc",
        text: "Architettura Modulare: configurazione personalizzabile scritta in QML, Lua e script Bash con supporto Nix.",
      },
    ],
    metrics: [
      { label: "Compositor", value: "Hyprland (Wayland)" },
      { label: "Shell UI", value: "QML / AGS / EWW" },
      { label: "Target OS", value: "Linux / Arch / NixOS" },
    ],
  },
  "Insta-card": {
    name: "Insta-card",
    title: "Insta-card — Digital Business Card & Profilo Personale",
    tagline: "Biglietto da visita digitale moderno e interattivo in stile glassmorphism",
    description:
      "Web application leggera e responsiva che funge da hub centrale per link social, curriculum vitae scaricabile, portfolio e collegamenti di contatto rapido.",
    stack: ["HTML5", "CSS3 / Modern Glassmorphism", "Vanilla JavaScript", "FontAwesome"],
    liveDemoUrl: "https://st0rmosu.github.io/Insta-card/",
    keypoints: [
      {
        icon: "mobile",
        text: "Totalmente Responsive: ottimizzato per display mobile, tablet e desktop ad altissima densità di pixel.",
      },
      {
        icon: "ui",
        text: "Micro-animazioni Glassmorphism: effetti di trasparenza, riflessi di luce e hover dinamici su pulsanti e avatar.",
      },
      {
        icon: "speed",
        text: "Zero Dipendenze Pesanti: caricamento istantaneo in meno di 100ms e punteggio Lighthouse 100/100.",
      },
      {
        icon: "link",
        text: "Hub di Contatto Rapido: collegamenti a GitHub, LinkedIn, Email diretta con supporto vCard / CV download.",
      },
    ],
    metrics: [
      { label: "Performance", value: "100/100 Lighthouse" },
      { label: "Design", value: "Glassmorphism UI" },
      { label: "Dipendenze", value: "Zero Framework Overhead" },
    ],
  },
  "sitogpo": {
    name: "sitogpo",
    title: "RE-LIFE — E-commerce & Piattaforma Mobili Rigenerati",
    tagline: "Startup sostenibile per l'upcycling e la valorizzazione del mobilio d'epoca",
    description:
      "Piattaforma e-commerce completa e business plan per startup circolare focalizzata sull'acquisto, restauro e rivendita di arredi vintage e mobili rigenerati per abbattere l'impronta di carbonio.",
    stack: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Stripe API"],
    keypoints: [
      {
        icon: "eco",
        text: "Economia Circolare: modello di business strutturato per la sostenibilità ecologica e il riuso di mobili usati.",
      },
      {
        icon: "cart",
        text: "Catalogo E-commerce Interattivo: filtraggio dinamico per ambiente, stile di restauro, finitura e prezzo.",
      },
      {
        icon: "doc",
        text: "Sezione Business Plan & Mission: documentazione della proposta di valore, target di mercato e proiezioni di impatto.",
      },
      {
        icon: "speed",
        text: "Stack Moderno SSR/SSG: rendering ibrido ultra-veloce con ottimizzazione SEO e predisposizione pagamenti sicuri.",
      },
    ],
    metrics: [
      { label: "Stack", value: "Next.js 16 + TypeScript" },
      { label: "Missione", value: "Sostenibilità / Upcycling" },
      { label: "Features", value: "Catalogo + Business Model" },
    ],
  },
  "Dellerba-voice-logo-animation": {
    name: "Dellerba-voice-logo-animation",
    title: "Dell'Erba Voice — Animazione Vettoriale con Manim",
    tagline: "Motion design matematico e programmatico in Python per la web radio scolastica",
    description:
      "Script di rendering video in Python che sfrutta il motore matematico Manim (Community Edition) per generare in modo procedurale la sigla e l'animazione grafica del logo della web radio 'Dell'Erba Voice'.",
    stack: ["Python 3.11+", "Manim Community Engine", "FFmpeg", "LaTeX / Vector Math"],
    videoUrl: "/videos/LogoRadio.mp4",
    keypoints: [
      {
        icon: "math",
        text: "Animazione Matematica Procedurale: onde audio sinusoidali ed equalizzatore grafico calcolati in tempo reale da funzioni matematiche.",
      },
      {
        icon: "video",
        text: "Output Video ad Alta Risoluzione: rendering 1080p a 60 fps per sigle video, streaming e social media.",
      },
      {
        icon: "doc",
        text: "Pipeline Completamente Codificata: nessun software proprietario di video editing — tutto definito in script Python.",
      },
      {
        icon: "audio",
        text: "Identità Visiva Personalizzata: integrazione del naming della web radio scolastica con transizioni tipografiche fluide.",
      },
    ],
    metrics: [
      { label: "Motore Grafico", value: "Manim Engine" },
      { label: "Linguaggio", value: "Python 3" },
      { label: "Risoluzione", value: "1080p @ 60fps" },
    ],
  },
  "CustomPomodoroTimer": {
    name: "CustomPomodoroTimer",
    title: "FocusFlow — Minimal Aesthetic Pomodoro Timer",
    tagline: "Timer Pomodoro minimalista ed elegante per la gestione del focus e della produttività",
    description:
      "Applicazione web per la tecnica del Pomodoro con timer personalizzabile, indicatore circolare di progresso, campane audio rilassanti e storico delle sessioni di studio/lavoro salvate in locale.",
    stack: ["HTML5 Canvas", "Web Audio API", "Modern CSS3", "Vanilla JavaScript (ES6+)"],
    liveDemoUrl: "https://st0rmosu.github.io/CustomPomodoroTimer/",
    keypoints: [
      {
        icon: "clock",
        text: "Cicli Pomodoro Configurabili: gestione fluida tra intervalli di lavoro (25m), pause brevi (5m) e pause lunghe (15m).",
      },
      {
        icon: "audio",
        text: "Web Audio sintetizzato: campane tibetane e suoni di notifica generati via codice senza file audio esterni.",
      },
      {
        icon: "chart",
        text: "Statistiche e Persistenza: salvataggio automatico in localStorage del numero di pomodori completati nella giornata.",
      },
      {
        icon: "ui",
        text: "Zen Mode & Keyboard Shortcuts: supporto tastiera (Barra spaziatrice per Play/Pausa, 'R' per Reset) e modalità full screen.",
      },
    ],
    metrics: [
      { label: "Audio", value: "Web Audio API Synthesizer" },
      { label: "Storage", value: "Client-side LocalStorage" },
      { label: "Stile", value: "Minimalist Focus UI" },
    ],
  },
};

function removeTestingSection(content: string): string {
  const regex = /##\s+Testing[\s\S]*?(?=\n##\s+|\n#[^#]|$)/gi;
  return content.replace(regex, "").replace(/\n{3,}/g, "\n\n").trim();
}

export async function fetchRepoReadme(repoName: string): Promise<string> {
  // 1. Try official GitHub API raw endpoint (instant, avoids raw.githubusercontent 5m CDN cache)
  try {
    const res = await fetch(`https://api.github.com/repos/St0rmosu/${repoName}/readme`, {
      headers: { Accept: "application/vnd.github.v3.raw" },
    });
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 0) {
        return removeTestingSection(text);
      }
    }
  } catch {
    // fallback to raw.githubusercontent.com
  }

  // 2. Try raw branches
  const branches = ["main", "master"];
  for (const branch of branches) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/St0rmosu/${repoName}/${branch}/README.md?t=${Date.now()}`,
      );
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 0) {
          return removeTestingSection(text);
        }
      }
    } catch {
      // try next branch
    }
  }

  // Fallback to synthetic README if offline or not found
  const matchKey = Object.keys(PROJECT_KEYPOINTS).find(
    (k) => k.toLowerCase() === repoName.toLowerCase()
  );
  const kp = matchKey ? PROJECT_KEYPOINTS[matchKey] : undefined;
  if (kp) {
    const kpList = kp.keypoints.map((k) => (typeof k === "string" ? k : k.text));
    return `# ${kp.title}

${kp.tagline}

## Descrizione
${kp.description}

## Tecnologie Utilizzate
${kp.stack.map((s) => `- **${s}**`).join("\n")}

## Caratteristiche Principali
${kpList.map((k) => `- ${k}`).join("\n")}

## Utilizzo & Installazione
Per clonare ed esplorare il codice sorgente:

\`\`\`bash
git clone https://github.com/St0rmosu/${repoName}.git
cd ${repoName}
\`\`\`
`;
  }

  return `# ${repoName}\n\nNessun file README.md disponibile per questo repository su GitHub.`;
}

export function getProjectKeypoints(repoName: string): ProjectKeypoints {
  const matchKey = Object.keys(PROJECT_KEYPOINTS).find(
    (k) => k.toLowerCase() === repoName.toLowerCase()
  );
  if (matchKey && PROJECT_KEYPOINTS[matchKey]) {
    return PROJECT_KEYPOINTS[matchKey];
  }
  return {
    name: repoName,
    title: repoName,
    tagline: "Progetto GitHub pubblico",
    description: "Progetto sviluppato da Lorenzo Recchia (St0rmosu) e pubblicato su GitHub.",
    stack: ["Open Source"],
    keypoints: [
      { icon: "generic", text: "Repository pubblico disponibile su GitHub." },
      { icon: "generic", text: "Codice sorgente consultabile e versionato." },
    ],
  };
}
