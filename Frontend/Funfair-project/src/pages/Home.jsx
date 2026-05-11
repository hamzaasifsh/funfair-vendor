import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import useGsapReveal from "../hooks/useGsapReveal";

const Home = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const carouselTouchStartRef = useRef(null);
  const [activeIdeaStep, setActiveIdeaStep] = useState(0);

  useGsapReveal(pageRef, []);

  const ideaSteps = [
    {
      title: "Create the idea",
      desc: "Turn a product, stall concept, or homemade item into a real online listing.",
      media: "/step-create-idea.mp4",
      mediaType: "video",
      label: "Plan",
    },
    {
      title: "Build your catalog",
      desc: "Add photos, prices, stock, and categories so customers understand what you sell.",
      media: "/step-build-catalog-card.mp4",
      mediaType: "video",
      label: "Organize",
    },
    {
      title: "Sell online",
      desc: "Share your store, take orders, and grow beyond only walk-in customers.",
      media: "/step-build-catalog.mp4",
      mediaType: "video",
      label: "Launch",
    },
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

  const showPreviousStep = () => {
    setActiveIdeaStep((current) =>
      current === 0 ? ideaSteps.length - 1 : current - 1
    );
  };

  const showNextStep = () => {
    setActiveIdeaStep((current) =>
      current === ideaSteps.length - 1 ? 0 : current + 1
    );
  };

  const handleCarouselTouchStart = (event) => {
    carouselTouchStartRef.current = event.touches[0].clientX;
  };

  const handleCarouselTouchEnd = (event) => {
    if (carouselTouchStartRef.current === null) return;

    const distance =
      carouselTouchStartRef.current - event.changedTouches[0].clientX;

    if (Math.abs(distance) > 48) {
      if (distance > 0) {
        showNextStep();
      } else {
        showPreviousStep();
      }
    }

    carouselTouchStartRef.current = null;
  };

  return (
    <div ref={pageRef} className="app-page overflow-x-hidden">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="page-wrap relative py-6 md:py-10">
          <div
            data-gsap="hero-pop"
            className="relative overflow-hidden rounded-xl bg-slate-950 shadow-2xl md:min-h-[720px]"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-slate-900 md:absolute md:inset-0 md:aspect-auto">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/landing-products.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Luxury products floating in a cinematic ecommerce scene"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent md:bg-gradient-to-r md:from-slate-950/90 md:via-slate-950/56 md:to-slate-950/20" />
              <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-slate-950/85 to-transparent md:block" />
            </div>

            <div className="relative z-10 flex px-5 py-7 md:min-h-[720px] md:items-end md:px-10 md:py-12 lg:px-14">
              <div className="max-w-3xl">
                <p data-gsap-hero-child className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                  Create an idea and sell online
                </p>
                <h1 data-gsap-hero-child className="mt-4 text-[2.55rem] font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                  Take your stall idea from local counter to online business.
                </h1>
                <p data-gsap-hero-child className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg md:leading-8">
                  Dukan helps vendors present products beautifully, manage
                  stock, receive orders, and build a digital shop customers can
                  visit from anywhere.
                </p>

                <div data-gsap-hero-child className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => navigate("/register")}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-100 active:scale-[0.99]"
                  >
                    Start Your Online Store
                  </button>
                  <button
                    onClick={() => navigate("/shop")}
                    className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur hover:bg-white/15 active:scale-[0.99]"
                  >
                    Explore Products
                  </button>
                </div>

                <div
                  data-gsap-hero-child
                  data-gsap-stagger
                  className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {landingStats.map(([value, label]) => (
                    <div
                  key={label}
                      className="rounded-xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur"
                    >
                      <p className="text-3xl font-extrabold md:text-2xl">{value}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-300 md:text-xs">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div data-gsap="fade-up" className="page-wrap relative z-10 py-10">
            <div className="mx-auto max-w-5xl">
            <div className="surface overflow-hidden rounded-xl bg-white/95 shadow-2xl backdrop-blur">
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
        </div>
      </section>

      <section className="page-wrap py-14">
        <div data-gsap="fade-up" className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">From idea to income</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              Build a business path customers can actually follow.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              A good online presence does more than show products. It explains
              what you sell, builds confidence, and makes the next step simple.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={showPreviousStep}
              className="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-xl font-extrabold text-slate-950 shadow-sm hover:bg-slate-50 active:scale-[0.98]"
              aria-label="Show previous business step"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={showNextStep}
              className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-xl font-extrabold text-white shadow-sm hover:bg-slate-800 active:scale-[0.98]"
              aria-label="Show next business step"
            >
              {">"}
            </button>
          </div>
        </div>

        <div
          data-gsap="pop"
          onTouchStart={handleCarouselTouchStart}
          onTouchEnd={handleCarouselTouchEnd}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80"
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIdeaStep * 100}%)` }}
          >
            {ideaSteps.map((step) => (
              <div
                key={step.title}
                className="min-w-full"
              >
                <div className="grid min-h-[520px] lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-950 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[520px]">
                    {step.mediaType === "video" ? (
                      <video
                        className="absolute inset-0 h-full w-full object-contain lg:object-cover"
                        src={step.media}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${step.title} video preview`}
                      />
                    ) : (
                      <img
                        className="absolute inset-0 h-full w-full object-contain lg:object-cover"
                        src={step.media}
                        alt={`${step.title} preview`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  </div>

                  <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                      {step.label}
                    </p>
                    <h3 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
                      {step.title}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                      {step.desc}
                    </p>
                    <div className="mt-7 h-1.5 w-20 rounded-full bg-slate-950" />
                    <div className="mt-8 flex gap-2">
                      {ideaSteps.map((dotStep, dotIndex) => (
                        <button
                          key={dotStep.title}
                          type="button"
                          onClick={() => setActiveIdeaStep(dotIndex)}
                          className={`h-2.5 rounded-full transition-all ${
                            activeIdeaStep === dotIndex
                              ? "w-9 bg-slate-950"
                              : "w-2.5 bg-slate-300 hover:bg-slate-400"
                          }`}
                          aria-label={`Show ${dotStep.title}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <div className="surface overflow-hidden rounded-xl bg-slate-950 shadow-xl">
              <div className="relative min-h-[460px] overflow-hidden">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/product-photography.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Muted cinematic product photography preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                    Product shoot
                  </span>
                  <span className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-extrabold text-emerald-950 shadow-lg">
                    Muted
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="max-w-sm text-2xl font-extrabold leading-tight text-white">
                    Show texture, color, and quality before customers buy.
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {["Light", "Angle", "Detail"].map((label) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/15 bg-white/10 p-3 text-center text-white backdrop-blur"
                      >
                        <p className="text-xs font-bold text-slate-300">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-extrabold">Sharp</p>
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

      <section className="page-wrap pb-16 pt-4">
        <div
          data-gsap="fade-up"
          className="surface overflow-hidden rounded-xl bg-white shadow-xl"
        >
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="bg-slate-950 p-8 text-white md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-300">
                Quality promise
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                Always sell fresh, safe, and well-packed products.
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                Dukan vendors should only list products that are fresh, clean,
                and ready for customers. Damaged, expired, broken, or unsafe
                products should never be sold.
              </p>

              <div data-gsap-stagger className="mt-7 grid gap-3">
                {[
                  ["Fresh products only", "Keep stock updated and remove anything old, expired, or unfit to sell."],
                  ["No damaged items", "Do not sell broken, leaking, torn, used, or defective products."],
                  ["Secure packaging", "Pack every order properly so it reaches the customer in good condition."],
                  ["Customer trust", "Good quality and careful delivery make customers come back again."],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/10 bg-white/10 p-4"
                  >
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] bg-slate-100">
              <img
                src="/quality-packaging.png"
                alt="Premium packaging and quality checked products"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute right-5 top-5 max-w-xs rounded-xl border border-white/60 bg-white/85 p-5 shadow-xl backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Vendor rule
                </p>
                <p className="mt-2 text-lg font-extrabold text-slate-950">
                  No broken products. Only perfect quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Foot />
    </div>
  );
};

export default Home;
