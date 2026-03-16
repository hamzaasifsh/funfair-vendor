import React from "react";
import { Card } from "./ui";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Branding */}
          <div className="hidden md:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Vendor Panel • Funfair
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Manage your stall like a <span className="text-white/70">pro</span>.
            </h1>
            <p className="mt-4 text-white/60 leading-relaxed">
              Add products, track inventory, and run your funfair business from one clean dashboard.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Fast Setup", "Register & start selling quickly"],
                ["Secure Login", "JWT-based vendor auth"],
                ["Vendor Products", "Only see what’s yours"],
                ["Modern UI", "Mobile-friendly layout"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-white/60 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form Card */}
          <Card className="p-6 md:p-8">
            <div className="mb-6">
              <div className="text-2xl font-bold">{title}</div>
              <div className="text-white/60 text-sm mt-1">{subtitle}</div>
            </div>

            {children}

            <div className="mt-6 text-xs text-white/40">
              Tip: Use a strong password. You can logout anytime from dashboard.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}