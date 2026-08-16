"use client";

import React, { useMemo } from "react";
import { marked } from "marked";

interface MarkdownViewerProps {
  markdown: string;
  repoName?: string;
}

export default function MarkdownViewer({ markdown, repoName }: MarkdownViewerProps) {
  const htmlContent = useMemo(() => {
    if (!markdown) return "";

    let processed = markdown;

    // 1. Process GitHub Alert Callouts: > [!WARNING], > [!NOTE], > [!TIP], > [!IMPORTANT], > [!CAUTION]
    processed = processed.replace(
      />\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([\s\S]*?)(?=\n\n|\n#{1,6}\s+|$)/gi,
      (_, type, content) => {
        const cleanType = type.toUpperCase();
        const body = content.replace(/^>\s?/gm, "").trim();
        return `\n\n<div class="md-alert md-alert-${cleanType.toLowerCase()}"><div class="md-alert-header"><span class="md-alert-badge">${cleanType}</span></div><div class="md-alert-body">${body}</div></div>\n\n`;
      }
    );

    // 2. Collapse consecutive badge lines into a single row (avoiding <br> between badges)
    processed = processed.replace(
      /(!\[[^\]]*\]\([^)]*(?:shields\.io|badge)[^)]*\))\s*\n(?=\s*(!\[|\[!\[))/gi,
      "$1 "
    );
    processed = processed.replace(
      /(\[!\[[^\]]*\]\([^)]*(?:shields\.io|badge)[^)]*\)\]\([^)]+\))\s*\n(?=\s*(\[!\[|!\[))/gi,
      "$1 "
    );

    // 3. Fix relative images/assets and video tags
    if (repoName) {
      processed = processed.replace(
        /!\[(.*?)\]\(((?!https?:\/\/|data:|\/\/)[^)]+)\)/g,
        (_, alt, path) => {
          const cleanPath = path.replace(/^\.?\//, "");
          return `![${alt}](https://raw.githubusercontent.com/St0rmosu/${repoName}/main/${cleanPath})`;
        }
      );

      // Fix HTML <video src="..."> and <source src="..."> tags with local/raw fallback
      processed = processed.replace(
        /<video\b([^>]*?)\bsrc=["']([^"']+)["']([^>]*?)>([\s\S]*?)<\/video>/gi,
        (_, before, src, after, inner) => {
          const isLocalVideo = src.includes("LogoRadio.mp4");
          const videoSrc = isLocalVideo
            ? "/videos/LogoRadio.mp4"
            : src.startsWith("http")
            ? src
            : `https://raw.githubusercontent.com/St0rmosu/${repoName}/main/${src.replace(/^\.?\//, "")}`;
          return `<div class="pdetail-video-wrapper"><video ${before} src="${videoSrc}" ${after} controls playsinline preload="metadata" class="pdetail-video-player"><source src="${videoSrc}" type="video/mp4" />${inner}</video></div>`;
        }
      );
    }

    // 4. Configure marked renderer
    const renderer = new marked.Renderer();

    // Custom link renderer: parse inner tokens so [![Badge](url)](link) renders <img /> rather than literal string
    renderer.link = function ({ href, title, text, tokens }) {
      const titleAttr = title ? ` title="${title}"` : "";
      const rawInner = tokens ? (this.parser.parseInline(tokens) as string) : (marked.parseInline(text) as string);
      const innerHtml = typeof rawInner === "string" ? rawInner : text;
      const isBadgeLink =
        innerHtml.includes("<img") ||
        innerHtml.includes("md-badge-img") ||
        href.includes("shields.io") ||
        href.includes("badge");
      const cls = isBadgeLink ? "md-badge-link" : "md-link";
      return `<a href="${href}" target="_blank" rel="noreferrer"${titleAttr} class="${cls}">${innerHtml}</a>`;
    };

    // Custom image renderer: handle badges, binary files and standard images
    renderer.image = function ({ href, title, text }) {
      if (!href) return "";

      const isBinaryFile = /\.(jar|zip|tar\.gz|tgz|rar|7z|bin|exe|pdf)(\?|$)/i.test(href);
      if (isBinaryFile) {
        const filename = text || href.split("/").pop()?.split("?")[0] || "Download asset";
        return `<div class="md-file-download-box"><span class="md-file-icon">📦</span> <span class="md-file-name">${filename}</span> <a href="${href}" target="_blank" rel="noreferrer" class="pdetail-stack-chip">Download ↗</a></div>`;
      }

      const isBadge =
        href.includes("shields.io") ||
        href.includes("badge") ||
        href.includes("img.shields");
      const titleAttr = title ? ` title="${title}"` : "";

      if (isBadge) {
        return `<img src="${href}" alt="${text || "badge"}" class="md-badge-img"${titleAttr} loading="lazy" />`;
      }
      return `<img src="${href}" alt="${text || "image"}" class="md-img"${titleAttr} loading="lazy" onerror="this.style.display='none'" />`;
    };

    // Custom table renderer with responsive wrapper
    renderer.table = function (token) {
      const header = token.header
        .map(
          (cell) =>
            `<th class="md-th" style="text-align: ${cell.align || "left"}">${
              cell.tokens ? (this.parser.parseInline(cell.tokens) as string) : cell.text
            }</th>`
        )
        .join("");

      const rows = token.rows
        .map((row) => {
          const rowCells = row
            .map(
              (cell) =>
                `<td class="md-td" style="text-align: ${cell.align || "left"}">${
                  cell.tokens ? (this.parser.parseInline(cell.tokens) as string) : cell.text
                }</td>`
            )
            .join("");
          return `<tr class="md-tr">${rowCells}</tr>`;
        })
        .join("");

      return `<div class="md-table-wrapper"><table class="md-table"><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>`;
    };

    // Custom code block renderer with styling
    renderer.code = function ({ text, lang }) {
      const language = lang || "code";
      const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<div class="md-code-block-wrapper"><div class="md-code-header"><span class="md-code-lang">${language}</span></div><pre class="md-pre"><code>${escaped}</code></pre></div>`;
    };

    try {
      return marked.parse(processed, {
        gfm: true,
        breaks: true,
        renderer,
      }) as string;
    } catch {
      return markdown;
    }
  }, [markdown, repoName]);

  return (
    <div
      className="md-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
