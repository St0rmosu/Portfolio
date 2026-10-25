# Portfolio: seconda esplorazione, guidata dai riferimenti

## Domanda di design

Tre nuove proposte multipagina per Lorenzo Recchia, dopo il rifiuto di Workspace, Studio e Archive. Le versioni precedenti restano nella cronologia del branch. Nessuna proposta è stata approvata e il prototipo resta fuori da main.

## Riferimenti osservati

Sono state aperte in Chromium le home di `https://syswhite.dev/` e `https://res.onance.dev/`, insieme alle loro pagine dei lavori e alla pagina contatti di Resonance. Gli screenshot sono stati esaminati come riferimento visivo.

Tratti condivisi utili: tema scuro, identità personale immediata, tecnologie visibili, navigazione compatta, pagine di lavoro e contatto dedicate. Non vengono riutilizzati codice, testi, loghi, immagini o composizioni dei siti di riferimento. Le credenziali e le esperienze dei riferimenti non appartengono a Lorenzo e non vengono riprese.

## Direzioni prima dell’implementazione

### D — Meridian

Un profilo tecnico compatto, leggibile come una scheda personale. Due colonne con biografia e strumenti, navigazione orizzontale e progetti come percorsi da aprire. Display in Space Grotesk e testo Manrope. Grafite `#10191c`, pannello `#182529`, bordo `#304347`, testo `#e5efed`, menta fredda `#b1dcd2`. Niente titolo pubblicitario a tutta pagina: il nome e le competenze sono il punto d’ingresso.

Schema: navigazione → identità a sinistra / strumenti a destra → progetto in evidenza → footer.

### E — Signal

Un’interfaccia centrale con identità e selettore delle aree di interesse. Il cambio di area rivela il contesto e gli strumenti effettivamente collegati, senza falsi dati live o controlli audio. La navigazione appartiene al bordo inferiore della composizione. Manrope, con proporzioni più morbide. Inchiostro viola `#181620`, fondo `#101116`, pannello `#24212d`, testo `#eeedf4`, lavanda `#cbbde8`. Luce di fondo direzionale, nessuna copia della palette giallo/viola del riferimento.

Schema: piccola testata → nome / area interattiva → tre accessi ai progetti → navigazione delle quattro pagine.

### F — Notes

Un quaderno tecnico scuro, più testuale e raccolto. Indice laterale essenziale, nome serif, biografia e competenze come righe di lettura, progetti come note da approfondire. Georgia per il nome, Manrope per testo e interfaccia. Ardesia `#1a242c`, fondo `#141c23`, testo `#e9e8df`, secondario `#abb7bf`, rame chiaro `#d2b29a`. Nessuna card decorativa o pannello da desktop simulato.

Schema: indice laterale / documento personale → competenze raggruppate → percorso; ogni voce apre una pagina reale.

## Revisione rispetto al brief

Le proposte condividono l’atmosfera scura e il carattere tecnico dei riferimenti, ma cambiano struttura, gerarchia, tipografia e navigazione. Nessuna è una riproduzione delle loro home. La matrice degli strumenti di Meridian è più compatta e raggruppata; Signal usa una selezione interattiva delle aree; Notes privilegia la lettura. Il modello suggerito dalla ricerca UI/UX Pro Max (narrazione con scroll) non viene adottato perché non rispetta la richiesta di pagine separate.

## Contenuti e vincoli

Profilo, Progetti, Certificazioni e Contatti sono pagine distinte; ciascun progetto ha un dettaglio con URL dedicato. Sono presenti Dynamic Island, GALILEO e RE-LIFE. hyprfm è un fork ed è escluso da ogni proposta. Niente testimonianze, metriche, premi o collaborazioni inventati.

Contenuti personali e credenziali provengono dal portfolio pubblico di Lorenzo. Fotografia personale e screenshot dei progetti sono dell’utente, già presenti nel prototipo. Le icone tecnologiche sono di Simple Icons, distribuite dal CDN del progetto, con i rispettivi nomi accanto. Non è stato preso alcun asset dai due siti di riferimento.

## Apertura

`npm run mockups`, poi `http://localhost:3001/mockup`. Le varianti sono condivisibili con `?variant=D`, `?variant=E` e `?variant=F`. La barra di confronto mantiene la pagina corrente; i tasti freccia scorrono tra le tre proposte. Il selettore è disponibile in sviluppo e nelle Vercel Preview, e viene escluso dalla produzione.

## Verifiche

Le sette pagine di ogni variante (21 in totale) sono state aperte a 320 px: nessuno scorrimento orizzontale, immagini caricate e una sola intestazione principale. Le pagine dei progetti sono state controllate anche a 1440 px. Gli screenshot delle home sono stati esaminati su desktop e telefono.

Verificati il selettore Web/Linux/AI di Signal con il collegamento al progetto relativo, i collegamenti delle pagine, il cambio di variante mantenendo il dettaglio progetto, le frecce della tastiera, il tasto Indietro e la modalità movimento ridotto. Nessun errore JavaScript nei percorsi controllati. Il percorso di hyprfm restituisce 404.

Build di produzione Next.js e TypeScript completati dopo la revisione visiva finale.
