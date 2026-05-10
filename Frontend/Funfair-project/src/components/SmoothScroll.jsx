import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const getScrollLimit = () =>
  Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );

const clampScroll = (value) =>
  Math.min(Math.max(value, 0), getScrollLimit());

const isFormField = (element) =>
  element?.closest?.("input, textarea, select, [contenteditable='true']");

const hasScrollableParent = (element) => {
  let node = element;

  while (node && node !== document.body && node !== document.documentElement) {
    const style = window.getComputedStyle(node);
    const canScroll =
      /(auto|scroll)/.test(style.overflowY) &&
      node.scrollHeight > node.clientHeight;

    if (canScroll) return true;
    node = node.parentElement;
  }

  return false;
};

const SmoothScroll = () => {
  const location = useLocation();
  const frameRef = useRef(null);
  const targetRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return undefined;

    const html = document.documentElement;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    html.classList.add("smooth-scroll-active");

    const stopAnimation = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const animateToTarget = () => {
      const current = window.scrollY;
      const next = current + (targetRef.current - current) * 0.14;

      if (Math.abs(targetRef.current - current) < 0.6) {
        window.scrollTo(0, targetRef.current);
        frameRef.current = null;
        return;
      }

      window.scrollTo(0, next);
      frameRef.current = requestAnimationFrame(animateToTarget);
    };

    const scrollToTarget = (nextTarget) => {
      targetRef.current = clampScroll(nextTarget);

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(animateToTarget);
      }
    };

    const handleWheel = (event) => {
      if (event.ctrlKey || hasScrollableParent(event.target)) return;

      event.preventDefault();
      scrollToTarget(targetRef.current + event.deltaY * 1.05);
    };

    const keyScrollDistances = {
      ArrowDown: 90,
      ArrowUp: -90,
      PageDown: window.innerHeight * 0.86,
      PageUp: -window.innerHeight * 0.86,
      Home: -Infinity,
      End: Infinity,
      " ": window.innerHeight * 0.86,
    };

    const handleKeyDown = (event) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isFormField(event.target) ||
        !(event.key in keyScrollDistances)
      ) {
        return;
      }

      event.preventDefault();

      const distance =
        event.shiftKey && event.key === " "
          ? -keyScrollDistances[event.key]
          : keyScrollDistances[event.key];

      if (distance === Infinity) {
        scrollToTarget(getScrollLimit());
      } else if (distance === -Infinity) {
        scrollToTarget(0);
      } else {
        scrollToTarget(targetRef.current + distance);
      }
    };

    const syncTarget = () => {
      if (!frameRef.current) targetRef.current = window.scrollY;
    };

    targetRef.current = window.scrollY;
    window.addEventListener("scroll", syncTarget, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    if (!isTouchDevice) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      stopAnimation();
      html.classList.remove("smooth-scroll-active");
      window.removeEventListener("scroll", syncTarget);
      window.removeEventListener("keydown", handleKeyDown);

      if (!isTouchDevice) {
        window.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    targetRef.current = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
};

export default SmoothScroll;
