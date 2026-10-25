"use client";
/* Prototype: three complete multi-page directions, switchable with ?variant=A|B|C.
   The design decision is intentionally pending the user's comparison. */
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  credentials,
  links,
  pages,
  projects,
  variants,
  type Project,
} from "./data";

type Variant = "A" | "B" | "C";
type Props = {
  variant: Variant;
  page: string;
  slug?: string;
  overview: boolean;
  reviewMode: boolean;
};
const href = (page: string, variant: Variant, slug?: string) =>
  `/mockup/${page}${slug ? `/${slug}` : ""}?variant=${variant}`;

function Icon({
  name = "arrow",
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: <path d="M7 17 17 7M7 7h10v10" />,
    profile: (
      <>
        <circle cx="12" cy="8" r="3.3" />
        <path d="M5 20v-2a7 7 0 0 1 14 0v2" />
      </>
    ),
    code: (
      <>
        <path d="m7 7-5 5 5 5m10-10 5 5-5 5m-3-13-4 16" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8 12-1 9 5-3 5 3-1-9" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    folder: (
      <path d="M3 8V5a2 2 0 0 1 2-2h5l3 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
    ),
  };
  return (
    <svg
      className={`m-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
function Nav({ variant, page }: { variant: Variant; page: string }) {
  return (
    <nav className="m-nav" aria-label="Pagine del portfolio">
      {pages.map((p) => (
        <Link
          href={href(p.id, variant)}
          key={p.id}
          aria-current={page === p.id ? "page" : undefined}
        >
          <Icon name={p.icon} />
          <span>
            {variant === "C" && p.id === "profilo" ? "Indice" : p.label}
          </span>
          <span className="m-nav-trail">
            {variant === "A" ? `${pages.indexOf(p) + 1}` : "↗"}
          </span>
        </Link>
      ))}
    </nav>
  );
}
function Portrait({ className = "" }: { className?: string }) {
  // The subject's own photograph, from the original portfolio's public/photo.jpg.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      className={`m-portrait ${className}`}
      src="/mockups/lorenzo.jpg"
      alt="Lorenzo Recchia"
      width="480"
      height="720"
    />
  );
}
function ProjectMedia({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div className={`m-project-media ${project.slug} ${className}`}>
      {project.image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-product-screen"
            src={project.cover}
            alt={`Screenshot di ${project.name}`}
            width={project.slug === "hyprfm" ? 2048 : 1920}
            height={project.slug === "hyprfm" ? 1221 : 1080}
          />
          {project.slug === "dynamic-island" && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="m-control-screen"
                src={project.image}
                alt="Il centro di controllo di Dynamic Island"
                width="480"
                height="560"
              />
            </>
          )}
        </>
      ) : (
        <div
          className="m-project-specimen"
          aria-label={`Composizione tipografica di ${project.name}`}
        >
          <span>
            {project.slug === "galileo"
              ? "Java + modelli locali"
              : "Una seconda vita alle cose."}
          </span>
          <strong>{project.name}</strong>
          <small>
            {project.category} / {project.stack}
          </small>
        </div>
      )}
    </div>
  );
}
function Credentials() {
  return (
    <div className="m-credentials">
      {credentials.map((c) => (
        <a key={c.name} href={c.url} target="_blank" rel="noreferrer">
          <span className="m-cert-symbol">
            <Icon name="award" />
          </span>
          <div>
            <span className="m-cert-issuer">{c.issuer}</span>
            <h2>{c.name}</h2>
            <p>{c.topic}</p>
          </div>
          <span className="m-cert-end">
            {c.year}
            <Icon name="external" />
          </span>
        </a>
      ))}
    </div>
  );
}
function Contacts() {
  return (
    <div className="m-contacts">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.label === "Email" ? undefined : "_blank"}
          rel={l.label === "Email" ? undefined : "noreferrer"}
        >
          <span className="m-contact-label">{l.label}</span>
          <div>
            <strong>{l.value}</strong>
            <p>{l.hint}</p>
          </div>
          <Icon name="external" />
        </a>
      ))}
    </div>
  );
}
function Detail({ project, variant }: { project: Project; variant: Variant }) {
  return (
    <div className="m-detail">
      <Link className="m-back" href={href("progetti", variant)}>
        ← Tutti i progetti
      </Link>
      <div className="m-detail-heading">
        <div>
          <p className="m-page-kicker">{project.category}</p>
          <h1>{project.name}</h1>
        </div>
        <a
          className="m-action"
          href={`https://github.com/St0rmosu/${project.repo}`}
          target="_blank"
          rel="noreferrer"
        >
          Codice su GitHub <Icon name="external" />
        </a>
      </div>
      <ProjectMedia project={project} />
      <div className="m-detail-body">
        <div>
          <span className="m-small-label">Il progetto</span>
          <p>{project.body}</p>
        </div>
        <div>
          <span className="m-small-label">Tecnologie</span>
          <p>{project.stack}</p>
          <ul>
            {project.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="m-source-note">
        {project.image
          ? "Screenshot originali dal repository del progetto."
          : "Composizione tipografica dimostrativa del progetto."}
      </p>
    </div>
  );
}

function Workspace({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="m-workspace">
      <header className="w-topbar">
        <Link href={href("profilo", "A")} className="w-brand">
          <span className="w-brand-mark">lr</span>Lorenzo’s workspace
        </Link>
        <span className="w-top-center">Software, sistemi e curiosità.</span>
        <a href="https://github.com/St0rmosu" target="_blank" rel="noreferrer">
          St0rmosu <Icon name="external" />
        </a>
      </header>
      <div className="w-layout">
        <aside className="w-sidebar">
          <div className="w-identity">
            <Portrait />
            <strong>Lorenzo Recchia</strong>
            <span>Software developer</span>
            <p>
              <i /> Disponibile per collaborare
            </p>
          </div>
          <span className="w-sidebar-label">Il mio spazio</span>
          <Nav variant="A" page={page} />
          <div className="w-sidebar-bottom">
            <span>Putignano, Italia</span>
            <a href="mailto:rccialrnzo605@gmail.com">
              Scrivimi <Icon name="mail" />
            </a>
          </div>
        </aside>
        <main className="w-main" id="mockup-content">
          <div className="w-breadcrumb">
            <span>portfolio</span>
            <span>/</span>
            <b>
              {page}
              {project ? ` / ${project.slug}` : ""}
            </b>
            <span className="w-file-type">.md</span>
          </div>
          <div className="w-window">
            <div className="w-window-bar">
              <span>
                <i />
                <i />
                <i />
              </span>
              <span>
                {project
                  ? project.name
                  : pages.find((p) => p.id === page)?.label}
              </span>
              <span className="w-window-indicator" />
            </div>
            <div className="w-window-body">
              {project ? (
                <Detail project={project} variant="A" />
              ) : page === "profilo" ? (
                <>
                  <div className="w-intro">
                    <div>
                      <p className="m-page-kicker">
                        Software developer / St0rmosu
                      </p>
                      <h1>
                        Ciao, sono
                        <br />
                        <em>Lorenzo.</em>
                      </h1>
                      <p className="w-intro-text">
                        Sviluppo applicazioni web e desktop.
                        <br />
                        Con Linux mi sento a casa.
                      </p>
                      <Link className="m-action" href={href("progetti", "A")}>
                        Apri i progetti <Icon name="arrow" />
                      </Link>
                    </div>
                    <div className="w-profile-photo">
                      <Portrait />
                      <span>Fuori dallo schermo, ogni tanto.</span>
                    </div>
                  </div>
                  <div className="w-bottom-grid">
                    <div className="w-terminal">
                      <span className="w-module-title">
                        <i /> about.txt
                      </span>
                      <p>
                        Diplomato in Informatica e Telecomunicazioni. Ho
                        lavorato all’analisi dei tessuti con AI locale durante
                        il tirocinio in Galileo Italia.
                      </p>
                      <div className="w-terminal-line">
                        <span>~/interessi</span> homelab · vinili · F1
                      </div>
                    </div>
                    <Link
                      className="w-featured"
                      href={href("progetti", "A", "dynamic-island")}
                    >
                      <span className="w-module-title">
                        Dal mio laboratorio <Icon name="external" />
                      </span>
                      <ProjectMedia project={projects[0]} />
                      <strong>
                        Dynamic Island <span>Linux / Quickshell</span>
                      </strong>
                    </Link>
                  </div>
                  <div className="w-stack">
                    <span>Nel mio toolkit</span>
                    <p>
                      TypeScript <b>/</b> React <b>/</b> Java <b>/</b> Python{" "}
                      <b>/</b> Linux <b>/</b> Proxmox
                    </p>
                  </div>
                </>
              ) : page === "progetti" ? (
                <>
                  <div className="w-page-heading">
                    <p className="m-page-kicker">Il laboratorio</p>
                    <h1>Progetti aperti.</h1>
                    <p>
                      Strumenti che uso, idee che esploro, codice che condivido.
                    </p>
                  </div>
                  <div className="w-project-list">
                    {projects.map((p) => (
                      <Link key={p.slug} href={href("progetti", "A", p.slug)}>
                        <span className="w-project-file">
                          <Icon name="folder" />
                        </span>
                        <div>
                          <h2>{p.name}</h2>
                          <p>{p.description}</p>
                        </div>
                        <span className="w-project-type">{p.category}</span>
                        <Icon name="external" />
                      </Link>
                    ))}
                  </div>
                  <div className="w-project-preview">
                    <ProjectMedia project={projects[1]} />
                    <p>
                      hyprfm
                      <br />
                      <span>Un file manager, pensato per Hyprland.</span>
                    </p>
                  </div>
                </>
              ) : page === "certificazioni" ? (
                <>
                  <div className="w-page-heading">
                    <p className="m-page-kicker">Studio e formazione</p>
                    <h1>
                      Non si smette
                      <br />
                      di imparare.
                    </h1>
                    <p>
                      AI, cloud e reti: percorsi che aggiungono nuove
                      prospettive.
                    </p>
                  </div>
                  <Credentials />
                  <div className="w-education">
                    <span>2026</span>
                    <div>
                      <h2>Diploma in Informatica e Telecomunicazioni</h2>
                      <p>IISS Luigi Dell’Erba</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-page-heading">
                    <p className="m-page-kicker">Una nuova connessione</p>
                    <h1>Parliamone.</h1>
                    <p>
                      Un progetto, una domanda o un’idea da mettere alla prova.
                    </p>
                  </div>
                  <Contacts />
                  <div className="w-contact-note">
                    <span className="w-prompt">lorenzo@portfolio:~$</span>
                    <p>
                      La prossima conversazione può iniziare qui.
                      <span className="w-caret" />
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <footer className="w-statusbar">
            <span>
              <i /> Tutto parte dalla curiosità.
            </span>
            <span>Italiano / English B2</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Studio({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="m-studio">
      <aside className="s-sidebar">
        <Link className="s-name" href={href("profilo", "B")}>
          Lorenzo
          <br />
          Recchia<span>.</span>
        </Link>
        <p>
          Sviluppatore software
          <br />& persona curiosa.
        </p>
        <Nav variant="B" page={page} />
        <div className="s-sidebar-bottom">
          <span>Putignano, Italia</span>
          <a
            href="https://github.com/St0rmosu"
            target="_blank"
            rel="noreferrer"
          >
            GitHub / St0rmosu <Icon name="external" />
          </a>
          <span className="s-open">
            <i /> Aperto a nuove idee
          </span>
        </div>
      </aside>
      <div className="s-main">
        <header className="s-topline">
          <span>Uno spazio personale, sul web.</span>
          <a href="mailto:rccialrnzo605@gmail.com">
            Facciamo due parole <Icon name="external" />
          </a>
        </header>
        <main id="mockup-content">
          {project ? (
            <Detail project={project} variant="B" />
          ) : page === "profilo" ? (
            <>
              <div className="s-intro">
                <div className="s-intro-copy">
                  <span className="s-hello">Piacere di conoscerti.</span>
                  <h1>
                    Una mente
                    <br />
                    curiosa.
                    <br />
                    <em>
                      Le mani
                      <br />
                      nel codice.
                    </em>
                  </h1>
                  <p>
                    Sono Lorenzo, sviluppo software e mi piace capire come
                    funzionano le cose. Dalle interfacce web ai sistemi che le
                    fanno girare.
                  </p>
                  <Link className="s-text-link" href={href("progetti", "B")}>
                    Conosci i miei progetti <Icon name="arrow" />
                  </Link>
                </div>
                <figure className="s-photo">
                  <Portrait />
                  <figcaption>Io, quando chiudo il portatile.</figcaption>
                </figure>
              </div>
              <div className="s-profile-notes">
                <div>
                  <span>Da dove parto</span>
                  <p>
                    Un diploma in Informatica e Telecomunicazioni e un tirocinio
                    in Galileo Italia, lavorando con Java e modelli AI locali.
                  </p>
                </div>
                <div>
                  <span>Cosa mi incuriosisce</span>
                  <p>
                    Il web, Linux e il mio homelab Proxmox. Nel tempo libero:
                    vinili, hi-fi e Formula 1.
                  </p>
                </div>
              </div>
              <Link className="s-next-page" href={href("progetti", "B")}>
                <span>Il codice racconta il resto.</span>
                <span>
                  Esplora i progetti <Icon name="external" />
                </span>
              </Link>
            </>
          ) : page === "progetti" ? (
            <>
              <div className="s-page-heading">
                <span className="m-page-kicker">
                  Dagli esperimenti alle applicazioni
                </span>
                <h1>
                  Qualcosa
                  <br />
                  <em>di concreto.</em>
                </h1>
                <p>
                  Una selezione di progetti tra sviluppo web, desktop e
                  intelligenza artificiale.
                </p>
              </div>
              <div className="s-project-list">
                {projects.map((p) => (
                  <Link key={p.slug} href={href("progetti", "B", p.slug)}>
                    <div className="s-project-caption">
                      <div>
                        <span>{p.category}</span>
                        <h2>{p.name}</h2>
                        <p>{p.description}</p>
                      </div>
                      <Icon name="external" />
                    </div>
                    <ProjectMedia project={p} />
                  </Link>
                ))}
              </div>
            </>
          ) : page === "certificazioni" ? (
            <>
              <div className="s-page-heading">
                <span className="m-page-kicker">Il mio percorso</span>
                <h1>
                  La curiosità
                  <br />
                  <em>si coltiva.</em>
                </h1>
                <p>
                  Le certificazioni che accompagnano quello che imparo sul
                  campo.
                </p>
              </div>
              <Credentials />
              <div className="s-education">
                <span>La formazione di base</span>
                <h2>Informatica e Telecomunicazioni</h2>
                <p>IISS Luigi Dell’Erba / Diploma 2026</p>
              </div>
            </>
          ) : (
            <>
              <div className="s-page-heading">
                <span className="m-page-kicker">
                  Una conversazione, per iniziare
                </span>
                <h1>
                  Le idee belle
                  <br />
                  <em>si condividono.</em>
                </h1>
                <p>
                  Se vuoi parlare di un progetto o semplicemente scambiare due
                  parole, mi trovi qui.
                </p>
              </div>
              <Contacts />
              <p className="s-signature">
                A presto,
                <br />
                <span>Lorenzo.</span>
              </p>
            </>
          )}
        </main>
        <footer className="s-footer">
          <span>Fatto con curiosità, da Lorenzo Recchia.</span>
          <Link href={href("contatti", "B")}>
            Restiamo in contatto <Icon name="external" />
          </Link>
        </footer>
      </div>
    </div>
  );
}

function Archive({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="m-archive">
      <header className="r-header">
        <Link className="r-logo" href={href("profilo", "C")}>
          Lorenzo Recchia<span>Software developer</span>
        </Link>
        <Nav variant="C" page={page} />
        <a
          className="r-github"
          href="https://github.com/St0rmosu"
          target="_blank"
          rel="noreferrer"
        >
          St0rmosu <Icon name="external" />
        </a>
      </header>
      <main id="mockup-content" className="r-main">
        {project ? (
          <Detail project={project} variant="C" />
        ) : page === "profilo" ? (
          <>
            <div className="r-intro-top">
              <span>Web. Desktop. Sistemi.</span>
              <span className="r-available">
                <i /> Disponibile per nuove collaborazioni
              </span>
            </div>
            <div className="r-intro">
              <h1>
                Dentro
                <br />
                il software.
              </h1>
              <div className="r-intro-bio">
                <Portrait />
                <p>
                  Sono Lorenzo Recchia.
                  <br />
                  Costruisco applicazioni, esploro Linux e cerco sempre qualcosa
                  da capire.
                </p>
                <Link href={href("contatti", "C")}>
                  Conosciamoci <Icon name="external" />
                </Link>
              </div>
            </div>
            <Link
              className="r-feature"
              href={href("progetti", "C", "dynamic-island")}
            >
              <div className="r-feature-copy">
                <span>Dal mio laboratorio</span>
                <h2>
                  Il desktop,
                  <br />
                  ripensato.
                </h2>
                <p>Dynamic Island per Hyprland</p>
                <span className="r-project-go">
                  Entra nel progetto <Icon name="external" />
                </span>
              </div>
              <ProjectMedia project={projects[0]} />
            </Link>
            <div className="r-index-bottom">
              <span>
                Sviluppo per imparare.
                <br />
                Condivido per crescere.
              </span>
              <Link href={href("progetti", "C")}>
                L’archivio dei progetti <Icon name="external" />
              </Link>
            </div>
          </>
        ) : page === "progetti" ? (
          <>
            <div className="r-page-heading">
              <div>
                <span className="m-page-kicker">
                  Esperimenti in corso, idee che funzionano.
                </span>
                <h1>
                  Progetti
                  <br />
                  in vista.
                </h1>
              </div>
              <p>
                Dal desktop al browser.
                <br />
                Il codice è sempre aperto.
              </p>
            </div>
            <div className="r-project-gallery">
              {projects.map((p) => (
                <Link key={p.slug} href={href("progetti", "C", p.slug)}>
                  <ProjectMedia project={p} />
                  <div>
                    <span>{p.category}</span>
                    <h2>{p.name}</h2>
                    <Icon name="external" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : page === "certificazioni" ? (
          <>
            <div className="r-page-heading">
              <div>
                <span className="m-page-kicker">
                  Formazione, senza punto finale.
                </span>
                <h1>
                  Nuove
                  <br />
                  prospettive.
                </h1>
              </div>
              <p>
                AI, cloud, reti.
                <br />
                Percorsi verificabili.
              </p>
            </div>
            <Credentials />
            <div className="r-education">
              <span>Il punto di partenza / 2026</span>
              <h2>
                Informatica e<br />
                Telecomunicazioni.
              </h2>
              <p>Diploma tecnico / IISS Luigi Dell’Erba</p>
            </div>
          </>
        ) : (
          <>
            <div className="r-page-heading">
              <div>
                <span className="m-page-kicker">
                  Non tutto inizia con una riga di codice.
                </span>
                <h1>
                  La prossima
                  <br />
                  connessione.
                </h1>
              </div>
              <Portrait />
            </div>
            <Contacts />
            <div className="r-contact-bottom">
              <span>
                Un progetto? Un esperimento?
                <br />
                Partiamo da una conversazione.
              </span>
              <span>
                Putignano, Italia
                <br />
                Italiano / English B2
              </span>
            </div>
          </>
        )}
      </main>
      <footer className="r-footer">
        <span>Lorenzo Recchia / Portfolio personale</span>
        <Link href={href("contatti", "C")}>
          Una nuova conversazione <Icon name="external" />
        </Link>
      </footer>
    </div>
  );
}

function Overview() {
  return (
    <div className="m-overview">
      <header>
        <Link href="/mockup">Lorenzo Recchia / Design lab</Link>
        <a href="https://lollo.is-a.dev" target="_blank" rel="noreferrer">
          Il portfolio attuale <Icon name="external" />
        </a>
      </header>
      <main>
        <span className="o-kicker">Tre mockup. Quattro pagine ciascuno.</span>
        <h1>
          Troviamo il tuo
          <br />
          <em>prossimo portfolio.</em>
        </h1>
        <p>
          Tre modi diversi di raccontare lo stesso percorso. Apri un mockup,
          naviga tra le pagine e confrontalo con gli altri. Possiamo scegliere
          una direzione o combinare gli elementi che preferisci.
        </p>
        <div className="o-variants">
          {variants.map((v) => (
            <Link
              className={`o-card o-card-${v.id}`}
              href={`/mockup?variant=${v.id}`}
              key={v.id}
            >
              <div className="o-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.image}
                  alt={`Anteprima del mockup ${v.id}: ${v.name}`}
                  width="1440"
                  height="1000"
                />
                <span>{v.id}</span>
              </div>
              <div className="o-card-title">
                <h2>{v.name}</h2>
                <Icon name="external" />
              </div>
              <strong>{v.summary}</strong>
              <p>{v.description}</p>
              <span className="o-traits">{v.traits}</span>
            </Link>
          ))}
        </div>
        <div className="o-notice">
          <span>Come confrontarli</span>
          <p>
            In ogni proposta trovi Profilo, Progetti, Certificazioni e Contatti
            su pagine separate. La barra in basso cambia direzione mantenendo la
            pagina che stai guardando. Puoi anche usare i tasti ← e →.
          </p>
        </div>
      </main>
      <footer>
        Prototipi di esplorazione / Nessuna direzione è ancora definitiva.
      </footer>
    </div>
  );
}
function PrototypeSwitcher({
  variant,
  page,
  slug,
}: {
  variant: Variant;
  page: string;
  slug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const index = variants.findIndex((v) => v.id === variant);
  const previous = variants[(index + 2) % 3].id as Variant;
  const next = variants[(index + 1) % 3].id as Variant;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        target.closest('input,textarea,select,[contenteditable="true"]')
      )
        return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const current = new URL(window.location.href);
        const active = Math.max(
          0,
          variants.findIndex(
            (v) => v.id === current.searchParams.get("variant"),
          ),
        );
        const offset = event.key === "ArrowLeft" ? 2 : 1;
        current.searchParams.set("variant", variants[(active + offset) % 3].id);
        router.replace(current.pathname + current.search, { scroll: false });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, pathname]);
  return (
    <aside className="m-switcher" aria-label="Confronta i mockup">
      <Link
        className="m-switch-overview"
        href="/mockup"
        aria-label="Mostra il confronto dei tre mockup"
      >
        <Icon name="grid" />
        <span>Confronto</span>
      </Link>
      <span className="m-switch-divider" />
      <Link
        className="m-cycle"
        href={href(page, previous, slug)}
        aria-label="Mockup precedente"
      >
        ←
      </Link>
      <div className="m-variant-buttons">
        {variants.map((v) => (
          <Link
            key={v.id}
            href={href(page, v.id as Variant, slug)}
            aria-current={v.id === variant ? "true" : undefined}
            aria-label={`Mockup ${v.id}: ${v.name}`}
          >
            <span>{v.id}</span>
            <b>{v.name}</b>
          </Link>
        ))}
      </div>
      <Link
        className="m-cycle"
        href={href(page, next, slug)}
        aria-label="Mockup successivo"
      >
        →
      </Link>
    </aside>
  );
}
export default function MockupLab(props: Props) {
  const { variant, page, slug, overview, reviewMode } = props;
  const project = projects.find((p) => p.slug === slug);
  if (overview)
    return (
      <div className="mockup-lab">
        <Overview />
      </div>
    );
  return (
    <div className={`mockup-lab variant-${variant}`}>
      <a className="m-skip" href="#mockup-content">
        Vai al contenuto
      </a>
      {variant === "A" ? (
        <Workspace page={page} project={project} />
      ) : variant === "B" ? (
        <Studio page={page} project={project} />
      ) : (
        <Archive page={page} project={project} />
      )}
      {reviewMode && (
        <PrototypeSwitcher variant={variant} page={page} slug={slug} />
      )}
    </div>
  );
}
