"use client";
/* Prototype: three complete multi-page directions, switchable with ?variant=D|E|F.
   The design decision is intentionally pending the user's comparison. */
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  credentials,
  links,
  pages,
  projects,
  variants,
  toolkit,
  type Project,
} from "./data";

type Variant = "D" | "E" | "F";
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
          <span>{p.label}</span>
          <span className="m-nav-trail">↗</span>
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
            width={1920}
            height={1080}
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

function TechMark({ icon }: { icon: string }) {
  // Logos by Simple Icons, presented beside the actual technology name.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      className="tech-mark"
      src={`/mockups/icons/${icon}.svg`}
      width="32"
      height="32"
      alt=""
    />
  );
}
function Toolset({ group }: { group?: string }) {
  return (
    <div className="toolset">
      {toolkit
        .filter((t) => !group || t.group === group)
        .map((tool) => (
          <a key={tool.name} href={tool.href} target="_blank" rel="noreferrer">
            <TechMark icon={tool.icon} />
            <span>{tool.name}</span>
          </a>
        ))}
    </div>
  );
}
function PageHeading({
  title,
  text,
  label,
}: {
  title: string;
  text: string;
  label: string;
}) {
  return (
    <div className="new-page-heading">
      <span>{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
function Meridian({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="meridian">
      <header className="d-header">
        <Link className="d-brand" href={href("profilo", "D")}>
          <span>lr/</span>
          <b>Lorenzo Recchia</b>
        </Link>
        <Nav variant="D" page={page} />
        <a
          className="d-github"
          href="https://github.com/St0rmosu"
          target="_blank"
          rel="noreferrer"
        >
          St0rmosu <Icon name="external" />
        </a>
      </header>
      <main id="mockup-content" className="d-main">
        {project ? (
          <Detail project={project} variant="D" />
        ) : page === "profilo" ? (
          <>
            <div className="d-profile-grid">
              <section className="d-identity">
                <div className="d-intro-line">
                  <Portrait />
                  <span>
                    Software developer
                    <br />
                    <small>Putignano, Italia</small>
                  </span>
                </div>
                <h1>
                  Lorenzo
                  <br />
                  Recchia<span>.</span>
                </h1>
                <p className="d-lead">
                  Dal browser al desktop.
                  <br />
                  Mi piace capire come funzionano le cose.
                </p>
                <p>
                  Sviluppo applicazioni web e desktop, esploro l’AI locale e
                  gestisco un homelab Proxmox. Il punto di partenza è quasi
                  sempre una domanda.
                </p>
                <div className="d-intro-links">
                  <Link className="m-action" href={href("progetti", "D")}>
                    Esplora i progetti <Icon />
                  </Link>
                  <Link href={href("contatti", "D")}>Facciamo due parole</Link>
                </div>
                <span className="d-availability">
                  <i /> Aperto a nuove collaborazioni
                </span>
              </section>
              <section className="d-tools">
                <div className="d-tools-heading">
                  <span>Con cosa lavoro</span>
                  <span>Web / software / sistemi</span>
                </div>
                {["Web", "Software", "Sistemi"].map((group) => (
                  <div className="d-tool-group" key={group}>
                    <h2>{group}</h2>
                    <Toolset group={group} />
                  </div>
                ))}
                <p>Strumenti diversi. La stessa curiosità.</p>
              </section>
            </div>
            <div className="d-lower-grid">
              <Link
                href={href("progetti", "D", "dynamic-island")}
                className="d-feature"
              >
                <ProjectMedia project={projects[0]} />
                <div>
                  <span>Dal mio laboratorio</span>
                  <h2>Dynamic Island</h2>
                  <p>Una shell modulare per Hyprland.</p>
                  <span className="d-feature-link">
                    Apri il progetto <Icon name="external" />
                  </span>
                </div>
              </Link>
              <section className="d-brief">
                <span>Un po’ di contesto</span>
                <p>
                  Diplomato in Informatica e Telecomunicazioni. Durante il PCTO
                  in Galileo Italia ho lavorato con Java e modelli AI locali.
                </p>
                <Link href={href("certificazioni", "D")}>
                  Il mio percorso <Icon name="external" />
                </Link>
              </section>
            </div>
          </>
        ) : page === "progetti" ? (
          <>
            <PageHeading
              label="Il codice, in pratica"
              title="Progetti personali."
              text="Tre ambiti diversi: Linux, intelligenza artificiale e sviluppo web."
            />
            <div className="d-projects">
              {projects.map((p) => (
                <Link key={p.slug} href={href("progetti", "D", p.slug)}>
                  <ProjectMedia project={p} />
                  <div>
                    <span>{p.category}</span>
                    <h2>{p.name}</h2>
                    <p>{p.description}</p>
                    <small>{p.stack}</small>
                  </div>
                  <Icon name="external" />
                </Link>
              ))}
            </div>
          </>
        ) : page === "certificazioni" ? (
          <>
            <PageHeading
              label="Studio e formazione"
              title="Imparare, poi costruire."
              text="Le certificazioni che accompagnano gli esperimenti e il lavoro sul campo."
            />
            <Credentials />
            <div className="d-diploma">
              <span>2026 / IISS Luigi Dell’Erba</span>
              <h2>Diploma in Informatica e Telecomunicazioni</h2>
              <p>Le basi da cui continuo a esplorare.</p>
            </div>
          </>
        ) : (
          <>
            <PageHeading
              label="Restiamo in contatto"
              title="C’è un’idea di cui parlare?"
              text="Un progetto, una collaborazione o una conversazione tecnica. Scrivimi qui."
            />
            <Contacts />
            <p className="d-contact-note">
              Nessun form: una mail diretta, oppure ci troviamo su GitHub e
              LinkedIn.
            </p>
          </>
        )}
      </main>
      <footer className="d-footer">
        <span>Lorenzo Recchia / St0rmosu</span>
        <span>Fuori dal codice: homelab, vinili e Formula 1.</span>
      </footer>
    </div>
  );
}
const focusAreas = [
  {
    label: "Web",
    title: "Dall’idea all’interfaccia.",
    text: "Sviluppo applicazioni con TypeScript, React e Next.js. Mi interessa come il codice diventa qualcosa che si può usare.",
    group: "Web",
    project: "re-life",
  },
  {
    label: "Linux",
    title: "Sotto l’interfaccia.",
    text: "Linux è anche un laboratorio: Hyprland, applicazioni desktop e servizi che gestisco in prima persona nel mio homelab.",
    group: "Sistemi",
    project: "dynamic-island",
  },
  {
    label: "AI locale",
    title: "Modelli, problemi concreti.",
    text: "Durante il PCTO ho lavorato all’analisi dei tessuti con Java e modelli locali. Esploro Ollama e gli strumenti che porta sul desktop.",
    group: "Software",
    project: "galileo",
  },
];
function Signal({ page, project }: { page: string; project?: Project }) {
  const [focus, setFocus] = useState(1);
  const selected = focusAreas[focus];
  return (
    <div className="signal">
      <div className="e-shell">
        <header className="e-header">
          <Link href={href("profilo", "E")} className="e-brand">
            lr<span>.</span>
          </Link>
          <span>Lorenzo Recchia / Portfolio personale</span>
          <a
            href="https://github.com/St0rmosu"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Icon name="external" />
          </a>
        </header>
        <div className="e-mobile-nav">
          <Nav variant="E" page={page} />
        </div>
        <main id="mockup-content" className="e-main">
          {project ? (
            <Detail project={project} variant="E" />
          ) : page === "profilo" ? (
            <>
              <div className="e-home">
                <section className="e-identity">
                  <span className="e-role">
                    Software developer, systems enthusiast.
                  </span>
                  <h1>
                    Lorenzo
                    <br />
                    Recchia<span>.</span>
                  </h1>
                  <p>
                    Costruisco software.
                    <br />
                    Tengo accesa la curiosità.
                  </p>
                  <Link className="e-contact-link" href={href("contatti", "E")}>
                    Scrivimi <Icon name="external" />
                  </Link>
                  <div className="e-personal">
                    <span>Altre frequenze</span>
                    <p>Hi-fi. Vinili. Formula 1.</p>
                  </div>
                </section>
                <section className="e-focus">
                  <span className="e-focus-label">Sintonizzato su</span>
                  <div
                    className="e-focus-buttons"
                    aria-label="Aree di interesse"
                  >
                    {focusAreas.map((area, i) => (
                      <button
                        key={area.label}
                        aria-pressed={focus === i}
                        aria-controls="signal-focus"
                        onClick={() => setFocus(i)}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                  <div
                    id="signal-focus"
                    className="e-focus-content"
                    aria-live="polite"
                  >
                    <span className="e-focus-symbol" aria-hidden="true">
                      {focus === 0 ? "</>" : focus === 1 ? "~/" : "{ }"}
                    </span>
                    <h2>{selected.title}</h2>
                    <p>{selected.text}</p>
                    <Toolset group={selected.group} />
                    <Link
                      className="e-related"
                      href={href("progetti", "E", selected.project)}
                    >
                      Esplora un progetto in quest’area <Icon name="external" />
                    </Link>
                  </div>
                </section>
              </div>
              <div className="e-project-shortcuts">
                {projects.map((p) => (
                  <Link key={p.slug} href={href("progetti", "E", p.slug)}>
                    <span>{p.category}</span>
                    <strong>{p.name}</strong>
                    <Icon name="external" />
                  </Link>
                ))}
              </div>
            </>
          ) : page === "progetti" ? (
            <>
              <PageHeading
                label="Dal mio laboratorio"
                title="Idee messe alla prova."
                text="Applicazioni, esperimenti e strumenti. Ogni progetto ha il suo contesto."
              />
              <div className="e-projects">
                {projects.map((p) => (
                  <Link key={p.slug} href={href("progetti", "E", p.slug)}>
                    <ProjectMedia project={p} />
                    <div>
                      <span>{p.category}</span>
                      <h2>{p.name}</h2>
                      <p>{p.description}</p>
                      <small>{p.stack}</small>
                      <Icon name="external" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : page === "certificazioni" ? (
            <>
              <PageHeading
                label="Un percorso che continua"
                title="Studio. Provo. Imparo."
                text="AI, cloud e reti: le certificazioni del mio percorso, con le credenziali originali."
              />
              <Credentials />
              <div className="e-diploma">
                <span>Il punto di partenza</span>
                <p>
                  Diploma in Informatica e Telecomunicazioni
                  <br />
                  <small>IISS Luigi Dell’Erba / 2026</small>
                </p>
              </div>
            </>
          ) : (
            <>
              <PageHeading
                label="Un nuovo punto di contatto"
                title="Facciamo due parole."
                text="Per un’idea da costruire, una collaborazione o un confronto. Mi trovi qui."
              />
              <Contacts />
              <div className="e-contact-foot">
                <span>
                  <i /> Aperto a collaborazioni
                </span>
                <span>Italiano / English B2</span>
              </div>
            </>
          )}
        </main>
        <div className="e-navigation">
          <span>Esplora il mio spazio</span>
          <Nav variant="E" page={page} />
        </div>
      </div>
      <footer className="e-footer">
        <span>St0rmosu / Lorenzo Recchia</span>
        <span>Putignano, Italia</span>
      </footer>
    </div>
  );
}
function Notes({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="notes">
      <aside className="f-sidebar">
        <Link className="f-brand" href={href("profilo", "F")}>
          lr<span>/</span>
        </Link>
        <p>
          Il taccuino di
          <br />
          <strong>Lorenzo Recchia.</strong>
        </p>
        <Nav variant="F" page={page} />
        <div className="f-side-foot">
          <a
            href="https://github.com/St0rmosu"
            target="_blank"
            rel="noreferrer"
          >
            St0rmosu <Icon name="external" />
          </a>
          <span>Software / sistemi / curiosità</span>
        </div>
      </aside>
      <div className="f-content">
        <header className="f-top">
          <span>Portfolio personale</span>
          <span>Putignano, Italia</span>
        </header>
        <main id="mockup-content">
          {project ? (
            <Detail project={project} variant="F" />
          ) : page === "profilo" ? (
            <>
              <div className="f-identity">
                <span>Piacere di conoscerti.</span>
                <h1>
                  Lorenzo
                  <br />
                  Recchia.
                </h1>
                <p>
                  Sviluppatore software.
                  <br />
                  Curioso di quello che c’è dietro.
                </p>
              </div>
              <div className="f-biography">
                <h2>Dal browser al sistema operativo.</h2>
                <p>
                  Sviluppo applicazioni web e desktop, lavoro con Java e Python
                  e mi piace esplorare Linux. Ho un diploma in Informatica e
                  Telecomunicazioni all’IISS Luigi Dell’Erba, conseguito nel
                  2026.
                </p>
                <p>
                  Durante il PCTO presso Galileo Italia ho lavorato all’analisi
                  dei tessuti con modelli AI locali. A casa continuo gli
                  esperimenti con un homelab Proxmox, macchine virtuali e
                  container.
                </p>
              </div>
              <section className="f-toolkit">
                <h2>Gli strumenti sul tavolo</h2>
                {["Web", "Software", "Sistemi"].map((group) => (
                  <div key={group}>
                    <span>{group}</span>
                    <Toolset group={group} />
                  </div>
                ))}
              </section>
              <div className="f-personal">
                <span>Una nota personale</span>
                <p>
                  Homelab, hi-fi, vinili e Formula 1.
                  <br />
                  Le altre cose a cui dedico volentieri il mio tempo.
                </p>
              </div>
              <Link className="f-next" href={href("progetti", "F")}>
                Passa ai progetti <Icon />
              </Link>
            </>
          ) : page === "progetti" ? (
            <>
              <PageHeading
                label="Appunti di progetto"
                title="Il codice, con un contesto."
                text="Cosa ho costruito, quali strumenti ho usato e che cosa volevo esplorare."
              />
              <div className="f-projects">
                {projects.map((p) => (
                  <article key={p.slug}>
                    <span>{p.category}</span>
                    <h2>
                      <Link href={href("progetti", "F", p.slug)}>
                        {p.name} <Icon name="external" />
                      </Link>
                    </h2>
                    <p>{p.body}</p>
                    <small>{p.stack}</small>
                    <Link
                      className="f-read"
                      href={href("progetti", "F", p.slug)}
                    >
                      Apri la nota sul progetto <Icon />
                    </Link>
                  </article>
                ))}
              </div>
            </>
          ) : page === "certificazioni" ? (
            <>
              <PageHeading
                label="Percorso di studio"
                title="Aggiungere prospettive."
                text="Le certificazioni si affiancano a quello che imparo costruendo."
              />
              <Credentials />
              <div className="f-personal">
                <span>Formazione di base / 2026</span>
                <p>
                  Diploma in Informatica e Telecomunicazioni
                  <br />
                  IISS Luigi Dell’Erba
                </p>
              </div>
            </>
          ) : (
            <>
              <PageHeading
                label="Lascia una riga"
                title="Una conversazione, per iniziare."
                text="Per parlare di software, di un progetto o di qualcosa che merita di essere esplorato insieme."
              />
              <Contacts />
              <div className="f-personal">
                <span>Come preferisci</span>
                <p>
                  Una mail diretta o un messaggio su LinkedIn.
                  <br />
                  Su GitHub trovi il codice e i progetti.
                </p>
              </div>
            </>
          )}
        </main>
        <footer className="f-footer">
          <span>Lorenzo Recchia / St0rmosu</span>
          <Link href={href("contatti", "F")}>
            Restiamo in contatto <Icon name="external" />
          </Link>
        </footer>
      </div>
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
        <span className="o-kicker">
          Tre nuove direzioni. Sempre multipagina.
        </span>
        <h1>
          Un’altra prospettiva sul tuo
          <br />
          <em>portfolio.</em>
        </h1>
        <p>
          Tre nuove composizioni, sviluppate dopo aver studiato i riferimenti
          che hai scelto. Apri un mockup, naviga tra le pagine e confrontalo con
          gli altri. Possiamo scegliere una direzione o combinare gli elementi
          che preferisci.
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
        aria-label="Mostra il confronto delle nuove proposte"
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
      {variant === "D" ? (
        <Meridian page={page} project={project} />
      ) : variant === "E" ? (
        <Signal page={page} project={project} />
      ) : (
        <Notes page={page} project={project} />
      )}
      {reviewMode && (
        <PrototypeSwitcher variant={variant} page={page} slug={slug} />
      )}
    </div>
  );
}
