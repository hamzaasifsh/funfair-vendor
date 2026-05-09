export default function Foot() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="page-wrap grid gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-lg font-black text-slate-950">
              D
            </span>
            <div>
              <p className="text-xl font-extrabold">Dukan</p>
              <p className="text-sm text-slate-400">Vendor marketplace</p>
            </div>
          </div>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">
            Build your digital store, present products clearly, and keep every
            customer order simple, trusted, and ready to deliver.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
              Phone
            </p>
            <a
              href="tel:7507993613"
              className="mt-2 block font-semibold text-white hover:text-indigo-200"
            >
              7507993613
            </a>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
              Email
            </p>
            <a
              href="mailto:hamzaasif41100@gmail.com"
              className="mt-2 block break-all font-semibold text-white hover:text-indigo-200"
            >
              hamzaasif41100@gmail.com
            </a>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
              Location
            </p>
            <p className="mt-2 font-semibold text-white">
              pune, Maharashtra, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
