import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapReveal = (scopeRef, deps = []) => {
  useEffect(() => {
    if (!scopeRef.current) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray("[data-gsap='fade-up']");
      const staggerGroups = gsap.utils.toArray("[data-gsap-stagger]");

      if (prefersReducedMotion) {
        gsap.set([...revealItems, ...staggerGroups.flatMap((group) => Array.from(group.children))], {
          autoAlpha: 1,
          clearProps: "transform",
        });
        return;
      }

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

    return () => ctx.revert();
  }, deps);
};

export default useGsapReveal;
