import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Add Products",
      desc: "Easily add clothing, beauty, food, accessories and more.",
      color: "bg-blue-50",
    },
    {
      title: "Track Stock",
      desc: "Keep inventory updated so buyers always see correct stock.",
      color: "bg-emerald-50",
    },
    {
      title: "Vendor Dashboard",
      desc: "View total products, stock, inventory value and earnings.",
      color: "bg-purple-50",
    },
    {
      title: "More Coming",
      desc: "Orders, image uploads, delivery features and analytics next.",
      color: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 overflow-x-hidden">
      <Navbar />

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl animate-floatSlow" />
        <div className="absolute top-40 right-10 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl animate-floatSlow2" />
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl animate-floatSlow" />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-md border p-8 md:p-12 opacity-0 animate-fadeSlideUp">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="opacity-0 animate-fadeSlideLeft [animation-delay:120ms] [animation-fill-mode:forwards]">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                Funfair Vendor Platform
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Sell your products online with your own vendor dashboard
              </h1>

              <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-xl">
                Manage products, stock, pricing, and your seller account from one
                simple dashboard built for funfair vendors.
              </p>
              <div className="mt-8">
            <button
           onClick={() => navigate("/register")}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
             >
            Start Selling on Funfair
          </button>
             </div>
            </div>

            <div className="grid grid-cols-2 gap-4 opacity-0 animate-fadeSlideRight [animation-delay:220ms] [animation-fill-mode:forwards]">
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  className={`${card.color} rounded-2xl p-5 border transform transition-all duration-500 hover:-translate-y-3 hover:rotate-[0.5deg] hover:shadow-xl opacity-0 animate-fadeSlideUp`}
                  style={{
                    animationDelay: `${300 + i * 120}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="text-slate-600 mt-2 text-sm">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 opacity-0 animate-fadeSlideUp [animation-delay:200ms] [animation-fill-mode:forwards]">
          Why use this seller platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Products",
              desc: "Add, view, edit and delete your own products securely with vendor login.",
            },
            {
              title: "Inventory",
              desc: "Track stock levels and total inventory value from your dashboard.",
            },
            {
              title: "Growth Ready",
              desc: "Orders, product images, earnings, analytics and more can be added next.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-fadeSlideUp"
              style={{
                animationDelay: `${250 + i * 140}ms`,
                animationFillMode: "forwards",
              }}
            >
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-600 mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-fadeSlideUp [animation-delay:300ms] [animation-fill-mode:forwards]">
          <div>
            <h2 className="text-3xl font-extrabold">
              Start managing your stall smarter
            </h2>
            <p className="text-blue-100 mt-2">
              Register now and begin adding products to your vendor dashboard.
            </p>
          </div>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 hover:-translate-y-1 transition-all duration-300 shadow"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;