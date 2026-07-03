import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LanguageContext";
import { PREBUILTS } from "../data/prebuilts";
import BuildCard from "../components/BuildCard";
import PCIllustration from "../components/PCIllustration";
import AnimatedNumber from "../components/AnimatedNumber";
import Reveal from "../components/Reveal";
import PartIcon from "../components/PartIcon";
import "../styles/home.scss";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const { t } = useLang();
  const featured = [PREBUILTS[0], PREBUILTS[4], PREBUILTS[8]];

  return (
    <div className="page home">
      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <motion.div className="hero__text" variants={stagger} initial="hidden" animate="show">
            <motion.span className="hero__badge" variants={fadeUp}>
              <span className="hero__badge-dot" />
              {t("hero.badge")}
            </motion.span>
            <motion.h1 variants={fadeUp}>
              {t("hero.title1")}{" "}
              <span className="hero__shimmer">{t("hero.title2")}</span>
            </motion.h1>
            <motion.p variants={fadeUp}>{t("hero.subtitle")}</motion.p>
            <motion.div className="hero__cta" variants={fadeUp}>
              <Link to="/configurator" className="btn btn--primary">
                {t("hero.cta.configure")}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link to="/builds" className="btn btn--ghost">
                {t("hero.cta.browse")}
              </Link>
            </motion.div>
            <motion.div className="hero__stats" variants={fadeUp}>
              <div>
                <strong><AnimatedNumber value={12480} /></strong>
                <span>{t("hero.stat.builds")}</span>
              </div>
              <div>
                <strong><AnimatedNumber value={2300} suffix="+" /></strong>
                <span>{t("hero.stat.parts")}</span>
              </div>
              <div>
                <strong>3</strong>
                <span>{t("hero.stat.warranty")}</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__art"
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__art-ring" aria-hidden />
            <div className="hero__art-float">
              <PCIllustration accent="#6c5ce7" accent2="#00e5ff" uid="hero" className="hero__svg" />
            </div>
            <motion.div
              className="hero__tag hero__tag--1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <PartIcon category="gpu" size={16} /> RTX 4090
            </motion.div>
            <motion.div
              className="hero__tag hero__tag--2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <PartIcon category="cooler" size={16} /> 360mm AIO
            </motion.div>
            <motion.div
              className="hero__tag hero__tag--3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <PartIcon category="cpu" size={16} /> i9-14900K
            </motion.div>
          </motion.div>
        </div>

        {/* marquee */}
        <div className="hero__marquee" aria-hidden>
          <div className="hero__marquee-track">
            {[0, 1].map((i) => (
              <span key={i}>{`${t("marquee.text")} · ${t("marquee.text")} · `}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BUILDS ──────────────────────── */}
      <section className="home__featured">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-head__kicker">{t("nav.builds")}</span>
              <h2>{t("home.featured.title")}</h2>
              <p>{t("home.featured.subtitle")}</p>
            </div>
          </Reveal>
          <div className="home__featured-grid">
            {featured.map((b, i) => (
              <BuildCard key={b.id} build={b} index={i} />
            ))}
          </div>
          <Reveal delay={0.15} className="home__featured-more">
            <Link to="/builds" className="btn btn--ghost">
              {t("home.featured.all")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────── */}
      <section className="home__why">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-head__kicker">EXAMPLE PC</span>
              <h2>{t("home.why.title")}</h2>
              <p>{t("home.why.subtitle")}</p>
            </div>
          </Reveal>
          <div className="home__why-grid">
            {[1, 2, 3, 4].map((n, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <div className="home__why-card">
                  <div className="home__why-icon">
                    {n === 1 && <PartIcon category="motherboard" size={26} />}
                    {n === 2 && <PartIcon category="psu" size={26} />}
                    {n === 3 && (
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                        <path d="M8.5 12l2.5 2.5 4.5-5" />
                      </svg>
                    )}
                    {n === 4 && (
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v6m0 0l3-3m-3 3L9 6" />
                        <path d="M12 21v-6m0 0l3 3m-3-3l-3 3" />
                        <circle cx="12" cy="12" r="9" opacity="0.35" />
                      </svg>
                    )}
                  </div>
                  <h3>{t(`home.why.${n}.title`)}</h3>
                  <p>{t(`home.why.${n}.text`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFIGURATOR PROMO ───────────────────── */}
      <section className="home__promo">
        <div className="container">
          <Reveal>
            <div className="home__promo-card">
              <div className="home__promo-text">
                <h2>{t("home.config.title")}</h2>
                <p>{t("home.config.subtitle")}</p>
                <ul>
                  <li>{t("home.config.point1")}</li>
                  <li>{t("home.config.point2")}</li>
                  <li>{t("home.config.point3")}</li>
                </ul>
                <Link to="/configurator" className="btn btn--primary">
                  {t("home.config.cta")}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
              <div className="home__promo-art" aria-hidden>
                {(["cpu", "gpu", "ram", "psu", "cooler", "storage"] as const).map((c, i) => (
                  <motion.div
                    key={c}
                    className="home__promo-chip"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <PartIcon category={c} size={22} />
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
