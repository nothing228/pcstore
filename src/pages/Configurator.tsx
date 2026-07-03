import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORY_ORDER, PARTS, partsByCategory, requiredWatts } from "../data/parts";
import type { Category, Part } from "../data/types";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";
import PartIcon from "../components/PartIcon";
import PartArt from "../components/PartArt";
import Reveal from "../components/Reveal";
import "../styles/configurator.scss";

type Selection = Partial<Record<Category, string>>;

const partById = (id?: string): Part | undefined => PARTS.find((p) => p.id === id);

const STORAGE_KEY = "pcstore-config";

function loadSaved(): { selection: Selection; active: Category } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as { selection?: Selection; active?: Category };
      return {
        selection: saved.selection ?? {},
        active: saved.active && CATEGORY_ORDER.includes(saved.active) ? saved.active : "cpu",
      };
    }
  } catch {
    // corrupted storage — start fresh
  }
  return { selection: {}, active: "cpu" };
}

export default function Configurator() {
  const { t } = useLang();
  const { addItem, openCart } = useCart();
  const [active, setActive] = useState<Category>(() => loadSaved().active);
  const [selection, setSelection] = useState<Selection>(() => loadSaved().selection);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selection, active }));
  }, [selection, active]);

  const picked = useMemo(() => {
    const map = {} as Partial<Record<Category, Part>>;
    for (const cat of CATEGORY_ORDER) {
      const p = partById(selection[cat]);
      if (p) map[cat] = p;
    }
    return map;
  }, [selection]);

  const { cpu, motherboard, ram, gpu, psu, cooler } = picked;

  const total = Object.values(picked).reduce((sum, p) => sum + (p?.price ?? 0), 0);
  const selectedCount = Object.keys(picked).length;
  const needWatts = requiredWatts(cpu, gpu);

  // hard conflicts block checkout; cooler is a soft warning
  const warnings = useMemo(() => {
    const hard: string[] = [];
    const soft: string[] = [];
    if (cpu && motherboard && cpu.socket !== motherboard.socket) {
      hard.push(t("config.socketMismatch", { cpu: cpu.socket!, mb: motherboard.socket! }));
    }
    if (ram && motherboard && ram.ramType !== motherboard.ramType) {
      hard.push(t("config.ramMismatch", { type: motherboard.ramType! }));
    }
    if (psu && (cpu || gpu) && psu.watts! < needWatts) {
      hard.push(t("config.psuLow", { w: needWatts }));
    }
    if (cooler && cpu && cooler.watts! < cpu.watts!) {
      soft.push(t("config.coolerWeak"));
    }
    return { hard, soft };
  }, [cpu, motherboard, ram, gpu, psu, cooler, needWatts, t]);

  const perfScore = useMemo(() => {
    if (!cpu && !gpu) return 0;
    const score =
      (gpu?.perf ?? 0) * 0.45 +
      (cpu?.perf ?? 0) * 0.35 +
      (picked.ram?.perf ?? 0) * 0.1 +
      (picked.storage?.perf ?? 0) * 0.1;
    return Math.round(score);
  }, [cpu, gpu, picked.ram, picked.storage]);

  const complete = selectedCount === CATEGORY_ORDER.length;
  const canAdd = complete && warnings.hard.length === 0;

  const conflictsWith = (part: Part): boolean => {
    switch (part.category) {
      case "cpu":
        return !!motherboard && part.socket !== motherboard.socket;
      case "motherboard":
        return (!!cpu && part.socket !== cpu.socket) || (!!ram && part.ramType !== ram.ramType);
      case "ram":
        return !!motherboard && part.ramType !== motherboard.ramType;
      case "psu":
        return (!!cpu || !!gpu) && part.watts! < needWatts;
      default:
        return false;
    }
  };

  const select = (part: Part) => {
    setSelection((prev) => ({ ...prev, [part.category]: part.id }));
    setAdded(false);
  };

  const stepIndex = CATEGORY_ORDER.indexOf(active);
  const goto = (dir: 1 | -1) => {
    const next = CATEGORY_ORDER[stepIndex + dir];
    if (next) setActive(next);
  };

  const addBuild = () => {
    if (!canAdd) return;
    addItem({
      id: `custom-${Date.now()}`,
      kind: "custom",
      title: t("config.customBuild"),
      subtitle: `${cpu!.name} · ${gpu!.name}`,
      price: total,
      accent: "#6c5ce7",
      accent2: "#00e5ff",
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 900);
  };

  const psuCapacity = psu?.watts ?? 0;
  const wattPct = psuCapacity > 0 ? Math.min(100, (needWatts / psuCapacity) * 100) : 0;

  return (
    <div className="page config">
      <div className="container">
        <Reveal>
          <div className="section-head config__head">
            <span className="section-head__kicker">{t("nav.configurator")}</span>
            <h2>{t("config.title")}</h2>
            <p>{t("config.subtitle")}</p>
          </div>
        </Reveal>

        {/* progress */}
        <Reveal delay={0.05}>
          <div className="config__progress">
            <span>
              {t("config.step")} {stepIndex + 1} {t("config.of")} {CATEGORY_ORDER.length}
            </span>
            <div className="config__progress-track">
              <motion.div
                className="config__progress-fill"
                animate={{ width: `${(selectedCount / CATEGORY_ORDER.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
              />
            </div>
            <span className="config__progress-count">
              {selectedCount}/{CATEGORY_ORDER.length} {t("config.parts")}
            </span>
          </div>
        </Reveal>

        <div className="config__layout">
          {/* ── stepper ────────────────────────── */}
          <aside className="config__steps">
            {CATEGORY_ORDER.map((cat, i) => {
              const sel = picked[cat];
              return (
                <button
                  key={cat}
                  className={`config__step ${active === cat ? "config__step--active" : ""} ${sel ? "config__step--done" : ""}`}
                  onClick={() => setActive(cat)}
                >
                  <span className="config__step-num">{sel ? "✓" : i + 1}</span>
                  <span className="config__step-icon"><PartIcon category={cat} size={19} /></span>
                  <span className="config__step-label">
                    <b>{t(`cat.${cat}`)}</b>
                    <small>{sel ? sel.name : t("config.none")}</small>
                  </span>
                  {active === cat && (
                    <motion.span
                      className="config__step-marker"
                      layoutId="step-marker"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </aside>

          {/* ── part list ──────────────────────── */}
          <main className="config__parts">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="config__parts-title">
                  <PartIcon category={active} size={22} />
                  {t("config.pickPart", { category: t(`cat.${active}`) })}
                </h3>

                <div className="config__parts-grid">
                  {partsByCategory(active).map((part, i) => {
                    const isSelected = selection[part.category] === part.id;
                    const conflict = conflictsWith(part);
                    return (
                      <motion.button
                        key={part.id}
                        className={`pcard ${isSelected ? "pcard--selected" : ""} ${conflict ? "pcard--conflict" : ""}`}
                        onClick={() => select(part)}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="pcard__art">
                          <PartArt category={part.category} brand={part.brand} uid={part.id} />
                        </div>
                        <div className="pcard__head">
                          <span className="pcard__brand">{part.brand}</span>
                          {conflict && <span className="pcard__badge">{t("config.incompatible")}</span>}
                          {isSelected && !conflict && (
                            <motion.span
                              className="pcard__check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>
                        <strong className="pcard__name">{part.name}</strong>
                        <span className="pcard__spec">{part.spec}</span>
                        <span className="pcard__price">${part.price.toLocaleString("en-US")}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="config__nav">
                  <button className="btn btn--ghost" onClick={() => goto(-1)} disabled={stepIndex === 0}>
                    ← {t("config.back")}
                  </button>
                  <button
                    className="btn btn--ghost"
                    onClick={() => goto(1)}
                    disabled={stepIndex === CATEGORY_ORDER.length - 1}
                  >
                    {t("config.next")} →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* ── summary ────────────────────────── */}
          <aside className="config__summary">
            <div className="config__summary-card">
              <h3>{t("config.summary")}</h3>

              <ul className="config__summary-list">
                {CATEGORY_ORDER.map((cat) => {
                  const p = picked[cat];
                  return (
                    <li key={cat} className={p ? "" : "config__summary-empty"}>
                      <PartIcon category={cat} size={15} />
                      <span className="config__summary-cat">{t(`cat.${cat}`)}</span>
                      <motion.span
                        key={p?.id ?? "none"}
                        className="config__summary-val"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {p ? p.name : "—"}
                      </motion.span>
                    </li>
                  );
                })}
              </ul>

              {/* perf score */}
              {perfScore > 0 && (
                <div className="config__meter">
                  <span>{t("config.perfScore")}</span>
                  <div className="config__meter-track">
                    <motion.div
                      className="config__meter-fill config__meter-fill--perf"
                      animate={{ width: `${perfScore}%` }}
                      transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    />
                  </div>
                  <b>{perfScore}</b>
                </div>
              )}

              {/* wattage */}
              {(cpu || gpu) && (
                <div className="config__meter">
                  <span>{t("config.watts")}</span>
                  <div className="config__meter-track">
                    <motion.div
                      className={`config__meter-fill ${psu && psu.watts! < needWatts ? "config__meter-fill--danger" : "config__meter-fill--ok"}`}
                      animate={{ width: `${psu ? wattPct : 100}%` }}
                      transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    />
                  </div>
                  <b>
                    {needWatts}W{psu ? ` / ${psu.watts}W` : ""}
                  </b>
                </div>
              )}

              {/* warnings */}
              <AnimatePresence>
                {[...warnings.hard, ...warnings.soft].map((w) => (
                  <motion.div
                    key={w}
                    className={`config__warn ${warnings.hard.includes(w) ? "config__warn--hard" : ""}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    ⚠ {w}
                  </motion.div>
                ))}
                {psu && warnings.hard.length === 0 && (cpu || gpu) && (
                  <motion.div
                    className="config__warn config__warn--ok"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    ✓ {t("config.psuOk")}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="config__total">
                <span>{t("config.total")}</span>
                <motion.strong key={total} initial={{ scale: 1.12 }} animate={{ scale: 1 }}>
                  ${total.toLocaleString("en-US")}
                </motion.strong>
              </div>

              <button
                className={`btn btn--primary config__add ${added ? "config__add--done" : ""}`}
                disabled={!canAdd}
                onClick={addBuild}
              >
                {added ? t("config.buildAdded") : complete ? t("config.addBuild") : t("config.missing")}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
