# Portfolio — Desktop a finestre stile Tiling WM

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub API](https://img.shields.io/badge/GitHub%20API-v3-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)

Portfolio personale che simula un ambiente desktop a finestre con tiling automatico, ispirato all'estetica di Linux e Hyprland. Un'unica pagina web che raggruppa profilo, progetti, certificazioni, articoli e contatti in un'interfaccia a desktop virtuale, con caricamento dinamico delle repo GitHub.

## Caratteristiche

- **Desktop virtuale**: finestre trascinabili, ridimensionabili (8 maniglie) e con tiling automatico.
- **Sistema di workspace**: 4 workspace separati, barra superiore con orologio e navigazione.
- **Integrazione GitHub**: griglia di progetti caricata dinamicamente dall'API REST di GitHub con ordinamento per stelle/forks e filtri intelligenti.
- **Personalizzazione**: 8 colori accent, 8 sfondi (inclusa la palette Catppuccin) e regolazione di sfocatura/luminosità del wallpaper.
- **Contenuti integrati**: sezione `about`, neofetch, certificazioni verificabili (Google, IBM, Cisco), blog tecnico statico e scheda contatti.
- **Mobile responsive**: layout adattato tramite media query e View Transitions API.

## Tech Stack

| Tecnologia | Ruolo |
|---|---|
| HTML5 | Struttura e semantica della singola pagina |
| CSS3 (Custom Properties) | Sistema di theming dinamico via variabili CSS |
| JavaScript ES6+ | Motore di tiling personalizzato e gestione del desktop |
| GitHub REST API v3 | Caricamento dinamico delle repository |
| anime.js (CDN) | Animazioni fluide delle finestre |
| View Transitions API | Transizioni tra i workspace |
| Google Fonts | Tipografia (Share Tech Mono, JetBrains Mono) |

## Architettura

L'applicazione è un **single-page application** contenuta in un unico file `index.html`. Tutti gli stati (finestre, workspace, temi) sono gestiti da un insieme di componenti JavaScript che operano sul DOM:

```
                    ┌─────────────────────────────────────┐
                    │            index.html               │
                    ├─────────────────────────────────────┤
                    │  #topbar  (logo · workspace · clock)│
                    │  #desktop ── #left-box + workspace  │
                    │  #tray    (finestre minimizzate)    │
                    └───────────────┬─────────────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
      ┌──────────────┐    ┌─────────────────┐   ┌─────────────────┐
      │ TilingEngine │    │ ThemeEngine     │   │ GitHubLoader    │
      │ · add/close  │    │ · palette       │   │ · fetch repos   │
      │ · resize     │    │ · wallpaper     │   │ · filtri/sort   │
      │ · retile     │    │ · blur/bright   │   │ · fallback      │
      └──────────────┘    └─────────────────┘   └─────────────────┘
                                    │                     │
                                    ▼                     ▼
                              CSS Variables        api.github.com
```

Il `GitHubLoader` interroga l'API pubblica di GitHub (senza token), applica i filtri (esclusione di repo come `register` e `St0rmosu`), ordina i risultati e li renderizza come card di progetto. In caso di errore o timeout usa un fallback statico.

## Project Structure

```
Portfolio/
├── index.html          # Unica pagina: stile, struttura e motore JS
├── portfolio-current.png  # Screenshot dell'interfaccia
└── README.md
```

`index.html` è organizzato in sezioni logiche:

| Sezione | Responsabilità |
|---|---|
| `<style>` | Design system, palette, layout desktop/mobile |
| `HTML` object | Template delle finestre (profile, projects, certs, blog, contact) |
| Tiling engine | `addWin`, `closeWin`, `retile`, resize a 8 direzioni |
| Workspace system | `switchWs` con View Transitions, contenitori per workspace |
| Theme engine | `ACCENTS` / `BGS` applicati come CSS variables |
| GitHub loader | Fetch con timeout (`AbortController`) e cache in memoria |

## Installation & Setup

Prerequisiti: un browser moderno (Chrome, Firefox, Edge). Non è richiesto alcun server.

```bash
git clone https://github.com/St0rmosu/Portfolio.git
cd Portfolio
# apri index.html direttamente nel browser, oppure
python3 -m http.server 8080
```

La modalità dinamica dei progetti usa l'API pubblica di GitHub e funziona da `file://`; senza rete, la griglia progetti mostra un fallback statico.

## Usage

1. Apri `index.html` nel browser: compare un desktop con wallpaper e barra superiore.
2. Usa le pill della **topbar** per cambiare workspace (1-4).
3. Clicca **contents** nel menu laterale per aprire About, Projects, Certificazioni, Contact.
4. Trascina le finestre per la barra del titolo, ridimensionale dagli angoli, minimizzale/massimizzale.
5. In **Projects** i progetti GitHub vengono caricati e ordinati automaticamente per stelle.
6. Usa la palette per cambiare colori accent, sfondo e luminosità.

## Screenshots / Demo

![Portfolio](portfolio-current.png)

Demo live: [st0rmosu.github.io/Portfolio](https://st0rmosu.github.io/Portfolio)

## API Documentation

L'unica integrazione esterna è la GitHub REST API v3, usata in sola lettura:

| Endpoint | Uso |
|---|---|
| `GET https://api.github.com/users/St0rmosu/repos?per_page=100&sort=updated` | Elenco repository pubbliche |

Parametri di query: `per_page=100` (massimo), `sort=updated`. La risposta JSON viene filtrata (esclusione di `register` e `St0rmosu`), ordinata per stelle → forks → dimensione e mappata in card con linguaggio primario, descrizione, stelle, forks, topic e lingue secondarie (override manuale per `dots-hyprland`). Timeout di 8 secondi tramite `AbortController`; in caso di errore vengono renderizzate card statiche di fallback.

## Engineering Decisions

- **Single-file architecture**: l'intera applicazione (HTML/CSS/JS) è in un solo file. Zero build step, caricamento istantaneo, facile hosting su GitHub Pages. Il compromesso è un file di ~500 KB dovuto alle immagini base64 incorporate.
- **Tiling engine custom**: il motore di tiling è scritto a mano invece di usare librerie esistenti, dando controllo totale su layout e animazioni a fronte di più codice da mantenere.
- **Theming via CSS variables**: i temi dinamici (accents/sfondi) si applicano ridefinendo le variabili CSS, evitando re-render e selettori complessi.
- **GitHub API senza autenticazione**: nessun token lato client, quindi nessun segreto da gestire; il limite rate limit di 60 richieste/ora è più che sufficiente per l'uso personale.
- **Fallback statico**: in assenza di rete la pagina resta completamente funzionale grazie a contenuti e card di backup incorporate.

## Testing

Progetto a rendering client-side, testato manualmente:

- Apertura/tiling/resize/drag di finestre in browser Chromium e Firefox.
- Cambio workspace con View Transitions API.
- Rotazione delle 64 combinazioni palette/sfondo e regolazione blur/luminosità.
- Caricamento griglia progetti con e senza connessione (verifica del fallback).
- Layout responsive su viewport desktop (1440px) e mobile (390px).

## Limitations & Future Improvements

- Il fallback statico delle repo può diventare obsoleto rispetto all'API (card manuali).
- Le immagini incorporate in base64 gonfiano il file; un refactor in asset separati ridurrebbe il peso.
- I post del blog sono statici e richiedono modifica manuale del file.
- Non c'è accessibilità completa (focus trap nelle finestre, aria-live sugli stati).
- Prossimi passi: separare CSS/JS in file modulari, caricamento lazy delle sezioni, supporto drag-and-drop tra workspace, tema chiaro/scuro automatico.

---

*Sviluppato da Lorenzo Recchia.*
