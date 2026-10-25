// Throwaway mockups: same content, three structurally different multi-page designs.
// Factual content comes from St0rmosu's public portfolio and repositories.
export const projects = [
  {
    slug: "dynamic-island",
    name: "Dynamic Island",
    category: "Desktop Linux",
    stack: "Quickshell / QML / C++20",
    repo: "dynamic-island-hyprland",
    image: "/mockups/island-control.png",
    cover: "/mockups/island.png",
    description:
      "Una shell modulare per Hyprland, con Dynamic Island, schermata di blocco e centro di controllo.",
    body: "Un progetto che parte dal desktop di tutti i giorni e prova a ripensarlo. Notifiche, controlli e informazioni di sistema convivono in una shell modulare per Hyprland, costruita con Quickshell, QML e C++20.",
    focus: [
      "Dynamic Island e notifiche",
      "Centro di controllo",
      "Schermata di blocco",
    ],
  },
  {
    slug: "galileo",
    name: "GALILEO",
    category: "Intelligenza artificiale",
    stack: "Java / Ollama / Gemma",
    repo: "GALILEO-ITA",
    image: "",
    cover: "",
    description:
      "Analisi dei difetti tessili con modelli di intelligenza artificiale eseguiti in locale.",
    body: "Sviluppato durante il percorso PCTO presso Galileo Italia: un’applicazione Java che porta modelli locali nel processo di analisi dei tessuti, attraverso Ollama e Gemma.",
    focus: [
      "Applicazione desktop Java",
      "Modelli AI in locale",
      "Analisi dei tessuti",
    ],
  },
  {
    slug: "re-life",
    name: "RE-LIFE",
    category: "Sviluppo web",
    stack: "Next.js / React / TypeScript",
    repo: "sitogpo",
    image: "",
    cover: "",
    description:
      "Una piattaforma e un business plan per dare una nuova vita ai mobili.",
    body: "Un progetto scolastico dedicato all’upcycling: sviluppo di una piattaforma web e di un business plan per recuperare, rigenerare e valorizzare mobili usati.",
    focus: ["Piattaforma web", "Economia circolare", "Business plan"],
  },
];
export type Project = (typeof projects)[number];
export const credentials = [
  {
    name: "Google AI Professional Certificate",
    issuer: "Google / Coursera",
    year: "2026",
    topic: "Intelligenza artificiale",
    url: "https://coursera.org/verify/professional-cert/LQSK7W3FKUQY",
  },
  {
    name: "DevOps, Cloud & Agile Foundations",
    issuer: "IBM / Coursera",
    year: "2026",
    topic: "Cloud e sviluppo software",
    url: "https://coursera.org/verify/specialization/GH5A85B9C4YZ",
  },
  {
    name: "Networking Basics",
    issuer: "Cisco / NetAcad",
    year: "2025",
    topic: "Reti e infrastrutture",
    url: "https://www.netacad.com/certificates?issuanceId=f486fe7f-c3de-42ae-85a6-80bae59dbe73",
  },
];
export const links = [
  {
    label: "Email",
    value: "rccialrnzo605@gmail.com",
    href: "mailto:rccialrnzo605@gmail.com",
    hint: "Per un progetto o una conversazione.",
  },
  {
    label: "GitHub",
    value: "St0rmosu",
    href: "https://github.com/St0rmosu",
    hint: "Il codice, gli esperimenti, i lavori in corso.",
  },
  {
    label: "LinkedIn",
    value: "Lorenzo Recchia",
    href: "https://www.linkedin.com/in/lorenzo-recchia-ba0093366/",
    hint: "Il mio percorso professionale.",
  },
];
export const pages = [
  { id: "profilo", label: "Profilo", icon: "profile" },
  { id: "progetti", label: "Progetti", icon: "code" },
  { id: "certificazioni", label: "Certificazioni", icon: "award" },
  { id: "contatti", label: "Contatti", icon: "mail" },
];
export const variants = [
  {
    id: "D",
    name: "Meridian",
    summary: "Un profilo tecnico, tutto tuo.",
    description:
      "Biografia e strumenti in due colonne, navigazione orizzontale e progetti da approfondire. Grafite, menta fredda e una composizione compatta.",
    traits: "Tecnico · Compatto · Ordinato",
    image: "/mockups/preview-D.jpg",
  },
  {
    id: "E",
    name: "Signal",
    summary: "Un’interfaccia personale da esplorare.",
    description:
      "Una composizione centrale con aree di interesse interattive, luce viola discreta e navigazione sul bordo inferiore.",
    traits: "Interattivo · Morbido · Raccolto",
    image: "/mockups/preview-E.jpg",
  },
  {
    id: "F",
    name: "Notes",
    summary: "Il tuo percorso, senza rumore.",
    description:
      "Un quaderno tecnico scuro: indice laterale, nome serif, competenze e progetti come note da aprire. Testuale, diretto, essenziale.",
    traits: "Personale · Testuale · Essenziale",
    image: "/mockups/preview-F.jpg",
  },
];
export const toolkit = [
  {
    name: "TypeScript",
    icon: "typescript",
    group: "Web",
    href: "https://www.typescriptlang.org/",
  },
  { name: "React", icon: "react", group: "Web", href: "https://react.dev/" },
  {
    name: "Next.js",
    icon: "nextdotjs",
    group: "Web",
    href: "https://nextjs.org/",
  },
  {
    name: "CSS",
    icon: "css",
    group: "Web",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Java",
    icon: "openjdk",
    group: "Software",
    href: "https://openjdk.org/",
  },
  {
    name: "Python",
    icon: "python",
    group: "Software",
    href: "https://www.python.org/",
  },
  {
    name: "Ollama",
    icon: "ollama",
    group: "Software",
    href: "https://ollama.com/",
  },
  { name: "Git", icon: "git", group: "Software", href: "https://git-scm.com/" },
  {
    name: "Linux",
    icon: "linux",
    group: "Sistemi",
    href: "https://kernel.org/",
  },
  {
    name: "Proxmox",
    icon: "proxmox",
    group: "Sistemi",
    href: "https://www.proxmox.com/",
  },
  {
    name: "Bash",
    icon: "gnubash",
    group: "Sistemi",
    href: "https://www.gnu.org/software/bash/",
  },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    group: "Sistemi",
    href: "https://www.postgresql.org/",
  },
];
