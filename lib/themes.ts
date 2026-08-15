export type AccentName = keyof typeof ACCENTS;

/* faithful to the original theme engine (8 accents × 8 backgrounds) */
export const ACCENTS = {
  orange: { accent: "#e7c26c", accent2: "#b58a0e", accent3: "#ffdf9a" },
  mauve: { accent: "#cac1ea", accent2: "#938cb2", accent3: "#e6deff" },
  blue: { accent: "#8fcef3", accent2: "#239bcc", accent3: "#c3e8ff" },
  green: { accent: "#afcfab", accent2: "#617e5f", accent3: "#cbebc5" },
  peach: { accent: "#f0c048", accent2: "#b58a0e", accent3: "#ffdf9a" },
  teal: { accent: "#8fcef3", accent2: "#0080ac", accent3: "#c3e8ff" },
  red: { accent: "#ff897d", accent2: "#de3730", accent3: "#ffdad6" },
  yellow: { accent: "#e7c26c", accent2: "#b58a0e", accent3: "#ffdf9a" },
} as const;

type BgScheme = {
  bg: string;
  bg2: string;
  bg3: string;
  border: string;
  border2: string;
  text?: string;
  text2?: string;
  dim?: string;
};

const BGS_DEF = {
  mocha: { bg: "#110e07", bg2: "#1f1b13", bg3: "#282520", border: "#39342b", border2: "#4d4639" },
  dark: { bg: "#0f0f1a", bg2: "#14142a", bg3: "#1a1a35", border: "#252545", border2: "#353560" },
  forest: { bg: "#080f08", bg2: "#0d160d", bg3: "#111f11", border: "#1a2e1a", border2: "#2a4028" },
  storm: { bg: "#0a0c14", bg2: "#0e1020", bg3: "#12152a", border: "#20253a", border2: "#303550" },
  rust: { bg: "#120a06", bg2: "#1a0e09", bg3: "#22130c", border: "#301a10", border2: "#442818" },
  ash: { bg: "#101012", bg2: "#141416", bg3: "#18181c", border: "#242428", border2: "#343438" },
  latte: {
    bg: "#eff1f5",
    bg2: "#e6e9ef",
    bg3: "#dce0e8",
    border: "#c0c4d0",
    border2: "#a0a8b8",
    text: "#4c4f69",
    text2: "#6c6f85",
    dim: "#9ca0b0",
  },
  frappe: { bg: "#232634", bg2: "#292c3c", bg3: "#303446", border: "#414559", border2: "#51576d" },
} as const satisfies Record<string, BgScheme>;

export type BgName = keyof typeof BGS_DEF;

export const BGS: Record<BgName, BgScheme> = BGS_DEF;

export function applyAccent(name: AccentName) {
  const a = ACCENTS[name];
  if (!a) return;
  const root = document.documentElement;
  root.style.setProperty("--accent", a.accent);
  root.style.setProperty("--accent2", a.accent2);
  root.style.setProperty("--accent3", a.accent3);
}

export function applyBg(name: BgName) {
  const b = BGS[name];
  if (!b) return;
  const root = document.documentElement;
  root.style.setProperty("--bg", b.bg);
  root.style.setProperty("--bg2", b.bg2);
  root.style.setProperty("--bg3", b.bg3);
  root.style.setProperty("--border", b.border);
  root.style.setProperty("--border2", b.border2);
  if (b.text) {
    root.style.setProperty("--text", b.text);
    root.style.setProperty("--text2", b.text2 ?? "#d0c5b4");
    root.style.setProperty("--dim", b.dim ?? "#999080");
  } else {
    root.style.setProperty("--text", "#e9e1d9");
    root.style.setProperty("--text2", "#d0c5b4");
    root.style.setProperty("--dim", "#999080");
  }
}

export const WP_DEFAULT_DARK = 15;
export const WP_DEFAULT_BLUR = 0;
