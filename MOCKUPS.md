# Esplorazione con build-awwwards-quality-sites

Proposte G / Kernel, H / Trama, I / Groove. La domanda ancora aperta è quale identità possa rappresentare Lorenzo Recchia con più carattere. Le iterazioni precedenti non sono state approvate e restano nella cronologia del branch. Tutto il codice di questa esplorazione resta fuori da main.

## Skill e riferimenti

Skill principale: `build-awwwards-quality-sites`, affiancata da `frontend-design`, `imagegen` e dal workflow `prototype`. I siti indicati dall’utente, syswhite.dev e res.onance.dev, sono stati esaminati nelle iterazioni precedenti. Si conservano soltanto principi generali: leggibilità su fondo scuro, identità personale, navigazione semplice. Nessun testo, layout, codice o asset di quei siti viene copiato.

## Direzione prima dell’implementazione

### G — Kernel

Tesi visiva: un sistema costruito dall’interno. Un’immagine originale di una scultura concettuale in alluminio e grafite è il fulcro dell’apertura, con il nome in tipografia condensata e una composizione ampia, senza griglia di card.

Palette: nero `#080a0c`, argento `#e5e9ec`, grigio `#a0a6ac`, ciano ghiaccio `#c9e5f0`. Oswald per il display, Manrope per testo e controlli. Profilo → un accesso al lavoro in evidenza → collegamento al contatto. Le altre aree restano pagine autonome. Introduzione GSAP del nome e dell’immagine, risposta del poster al puntatore, indici progetto come righe grandi e leggibili.

### H — Trama

Tesi visiva: collegare codice e materia, partendo dall’esperienza reale di Lorenzo sull’analisi dei tessuti con AI locale. Una macro concettuale originale di un nastro tessile con fibre metalliche attraversa una composizione editoriale, con immagine dominante a sinistra e testo a destra.

Palette: carbone caldo `#181512`, avorio `#ece6dc`, rame `#bd9475`, secondario `#b6aaa0`. Georgia per i titoli, Manrope per il corpo. La fotografia concettuale introduce il tema, poi una breve biografia e l’accesso ai progetti. Movimento lento del materiale legato allo scorrimento, escluso con movimento ridotto. Nessuna somiglianza con un prodotto reale inventato: il visual è dichiarato concettuale.

### I — Groove

Tesi visiva: dal solco analogico alla precisione digitale, collegando gli interessi hi-fi e vinili dell’utente al suo lavoro sul software. Una fotografia concettuale originale di un vinile con luce radente blu diventa un fondale cinematografico, con identità e navigazione distribuite ai bordi.

Palette: indaco `#101724`, blu profondo `#142237`, bianco freddo `#e5edf6`, acciaio `#94b9d3`. Space Grotesk per i titoli, Manrope per il corpo. Apertura immersiva → tre accessi ai lavori come indice → contatto. Introduzione GSAP e risposta al puntatore del fondale, senza cursore personalizzato, finti player o audio automatico.

## Sistema di movimento e fallback

GSAP è l’unico sistema di animazione. Lenis è l’unico motore di smooth scroll: è già installato e lavora sul documento nativo, perciò evita il contenitore supplementare di Locomotive. L’integrazione con ScrollTrigger usa il ticker GSAP, con refresh dopo font e immagini. Componenti e listener vengono ripuliti allo smontaggio.

Nessun Three.js: le tre immagini concettuali hanno già la profondità necessaria; un renderer WebGL aggiungerebbe peso senza una responsabilità visiva distinta. Le immagini sono poster statici completi. Titoli, messaggio e CTA restano leggibili prima, durante e senza animazione. Sotto movimento ridotto non si inizializzano Lenis, scrub o effetti al puntatore.

## Struttura e contenuti

Profilo, Progetti, Certificazioni e Contatti hanno pagine distinte, con URL dedicati ai tre dettagli progetto. Dynamic Island, GALILEO e RE-LIFE sono gli unici progetti selezionati. hyprfm è un fork ed è escluso; il relativo URL deve restituire 404. Nessuna testimonianza, premio, cliente o metrica viene inventata.

## Provenienza delle immagini

Tre asset generati con lo strumento integrato imagegen, in modalità generazione originale: scultura di un modulo di sistema in alluminio (Kernel), nastro tessile con fibre in rame (Trama), vinile con luce radente blu (Groove). Non rappresentano prodotti effettivamente realizzati dall’utente. Le immagini dei progetti effettivi provengono soltanto dai repository dell’utente e vengono distinte dalle composizioni concettuali. Icone di interfaccia: Solar via Iconify. Nessun logo wall o avatar generato.

I prompt completi sono conservati in `public/mockups/art/PROVENANCE.md`, insieme ai percorsi degli asset finali.

## Apertura

`npm run mockups`, poi `/mockup`. Varianti: `?variant=G`, `?variant=H`, `?variant=I`. La barra di confronto conserva la pagina corrente; frecce della tastiera per cambiare proposta. Il selettore è abilitato in sviluppo e Vercel Preview, escluso dalla produzione.

## Verifiche eseguite

Le 21 pagine (sette per proposta) sono state aperte a 320 px, con una sola intestazione principale, parole dei titoli entro il viewport, immagini obbligatorie caricate e nessuno scorrimento orizzontale. Screenshot desktop delle home e degli indici progetto, più screenshot mobile delle home, sono stati esaminati visivamente.

Verificati: skip link e focus da tastiera, risposta additiva al puntatore, navigazione tra pagine e dettagli, cambio proposta mantenendo il dettaglio, frecce della tastiera, Indietro e rimozione del motore di scroll tornando al confronto. Per tutte le varianti sono stati verificati movimento ridotto (senza Lenis o trasformazioni al puntatore), JavaScript disattivato, poster statici e navigazione nativa. Il percorso del fork restituisce 404. Nessun errore JavaScript nei percorsi controllati.

È stato simulato il mancato caricamento dell’immagine principale: titolo, fallback e CTA restano utilizzabili. Il CTA primario di Kernel è entro il primo viewport a 375×812. Una demo browser delle tre proposte è esportata come `/tmp/portfolio-awwwards-motion.webm`; il confronto statico è `/tmp/portfolio-awwwards-comparison.jpg`.

Le icone Solar di 480 Design sono distribuite attraverso Iconify con licenza CC BY 4.0; la fonte, la licenza e l’uso in monocromia sono indicati nel footer, in `public/mockups/solar/ATTRIBUTION.txt` e nella provenienza degli asset.

Build di produzione e TypeScript completati. Dopo la verifica del codice di movimento, dodici schermate interne della build di produzione sono state riaperte senza avvisi GSAP per target mancanti o errori JavaScript.
