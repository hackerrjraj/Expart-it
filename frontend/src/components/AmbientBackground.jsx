import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const BLOBS = [
  {
    className: "-left-40 -top-40 h-[520px] w-[520px] bg-[#1E3A8A]/20",
    duration: 20,
    drift: { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.06, 1] },
  },
  {
    className: "-right-40 -bottom-52 h-[600px] w-[600px] bg-[#3B5BFF]/[0.18]",
    duration: 24,
    drift: { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.08, 1] },
  },
  {
    className: "-right-24 top-[38%] h-[440px] w-[440px] bg-[#6C5CE7]/[0.15]",
    duration: 27,
    drift: { x: [0, -30, 0], y: [0, 45, 0], scale: [1, 1.05, 1] },
  },
];

// A single, layout-level ambient backdrop: deep navy base + slow-drifting
// blurred blue/indigo glow blobs + a faint noise layer. Mounted once, fixed
// behind all page content, so every section shares it instead of a flat
// per-section black.
export default function AmbientBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#05060f]">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #05060f 0%, #0a0e1f 55%, #070a16 100%)" }}
      />

      {BLOBS.map((blob, i) =>
        reducedMotion ? (
          <div key={i} className={`absolute rounded-full blur-[120px] ${blob.className}`} />
        ) : (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[120px] ${blob.className}`}
            animate={blob.drift}
            transition={{ duration: blob.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        )
      )}

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE_URL }}
      />
    </div>
  );
}
