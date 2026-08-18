import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const STATS = [
  { from: 0, to: 9, suffix: "+", label: "Years Experience" },
  { from: 0, to: 200, suffix: "+", label: "Projects Completed" },
  { from: 0, to: 195, suffix: "+", label: "Happy Clients" },
];

function CountUp({ from, to, suffix, delay = 0, duration = 1.5 }) {
  const count = useMotionValue(from);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    const controls = animate(count, to, { duration, delay, ease: "easeOut" });
    return controls.stop;
  }, [count, to, delay, duration]);

  return <motion.p className="font-display text-lg font-bold text-agency-orange">{display}</motion.p>;
}

export default function HeroStats({ className = "" }) {
  return (
    <div
      className={`hidden items-center justify-between gap-6 rounded-2xl border border-white/10 bg-agency-bg/90 px-6 py-4 shadow-xl backdrop-blur lg:flex ${className}`}
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className="text-center">
          <CountUp from={stat.from} to={stat.to} suffix={stat.suffix} delay={i * 0.15} />
          <p className="mt-1 text-[10px] leading-tight text-white/60">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
