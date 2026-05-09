import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useGsapReveal from "../hooks/useGsapReveal";

const Home = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useGsapReveal(pageRef, []);

  const ideaSteps = [
    ["Create the idea", "Turn a product, stall concept, or homemade item into a real online listing."],
    ["Build your catalog", "Add photos, prices, stock, and categories so customers understand what you sell."],
    ["Sell online", "Share your store, take orders, and grow beyond only walk-in customers."],
  ];

  const reasons = [
    {
      title: "Easy Marketing",
      desc: "Social media, SEO, and digital ads help attract targeted customers faster.",
    },
    {
      title: "Stay Competitive",
      desc: "In today's digital world, businesses without online selling risk losing customers to competitors.",
    },
    {
      title: "Open All Day",
      desc: "Your products can be discovered even after the stall closes, giving customers more time to buy.",
    },
    {
      title: "Customer Trust",
      desc: "A clean online store makes your business look organized, active, and easier to remember.",
    },
  ];

  const landingStats = [
    ["24/7", "Online reach"],
    ["3x", "More discovery channels"],
    ["Fast", "Product updates"],
  ];

  const sellCategories = [
    "Jackets",
    "Cosmetics",
    "Accessories",
    "Wholesale items",
    "Food items",
    "Groceries",
  ];

  return (
    <div ref={pageRef} className="app-page overflow-x-hidden">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="ai-video-bg" aria-hidden="true">
          <div className="ai-video-card left-[8%] top-[18%] hidden h-24 w-44 md:block" />
          <div className="ai-video-card bottom-[12%] left-[30%] h-16 w-32 [animation-delay:800ms]" />
          <div className="ai-video-card right-[12%] top-[22%] hidden h-20 w-36 [animation-delay:1400ms] lg:block" />
          <div className="ai-video-card bottom-[18%] right-[24%] h-28 w-48 [animation-delay:500ms]" />
        </div>

        <div className="page-wrap relative grid min-h-[680px] gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div data-gsap="fade-up" className="animate-fadeSlideLeft rounded-2xl bg-white/80 p-2 backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-0">
            <p className="eyebrow">Create an idea and sell online</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
              Take your stall idea from local counter to online business.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Dukan helps vendors present products beautifully, manage stock,
              receive orders, and build a digital shop customers can visit from
              anywhere.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate("/register")} className="btn-primary">
                Start Your Online Store
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="btn-secondary"
              >
                Explore Products
              </button>
            </div>

            <div data-gsap-stagger className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {landingStats.map(([value, label]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-gsap="fade-up" className="animate-fadeSlideRight">
            <div className="surface overflow-hidden rounded-xl bg-white/85 backdrop-blur">
              <div className="border-b border-slate-200 bg-slate-950 p-5 text-white">
                <p className="text-sm font-semibold text-indigo-200">
                  Dukan Store Builder
                </p>
                <h2 className="mt-2 text-3xl font-extrabold">
                  Your business dashboard
                </h2>
              </div>

              <div className="grid gap-4 p-5">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-500">
                      New order
                    </p>
                    <span className="status-pill bg-emerald-100 text-emerald-800">
                      Paid
                    </span>
                  </div>
                  <p className="mt-3 text-2xl font-extrabold text-slate-950">
                    Handmade Gift Box
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Customer discovered it from your online catalog.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-500">
                      Catalog items
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-950">
                      128
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-500">
                      Stock ready
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-950">
                      92%
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="font-bold text-indigo-950">
                    Share your store link on Instagram, WhatsApp, and Google.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-indigo-800">
                    Customers can browse before they arrive, remember your
                    products, and order when they are ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap py-14">
        <div data-gsap="fade-up" className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">From idea to income</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-5xl">
            Build a business path customers can actually follow.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A good online presence does more than show products. It explains
            what you sell, builds confidence, and makes the next step simple.
          </p>
        </div>

        <div data-gsap-stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {ideaSteps.map(([title, desc], index) => (
            <div
              key={title}
              className="metric-card opacity-0 animate-popFadeIn"
              style={{
                animationDelay: `${120 + index * 120}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-lg font-extrabold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="page-wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div data-gsap="fade-up">
            <p className="eyebrow">Why online business is important</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              Customers search, compare, and decide online first.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Even local sellers need a digital identity. It helps people find
              you faster, understand your products, and choose your store with
              more confidence.
            </p>
          </div>

          <div data-gsap-stagger className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article key={reason.title} className="surface rounded-xl p-5">
                <div className="mb-4 h-1.5 w-12 rounded-full bg-indigo-600" />
                <h3 className="text-xl font-bold text-slate-950">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {reason.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap py-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div data-gsap="fade-up" className="animate-softReveal">
            <p className="eyebrow">Marketing that looks premium</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              Good product photography makes your products look amazing.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Clear photos help customers understand quality, color, size, and
              style before they buy. A simple clean background, natural light,
              and sharp product angles can make even a small stall feel like a
              professional brand.
            </p>

            <div data-gsap-stagger className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ["Use bright light", "Shoot near a window or soft light so details look clear."],
                ["Keep backgrounds clean", "Use a plain wall, table, or cloth so the product stays focused."],
                ["Show real use", "Add one lifestyle photo so customers imagine owning it."],
                ["Capture details", "Close-up shots make handmade work, texture, and quality visible."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-gsap="fade-up" className="animate-softReveal [animation-delay:160ms]">
            <div className="surface overflow-hidden rounded-xl bg-white">
              <div className="min-h-[420px] bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_48%,#eef2ff_100%)] p-6">
                <div className="mx-auto mt-4 max-w-sm rounded-[2rem] border border-white bg-white/80 p-5 shadow-2xl backdrop-blur">
                  <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
                        Product shoot
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                        Ready
                      </span>
                    </div>
                    <div className="mt-8 grid h-56 place-items-center rounded-2xl bg-gradient-to-br from-rose-100 via-amber-100 to-white p-6">
                      <div className="relative h-36 w-36 rounded-3xl bg-white shadow-xl">
                        <div className="absolute -right-6 top-8 h-20 w-20 rounded-2xl bg-indigo-500 shadow-lg" />
                        <div className="absolute -left-5 bottom-5 h-16 w-16 rounded-full bg-amber-400 shadow-lg" />
                        <div className="absolute left-8 top-8 h-20 w-20 rounded-2xl bg-rose-500 shadow-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {["Light", "Angle", "Detail"].map((label) => (
                      <div key={label} className="rounded-xl bg-slate-100 p-3 text-center">
                        <p className="text-xs font-bold text-slate-500">{label}</p>
                        <p className="mt-1 text-sm font-extrabold text-slate-950">
                          Sharp
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap py-14">
        <div data-gsap="fade-up" className="surface grid overflow-hidden rounded-xl lg:grid-cols-2">
          <div className="bg-slate-950 p-8 text-white md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-300">
              Sell smarter
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Your products deserve a clean digital shelf.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Put your best products online, keep details updated, and guide
              shoppers from curiosity to checkout with a simple, professional
              store experience.
            </p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-200">
                Sell and buy almost anything your customers need:
              </p>
              <div data-gsap-stagger className="mt-4 flex flex-wrap gap-2">
                {sellCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="mt-8 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              Create Vendor Account
            </button>
          </div>

          <div data-gsap-stagger className="grid gap-4 p-6 md:p-8">
            {[
              ["Better discovery", "Customers can find your products before visiting."],
              ["More trust", "Clear details, photos, and prices reduce confusion."],
              ["Faster decisions", "A polished catalog makes buying feel easier."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
