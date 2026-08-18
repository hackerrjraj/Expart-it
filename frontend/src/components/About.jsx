import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedIcon from "./AnimatedIcon";
import SectionWaveArt from "./SectionWaveArt";
import blobImage from "../assets/about-blob.png";

// Lazy-load the three.js bundle only once this section scrolls into view.
const ChromeSpringCanvas = lazy(() =>
  import("./three/AboutIcons").then((m) => ({ default: m.ChromeSpringCanvas }))
);

const EASE = [0.16, 1, 0.3, 1];

export default function About({
  eyebrow = "About Us",
  heading = "Welcome to modern time technology",
  paragraphs = [
    "Artificial Intelligence is all about teaching machines to think for themselves. Using advanced algorithms, AI helps computers learn, analyze, and respond just like a human would — making decisions faster and more accurately.",
    "AI can generally be categorized as either Narrow AI, optimized for specialized tasks like voice recognition or recommendation systems, or General AI, which aspires to match human intelligence by understanding and performing diverse tasks.",
  ],
  image = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
  ctaLabel = "Contact Us",
  ctaHref = "/#contact",
}) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-transparent py-24">
      <SectionWaveArt tone="blue" flip />

      {/* chrome spring, pinned to the section corner, independent of the columns */}
      <div className="absolute right-6 top-6 z-10 hidden h-36 w-36 sm:block lg:right-10 lg:h-40 lg:w-40">
        {inView && (
          <Suspense fallback={null}>
            <ChromeSpringCanvas />
          </Suspense>
        )}
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        {/* photo + fuzzy blob */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl">
            <img
              src={image}
              alt=""
              className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[520px]"
            />
          </div>

          <div className="absolute -left-10 -top-10 h-64 w-64 sm:-left-14 sm:-top-14 sm:h-80 sm:w-80">
            <AnimatedIcon
              src={blobImage}
              alt=""
              dropShadow="drop-shadow(0 25px 35px rgba(91,79,214,0.4))"
            />
          </div>
        </motion.div>

        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-agency-accent">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-agency-accent" />
            {eyebrow}
            <span className="h-px w-14 bg-white/20" />
          </span>

          <h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {heading}
          </h2>

          <div className="mt-6 max-w-lg space-y-4 text-white/60">
            {paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <a
            href={ctaHref}
            className="mt-8 inline-flex items-center rounded-full bg-agency-accent2 px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 ease-agency-ease hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,92,255,0.35)]"
          >
            {ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
