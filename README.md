# Lorenzo Recchia — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![anime.js](https://img.shields.io/badge/anime.js-v3.2-EE4B2B?style=for-the-badge&logo=anime&logoColor=white)](https://animejs.com)
[![GitHub REST API](https://img.shields.io/badge/GitHub%20API-v3-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)

Portfolio web in Next.js 16 (App Router), TypeScript e React 19, ispirato all'ambiente desktop Linux/Hyprland: finestre modulari, dock interattivo e viewer documentale.

## Caratteristiche principali

- **Desktop virtuale modulare**: finestre stile tiling window manager con controlli (`close`, `minimize`, `maximize`), resize handles e transizioni.
- **Sistema workspaces a 4 aree**:
  - **WS 1 (`about`)**: profilo, biografia, fotografia ad alta risoluzione con metadati EXIF e griglia interattiva delle tecnologie.
  - **WS 2 (`projects`)**: elenco dinamico dei repository pubblici GitHub con statistiche live (stelle, fork, linguaggi, topic) e visualizzatore integrato di README.md e Keypoints.
  - **WS 3 (`certs`)**: certificazioni verificabili (Google, IBM, Cisco) con anteprima, credenziali e download PDF.
  - **WS 4 (`contact`)**: schede di contatto rapido (GitHub, LinkedIn, Email).
- **Mobile dock interattivo**: barra inferiore con indicatore scorrevole a pillola fluido (`.end4-vws-slider`), layout a tutto schermo e orologio verticale.
- **Supporto GFM completo**: parser Markdown per i README con alert box (`[!NOTE]`, `[!WARNING]`, ecc.), tabelle responsive, blocchi codice con copia istantanea e accordion espandibili (`<details>`).
- **Accessibilità e tipografia**: font Google Sans Flex e palette colori con supporto per temi e sfondi.

## Tecnologie utilizzate

| Componente | Stack tecnologico |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Linguaggio** | TypeScript 5 & React 19 |
| **Styling & theming** | Vanilla CSS + Tailwind CSS v4 + CSS Custom Properties |
| **Animazioni** | anime.js + View Transitions API |
| **Markdown engine** | marked (GFM compliant) |
| **API & dati** | GitHub REST API v3 (con caching e fallback) |

## Installazione e sviluppo locale

Prerequisiti: Node.js 20+ e npm.

```bash
git clone https://github.com/St0rmosu/Portfolio.git
cd Portfolio
npm install
npm run dev
# -> Visita http://localhost:3000
npm run build
```

## Struttura del progetto

```
Portfolio/
├── app/                  # Layout globale, font Google Sans Flex, routing e CSS principale
│   ├── globals.css       # Design system, animazioni e stili responsive
│   ├── layout.tsx        # Root layout e metadati SEO
│   └── page.tsx          # Entrypoint desktop
├── components/           # Componenti React riutilizzabili
│   ├── Desktop.tsx       # Gestore dello stato desktop e finestre
│   ├── TopBar.tsx        # Dock di navigazione e sidebar con slider fluido
│   ├── Window.tsx        # Shell delle finestre con titlebar e resize
│   ├── MarkdownViewer.tsx# Renderizzatore Markdown per i README
│   └── wins/             # Contenuto dei 4 workspace (About, Projects, Certs, Contact)
├── lib/                  # Logica di business, tipi e API
│   ├── content.ts        # Dati statici, biografia, skill e certificati
│   ├── github.ts         # Integrazione GitHub REST API
│   └── projectDetails.ts # Keypoints e recupero README
└── public/               # Asset grafici, certificati PDF e wallpaper
```
