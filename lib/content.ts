export type Section = "about" | "projects" | "certs" | "contact";

export const SECTION_ORDER: Section[] = ["about", "projects", "certs", "contact"];

export const SECTIONS: { id: Section; label: string; title: string; color: string }[] = [
  { id: "about", label: "About", title: "about — Hi, I'm Lorenzo", color: "var(--orange)" },
  { id: "projects", label: "Projects", title: "projects — St0rmosu", color: "var(--green)" },
  { id: "certs", label: "Certs", title: "certs — certificazioni", color: "var(--mauve)" },
  { id: "contact", label: "Contact", title: "contact — lorenzo@portfolio", color: "var(--blue)" },
];

/* workspace ↔ section mapping */
export const WS_SEC: Record<string, Section> = {
  "1": "about",
  "2": "projects",
  "3": "certs",
  "4": "contact",
};
export const SEC_WS: Record<Section, string> = {
  about: "1",
  projects: "2",
  certs: "3",
  contact: "4",
};

export interface Cert {
  name: string;
  issuer: string;
  year: string;
  tags: { label: string; cls: string }[];
  href: string;
}

export const CERTS: Cert[] = [
  {
    name: "Google AI Professional Certificate",
    issuer: "Coursera",
    year: "2026",
    tags: [
      { label: "AI", cls: "bt-a" },
      { label: "Google", cls: "bt-l" },
    ],
    href: "https://coursera.org/verify/professional-cert/LQSK7W3FKUQY",
  },
  {
    name: "IBM DevOps, Cloud & Agile Foundations",
    issuer: "IBM · Coursera",
    year: "2026",
    tags: [
      { label: "DevOps", cls: "bt-s" },
      { label: "Cloud", cls: "bt-p" },
      { label: "Agile", cls: "bt-l" },
    ],
    href: "https://coursera.org/verify/specialization/GH5A85B9C4YZ",
  },
  {
    name: "Cisco Networking Basics",
    issuer: "NetAcad · IISS Dell'Erba",
    year: "2025",
    tags: [
      { label: "Networking", cls: "bt-s" },
      { label: "Cisco", cls: "bt-a" },
    ],
    href: "https://www.netacad.com/certificates?issuanceId=f486fe7f-c3de-42ae-85a6-80bae59dbe73",
  },
];

export const SOCIALS = [
  { id: "github", label: "GitHub", value: "St0rmosu", href: "https://github.com/St0rmosu" },
  { id: "email", label: "Email", value: "rccialrnzo605@gmail.com", href: "mailto:rccialrnzo605@gmail.com" },
  { id: "linkedin", label: "LinkedIn", value: "lorenzo-recchia", href: "https://www.linkedin.com/in/lorenzo-recchia-ba0093366/" },
] as const;

export interface Skill {
  label: string;
  kind: "svg" | "text";
  icon?: string;
  text?: string;
  color?: string;
  href: string;
}

export const SKILL_GROUPS: { title: string; skills: Skill[] }[] = [
  {
    title: "// web",
    skills: [
      { label: "HTML", kind: "svg", icon: "html", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { label: "CSS", kind: "svg", icon: "css", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { label: "JavaScript", kind: "svg", icon: "js", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { label: "TypeScript", kind: "svg", icon: "ts", href: "https://www.typescriptlang.org/" },
      { label: "Next.js", kind: "svg", icon: "nextjs", href: "https://nextjs.org/" },
    ],
  },
  {
    title: "// backend & db",
    skills: [
      { label: "Java", kind: "svg", icon: "java", href: "https://www.java.com/" },
      { label: "PHP", kind: "svg", icon: "php", href: "https://www.php.net/" },
      { label: "Python", kind: "svg", icon: "python", href: "https://www.python.org/" },
      { label: "MariaDB/SQL", kind: "svg", icon: "mariadb", href: "https://mariadb.org/" },
      { label: "MongoDB", kind: "svg", icon: "mongo", href: "https://www.mongodb.com/" },
      { label: "C/C++", kind: "text", text: "C++", color: "#5c93ce", href: "https://isocpp.org/" },
      { label: "Assembly", kind: "text", text: "asm", color: "var(--mauve)", href: "https://en.wikipedia.org/wiki/Assembly_language" },
      { label: "MySQL", kind: "text", text: "SQL", color: "#00758f", href: "https://www.mysql.com/" },
      { label: "PostgreSQL", kind: "text", text: "PG", color: "#336791", href: "https://www.postgresql.org/" },
      { label: "Git", kind: "svg", icon: "git", href: "https://git-scm.com/" },
    ],
  },
  {
    title: "// systems",
    skills: [
      { label: "Bash/Zsh", kind: "svg", icon: "bash", href: "https://www.gnu.org/software/bash/" },
      { label: "Linux", kind: "svg", icon: "linux", href: "https://kernel.org/" },
      { label: "Android", kind: "svg", icon: "android", href: "https://www.android.com/" },
      { label: "Proxmox VE", kind: "svg", icon: "proxmox", href: "https://www.proxmox.com/" },
      { label: "Windows", kind: "svg", icon: "windows", href: "https://www.microsoft.com/windows" },
    ],
  },
];
