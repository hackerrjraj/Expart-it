import { motion } from "framer-motion";
import { Braces, Code2, TerminalSquare } from "lucide-react";
import profilePhoto from "../assets/profile-cutout.png";
import HeroStats from "./HeroStats";

const BADGES = [
  { Icon: Code2, className: "-left-5 top-[10%]", duration: 4, delay: 0 },
  { Icon: Braces, className: "-right-5 top-[30%]", duration: 4.6, delay: 0.5 },
  { Icon: TerminalSquare, className: "-left-4 top-[50%]", duration: 5, delay: 1 },
];

export default function HeroProfile() {
  return (
    <div className="relative hidden shrink-0 self-end lg:block">
      {/* ambient glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-agency-orange/25 blur-[90px]" />

      {/* photo (transparent cutout, sized to its own aspect ratio) */}
      <div className="relative aspect-[900/927] w-[380px] lg:w-[540px] xl:w-[640px]">
        <img
          src={profilePhoto}
          alt="Founder, Expart iT"
          className="h-full w-full object-contain [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_88%)] [mask-image:linear-gradient(to_bottom,black_55%,transparent_88%)]"
          draggable={false}
        />

        {/* soft shadow pool reinforcing the blend at the very bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-agency-bg to-transparent" />

        {/* floating icon badges */}
        {BADGES.map(({ Icon, className, duration, delay }, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
            className={`absolute ${className} flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-agency-bg/90 text-agency-orange shadow-lg backdrop-blur`}
          >
            <Icon size={20} />
          </motion.span>
        ))}

        {/* stats bar, centered under the portrait, clear of the controls below */}
        <HeroStats className="absolute inset-x-4 bottom-24 lg:bottom-28" />
      </div>
    </div>
  );
}
