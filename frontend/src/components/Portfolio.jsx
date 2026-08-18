import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1];

// each card flies in from a different side, cycling through 4 directions
const ENTRANCE_BY_INDEX = [
  { x: -130, y: 0, rotate: -5 }, // from left
  { x: 0, y: -130, rotate: 4 }, // from top
  { x: 0, y: 130, rotate: -4 }, // from bottom
  { x: 130, y: 0, rotate: 5 }, // from right
];

// alternating bento rhythm: big / small / small / big, repeating
const SPAN_BY_INDEX = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"];
const IMG_HEIGHT_BY_INDEX = ["h-72 lg:h-[26rem]", "h-64 lg:h-72", "h-64 lg:h-72", "h-72 lg:h-[26rem]"];

function PortfolioCard({ item, index }) {
  const ref = useRef(null);
  const entrance = ENTRANCE_BY_INDEX[index % 4];

  // progress ties directly to scroll position: 0 as the card enters from the
  // bottom of the viewport, 1 once it has drifted well into view — so the
  // reveal plays out at scrolling speed instead of a fixed timer.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 25%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.88, 1]);
  const x = useTransform(progress, [0, 1], [entrance.x, 0]);
  const y = useTransform(progress, [0, 1], [entrance.y, 0]);
  const rotate = useTransform(progress, [0, 1], [entrance.rotate, 0]);
  const wipeScaleX = useTransform(progress, [0.15, 1], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, x, y, rotate }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-agency-surface p-6 ${SPAN_BY_INDEX[index % 4]}`}
    >
      <h3 className="font-display text-2xl font-bold leading-snug text-white">{item.title}</h3>

      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-agency-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-agency-bg">
        {item.category}
      </span>

      <div className={`relative mt-6 overflow-hidden rounded-2xl ${IMG_HEIGHT_BY_INDEX[index % 4]}`}>
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-agency-ease group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-agency-accent text-agency-bg opacity-0 shadow-lg transition-all duration-200 ease-agency-ease group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>

        {/* curtain wipe reveal, scrubbed by the same scroll progress */}
        <motion.div
          style={{ scaleX: wipeScaleX, transformOrigin: "left" }}
          className="pointer-events-none absolute inset-0 z-10 bg-agency-bg"
        />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-agency-bg py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(124,92,255,0.06),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-agency-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-agency-accent" />
              Our Portfolio
            </span>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Explore the amazing projects we have done
            </h2>
          </div>

          <a
            href="#portfolio"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-agency-accent2 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 ease-agency-ease hover:-translate-y-0.5"
          >
            See All Projects
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-6">
          {portfolioData.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
