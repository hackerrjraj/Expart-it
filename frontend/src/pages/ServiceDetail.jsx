import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { servicesData } from "../data/servicesData";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.id === slug);
  const otherServices = servicesData.filter((s) => s.id !== slug);

  if (!service) return <Navigate to="/" replace />;

  const Icon = service.icon;

  return (
    <div className="bg-agency-bg">
      {/* Banner */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-32">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-agency-bg via-agency-bg/70 to-agency-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-agency-bg/90 via-agency-bg/30 to-transparent" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10"
        >
          <motion.nav variants={fadeUp} className="mb-6 flex items-center gap-1.5 text-xs font-medium text-white/50">
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/#services" className="transition-colors hover:text-white">
              Services
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/80">{service.title}</span>
          </motion.nav>

          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-agency-accent backdrop-blur-sm"
          >
            {service.subtitle}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {service.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
            {service.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9">
            <a
              href="/#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-agency-accent px-7 py-3.5 text-sm font-semibold text-agency-bg transition-transform duration-300 ease-agency-ease hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(199,255,61,0.35)]"
            >
              Get Started
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 ease-agency-ease group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* What's included */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(247,148,29,0.08),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-4"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-agency-orange text-white shadow-lg">
              <Icon size={26} strokeWidth={2} />
            </span>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">What's Included</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {service.features.map((feature) => (
              <motion.div
                key={feature}
                variants={fadeUp}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-agency-surface px-6 py-5"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-agency-orange" />
                <span className="text-base font-medium text-white/85">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore other services */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-display text-2xl font-bold text-white sm:text-3xl"
          >
            Explore Other Services
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {otherServices.map((other) => {
              const OtherIcon = other.icon;
              return (
                <motion.div key={other.id} variants={fadeUp}>
                  <Link
                    to={`/services/${other.id}`}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-agency-surface p-5 transition-colors duration-300 hover:bg-[#191c24]"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-agency-orange/15 text-agency-orange">
                      <OtherIcon size={20} />
                    </span>
                    <span className="font-display text-base font-semibold text-white">{other.title}</span>
                    <ArrowRight
                      size={16}
                      className="ml-auto shrink-0 text-white/40 transition-transform duration-300 ease-agency-ease group-hover:translate-x-1 group-hover:text-agency-orange"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
