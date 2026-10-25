import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lollo.is-a.dev"),
  title: "Lorenzo Recchia — Software, sistemi e curiosità",
  description:
    "Il portfolio di Lorenzo Recchia, sviluppatore software. Progetti web e desktop, Linux e intelligenza artificiale locale.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lorenzo Recchia — Software, sistemi e curiosità",
    description:
      "Dal codice all’interfaccia. Progetti web, desktop e AI locale.",
    locale: "it_IT",
    type: "website",
    url: "https://lollo.is-a.dev",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        <noscript>
          <style>{`@media(max-width:700px){.site-header{height:auto;min-height:84px;flex-wrap:wrap;padding-block:18px;gap:14px}.navigation{display:flex;position:static;flex-basis:100%;padding:0;border:0;box-shadow:none;background:none;gap:22px;justify-content:space-between;font-size:12px}.menu-toggle{display:none}}.area-controls,.email-group>button{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
