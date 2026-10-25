# Direzione visiva

Un laboratorio software aperto: un’identità personale riconoscibile, dal sistema all’interfaccia. L’apertura combina un titolo in tre battute con una mappa delle tecnologie selezionabile tra Sistemi, Web e AI. I progetti hanno più spazio della biografia e comunicano subito ambito, stack e motivazione.

## Sistema

- Cobalto `#2449e8`: identità e contatto finale.
- Carta fredda `#f8f9fb`: fondo del portfolio.
- Inchiostro `#17202c`: testo principale.
- Grigio `#566170`: informazioni secondarie.
- Menta `#c3f2d4`: indicatore di disponibilità.
- Manrope Variable: una famiglia locale per titoli, testo e controlli, con una scala tipografica distinta per ciascun ruolo.

Struttura: introduzione → tre progetti selezionati → profilo e competenze → formazione → contatto. Le colonne dei progetti sfalsate danno ritmo al desktop; su mobile diventano una sequenza unica. Allineamento a sinistra per contenuti e titoli, centrale soltanto per la mappa interattiva.

## Movimento

GSAP orchestra l’introduzione tipografica e risponde al cambio di area. Lenis è l’unico motore di smooth scroll e condivide il ticker con GSAP; gli aggiornamenti sono collegati a ScrollTrigger. È stato preferito a Locomotive perché questa pagina usa lo scorrimento nativo del documento e non richiede un contenitore di scorrimento dedicato.

Nessun WebGL/Three.js: la mappa è un diagramma semantico in HTML/CSS e non giustifica un renderer 3D. Nessun loop decorativo permanente, nessun cursore personalizzato, nessuna dipendenza dall’hover. Con movimento ridotto, GSAP e Lenis vengono esclusi e la mappa cambia senza animazione. Risorse e listener vengono rimossi allo smontaggio.

## Provenienza

Il repository `St0rmosu/Portfolio` alla revisione `9acb1cb8b37846c5cb70a3d01b51453e74040650` è la fonte dei soli dati personali, contatti e collegamenti alle certificazioni. Le descrizioni pubbliche dei repository GitHub di St0rmosu sono la fonte per la selezione dei progetti. Nessun componente, CSS, immagine, font, wallpaper o video della vecchia interfaccia è usato nella nuova pagina.

Le composizioni dei progetti sono studi grafici originali, esplicitamente indicati come tali: non screenshot dei prodotti. La mappa rappresenta interessi tecnologici, non valutazioni di competenza. Nessuna testimonianza, metrica di performance, collaborazione commerciale o riconoscimento è stato inventato. Il marchio `lr.` è un semplice nuovo monogramma tipografico. Le frecce seguono Solar Icons (licenza MIT). Il font Manrope è distribuito localmente tramite Fontsource (SIL Open Font License).

## Skill applicate

`build-awwwards-quality-sites`, `frontend-design`, `ui-ux-pro-max`, `ponytail` e `webapp-testing`. La ricerca iniziale di UI/UX Pro Max ha restituito un modello di documentazione non pertinente; la ricerca più specifica `personal portfolio projects` ha restituito una struttura narrativa adatta al portfolio. La composizione finale è stata adattata al lavoro reale di Lorenzo, con una sola famiglia tipografica e una palette originale.

## Verifica

Build di produzione Next.js, controllo TypeScript e quattro test Playwright: desktop, mobile, movimento ridotto e assenza di JavaScript. L’audit npm dopo l’aggiornamento delle dipendenze ha riportato zero vulnerabilità. La verifica automatica non equivale a una certificazione WCAG o a un audit legale. Nessun servizio di analytics, cookie di profilazione o form è stato aggiunto.
