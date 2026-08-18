import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Plus, Sparkle } from "lucide-react";
import { servicesData } from "../data/servicesData";
import SectionWaveArt from "./SectionWaveArt";

const EASE = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

// each card flies in from a different side, cycling through 4 directions —
// same scroll-scrubbed treatment as the Portfolio section
const ENTRANCE_BY_INDEX = [
  { x: -130, y: 0, rotate: -5 }, // from left
  { x: 0, y: -130, rotate: 4 }, // from top
  { x: 0, y: 130, rotate: -4 }, // from bottom
  { x: 130, y: 0, rotate: 5 }, // from right
];

const iconVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.25 },
  },
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: [0, 0.7, 0],
    scale: [0.8, 1.5, 1.8],
    transition: { duration: 1.2, ease: "easeOut", delay: 0.35 },
  },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
};

const listItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.15, ease: EASE } },
};

function ServiceBackgroundArt() {
  return (
    <>
      {/* neural network sketch — AI: nodes softly pulse, connections fade in/out */}
      <svg
        className="absolute -right-6 bottom-0 h-80 w-80 text-agency-orange opacity-[0.1]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {[
          ["30,40", "90,20"], ["90,20", "150,50"], ["30,40", "60,90"],
          ["90,20", "60,90"], ["150,50", "130,110"], ["60,90", "130,110"],
          ["60,90", "20,140"], ["130,110", "100,160"], ["20,140", "100,160"],
          ["130,110", "170,150"], ["100,160", "170,150"],
        ].map(([a, b], i) => {
          const [x1, y1] = a.split(",");
          const [x2, y2] = b.split(",");
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              animate={{ opacity: [0.15, 0.8, 0.15] }}
              transition={{ duration: 13, ease: "easeInOut", repeat: Infinity, delay: (i % 6) * 1.2 }}
            />
          );
        })}
        {[
          [30, 40], [90, 20], [150, 50], [60, 90],
          [130, 110], [20, 140], [100, 160], [170, 150],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3.5"
            fill="currentColor"
            stroke="none"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.6, 1] }}
            transition={{ duration: 13, ease: "easeInOut", repeat: Infinity, delay: (i % 8) * 1.1 }}
          />
        ))}
      </svg>

      {/* data flow lines — Digital Marketing: current flowing along the path */}
      <svg
        className="absolute -left-10 top-1/3 h-56 w-[28rem] text-white opacity-[0.06]"
        viewBox="0 0 400 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M0,80 C60,20 120,140 180,60 C240,-10 300,110 400,40" />
        <motion.path
          d="M0,110 C60,50 120,170 180,90 C240,20 300,140 400,70"
          strokeDasharray="6 14"
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ duration: 7.5, ease: "linear", repeat: Infinity }}
        />
        <circle cx="180" cy="60" r="3" fill="currentColor" stroke="none" />
        <circle cx="300" cy="110" r="3" fill="currentColor" stroke="none" />
      </svg>

      {/* wireframe geometric mesh — Graphics / 3D design: gently breathing */}
      <motion.svg
        className="absolute right-1/4 top-6 h-52 w-52 text-white opacity-[0.07]"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      >
        <polygon points="60,10 100,30 100,80 60,100 20,80 20,30" />
        <polygon points="60,10 100,30 60,60 20,30" />
        <line x1="60" y1="10" x2="60" y2="60" />
        <line x1="20" y1="30" x2="60" y2="60" />
        <line x1="100" y1="30" x2="60" y2="60" />
        <line x1="60" y1="60" x2="60" y2="100" />
      </motion.svg>

      {/* circuit trace — Web Development: current tracing through the board */}
      <svg
        className="absolute left-1/3 bottom-4 h-40 w-72 text-agency-accent2 opacity-[0.08]"
        viewBox="0 0 300 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M0,20 H80 V60 H160 V20 H240 V90 H300" strokeDasharray="4 10" />
        <motion.path
          d="M0,20 H80 V60 H160 V20 H240 V90 H300"
          strokeDasharray="10 220"
          animate={{ strokeDashoffset: [0, -230] }}
          transition={{ duration: 7, ease: "linear", repeat: Infinity }}
        />
        {[[80, 20], [160, 60], [240, 20]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="currentColor" stroke="none" />
        ))}
      </svg>
    </>
  );
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const ref = useRef(null);
  const entrance = ENTRANCE_BY_INDEX[index % 4];

  // progress ties directly to scroll position, same scroll-scrubbed
  // treatment used on the Portfolio cards
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 35%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const x = useTransform(progress, [0, 1], [entrance.x, 0]);
  const y = useTransform(progress, [0, 1], [entrance.y, 0]);
  const rotate = useTransform(progress, [0, 1], [entrance.rotate, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, x, y, rotate }}>
      <MotionLink
        to={`/services/${service.id}`}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="group relative block cursor-pointer rounded-2xl bg-agency-surface p-6 pb-10 shadow-[0_2px_20px_rgba(0,0,0,0.25)] ring-1 ring-white/10 transition-all duration-300 ease-agency-ease hover:bg-[#191c24] hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:ring-agency-orange/30"
      >
        {/* animated color wash on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-agency-orange/25 via-agency-accent2/10 to-transparent opacity-0 transition-opacity duration-500 ease-agency-ease group-hover:opacity-100" />

        <h3 className="relative font-display text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-agency-orange">
          {service.title}
        </h3>

        <div className="relative mt-5 h-48 overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-agency-ease group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* entrance glow pulse, once, behind the icon */}
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={glowVariants}
            className="absolute bottom-4 left-4 h-14 w-14 rounded-full bg-agency-orange blur-md"
          />
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={iconVariants}
            whileHover={{ scale: 1.12, rotate: 8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-full bg-agency-orange text-white shadow-lg"
          >
            <Icon size={24} strokeWidth={2} />
          </motion.span>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={listVariants}
          className="mt-6 space-y-2.5"
        >
          {service.features.map((feature) => (
            <motion.li
              key={feature}
              variants={listItemVariants}
              className="flex items-start gap-2.5 text-sm text-white/60"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-agency-orange" />
              {feature}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors duration-200">
            <span className="absolute inset-0 -translate-x-full bg-agency-orange transition-transform duration-300 ease-agency-ease group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors duration-200 group-hover:text-white">Details</span>
            <ArrowRight
              size={14}
              className="relative z-10 transition-transform duration-200 ease-agency-ease group-hover:translate-x-1"
            />
          </div>
        </div>

        <motion.span
          whileHover={{ rotate: 90, scale: 1.08 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="absolute -bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-agency-orange text-white shadow-[0_10px_25px_rgba(247,148,29,0.45)]"
        >
          <Plus size={22} />
        </motion.span>
      </MotionLink>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-br from-[#0c0e13] via-[#0a0c14] to-[#0d1018] py-28"
    >
      <SectionWaveArt tone="blue" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(247,148,29,0.10),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(124,92,255,0.10),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0">
        <ServiceBackgroundArt />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.05, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4">
            <span className="hidden h-px w-14 bg-gradient-to-r from-transparent to-agency-orange sm:block" />
            <span className="inline-flex items-center gap-2.5 rounded-full bg-agency-orange/10 px-6 py-2.5 text-sm font-bold uppercase tracking-[0.25em] text-agency-orange ring-1 ring-agency-orange/25">
              <Sparkle size={16} className="fill-agency-orange text-agency-orange" />
              Services
              <Sparkle size={16} className="fill-agency-orange text-agency-orange" />
            </span>
            <span className="hidden h-px w-14 bg-gradient-to-l from-transparent to-agency-orange sm:block" />
          </div>
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Empower Your Business With Innovative Digital Services
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
