import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { COMPANIES, PREBUILTS } from "../data/prebuilts";
import { useLang } from "../i18n/LanguageContext";
import BuildCard from "../components/BuildCard";
import Reveal from "../components/Reveal";
import "../styles/builds.scss";

export default function Builds() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();

  const brandParam = params.get("brand");
  const company = COMPANIES.find((c) => c === brandParam) ?? null;
  const setCompany = (next: string | null) =>
    setParams(next ? { brand: next } : {}, { replace: true });

  const visible = company ? PREBUILTS.filter((b) => b.company === company) : PREBUILTS;

  return (
    <div className="page builds">
      <div className="container">
        <Reveal>
          <div className="section-head builds__head">
            <span className="section-head__kicker">EXAMPLE PC</span>
            <h2>{t("builds.title")}</h2>
            <p>{t("builds.subtitle")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="builds__filters" role="tablist">
            <button
              role="tab"
              aria-selected={company === null}
              className={`chip ${company === null ? "chip--active" : ""}`}
              onClick={() => setCompany(null)}
            >
              {t("builds.filter.all")}
            </button>
            {COMPANIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={company === c}
                className={`chip ${company === c ? "chip--active" : ""}`}
                onClick={() => setCompany(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div className="builds__grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((build, i) => (
              <BuildCard key={build.id} build={build} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && <p className="builds__empty">{t("builds.empty")}</p>}
      </div>
    </div>
  );
}
