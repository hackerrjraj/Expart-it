import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import SectionWaveArt from "./SectionWaveArt";

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

function useCanHover() {
  const [canHover, setCanHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return canHover;
}

// Stylized laurel-wreath badge: two mirrored arcs of leaves wrapping the
// lower half of a circle, with a small play triangle pinned at the center.
// The wreath spins very slowly at idle and speeds up while its row is
// hovered; the play triangle stays upright and just pops slightly.
function LaurelBadge({ hovered = false }) {
  const reducedMotion = usePrefersReducedMotion();
  const offsets = [14, 30, 46, 62, 78];
  const leaf = (deg, key) => (
    <g key={key} transform={`rotate(${deg} 28 28)`}>
      <ellipse cx="28" cy="10" rx="2.4" ry="5.2" fill="currentColor" opacity="0.8" />
    </g>
  );

  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center text-white/60">
      <motion.div
        animate={reducedMotion ? { scale: hovered ? 1.12 : 1 } : { rotate: 360, scale: hovered ? 1.12 : 1 }}
        transition={{
          rotate: reducedMotion ? undefined : { duration: hovered ? 7 : 32.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.25, ease: EASE },
        }}
        className="h-14 w-14"
      >
        <svg viewBox="0 0 56 56" className="h-14 w-14" fill="none">
          <circle cx="28" cy="28" r="19" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
          {offsets.map((o, i) => leaf(180 + o, `l${i}`))}
          {offsets.map((o, i) => leaf(180 - o, `r${i}`))}
        </svg>
      </motion.div>
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="absolute"
      >
        <Play className="h-3.5 w-3.5 fill-white text-white" />
      </motion.div>
    </div>
  );
}

// "Winner" gets a soft breathing glow ring behind the pill; "Nominated"
// stays neutral and static.
function StatusPill({ status }) {
  const reducedMotion = usePrefersReducedMotion();
  const isWinner = status.toLowerCase() === "winner";

  return (
    <span
      className={`relative mt-1.5 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        isWinner ? "bg-agency-accent/10 text-agency-accent" : "bg-white/10 text-white/50"
      }`}
    >
      {isWinner && !reducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-full bg-agency-accent/25"
          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span className="relative">{status}</span>
    </span>
  );
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -30 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.4, ease: EASE } },
};
const slideLeftVariants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};
const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
const slideRightVariants = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

const DEFAULT_AWARDS = [
  {
    id: "digita-award",
    name: "Digita\nAward",
    date: "August 12, 2024",
    title: "Digital Agency the Year, 2024",
    status: "Winner",
    certificateImage: "https://picsum.photos/seed/expartit-award-1/640/440",
  },
  {
    id: "futuretech-award",
    name: "FutureTech\nAward",
    date: "August 12, 2024",
    title: "Leading Digital Agency, 2024",
    status: "Nominated",
    certificateImage: "https://picsum.photos/seed/expartit-award-2/640/440",
  },
  {
    id: "creator-award",
    name: "Creator\nAward",
    date: "August 12, 2024",
    title: "Premier Digital Agency, 2024",
    status: "Winner",
    certificateImage: "https://picsum.photos/seed/expartit-award-3/640/440",
  },
  {
    id: "genius-honor",
    name: "Genius\nHonor",
    date: "August 12, 2024",
    title: "Best Innovative Agency, 2024",
    status: "Nominated",
    certificateImage: "https://picsum.photos/seed/expartit-award-4/640/440",
  },
];

export default function AwardsSection({
  eyebrow = "Our Awards",
  heading = "The recognitions we received over the years",
  awards = DEFAULT_AWARDS,
}) {
  const reducedMotion = usePrefersReducedMotion();
  const canHover = useCanHover();
  const [hoveredId, setHoveredId] = useState(null);
  const hoveredAward = awards.find((a, idx) => (a.id ?? idx) === hoveredId) ?? null;

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springOpts = { stiffness: 160, damping: 22, mass: 0.6 };
  const springX = useSpring(mouseX, springOpts);
  const springY = useSpring(mouseY, springOpts);
  const followX = reducedMotion ? mouseX : springX;
  const followY = reducedMotion ? mouseY : springY;

  const handleListMouseMove = (e) => {
    if (!canHover) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  const handleListMouseLeave = () => {
    if (!canHover) return;
    setHoveredId(null);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-24">
      <SectionWaveArt tone="violet" flip />

      {/* metallic shape, cropped into the top-right corner, purely decorative */}
      <div className="pointer-events-none absolute -right-12 -top-16 hidden h-64 w-64 opacity-90 md:block lg:h-80 lg:w-80">
        {inView && (
          <Suspense fallback={null}>
            <ChromeSpringCanvas />
          </Suspense>
        )}
      </div>

      {/* cursor-follow certificate preview */}
      {canHover && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-50"
          style={{ x: followX, y: followY }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: hoveredAward ? 1 : 0,
              scale: hoveredAward ? 1 : 0.92,
            }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative -mt-[130%] h-[220px] w-[300px] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10"
          >
            <AnimatePresence>
              {hoveredAward && (
                <motion.img
                  key={hoveredAward.id}
                  src={hoveredAward.certificateImage}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-agency-accent">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-agency-accent" />
            {eyebrow}
            <span className="h-px w-14 bg-white/20" />
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {heading}
          </h2>
        </motion.div>

        <div
          className="mt-16 border-b border-white/10"
          onMouseMove={handleListMouseMove}
          onMouseLeave={handleListMouseLeave}
        >
          {awards.map((award, i) => {
            const rowId = award.id ?? i;
            const isRowHovered = hoveredId === rowId;
            return (
              <motion.div
                key={rowId}
                initial={reducedMotion ? undefined : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.05, delayChildren: i * 0.075 }}
                onMouseEnter={() => canHover && setHoveredId(rowId)}
                className="group flex flex-col gap-3 border-t border-white/10 py-7 transition-colors duration-150 hover:bg-white/[0.03] sm:grid sm:grid-cols-[220px_140px_1fr_28px] sm:items-center sm:gap-8"
              >
                <div className="flex min-w-0 items-center justify-between gap-4 sm:contents">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4">
                    <motion.div variants={badgeVariants}>
                      <LaurelBadge hovered={isRowHovered} />
                    </motion.div>
                    <motion.span
                      variants={slideLeftVariants}
                      className="whitespace-pre-line text-lg font-bold leading-snug text-white sm:text-xl"
                    >
                      {award.name}
                    </motion.span>
                  </div>

                  <motion.div variants={slideRightVariants} className="shrink-0 sm:hidden">
                    <ArrowRight className="h-5 w-5 shrink-0 text-white/60 transition-transform duration-150 ease-agency-ease group-hover:translate-x-1.5 group-hover:-rotate-12 group-hover:text-white" />
                  </motion.div>
                </div>

                <motion.div variants={fadeUpVariants} className="hidden text-sm text-white/50 sm:block">
                  {award.date}
                </motion.div>

                <motion.div variants={fadeUpVariants} className="min-w-0">
                  <p className="font-semibold text-white/90 transition-colors duration-150 group-hover:text-white">
                    {award.title}
                  </p>
                  <StatusPill status={award.status} />
                </motion.div>

                <motion.div variants={slideRightVariants} className="hidden sm:block sm:justify-self-end">
                  <ArrowRight className="h-5 w-5 shrink-0 text-white/60 transition-transform duration-150 ease-agency-ease group-hover:translate-x-1.5 group-hover:-rotate-12 group-hover:text-white" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
