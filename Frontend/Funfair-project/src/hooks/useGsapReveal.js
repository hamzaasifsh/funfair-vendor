import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapReveal = (scopeRef, deps = []) => {
  useEffect(() => {
    if (!scopeRef.current) return undefined;

    const cleanupFns = [];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray("[data-gsap='fade-up']");
      const popItems = gsap.utils.toArray("[data-gsap='hero-pop']");
      const popCards = gsap.utils.toArray("[data-gsap='pop']");
      const slideLeftItems = gsap.utils.toArray("[data-gsap='slide-left']");
      const slideRightItems = gsap.utils.toArray("[data-gsap='slide-right']");
      const floatItems = gsap.utils.toArray("[data-gsap='float']");
      const barGroups = gsap.utils.toArray("[data-gsap-bars]");
      const hoverItems = gsap.utils.toArray("[data-gsap-hover='lift']");
      const staggerGroups = gsap.utils.toArray("[data-gsap-stagger]");

      if (prefersReducedMotion) {
        gsap.set(
          [
            ...revealItems,
            ...popItems,
            ...popCards,
            ...slideLeftItems,
            ...slideRightItems,
            ...floatItems,
            ...staggerGroups.flatMap((group) => Array.from(group.children)),
          ],
          {
            autoAlpha: 1,
            clearProps: "transform",
          }
        );
        return;
      }

      popItems.forEach((item) => {
        const children = gsap.utils.toArray(
          "[data-gsap-hero-child]",
          item
        );

        gsap
          .timeline()
          .fromTo(
            item,
            { autoAlpha: 0, y: 34, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "back.out(1.35)",
            }
          )
          .fromTo(
            children,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.08,
            },
            "-=0.45"
          );
      });

      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      popCards.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 26, scale: 0.9, rotate: -1.5 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.72,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      slideLeftItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: -42 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      slideRightItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: 42 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      floatItems.forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 2.6 + index * 0.18,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      barGroups.forEach((group) => {
        const bars = Array.from(group.children);

        gsap.fromTo(
          bars,
          { scaleY: 0, transformOrigin: "bottom center" },
          {
            scaleY: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      hoverItems.forEach((item) => {
        const onEnter = () => {
          gsap.to(item, {
            y: -8,
            scale: 1.015,
            duration: 0.24,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        cleanupFns.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        });
      });

      staggerGroups.forEach((group) => {
        const items = Array.from(group.children);

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 28, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, scopeRef);

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, deps);
};

export default useGsapReveal;
