import React from "react";

export function Card({ className = "", children }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] " +
        className
      }
    >
      {children}
    </div>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 " +
        "outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10 transition " +
        className
      }
      {...props}
    />
  );
}

export function Button({ className = "", variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition active:scale-[0.98]";

  const styles =
    variant === "ghost"
      ? "bg-white/0 hover:bg-white/10 border border-white/10 text-white"
      : variant === "danger"
      ? "bg-red-500/90 hover:bg-red-500 text-white"
      : "bg-white text-black hover:bg-white/90";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}

export function Label({ children }) {
  return <div className="text-sm text-white/70 mb-1">{children}</div>;
}

export function Divider({ className = "" }) {
  return <div className={"h-px bg-white/10 " + className} />;
}