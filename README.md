# Lorenzo Recchia — Portfolio

Portfolio in italiano, riprogettato da zero con un’identità blu cobalto, tipografia Manrope e una mappa interattiva degli interessi. I progetti, il profilo, le certificazioni verificabili e i contatti sono accessibili in un unico documento.

## Sviluppo

Richiede Node.js 20.9+.

```sh
npm ci
npm run dev
```

## Produzione e verifiche

```sh
npm run build
npm run start
npx playwright install chromium
npm test
```

I test avviano automaticamente il server di produzione sulla porta 3000, oppure riutilizzano quello già disponibile. Per utilizzare un browser Chromium già installato, impostare `PLAYWRIGHT_CHROMIUM_EXECUTABLE` al percorso dell’eseguibile.

Le verifiche coprono cambio dell’area di interesse, dettagli dei progetti, copia dell’email, navigazione da tastiera, menu mobile, larghezze da 320 a 1440 px, preferenze di movimento ridotto e contenuti senza JavaScript.

## Struttura

- `app/`: pagina, layout, metadati, favicon e stile responsive.
- `components/Portfolio.tsx`: contenuti e interazioni della nuova esperienza.
- `tests/portfolio.spec.ts`: verifiche browser dei percorsi principali.
- `DESIGN.md`: direzione visiva, provenienza dei contenuti e decisioni tecniche.

## Aggiornare i contenuti

Progetti, certificazioni e aree di interesse sono definiti all’inizio di `components/Portfolio.tsx`. Il rendering non dipende dalla disponibilità delle API GitHub: i collegamenti portano ai repository originali, dove consultare il codice aggiornato. I contatti sono link diretti, senza backend, form o raccolta di dati.

Il dominio canonico è `https://lollo.is-a.dev`, configurato in `app/layout.tsx`. Il progetto mantiene il supporto alla distribuzione Next.js/Vercel del repository originale.
