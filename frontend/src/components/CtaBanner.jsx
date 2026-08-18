import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWaveArt from "./SectionWaveArt";

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

// PLACEHOLDER — swap with the real robot-hand/human-hand illustration asset
const HAND_IMAGE = "https://picsum.photos/seed/expartit-cta-hands/900/900";

// Renders the same image twice, each clipped to one half. On scroll into
// view the top half drops in and the bottom half rises in, meeting in the
// middle. Reduced-motion users just get a plain fade, no slide.
function SplitImageReveal({ src, alt }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { y: -60, opacity: 0 }}
        whileInView={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
      </motion.div>

      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { y: 60, opacity: 0 }}
        whileInView={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="absolute inset-0"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
      </motion.div>
    </div>
  );
}

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-agency-cream py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-agency-bg">
          <SectionWaveArt tone="blue" />

          <div className="relative flex flex-col gap-10 p-10 md:flex-row md:items-center md:justify-between lg:p-16">
            <div className="max-w-md">
              <h2 className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                Experience of most updated technology advancement
              </h2>
              {/* placeholder destination — no dedicated contact page yet */}
              <a
                href="#contact"
                className="mt-8 inline-flex items-center rounded-full bg-agency-accent px-7 py-3.5 text-sm font-semibold text-agency-bg transition-transform duration-200 ease-agency-ease hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(199,255,61,0.35)]"
              >
                Contact Us
              </a>
            </div>

            <div className="w-full md:w-[45%]">
              <SplitImageReveal src={HAND_IMAGE} alt="Robotic and human hands reaching toward each other" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
