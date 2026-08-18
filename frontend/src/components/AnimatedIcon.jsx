import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

// A floating image icon: always gently bobbing/rotating (idle), and on top of
// that it tilts and nudges toward the cursor while hovered, easing back with
// a damped spring — not a snap — when the pointer leaves. Reduced-motion
// users only get the slow idle drift; touch devices never fire hover at all,
// so they get idle-only for free.
export default function AnimatedIcon({ src, alt = "", className = "", dropShadow }) {
  const reducedMotion = usePrefersReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springOpts = { stiffness: 140, damping: 14, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), springOpts);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), springOpts);
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), springOpts);
  const shiftY = useSpring(useTransform(py, [-0.5, 0.5], [-10, 10]), springOpts);

  const handleMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className={`h-full w-full ${className}`}
      style={{ perspective: 700 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* idle layer: continuous slow bob + sway, never perfectly still */}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -14, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full"
      >
        {/* hover layer: tilts + nudges toward the cursor, spring-damped release */}
        <motion.div style={{ rotateX, rotateY, x: shiftX, y: shiftY }} className="h-full w-full">
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="h-full w-full select-none object-contain"
            style={{ filter: dropShadow }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
