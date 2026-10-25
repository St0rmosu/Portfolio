# Tre direzioni per un portfolio multipagina

Domanda aperta: quale identità e quale struttura si avvicinano al portfolio desiderato? La proposta precedente, su un’unica pagina blu cobalto, non è stata approvata. Questi prototipi servono a confrontare tre alternative prima di implementare la direzione scelta.

## Aprire i prototipi

```sh
npm run mockups
```

Aprire `http://localhost:3001/mockup`. La schermata di confronto collega le tre proposte. Ogni mockup ha pagine distinte per profilo, progetti, certificazioni e contatti, più quattro pagine di dettaglio dei progetti.

- A / Workspace: `/mockup?variant=A`
- B / Studio: `/mockup?variant=B`
- C / Archive: `/mockup?variant=C`

Il selettore mantiene la pagina corrente quando si passa da una direzione all’altra. Le frecce della tastiera scorrono tra le varianti. La variante è conservata nell’URL; il browser supporta ricaricamento, collegamenti diretti e navigazione indietro.

Il confronto è visibile in sviluppo e nei deploy Vercel Preview. Per provarlo con un server locale di produzione usare `MOCKUP_REVIEW=1 npm run start -- --port 3001`. Il selettore non è abilitato nel deploy di produzione.

## Cosa è stato osservato nel sito attuale

`https://lollo.is-a.dev` è stato aperto in Chromium. Il portfolio è organizzato in quattro workspace distinti: About, Projects, Certificazioni e Contact. La pagina iniziale presenta identità, biografia, foto e competenze. Il codice pubblico conferma il cambio dei workspace e i dettagli interni dei progetti e delle certificazioni.

L’elemento da preservare è la separazione delle aree, con navigazione sempre riconoscibile. In questi mockup la separazione è tradotta in pagine con URL dedicati, invece di raccogliere tutto in una lunga landing page.

## Le proposte

### A — Workspace

Pannelli opachi, frame del documento, indice laterale e informazioni compatte. Famiglia Manrope, fondo antracite blu `#11131b`, pannelli `#1a1d28`, testo `#ececf3`, lavanda `#c2aff6`. I progetti usano un elenco da esplorare. La pagina profilo presenta subito nome, ruolo e contesto. È la direzione più vicina al linguaggio informatico del portfolio attuale, con una diversa gerarchia e senza ricopiare il gestore delle finestre.

### B — Studio

Indice da taccuino, ritratto, titoli serif e spazi più aperti. Georgia per il display, Manrope per i contenuti, fondo bianco, carta lilla `#f7f6fa`, testo prugna `#322b3c`, accento `#796482`. Il portfolio dà priorità alla persona e al percorso; le pagine progetto hanno una lettura più narrativa.

### C — Archive

Indice orizzontale, grandi titoli e screenshot protagonisti. Space Grotesk locale, fondo grafite `#191a1c`, testo argento `#e6e5e1`, metallo caldo `#c5b9a6`. La homepage è un ingresso nell’archivio dei lavori; i dettagli hanno un’immagine ampia e il contesto del progetto.

## Fonti e immagini

Contenuti personali, collegamenti e credenziali: portfolio pubblico di Lorenzo Recchia / St0rmosu. La fotografia è quella dell’utente già pubblicata nel repository originale, usata come contenuto personale per confrontare i layout.

Screenshot originali dei progetti:

- `St0rmosu/dynamic-island-hyprland`, `assets/screenshots/full_desktop.png` e `assets/screenshots/control_center.png`.
- `St0rmosu/hyprfm`, `docs/screenshots/grid-view.png`.

Le due immagini di Dynamic Island sono presentate insieme come collage di screenshot. Per GALILEO e RE-LIFE sono usate composizioni esclusivamente tipografiche, senza fingere schermate delle applicazioni. Le miniature `public/mockups/preview-*.jpg` sono catture browser dei prototipi stessi.

## Stato

Tre proposte esplorative sul branch `prototype/portfolio-directions`. Nessuna scelta è stata consolidata. Il prossimo passo dipende dal confronto dell’utente: scegliere una direzione o indicare quali elementi combinare. Il codice del prototipo resta fuori da main.

## Verifiche eseguite

- Build di produzione Next.js e controllo TypeScript.
- Apertura delle otto pagine per ciascuna proposta, con verifica delle immagini e dell’assenza di scorrimento orizzontale a 320 px.
- Catture dei layout desktop e mobile, controllate visivamente.
- Cambio variante mantenendo il dettaglio progetto, navigazione con le frecce e tasto Indietro del browser.
- Schermata di confronto con tre miniature caricate e nessun errore JavaScript nei percorsi controllati.
