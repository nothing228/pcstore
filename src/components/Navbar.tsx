import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../i18n/LanguageContext";
import { LANGS } from "../i18n/translations";
import { useCart } from "../context/CartContext";
import "../styles/navbar.scss";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/builds", label: t("nav.builds") },
    { to: "/configurator", label: t("nav.configurator") },
  ];

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" onClick={() => setMenuOpen(false)}>
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6c5ce7" />
                <stop offset="100%" stopColor="#00e5ff" />
              </linearGradient>
            </defs>
            <rect x="6.5" y="2" width="19" height="28" rx="4.5" fill="#0d1020" stroke="url(#logo-grad)" strokeWidth="1.6" />
            <rect x="21" y="5" width="2.4" height="22" rx="1.2" fill="url(#logo-grad)" className="pc-rgb" />
            <rect x="10" y="6.5" width="8" height="2.2" rx="1.1" fill="url(#logo-grad)" opacity="0.8" />
            <circle cx="14" cy="20.5" r="4.6" fill="none" stroke="url(#logo-grad)" strokeWidth="1.4" />
            <circle cx="14" cy="20.5" r="1.4" fill="#00e5ff" />
          </svg>
          <span>EXAMPLE<b>PC</b></span>
        </Link>

        <nav className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="nav__link-glow"
                      layoutId="nav-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <div className="nav__lang">
            <button
              className="nav__lang-btn"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <span className="nav__lang-flag">{current.flag}</span>
              <span className="nav__lang-code">{current.code.toUpperCase()}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  className="nav__lang-menu"
                  role="listbox"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <button
                        role="option"
                        aria-selected={l.code === lang}
                        className={`nav__lang-item ${l.code === lang ? "nav__lang-item--active" : ""}`}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                      >
                        <span>{l.flag}</span> {l.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <button className="nav__cart" onClick={openCart} aria-label={t("nav.cart")}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
              <path d="M3 3h2.5l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20.5 7H6" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  className="nav__cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                >
                  <motion.span
                    key={count}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    {count}
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className={`nav__burger ${menuOpen ? "nav__burger--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
