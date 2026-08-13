import { motion } from "framer-motion";

// Reusable decorative backdrop: a diagonal ribbon of flowing wave lines plus
// a scattered "digital dot-matrix" cluster, in the style of the reference
// tech-background image. `tone` and `flip` let each section get a distinct
// arrangement while keeping the same visual language.

const TONES = {
  blue: "text-[#4C7EFF]",
  violet: "text-agency-accent2",
};

const LINE_OFFSETS = [-150, -125, -100, -75, -50, -25, 0, 25, 50, 75, 100, 125, 150, 175];

function wavePath(offset, ampMul) {
  const w = 600;
  const y = 260 + offset;
  const a = 70 * ampMul;
  return `M -20,${y} C ${w * 0.15},${y - a} ${w * 0.25},${y + a * 1.3} ${w * 0.45},${y + a * 0.2} C ${
    w * 0.62
  },${y - a * 0.9} ${w * 0.72},${y + a * 1.1} ${w * 0.9},${y - a * 0.4} C ${w},${y - a * 0.7} ${w * 1.05},${
    y - a
  } ${w + 20},${y - a * 1.3}`;
}

function WaveRibbon({ colorClass }) {
  return (
    <svg viewBox="0 0 600 500" className={`h-full w-full ${colorClass}`} fill="none" stroke="currentColor">
      {LINE_OFFSETS.map((offset, i) => {
        const distFromCenter = Math.abs(offset) / 175;
        const strokeOpacity = Math.max(0.22 - distFromCenter * 0.17, 0.03);
        const ampMul = 0.85 + ((i * 37) % 30) / 100;
        return (
          <path
            key={offset}
            d={wavePath(offset, ampMul)}
            strokeWidth={distFromCenter < 0.2 ? 1.2 : 0.6}
            style={{ opacity: strokeOpacity }}
          />
        );
      })}
      {[-25, 55].map((offset, i) => (
        <motion.path
          key={`flow-${offset}`}
          d={wavePath(offset, 1)}
          strokeWidth="1.3"
          strokeDasharray="3 24"
          style={{ opacity: 0.45 }}
          animate={{ strokeDashoffset: [0, -270] }}
          transition={{ duration: 16 + i * 5, ease: "linear", repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function DotMatrix({ colorClass, cols = 11, rows = 9, seed = 1 }) {
  const cellW = 100 / cols;
  const cellH = 100 / rows;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = (r * 31 + c * 17 + seed * 9) % 100;
      if (key % 5 !== 0) continue;
      dots.push({ x: c * cellW + cellW / 2, y: r * cellH + cellH / 2, bright: key % 20 === 0, id: `${r}-${c}` });
    }
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`h-full w-full ${colorClass}`}>
      {dots.map((d) =>
        d.bright ? (
          <motion.circle
            key={d.id}
            cx={d.x}
            cy={d.y}
            r="0.7"
            fill="currentColor"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
            transition={{
              duration: 5 + ((r_hash(d.id) % 5)),
              ease: "easeInOut",
              repeat: Infinity,
              delay: (r_hash(d.id) % 7) * 0.4,
            }}
          />
        ) : (
          <rect key={d.id} x={d.x - 0.35} y={d.y - 0.35} width="0.7" height="0.7" fill="currentColor" opacity={0.3} />
        )
      )}
    </svg>
  );
}

function r_hash(id) {
  return id.split("-").reduce((acc, n) => acc + Number(n) * 13, 0);
}

export default function SectionWaveArt({ tone = "blue", flip = false, className = "" }) {
  const colorClass = TONES[tone] ?? TONES.blue;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 opacity-90 ${flip ? "-scale-x-100" : ""}`}>
        <WaveRibbon colorClass={colorClass} />
      </div>
      <div className={`absolute h-56 w-72 ${flip ? "left-0 top-0" : "right-0 top-0"} opacity-80`}>
        <DotMatrix colorClass={colorClass} seed={flip ? 3 : 1} />
      </div>
      <div className={`absolute h-24 w-16 ${flip ? "bottom-6 right-6" : "bottom-6 left-6"} opacity-70`}>
        <DotMatrix colorClass={colorClass} cols={3} rows={7} seed={flip ? 6 : 8} />
      </div>
    </div>
  );
}
