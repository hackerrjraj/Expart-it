import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonialsData } from "../data/testimonialsData";

const ChromeSpringCanvas = lazy(() =>
  import("./three/AboutIcons").then((m) => ({ default: m.ChromeSpringCanvas }))
);

const EASE = [0.16, 1, 0.3, 1];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function Testimonials({ testimonials = testimonialsData }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;
  const active = testimonials[activeIndex];
  const hasMultiple = total > 1;

  const next = () => setActiveIndex((i) => (i + 1) % total);
  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);

  return (
    <section className="relative overflow-hidden bg-agency-cream pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-sm lg:p-14">
          {/* decorative chrome rings, approximating the reference layout */}
          <div className="pointer-events-none absolute -right-10 top-0 hidden h-40 w-40 opacity-60 sm:block">
            <Suspense fallback={null}>
              <ChromeSpringCanvas />
            </Suspense>
          </div>
          <div className="pointer-events-none absolute -right-24 bottom-0 hidden h-32 w-32 opacity-40 sm:block">
            <Suspense fallback={null}>
              <ChromeSpringCanvas />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* left column: heading + stat */}
            <div>
              <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-agency-accent2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-agency-accent2" />
                Testimonial
              </span>
              <h2 className="mt-5 max-w-md font-display text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
                Hear what our clients say about our services
              </h2>

              <div className="mt-8">
                <p className="text-4xl font-bold text-slate-900">65k</p>
                <p className="mt-1 text-sm font-semibold text-agency-accent2">Clients Served</p>
              </div>
            </div>

            {/* right column: testimonial carousel card */}
            <div className="relative z-10 rounded-2xl bg-gray-50 p-6 shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">{active.rating.toFixed(1)}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className="fill-agency-accent2 text-agency-accent2" />
                      ))}
                    </div>
                  </div>

                  <p className="mt-5 min-h-[110px] text-sm leading-relaxed text-slate-700">{active.quote}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                    <div className="flex items-center gap-3">
                      <img src={active.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{active.name}</p>
                        <p className="text-xs text-slate-500">{active.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prev}
                        disabled={!hasMultiple}
                        aria-label="Previous testimonial"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-150 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        disabled={!hasMultiple}
                        aria-label="Next testimonial"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-150 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* blog teaser strip — header only, the post grid is a future task */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-agency-accent2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-agency-accent2" />
              Latest Blogs
            </span>
            {/* placeholder destination — no blog listing page yet */}
            <a
              href="#blog"
              className="inline-flex items-center rounded-full bg-agency-accent2 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-agency-ease hover:-translate-y-0.5"
            >
              More Articles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
