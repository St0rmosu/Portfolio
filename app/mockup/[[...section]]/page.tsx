import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MockupLab from "@/components/mockups/MockupLab";
import { projects } from "@/components/mockups/data";
import "@fontsource-variable/space-grotesk";
import "./mockups.css";

export const metadata: Metadata = {
  title: "Lorenzo Recchia — Nuove direzioni per il portfolio",
  robots: { index: false, follow: false },
};
export default async function MockupPage({
  params,
  searchParams,
}: {
  params: Promise<{ section?: string[] }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const { section = [] } = await params;
  const { variant } = await searchParams;
  const page = section[0] || "profilo";
  if (!["profilo", "progetti", "certificazioni", "contatti"].includes(page))
    notFound();
  if (
    section.length > 2 ||
    (section[1] &&
      (page !== "progetti" || !projects.some((p) => p.slug === section[1])))
  )
    notFound();
  return (
    <MockupLab
      variant={variant === "E" || variant === "F" ? variant : "D"}
      page={page}
      slug={section[1]}
      overview={!variant && !section.length}
      reviewMode={
        process.env.NODE_ENV !== "production" ||
        process.env.VERCEL_ENV === "preview" ||
        process.env.MOCKUP_REVIEW === "1"
      }
    />
  );
}
