"use client";
/* Prototype: three complete multi-page directions, switchable with ?variant=G|H|I.
   The design decision is intentionally pending the user's comparison. */
import Link from "next/link";
import NextImage from "next/image";
import useAwwwardsMotion from "./useAwwwardsMotion";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  credentials,
  links,
  pages,
  projects,
  variants,
  type Project,
} from "./data";

type Variant = "G" | "H" | "I";
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
  // Solar icons served locally from Iconify; original SVGs in public/mockups/solar.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`/mockups/solar/${name}.svg`}
      className={`m-icon ${className}`}
      width="24"
      height="24"
      alt=""
      aria-hidden="true"
    />
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
          <NextImage
            sizes="(max-width: 700px) 90vw, 800px"
            className="m-product-screen"
            src={project.cover}
            alt={`Screenshot di ${project.name}`}
            width={1920}
            height={1080}
          />
          {project.slug === "dynamic-island" && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <NextImage
                sizes="(max-width: 700px) 35vw, 350px"
                className="m-control-screen"
                src={project.image}
                alt="Il centro di controllo di Dynamic Island"
                width={480}
                height={560}
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
          <MotionTitle lines={[project.name]} />
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

function MotionTitle({
  lines,
  as = "h1",
  className = "",
}: {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = as;
  return (
    <Tag className={`aw-title ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span key={index} className="aw-title-line" aria-hidden="true">
          {line.split(" ").map((word, i) => (
            <span className="aw-title-word" key={i}>
              {word}
              {i < line.split(" ").length - 1 ? "\u00a0" : ""}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
function HeroArt({ kind }: { kind: "kernel" | "trama" | "groove" }) {
  const alts = {
    kernel:
      "Scultura concettuale di un modulo in alluminio e grafite, aperto sul suo nucleo",
    trama:
      "Studio concettuale di un nastro tessile che passa dal lino a fibre di rame",
    groove:
      "Studio concettuale di un vinile nero attraversato da luce blu radente",
  };
  return (
    <figure className={`aw-hero-media art-${kind}`}>
      <div className="aw-art-backup" aria-hidden="true">
        Software.
        <br />
        Sistemi.
        <br />
        Curiosità.
      </div>
      <div className="aw-pointer-layer">
        <div className="aw-drift-layer">
          <NextImage
            src={`/mockups/art/${kind}.png`}
            alt={alts[kind]}
            width={1586}
            height={992}
            sizes="(max-width: 700px) 100vw, (max-width: 1300px) 90vw, 1300px"
            preload
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
              event.currentTarget
                .closest("figure")
                ?.classList.add("has-art-error");
            }}
          />
        </div>
      </div>
      <figcaption>
        Composizione concettuale /{" "}
        {kind === "kernel" ? "Kernel" : kind === "trama" ? "Trama" : "Groove"}
      </figcaption>
    </figure>
  );
}
function AwardHeader({ variant, page }: { variant: Variant; page: string }) {
  return (
    <header className="aw-header">
      <Link className="aw-brand" href={href("profilo", variant)}>
        Lorenzo Recchia<span>Software developer</span>
      </Link>
      <Nav variant={variant} page={page} />
      <a className="aw-header-contact" href="mailto:rccialrnzo605@gmail.com">
        Scrivimi <Icon name="external" />
      </a>
    </header>
  );
}
function AwardFooter() {
  return (
    <footer className="aw-footer">
      <Link className="aw-footer-cta" href="mailto:rccialrnzo605@gmail.com">
        Una nuova conversazione.
        <Icon name="external" />
      </Link>
      <div>
        <span>Lorenzo Recchia / St0rmosu</span>
        <a href="https://github.com/St0rmosu" target="_blank" rel="noreferrer">
          Il codice su GitHub <Icon name="external" />
        </a>
        <span>Putignano, Italia</span>
      </div>
      <p className="aw-credits">
        Icone{" "}
        <a
          href="https://icon-sets.iconify.design/solar/"
          target="_blank"
          rel="noreferrer"
        >
          Solar
        </a>{" "}
        di 480 Design /{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY 4.0
        </a>
      </p>
    </footer>
  );
}
function AwardPageHeading({
  title,
  label,
  description,
}: {
  title: string;
  label: string;
  description: string;
}) {
  return (
    <div className="aw-page-heading aw-intro">
      <span className="aw-page-label">{label}</span>
      <MotionTitle lines={[title]} />
      <p className="aw-intro-support">{description}</p>
    </div>
  );
}
function AwardProjects({ variant }: { variant: Variant }) {
  if (variant === "G")
    return (
      <div className="g-project-index">
        {projects.map((p) => (
          <Link key={p.slug} href={href("progetti", variant, p.slug)}>
            <span className="g-project-category">{p.category}</span>
            <div>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <small>{p.stack}</small>
            </div>
            <Icon name="external" />
          </Link>
        ))}
      </div>
    );
  if (variant === "H")
    return (
      <div className="h-project-index">
        {projects.map((p) => (
          <article key={p.slug} className="aw-section">
            <Link
              className="h-project-image aw-section-media"
              href={href("progetti", variant, p.slug)}
              aria-label={`Apri ${p.name}`}
            >
              <ProjectMedia project={p} />
            </Link>
            <div>
              <span>{p.category}</span>
              <MotionTitle as="h2" lines={[p.name]} />
              <p>{p.body}</p>
              <small>{p.stack}</small>
              <Link className="aw-cta" href={href("progetti", variant, p.slug)}>
                Dentro il progetto <Icon name="external" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    );
  return (
    <div className="i-project-index">
      {projects.map((p) => (
        <Link key={p.slug} href={href("progetti", variant, p.slug)}>
          <span>{p.category}</span>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <span className="i-project-stack">{p.stack}</span>
          <Icon name="external" />
        </Link>
      ))}
    </div>
  );
}
function AwardInterior({
  page,
  project,
  variant,
}: {
  page: string;
  project?: Project;
  variant: Variant;
}) {
  return (
    <main className="aw-body" id="mockup-content" tabIndex={-1}>
      {project ? (
        <div className="aw-intro">
          <Detail project={project} variant={variant} />
        </div>
      ) : page === "progetti" ? (
        <>
          <AwardPageHeading
            label="Progetti personali"
            title="Dal codice alla pratica."
            description="Tre progetti, tre modi diversi di esplorare software, sistemi e interfacce."
          />
          <AwardProjects variant={variant} />
        </>
      ) : page === "certificazioni" ? (
        <>
          <AwardPageHeading
            label="Studio e formazione"
            title="Continuare a imparare."
            description="AI, cloud e reti. Le credenziali originali dei percorsi che accompagnano il mio lavoro."
          />
          <Credentials />
          <div className="aw-education">
            <span>2026 / IISS Luigi Dell’Erba</span>
            <h2>Informatica e Telecomunicazioni</h2>
            <p>Diploma tecnico. Le basi da cui continuo a esplorare.</p>
          </div>
        </>
      ) : (
        <>
          <AwardPageHeading
            label="Contatti"
            title="Parliamone."
            description="Per un progetto, una collaborazione o un confronto sul software. Qui trovi i miei contatti diretti."
          />
          <Contacts />
          <div className="aw-contact-note">
            <span>Aperto a nuove collaborazioni</span>
            <p>Italiano / English B2</p>
          </div>
        </>
      )}
    </main>
  );
}
function Kernel({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="kernel">
      <AwardHeader variant="G" page={page} />
      {page !== "profilo" ? (
        <AwardInterior page={page} project={project} variant="G" />
      ) : (
        <main id="mockup-content" tabIndex={-1}>
          <section className="g-hero aw-intro aw-pointer-surface">
            <HeroArt kind="kernel" />
            <div className="g-hero-copy">
              <span className="g-role">
                Software developer / Systems enthusiast
              </span>
              <MotionTitle lines={["Lorenzo", "Recchia."]} />
            </div>
            <div className="g-hero-bottom aw-intro-support">
              <p>
                Sviluppo applicazioni web e desktop.
                <br />
                Esploro i sistemi che le fanno funzionare.
              </p>
              <Link className="aw-cta" href={href("progetti", "G")}>
                Esplora il mio lavoro <Icon name="external" />
              </Link>
              <span>Web / Linux / AI locale</span>
            </div>
          </section>
          <section className="g-story aw-section">
            <div>
              <span className="aw-page-label">Dietro il codice</span>
              <MotionTitle
                as="h2"
                lines={["Capire come funziona.", "Poi costruire qualcosa."]}
              />
            </div>
            <div>
              <p>
                Ho un diploma in Informatica e Telecomunicazioni all’IISS Luigi
                Dell’Erba. Durante il PCTO in Galileo Italia ho lavorato
                all’analisi dei tessuti con Java e modelli AI locali.
              </p>
              <p>
                Il mio laboratorio continua a casa: Linux, un homelab Proxmox,
                macchine virtuali e servizi da gestire in prima persona.
              </p>
              <div className="aw-text-tools">
                <span>TypeScript / React / Next.js</span>
                <span>Java / Python / Ollama</span>
                <span>Linux / Proxmox / Git</span>
              </div>
            </div>
          </section>
          <Link
            className="g-feature aw-section"
            href={href("progetti", "G", "dynamic-island")}
          >
            <span>Dal mio laboratorio</span>
            <h2>Dynamic Island</h2>
            <p>Il desktop Linux, ripensato.</p>
            <Icon name="external" />
          </Link>
        </main>
      )}
      <AwardFooter />
    </div>
  );
}
function Trama({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="trama">
      <AwardHeader variant="H" page={page} />
      {page !== "profilo" ? (
        <AwardInterior page={page} project={project} variant="H" />
      ) : (
        <main id="mockup-content" tabIndex={-1}>
          <section className="h-hero aw-intro">
            <div className="h-art">
              <HeroArt kind="trama" />
            </div>
            <div className="h-copy">
              <span className="aw-page-label">
                Software, sistemi, curiosità.
              </span>
              <MotionTitle lines={["Lorenzo", "Recchia."]} />
              <div className="aw-intro-support">
                <p className="h-lead">
                  Mi interessa il punto in cui
                  <br />
                  il codice incontra le cose.
                </p>
                <p>
                  Costruisco applicazioni web e desktop. Durante il PCTO in
                  Galileo Italia ho lavorato a un’applicazione Java per
                  l’analisi dei tessuti con modelli AI locali.
                </p>
                <Link className="aw-cta" href={href("progetti", "H")}>
                  Scopri i progetti <Icon name="external" />
                </Link>
              </div>
            </div>
          </section>
          <section className="h-notes aw-section">
            <div>
              <span className="aw-page-label">Un po’ di contesto</span>
              <MotionTitle
                as="h2"
                lines={["Dalle interfacce", "a quello che c’è dietro."]}
              />
            </div>
            <div>
              <p>
                Diplomato in Informatica e Telecomunicazioni all’IISS Luigi
                Dell’Erba nel 2026. Esploro il web con TypeScript e React, il
                software con Java e Python, i sistemi con Linux e Proxmox.
              </p>
              <p>Fuori dal codice: homelab, hi-fi, vinili e Formula 1.</p>
            </div>
          </section>
          <div className="h-explore">
            <Link href={href("progetti", "H")}>
              <span>Il lavoro</span>
              <strong>Progetti</strong>
              <Icon name="external" />
            </Link>
            <Link href={href("certificazioni", "H")}>
              <span>Il percorso</span>
              <strong>Formazione</strong>
              <Icon name="external" />
            </Link>
            <Link href={href("contatti", "H")}>
              <span>La prossima idea</span>
              <strong>Contatti</strong>
              <Icon name="external" />
            </Link>
          </div>
        </main>
      )}
      <AwardFooter />
    </div>
  );
}
function Groove({ page, project }: { page: string; project?: Project }) {
  return (
    <div className="groove">
      <AwardHeader variant="I" page={page} />
      {page !== "profilo" ? (
        <AwardInterior page={page} project={project} variant="I" />
      ) : (
        <main id="mockup-content" tabIndex={-1}>
          <section className="i-hero aw-intro aw-pointer-surface">
            <HeroArt kind="groove" />
            <div className="i-hero-top">
              <span>Codice, ascolto, curiosità.</span>
              <span>Portfolio personale</span>
            </div>
            <div className="i-identity">
              <span className="i-role">Software developer</span>
              <MotionTitle lines={["Lorenzo", "Recchia."]} />
              <p className="aw-intro-support">
                Web, desktop e sistemi Linux.
                <br />
                Precisione nel codice, curiosità nel resto.
              </p>
              <Link className="aw-cta" href={href("progetti", "I")}>
                Entra nei progetti <Icon name="external" />
              </Link>
            </div>
            <div className="i-bottom">
              <span>Hi-fi / Vinili / Software</span>
              <span>Putignano, Italia</span>
            </div>
          </section>
          <section className="i-work-links aw-section">
            <div>
              <span className="aw-page-label">Dal mio laboratorio</span>
              <MotionTitle as="h2" lines={["Tre progetti da esplorare."]} />
            </div>
            {projects.map((p) => (
              <Link key={p.slug} href={href("progetti", "I", p.slug)}>
                <span>{p.category}</span>
                <strong>{p.name}</strong>
                <Icon name="external" />
              </Link>
            ))}
          </section>
          <section className="i-context aw-section">
            <MotionTitle
              as="h2"
              lines={["Software e sistemi.", "Con una mente curiosa."]}
            />
            <div>
              <p>
                Diploma in Informatica e Telecomunicazioni, un’esperienza PCTO
                in Galileo Italia con Java e AI locale, e un homelab Proxmox in
                cui continuare gli esperimenti.
              </p>
              <p>
                Fuori dal portatile, la stessa attenzione va ai vinili e
                all’hi-fi. È da qui che nasce questa direzione visiva.
              </p>
            </div>
          </section>
        </main>
      )}
      <AwardFooter />
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
          Tre direzioni con build-awwwards-quality-sites.
        </span>
        <h1>
          Una direzione più forte per il tuo
          <br />
          <em>portfolio.</em>
        </h1>
        <p>
          Immagini originali, tipografia e movimento: tre proposte costruite
          intorno alla tua storia. Apri un mockup, naviga tra le pagine e
          confrontalo con gli altri. Possiamo scegliere una direzione o
          combinare gli elementi che preferisci.
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
        Prototipi di esplorazione / Nessuna direzione è ancora definitiva. Icone
        Solar di 480 Design, CC BY 4.0.
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
  const root = useRef<HTMLDivElement>(null);
  useAwwwardsMotion(
    root,
    `${overview ? "overview" : variant}/${page}/${slug || ""}`,
  );
  if (overview)
    return (
      <div className="mockup-lab">
        <Overview />
      </div>
    );
  return (
    <div className={`mockup-lab variant-${variant}`} ref={root}>
      <a
        className="m-skip"
        href="#mockup-content"
        onClick={() =>
          document
            .getElementById("mockup-content")
            ?.focus({ preventScroll: true })
        }
      >
        Vai al contenuto
      </a>
      {variant === "G" ? (
        <Kernel page={page} project={project} />
      ) : variant === "H" ? (
        <Trama page={page} project={project} />
      ) : (
        <Groove page={page} project={project} />
      )}
      {reviewMode && (
        <PrototypeSwitcher variant={variant} page={page} slug={slug} />
      )}
    </div>
  );
}
