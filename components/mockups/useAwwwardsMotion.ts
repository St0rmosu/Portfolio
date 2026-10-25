"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function useAwwwardsMotion(
  root: RefObject<HTMLDivElement | null>,
  pageKey: string,
) {
  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const element = root.current!;
      const lenis = new Lenis({
        duration: 0.9,
        smoothWheel: true,
        anchors: true,
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      let resetPointer = () => {};
      let removePointer = () => {};
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        // Content stays opaque and readable during the entire intro.
        const introWords = element.querySelectorAll(".aw-intro .aw-title-word");
        if (introWords.length)
          intro.fromTo(
            introWords,
            { y: 17, rotation: 1 },
            {
              y: 0,
              rotation: 0,
              stagger: 0.07,
              duration: 0.9,
              clearProps: "all",
            },
            0,
          );
        const hero = element.querySelector(".aw-hero-media");
        if (hero)
          intro.fromTo(
            hero,
            { scale: 1.025 },
            { scale: 1, duration: 1.5, clearProps: "transform" },
            0,
          );
        const support = element.querySelectorAll(".aw-intro-support");
        if (support.length)
          intro.fromTo(
            support,
            { y: 7 },
            { y: 0, duration: 0.8, clearProps: "transform" },
            0.15,
          );
        element
          .querySelectorAll<HTMLElement>(".aw-section")
          .forEach((section) => {
            const words = section.querySelectorAll(".aw-title-word");
            if (words.length)
              gsap.fromTo(
                words,
                { y: 12 },
                {
                  y: 0,
                  stagger: 0.06,
                  duration: 0.75,
                  ease: "power3.out",
                  clearProps: "transform",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 92%",
                    once: true,
                  },
                },
              );
            const media = section.querySelector(".aw-section-media");
            if (media)
              gsap.fromTo(
                media,
                { x: 12 },
                {
                  x: 0,
                  duration: 1,
                  clearProps: "transform",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 92%",
                    once: true,
                  },
                },
              );
          });
        const drift = element.querySelector(".aw-drift-layer");
        const scene = element.querySelector(".h-hero");
        if (drift && scene)
          gsap.fromTo(
            drift,
            { yPercent: -2 },
            {
              yPercent: 2,
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        const surface = element.querySelector<HTMLElement>(
          ".aw-pointer-surface",
        );
        const layer = surface?.querySelector<HTMLElement>(".aw-pointer-layer");
        if (surface && layer && window.matchMedia("(pointer: fine)").matches) {
          const x = gsap.quickTo(layer, "x", {
            duration: 0.65,
            ease: "power3.out",
          });
          const y = gsap.quickTo(layer, "y", {
            duration: 0.65,
            ease: "power3.out",
          });
          const rotation = gsap.quickTo(layer, "rotation", {
            duration: 0.7,
            ease: "power3.out",
          });
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const rect = surface.getBoundingClientRect();
            x(((event.clientX - rect.left) / rect.width - 0.5) * 12);
            y(((event.clientY - rect.top) / rect.height - 0.5) * 8);
            rotation(((event.clientX - rect.left) / rect.width - 0.5) * 1.4);
          };
          resetPointer = () => {
            x(0);
            y(0);
            rotation(0);
          };
          surface.addEventListener("pointermove", move, { passive: true });
          surface.addEventListener("pointerleave", resetPointer);
          window.addEventListener("blur", resetPointer);
          removePointer = () => {
            surface.removeEventListener("pointermove", move);
            surface.removeEventListener("pointerleave", resetPointer);
            window.removeEventListener("blur", resetPointer);
          };
        }
      }, element);
      let active = true;
      const refresh = () => {
        if (active) ScrollTrigger.refresh();
      };
      document.fonts.ready.then(refresh);
      const images = Array.from(element.querySelectorAll("img")).filter(
        (image) => !image.complete,
      );
      images.forEach((image) =>
        image.addEventListener("load", refresh, { once: true }),
      );
      const visibility = () => {
        resetPointer();
        if (document.hidden) lenis.stop();
        else {
          lenis.start();
          refresh();
        }
      };
      document.addEventListener("visibilitychange", visibility);
      return () => {
        active = false;
        removePointer();
        document.removeEventListener("visibilitychange", visibility);
        images.forEach((image) => image.removeEventListener("load", refresh));
        gsap.ticker.remove(tick);
        lenis.destroy();
        context.revert();
      };
    });
    return () => media.revert();
  }, [root, pageKey]);
}
