import { PLANS } from "@/constants";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

const TRUST_NAMES = ["Royal Palace Lawn", "Dream Garden", "Al-Madina Banquet"];

const PROBLEMS = [
  {
    icon: "fa-calendar-xmark",
    problem: "Double bookings & lost enquiries",
    solution: "Automatic double-booking protection",
  },
  {
    icon: "fa-utensils",
    problem: "Manual food & payment tracking",
    solution: "One-click food packages & payment history",
  },
  {
    icon: "fa-chart-line",
    problem: "No monthly revenue clarity",
    solution: "Real-time reports & profit tracking",
  },
];

const FEATURES = [
  {
    icon: "fa-th-large",
    name: "Dashboard Overview",
    desc: "See daily bookings, revenue and pending tasks at a glance.",
  },
  {
    icon: "fa-calendar-check",
    name: "Booking Management",
    desc: "Create and manage all bookings in one place.",
  },
  {
    icon: "fa-calendar-alt",
    name: "Smart Calendar",
    desc: "Visualize every event with live venue and date filters.",
  },
  {
    icon: "fa-shield-halved",
    name: "Double Booking Protection",
    desc: "The system blocks overlapping venue & time clashes.",
  },
  {
    icon: "fa-users",
    name: "Customer Management",
    desc: "Keep full profiles, phone and WhatsApp history.",
  },
  {
    icon: "fa-utensils",
    name: "Food & Catering",
    desc: "Track dishes, prices and food packages per event.",
  },
  {
    icon: "fa-bowl-food",
    name: "Custom Dishes & Categories",
    desc: "Build your own menu categories and dishes.",
  },
  {
    icon: "fa-box",
    name: "Food Packages",
    desc: "Bundle dishes into fixed per-person packages.",
  },
  {
    icon: "fa-credit-card",
    name: "Payment Management",
    desc: "Record advances and balances in a few clicks.",
  },
  {
    icon: "fa-file-pdf",
    name: "PDF Receipts",
    desc: "Generate clean receipts for every payment.",
  },
  {
    icon: "fa-file-invoice",
    name: "Quotations",
    desc: "Create detailed quotes and convert them to bookings.",
  },
  {
    icon: "fa-candy-cane",
    name: "Additional Services",
    desc: "Add decoration, sound and other services per event.",
  },
  {
    icon: "fa-chart-bar",
    name: "Reports & Profit",
    desc: "Monthly revenue, expenses and profit summaries.",
  },
  {
    icon: "fa-user-cog",
    name: "User Roles & Permissions",
    desc: "Control what each staff member can see and do.",
  },
  {
    icon: "fa-building",
    name: "Multi-Venue / Multi-Branch",
    desc: "Manage every lawn and branch from one account.",
  },
];

const STEPS = [
  {
    title: "Create booking",
    desc: "Add customer, event type, date and guest count in seconds.",
  },
  {
    title: "Select venue & package",
    desc: "Pick a venue, food package and additional services.",
  },
  {
    title: "System calculates & protects",
    desc: "Total is auto-calculated and double bookings are blocked.",
  },
  {
    title: "Collect & receipt",
    desc: "Record payments and generate a PDF receipt instantly.",
  },
];

