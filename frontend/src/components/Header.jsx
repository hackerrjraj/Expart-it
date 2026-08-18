import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";
import { servicesData } from "../data/servicesData";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/#portfolio" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

function NavLink({ label, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative py-2 text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:text-white"
    >
      {label}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-agency-accent transition-transform duration-200 ease-agency-ease group-hover:scale-x-100" />
    </Link>
  );
}

function ServicesNavItem() {
  return (
    <div className="group/services relative py-2">
      <Link
        to="/#services"
        className="flex items-center gap-1 text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:text-white"
      >
        Services
        <ChevronDown
          size={14}
          className="transition-transform duration-200 ease-agency-ease group-hover/services:rotate-180"
        />
      </Link>

      <div className="invisible absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-agency-ease group-hover/services:visible group-hover/services:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-agency-surface/95 p-2 shadow-2xl backdrop-blur-xl">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-white/5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-agency-orange/15 text-agency-orange">
                  <Icon size={16} />
                </span>
                <span className="text-sm font-medium text-white/80 transition-colors duration-150 group-hover/item:text-white">
                  {service.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-agency-ease ${
        scrolled
          ? "bg-agency-bg/80 py-3 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Expart iT" className="h-12 w-auto lg:h-14" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          <NavLink {...NAV_LINKS[0]} />
          <ServicesNavItem />
          {NAV_LINKS.slice(1).map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            to="/#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-agency-ease hover:border-agency-accent hover:bg-agency-accent hover:text-agency-bg"
          >
            Let's Talk
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 ease-agency-ease group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-agency-bg lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 py-3 text-lg font-medium text-white/90"
              >
                Home
              </Link>

              <span className="pt-3 text-xs font-semibold uppercase tracking-widest text-white/40">Services</span>
              {servicesData.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 py-3 pl-3 text-base font-medium text-white/80"
                >
                  {service.title}
                </Link>
              ))}

              {NAV_LINKS.slice(1).map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/5 py-3 text-lg font-medium text-white/90"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                to="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-agency-accent px-5 py-2.5 text-sm font-semibold text-agency-bg"
              >
                Let's Talk
                <ArrowUpRight size={16} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
