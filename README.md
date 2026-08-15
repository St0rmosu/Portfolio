# 🖥️ Lorenzo Recchia — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![anime.js](https://img.shields.io/badge/anime.js-v3.2-EE4B2B?style=for-the-badge&logo=anime&logoColor=white)](https://animejs.com)
[![GitHub REST API](https://img.shields.io/badge/GitHub%20API-v3-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)

Portfolio web moderno sviluppato con **Next.js 16** (App Router), **TypeScript** e **React 19**, ispirato all'ambiente desktop Linux/Hyprland con finestre modulari, dock interattivo e viewer documentale.

---

## 🚀 Caratteristiche Principali

- **Desktop Virtuale Modulare**: Finestre stile tiling window manager con controlli (`close`, `minimize`, `maximize`), resize handles e transizioni fluide.
- **Sistema Workspaces a 4 Aree**:
  - **WS 1 (`about`)**: Profilo, biografia, fotografia ad alta risoluzione con metadati EXIF e griglia interattiva delle tecnologie.
  - **WS 2 (`projects`)**: Elenco dinamico dei repository pubblici GitHub con statistiche live (stelle, fork, linguaggi, topic) e visualizzatore integrato di **README.md** e Keypoints.
  - **WS 3 (`certs`)**: Certificazioni professionali verificabili (Google, IBM, Cisco) con anteprima visiva, credenziali e download PDF.
  - **WS 4 (`contact`)**: Schede di contatto rapido (GitHub, LinkedIn, Email).
- **Mobile Dock Interattivo**: Barra inferiore con indicatore scorrevole a pillola fluido (`.end4-vws-slider`), layout a tutto schermo e orologio verticale.
- **Supporto GFM Completo**: Parser Markdown per i README con gestione di alert box (`[!NOTE]`, `[!WARNING]`, ecc.), tabelle responsive, blocchi codice con copia istantanea e accordion espandibili (`<details>`).
- **Piena Accessibilità & Tipografia**: Font *Google Sans Flex* e palette colori armoniosa con supporto temi e sfondi.

---

## 🛠️ Tecnologie Utilizzate

| Componente | Stack Tecnologico |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Linguaggio** | TypeScript 5 & React 19 |
| **Styling & Theming** | Vanilla CSS + Tailwind CSS v4 + CSS Custom Properties |
| **Animazioni** | anime.js + View Transitions API |
| **Markdown Engine** | marked (GFM compliant) |
| **API & Dati** | GitHub REST API v3 (con caching e fallback) |

---

## 🏃 Installazione & Sviluppo Locale

Prerequisiti: **Node.js 20+** e **npm**.

```bash
# 1. Clona il repository
git clone https://github.com/St0rmosu/Portfolio.git
cd Portfolio

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
# -> Visita http://localhost:3000

# 4. Compilazione di produzione
npm run build
```

---

## 📁 Struttura del Progetto

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

---

*Sviluppato con passione da Lorenzo Recchia ([St0rmosu](https://github.com/St0rmosu)).*
