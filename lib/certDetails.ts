export interface CertDetail {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  href: string;
  pdfUrl?: string;
  previewImg?: string;
  tagline: string;
  description: string;
  skills: string[];
  keypoints: { icon?: string; text: string }[];
  metrics?: { label: string; value: string }[];
}

export const CERT_DETAILS: Record<string, CertDetail> = {
  "google-ai": {
    id: "google-ai",
    name: "Google AI Professional Certificate",
    issuer: "Google · Coursera",
    year: "2026",
    credentialId: "LQSK7W3FKUQY",
    href: "https://coursera.org/verify/professional-cert/LQSK7W3FKUQY",
    pdfUrl: "/certs/google-ai-cert.pdf",
    previewImg: "/certs/google-ai-cert.png",
    tagline: "Specializzazione professionale ufficiale rilasciata da Google su AI Generativa e Machine Learning",
    description:
      "Programma intensivo di livello professionale sviluppato dagli esperti di Google per padroneggiare i fondamenti di intelligenza artificiale, Large Language Models (LLM), prompt engineering avanzato e implementazione pratica di soluzioni AI nei flussi aziendali.",
    skills: ["AI Generativa", "Prompt Engineering", "Large Language Models", "Machine Learning", "Responsible AI", "Python for AI"],
    keypoints: [
      {
        icon: "ai",
        text: "Architettura dei Modelli Fondazionali: comprensione approfondita di Transformer, meccanismi di attenzione e fine-tuning.",
      },
      {
        icon: "speed",
        text: "Prompt Engineering Avanzato: tecniche zero-shot, few-shot, chain-of-thought e ottimizzazione del context window.",
      },
      {
        icon: "doc",
        text: "Integrazione API e Strumenti Google: utilizzo di Gemini API, Vertex AI e automazione di task intelligenti.",
      },
      {
        icon: "scan",
        text: "Principi di AI Responsabile: mitigazione di bias, privacy dei dati, sicurezza e conformità etica nei sistemi intelligenti.",
      },
    ],
    metrics: [
      { label: "Ente Rilascio", value: "Google Career Certificates" },
      { label: "Piattaforma", value: "Coursera" },
      { label: "Stato", value: "Verificato Online" },
    ],
  },
  "ibm-devops": {
    id: "ibm-devops",
    name: "IBM DevOps, Cloud & Agile Foundations",
    issuer: "IBM · Coursera",
    year: "2026",
    credentialId: "GH5A85B9C4YZ",
    href: "https://coursera.org/verify/specialization/GH5A85B9C4YZ",
    pdfUrl: "/certs/ibm-devops-cert.pdf",
    previewImg: "/certs/ibm-devops-cert.png",
    tagline: "Specializzazione IBM su metodologie Agile, Cloud Computing e pipeline CI/CD moderne",
    description:
      "Percorso di certificazione professionale orientato all'automazione del ciclo di vita del software, implementazione di pipeline CI/CD scalabili, architetture cloud native e pratiche agili di collaborazione nei team di sviluppo software.",
    skills: ["CI/CD Pipelines", "DevOps Culture", "Cloud Native", "Agile & Scrum", "Microservizi", "Automated Testing"],
    keypoints: [
      {
        icon: "speed",
        text: "Pipeline CI/CD Automatizzate: progettazione di flussi continui di integrazione, build, test e rilascio software.",
      },
      {
        icon: "ui",
        text: "Architetture Cloud Native: principi di microservizi, containerizzazione con Docker e orchestrazione moderna.",
      },
      {
        icon: "doc",
        text: "Metodologie Agile e Scrum: gestione degli sprint, backlog grooming, stima dei requisiti e continuous improvement.",
      },
      {
        icon: "scan",
        text: "Monitoraggio e Resilienza: metriche operative, log analysis e pratiche di Site Reliability Engineering (SRE).",
      },
    ],
    metrics: [
      { label: "Ente Rilascio", value: "IBM" },
      { label: "Piattaforma", value: "Coursera" },
      { label: "Stato", value: "Verificato Online" },
    ],
  },
  "cisco-networking": {
    id: "cisco-networking",
    name: "Cisco Networking Basics",
    issuer: "Cisco Networking Academy · IISS Dell'Erba",
    year: "2025",
    credentialId: "f486fe7f-c3de-42ae-85a6-80bae59dbe73",
    href: "https://www.netacad.com/certificates?issuanceId=f486fe7f-c3de-42ae-85a6-80bae59dbe73",
    tagline: "Certificazione accademica ufficiale Cisco sui fondamenti delle reti e protocolli di comunicazione",
    description:
      "Certificazione accademica conseguita nell'ambito del percorso scolastico presso l'IISS Luigi Dell'Erba, attestante le competenze fondamentali su modelli architetturali OSI/TCP-IP, configurazione di switch e router Cisco, subnetting e sicurezza delle reti LAN.",
    skills: ["Modello OSI & TCP/IP", "IPv4 / IPv6 Subnetting", "Routing & Switching", "Cisco Packet Tracer", "LAN / VLAN", "Network Troubleshooting"],
    keypoints: [
      {
        icon: "link",
        text: "Protocolli di Rete e Indirizzamento: calcolo subnet IPv4/IPv6, configurazione DHCP, DNS, NAT e gateway.",
      },
      {
        icon: "ui",
        text: "Configurazione Dispositivi Cisco: programmazione CLI di switch e router, gestione VLAN e tabelle di routing.",
      },
      {
        icon: "scan",
        text: "Simulazione e Troubleshooting: modellazione di topologie complesse con Cisco Packet Tracer e diagnosi pacchetti.",
      },
      {
        icon: "doc",
        text: "Sicurezza di Rete Base: autenticazione terminale, liste di controllo accessi (ACL) e protezione porte fisiche.",
      },
    ],
    metrics: [
      { label: "Ente Rilascio", value: "Cisco Networking Academy" },
      { label: "Istituto", value: "IISS Luigi Dell'Erba" },
      { label: "Stato", value: "Verificato Online" },
    ],
  },
};

export function getCertDetail(certName: string): CertDetail {
  if (/google|ai/i.test(certName)) return CERT_DETAILS["google-ai"];
  if (/ibm|devops|cloud/i.test(certName)) return CERT_DETAILS["ibm-devops"];
  if (/cisco|network/i.test(certName)) return CERT_DETAILS["cisco-networking"];
  
  return {
    id: certName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    name: certName,
    issuer: "Certificazione Verificata",
    year: "2026",
    href: "#",
    tagline: "Certificazione professionale verificabile",
    description: "Certificato di completamento professionale.",
    skills: ["Competenze Tecniche"],
    keypoints: [
      { icon: "doc", text: "Certificato verificabile online presso l'ente emittente." },
    ],
  };
}
