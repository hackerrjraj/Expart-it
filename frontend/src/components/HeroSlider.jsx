import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { skillsData } from "../data/skillsData";
import HeroProfile from "./HeroProfile";

const AUTOPLAY_MS = 6000;
const EASE = [0.16, 1, 0.3, 1];

const bgVariants = {
  enter: { opacity: 0, scale: 1.15 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { duration: 0.85, ease: EASE }, scale: { duration: 6, ease: "linear" } },
  },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: EASE } },
};

const textContainer = {
  enter: {},
  center: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  exit: {},
};

const textItem = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } },
};

export default function HeroSlider() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const total = skillsData.length;
  const active = skillsData[index];

  const goTo = useCallback(
    (newIndex, dir) => {
      const wrapped = (newIndex + total) % total;
      setIndex([wrapped, dir]);
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, isPaused, next]);

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative h-[calc(75vh+100px)] min-h-[580px] max-h-[820px] w-full overflow-hidden bg-agency-bg"
    >
      {/* Background slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={active.id}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={active.image}
            alt={active.title}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-agency-bg via-agency-bg/60 to-agency-bg/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-agency-bg/90 via-agency-bg/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Skill index counter, top-right */}
      <div className="absolute right-6 top-28 z-10 hidden items-center gap-2 font-display text-sm text-white/60 lg:right-10 lg:flex">
        <span className="text-2xl font-semibold text-white">{active.index}</span>
        <span>/ {String(total).padStart(2, "0")}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end gap-10 px-6 pb-28 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10 lg:pb-0 xl:gap-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            variants={textContainer}
            initial="enter"
            animate="center"
            exit="exit"
            className="min-w-0 max-w-2xl lg:max-w-md xl:max-w-lg"
          >
            <motion.span
              variants={textItem}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-agency-accent backdrop-blur-sm"
            >
              {active.subtitle}
            </motion.span>

            <motion.h1
              variants={textItem}
              className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-5xl xl:text-6xl"
            >
              {active.title}
            </motion.h1>

            <motion.p
              variants={textItem}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/70 lg:text-lg"
            >
              {active.description}
            </motion.p>

            <motion.div variants={textItem} className="mt-9">
              <Link
                to={`/services/${active.id}`}
                className="group inline-flex items-center gap-3 rounded-full bg-agency-accent px-7 py-3.5 text-sm font-semibold text-agency-bg transition-transform duration-200 ease-agency-ease hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(199,255,61,0.35)]"
              >
                {active.cta}
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 ease-agency-ease group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <HeroProfile />
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Bullet indicators */}
        <div className="flex items-center gap-3">
          {skillsData.map((skill, i) => (
            <button
              key={skill.id}
              aria-label={`Go to ${skill.title}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className="group relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-all duration-300 ease-agency-ease"
              style={{ width: i === index ? 40 : 18 }}
            >
              {i === index && (
                <motion.span
                  layoutId="active-dot"
                  className="absolute inset-y-0 left-0 rounded-full bg-agency-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? undefined : "100%" }}
                  transition={{ duration: isPaused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Arrows */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 ease-agency-ease hover:border-agency-accent hover:bg-agency-accent hover:text-agency-bg"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 ease-agency-ease hover:border-agency-accent hover:bg-agency-accent hover:text-agency-bg"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
