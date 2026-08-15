export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  size: number;
}

const USERNAME = "St0rmosu";

/** Repos to always hide: forks of third-party tools, profile README and this portfolio. */
const EXCLUDED = new Set(["register", "St0rmosu", "Portfolio"]);

/** Hide config / dotfiles repos unless explicitly allowed. */
const isConfigRepo = (r: Repo) =>
  r.name !== "dots-hyprland" &&
  (/^(dotfiles|config|rice)$/i.test(r.name) ||
    /^(dotfiles|config)$/i.test(r.description ?? ""));

export const FALLBACK_REPOS: Repo[] = [
  {
    name: "GALILEO-ITA",
    description:
      "Analizzatore di difetti nei tessuti basato su AI (Gemma 3:4b). Sviluppato per il progetto PCTO con Java, Ollama e Swing.",
    language: "Java",
    html_url: "https://github.com/St0rmosu/GALILEO-ITA",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["ai", "gemma3", "ollama", "java", "flatlaf", "sqlite"],
    size: 2154,
  },
  {
    name: "dots-hyprland",
    description:
      "Usability-first dotfiles per Hyprland compositor su Wayland. Graphical shell moderna in QML/Lua con widget, dynamic workspaces e controlli di sistema.",
    language: "Shell",
    html_url: "https://github.com/St0rmosu/dots-hyprland",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["hyprland", "wayland", "dotfiles", "qml", "lua", "linux"],
    size: 3450,
  },
  {
    name: "Insta-card",
    description:
      "Profile Card interattiva e moderna. Un biglietto da visita digitale con link social e CV scaricabile.",
    language: "HTML",
    html_url: "https://github.com/St0rmosu/Insta-card",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["profile-card", "html5", "css3", "javascript"],
    size: 1420,
  },
  {
    name: "sitogpo",
    description:
      "RE-LIFE: Startup dedicata all'upcycling di mobili. Piattaforma e-commerce e business plan per dare nuova vita all'arredamento dismesso.",
    language: "TypeScript",
    html_url: "https://github.com/St0rmosu/sitogpo",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["nextjs", "react", "typescript", "tailwind", "supabase"],
    size: 3890,
  },
  {
    name: "Dellerba-voice-logo-animation",
    description:
      "Animazione del logo per la web radio scolastica 'Dell'Erba Voice', realizzata con la libreria Manim di Python.",
    language: "Python",
    html_url: "https://github.com/St0rmosu/Dellerba-voice-logo-animation",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["manim", "python", "animation", "webradio"],
    size: 1840,
  },
  {
    name: "CustomPomodoroTimer",
    description:
      "Pomodoro Timer personalizzabile con integrazione Spotify Web API per visualizzare il brano in ascolto.",
    language: "JavaScript",
    html_url: "https://github.com/St0rmosu/CustomPomodoroTimer",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["pomodoro", "spotify-api", "javascript", "productivity"],
    size: 980,
  },
];

export async function fetchRepos(): Promise<Repo[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { signal: ctrl.signal },
    );
    if (!res.ok) return FALLBACK_REPOS;
    const repos: Repo[] = await res.json();
    const visible = repos
      .filter((r) => !EXCLUDED.has(r.name) && !isConfigRepo(r))
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          b.forks_count - a.forks_count ||
          b.size - a.size,
      );
    return visible.length > 0 ? visible : FALLBACK_REPOS;
  } catch {
    return FALLBACK_REPOS;
  } finally {
    clearTimeout(timer);
  }
}
