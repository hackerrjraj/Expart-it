import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowUpRight,
} from "lucide-react";
import logo from "../assets/logo.png";
import SectionWaveArt from "./SectionWaveArt";

const QUICK_LINKS = [
  { label: "Web Development", to: "/services/web-development" },
  { label: "Digital Marketing", to: "/services/digital-marketing" },
  { label: "Graphics Design", to: "/services/graphics-design" },
  { label: "AI Automation", to: "/services/ai-automation" },
];
const COMPANY_LINKS = ["About", "Team Member", "Reviews", "Latest News"];
const BOTTOM_LINKS = ["Privacy Policy", "Terms of Use", "Sitemap"];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-agency-bg pt-24">
      <SectionWaveArt tone="blue" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Promo banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-agency-accent via-agency-accent to-lime-200 px-8 py-10 sm:flex-row sm:justify-between sm:px-12"
        >
          <div className="flex items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
              alt="Consultant"
              className="hidden h-24 w-24 rounded-2xl object-cover shadow-lg sm:block lg:h-28 lg:w-28"
            />
            <h3 className="max-w-md font-display text-2xl font-bold leading-tight text-agency-bg sm:text-3xl">
              Looking For a Reliable Digital Agency Partner?
            </h3>
          </div>

          <div className="flex items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
              alt="Team meeting"
              className="hidden h-20 w-32 rounded-2xl object-cover shadow-lg lg:block"
            />
            <Link
              to="/#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-agency-bg px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 ease-agency-ease hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 ease-agency-ease group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </motion.div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div>
            <img src={logo} alt="Expart iT" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              We build web platforms, brand identities, and automated workflows that help
              businesses grow with confidence.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex max-w-xs overflow-hidden rounded-full bg-white/5 ring-1 ring-white/15">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex shrink-0 items-center justify-center rounded-full bg-agency-accent px-4 text-agency-bg transition-colors duration-300 hover:bg-white"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">Quick Link</h4>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-agency-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">Company</h4>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    to="/#about"
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-agency-accent"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">Contact</h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={18} className="mt-0.5 shrink-0 text-agency-accent" />
                <span>55 Main Street, 2nd Block, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={18} className="shrink-0 text-agency-accent" />
                <a href="mailto:support@expartit.com" className="hover:text-white">
                  support@expartit.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={18} className="shrink-0 text-agency-accent" />
                <a href="tel:+000123445" className="hover:text-white">
                  +000 (123) 44 55
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + scroll-to-top */}
        <div className="relative border-t border-white/10">
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="absolute left-1/2 top-0 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-agency-accent text-agency-bg shadow-lg transition-transform duration-300 ease-agency-ease hover:-translate-y-[calc(50%+3px)]"
          >
            <ArrowUp size={18} />
          </button>

          <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} by Expart iT. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {BOTTOM_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-white/40 transition-colors duration-300 hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