const COMING_SOON = [
  "WhatsApp Automation",
  "Inventory",
  "Customer Portal",
  "AI",
  "Mobile App",
  "Advanced Accounting",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <i className="fas fa-ring"></i>
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Marriage<span className="text-indigo-600">Lawn</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Book a Demo
            </a>
          </div>

          <details className="group md:hidden">
            <summary className="flex list-none cursor-pointer items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100">
              <i className="fas fa-bars text-lg"></i>
            </summary>
            <div className="absolute right-4 top-16 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 block rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Book a Demo
              </a>
            </div>
          </details>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Venue Management for Pakistan
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Manage Your Marriage Lawn Business — All From One Dashboard
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Bookings, Calendar, Customers, Food, Payments, Quotations &
              Reports. Built for Pakistani marriage lawns and banquet halls.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/dashboard"
                className="w-full rounded-lg bg-indigo-600 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 sm:w-auto"
              >
                Start Free Trial
              </a>
              <a
                href="#how-it-works"
                className="w-full rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                <i className="fas fa-play mr-2 text-indigo-600"></i>Watch Demo
              </a>
            </div>
            <p className="mt-5 text-xs text-slate-500">
              No credit card required · Free 14-day trial · Setup in minutes
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <DashboardMockup />
          </div>

          <div className="mt-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Trusted by
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {TRUST_NAMES.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-500"
                >
                  <i className="fas fa-award text-indigo-500"></i>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM → SOLUTION */}
      <section id="why-us" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Stop Juggling Registers, Excel Sheets & WhatsApp
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Your whole operation on one dashboard — no more missed bookings or
              lost records.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div
                key={p.icon}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <i className={`fas ${p.icon} text-xl`}></i>
                  </span>
                  <i className="fas fa-arrow-right text-slate-300"></i>
                </div>
                <p className="mt-5 text-lg font-semibold text-slate-800 line-through decoration-red-300">
                  {p.problem}
                </p>
                <p className="mt-2 text-sm font-semibold text-emerald-600">
                  <i className="fas fa-check mr-1.5"></i>
                  {p.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything Your Lawn Needs — In One Place
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Fifteen core modules, purpose-built for a marriage lawn business.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <i className={`fas ${f.icon}`}></i>
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {f.name}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From Enquiry to Payment — Simplified
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Four simple steps from booking to receipt.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative text-center md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white md:mx-0">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for Pakistani Marriage Lawns & Banquet Halls
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            SaaS-ready — one business can never access another's data.
            Multi-branch supported.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {["Single Lawn", "Multi-Branch", "Banquet Halls", "Marquees"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Start with what you need. Upgrade as you grow.
            </p>
          </div>
          <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-indigo-600 bg-white shadow-xl shadow-indigo-600/10 lg:scale-105"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold tracking-wide text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{plan.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-slate-500">
                    Rs.
                  </span>
                  <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500">/month</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {plan.limits.map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.includes.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <i className="fas fa-check mt-0.5 text-emerald-500"></i>
                      {f}
                    </li>
                  ))}
                </ul>
                <p
                  className={`mt-6 text-xs ${plan.featured ? "font-semibold text-indigo-600" : "text-slate-500"}`}
                >
                  {plan.bestFor}
                </p>
                <a
                  href="/dashboard"
                  className={`mt-4 block rounded-lg px-5 py-3 text-center text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Start Free Trial
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What's Next
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Phase 2 features currently in development.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {COMING_SOON.map((f) => (
              <span
                key={f}
                className="rounded-full border border-dashed border-indigo-300 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700"
              >
                <i className="fas fa-rocket mr-2"></i>
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-indigo-600 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Run Your Lawn the Smart Way?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Get started in minutes. No credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/dashboard"
              className="w-full rounded-lg bg-white px-7 py-3.5 text-center text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 sm:w-auto"
            >
              Start Free Trial
            </a>
            <a
              href="#contact"
              className="w-full rounded-lg border border-indigo-300 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-900 py-16 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <i className="fas fa-ring"></i>
                </span>
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Marriage<span className="text-indigo-400">Lawn</span>
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                The complete management system for Pakistani marriage lawns and
                banquet halls.
              </p>
              <div className="mt-5 flex gap-3">
                {["fa-facebook", "fa-instagram", "fa-youtube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition hover:bg-indigo-600 hover:text-white"
                    aria-label={s}
                  >
                    <i className={`fab ${s}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Contact
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="mailto:hello@marriagelawn.app"
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <i className="fas fa-envelope w-4 text-indigo-400"></i>
                    hello@marriagelawn.app
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+923001234567"
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <i className="fas fa-phone w-4 text-indigo-400"></i>
                    +92 300 1234567
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/923001234567"
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <i className="fab fa-whatsapp w-4 text-indigo-400"></i>
                    WhatsApp: +92 300 1234567
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Product
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href="#pricing" className="transition hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#features" className="transition hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="transition hover:text-white">
                    Login / Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs">
            © {new Date().getFullYear()} MarriageLawn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-indigo-900/10">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400"></span>
        <span className="h-3 w-3 rounded-full bg-amber-400"></span>
        <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
        <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-left text-xs text-slate-400 ring-1 ring-slate-200">
          app.marriagelawn.com/dashboard
        </span>
      </div>
      <div className="flex">
        <div className="hidden w-48 shrink-0 border-r border-slate-200 bg-slate-50 p-4 sm:block">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-indigo-600"></span>
            <span className="h-3 w-20 rounded bg-slate-300"></span>
          </div>
          {[
            "Dashboard",
            "Bookings",
            "Calendar",
            "Customers",
            "Payments",
            "Reports",
          ].map((n, i) => (
            <div
              key={n}
              className={`mb-1.5 flex items-center gap-2 rounded-lg px-3 py-2 ${
                i === 1 ? "bg-indigo-100" : ""
              }`}
            >
              <span className="h-2.5 w-2.5 rounded bg-slate-300"></span>
              <span
                className={`h-2.5 rounded ${i === 1 ? "w-16 bg-indigo-400" : "w-12 bg-slate-200"}`}
              ></span>
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <span className="block h-3 w-28 rounded bg-slate-300"></span>
              <span className="mt-2 block h-2.5 w-40 rounded bg-slate-200"></span>
            </div>
            <span className="h-8 w-20 rounded-lg bg-indigo-600"></span>
          </div>
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              ["Total Revenue", "bg-emerald-500"],
              ["Active Bookings", "bg-indigo-500"],
              ["Due Payments", "bg-amber-500"],
            ].map(([label, dot]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 p-3"
              >
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`}></span>
                  <span className="text-[10px] text-slate-400">{label}</span>
                </div>
                <div className="mt-2 h-3 w-14 rounded bg-slate-300"></div>
              </div>
            ))}
          </div>
          <div className="mb-5 space-y-2">
            {[
              "Wedding — Royal Palace",
              "Valima — Al-Madina",
              "Nikkah — Dream Garden",
            ].map((b) => (
              <div
                key={b}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
              >
                <div>
                  <span className="block h-2.5 w-32 rounded bg-slate-300"></span>
                  <span className="mt-1.5 block h-2 w-20 rounded bg-slate-200"></span>
                </div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-medium text-indigo-600">
                  {b.split(" — ")[0]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex h-20 items-end gap-2 rounded-xl border border-slate-200 p-3">
            {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
              <div key={i} className="flex-1">
                <div
                  className={`w-full rounded-t ${i === 5 ? "bg-indigo-600" : "bg-indigo-200"}`}
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
