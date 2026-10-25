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
    id: "G",
    name: "Kernel",
    summary: "Dentro il sistema.",
    description:
      "Nero e argento, tipografia condensata e una scultura digitale originale. Un’apertura ampia, con movimento al puntatore e un indice progetti essenziale.",
    traits: "Monumentale · Tecnico · Essenziale",
    image: "/mockups/preview-G.jpg",
  },
  {
    id: "H",
    name: "Trama",
    summary: "Il codice incontra la materia.",
    description:
      "Una composizione editoriale costruita intorno a un nastro tessile originale. Toni caldi, titoli serif e una storia legata al tuo lavoro con l’AI locale.",
    traits: "Editoriale · Materico · Personale",
    image: "/mockups/preview-H.jpg",
  },
  {
    id: "I",
    name: "Groove",
    summary: "Precisione digitale, sensibilità analogica.",
    description:
      "Un vinile come scena cinematografica, luce blu radente e identità ai bordi. L’ispirazione arriva dai tuoi interessi hi-fi, senza finti player o audio automatico.",
    traits: "Cinematografico · Immersivo · Hi-fi",
    image: "/mockups/preview-I.jpg",
  },
];
