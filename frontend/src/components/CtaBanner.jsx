import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWaveArt from "./SectionWaveArt";
import handRobot from "../assets/hand-robot.png";
import handHuman from "../assets/hand-human.png";

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

// Robot hand drops in from the top, human hand rises from the bottom, their
// reaching fingertips meeting near the center — a Creation-of-Adam nod.
// Reduced-motion users just get a plain fade, no slide.
function HandsReveal() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative h-56 w-full sm:h-80 lg:h-[26rem]">
      <motion.img
        src={handRobot}
        alt=""
        draggable={false}
        initial={reducedMotion ? { opacity: 0 } : { y: -60, opacity: 0 }}
        whileInView={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute right-0 top-[2%] h-[60%] w-auto object-contain drop-shadow-2xl"
      />

      <motion.img
        src={handHuman}
        alt="Robotic and human hands reaching toward each other"
        draggable={false}
        initial={reducedMotion ? { opacity: 0 } : { y: 60, opacity: 0 }}
        whileInView={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="absolute bottom-[4%] left-[14%] h-[70%] w-auto object-contain drop-shadow-2xl"
      />
    </div>
  );
}

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-agency-cream py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-agency-bg">
          <SectionWaveArt tone="blue" />

          <div className="relative flex flex-col gap-8 p-10 md:flex-row md:items-center md:justify-between lg:p-16">
            <h2 className="max-w-sm font-display text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
              Experience of most updated technology advancement
            </h2>

            {/* placeholder destination — no dedicated contact page yet */}
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center rounded-full bg-agency-accent px-7 py-3.5 text-sm font-semibold text-agency-bg transition-transform duration-200 ease-agency-ease hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(199,255,61,0.35)] md:ml-6 md:self-center lg:ml-10"
            >
              Contact Us
            </a>

            <div className="w-full md:w-[34%]">
              <HandsReveal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
