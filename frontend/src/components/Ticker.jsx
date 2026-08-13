import { useEffect, useState } from "react";

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

function TickerRow({ words, direction, bgClass, textClass, reducedMotion }) {
  // Repeat the word list enough times to comfortably exceed viewport width,
  // then duplicate that whole segment once more so the 0%->-50% loop is seamless.
  const segment = Array.from({ length: 8 }).flatMap(() => words);
  const animationClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className={`relative w-[120%] -ml-[10%] overflow-hidden ${bgClass} py-5`}>
      <div
        className={`group flex w-max whitespace-nowrap ${
          reducedMotion ? "" : animationClass
        } hover:[animation-play-state:paused]`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {segment.map((word, i) => (
              <span
                key={`${copy}-${i}`}
                className={`flex items-center px-6 text-xl font-extrabold uppercase tracking-wide sm:text-2xl lg:text-3xl ${textClass}`}
              >
                {word}
                <span className="ml-6 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const DEFAULT_KEYWORDS = ["Advertising", "Digital Marketing", "Search Engine Optimization"];

export default function Ticker({ keywords = DEFAULT_KEYWORDS }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-transparent py-10 sm:py-14">
      <div className="-space-y-2">
        <div className="rotate-3">
          <TickerRow
            words={keywords}
            direction="left"
            bgClass="bg-[#8B7CFA]"
            textClass="text-white"
            reducedMotion={reducedMotion}
          />
        </div>
        <div className="-rotate-3">
          <TickerRow
            words={keywords}
            direction="right"
            bgClass="bg-black"
            textClass="text-white"
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
