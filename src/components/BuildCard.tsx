import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import type { Prebuilt } from "../data/types";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";
import PCIllustration from "./PCIllustration";
import PartIcon from "./PartIcon";

const SPEC_ROWS = [
  { key: "cpu", icon: "cpu" },
  { key: "gpu", icon: "gpu" },
  { key: "ram", icon: "ram" },
  { key: "storage", icon: "storage" },
] as const;

interface BuildCardProps {
  build: Prebuilt;
  index?: number;
}

const BuildCard = forwardRef<HTMLElement, BuildCardProps>(function BuildCard({ build, index = 0 }, ref) {
  const { t } = useLang();
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem({
      id: build.id,
      kind: "prebuilt",
      title: build.model,
      subtitle: `${build.company} · ${build.specs.gpu}`,
      price: build.price,
      accent: build.accent,
      accent2: build.accent2,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 900);
  };

  return (
    <motion.article
      ref={ref}
      className="bcard"
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      style={{ "--card-accent": build.accent, "--card-accent2": build.accent2 } as React.CSSProperties}
    >
      <div className="bcard__glow" aria-hidden />

      <header className="bcard__top">
        <span className="bcard__company">{build.company}</span>
        <span className={`bcard__tier bcard__tier--${build.tier}`}>{t(`builds.tier.${build.tier}`)}</span>
      </header>

      <div className="bcard__art">
        <PCIllustration accent={build.accent} accent2={build.accent2} uid={build.id} className="bcard__svg" />
      </div>

      <h3 className="bcard__model">{build.model}</h3>

      <div className="bcard__perf">
        <span>{t("builds.perf")}</span>
        <div className="bcard__perf-track">
          <motion.div
            className="bcard__perf-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${build.perf}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          />
        </div>
        <b>{build.perf}</b>
      </div>

      <ul className="bcard__specs">
        {SPEC_ROWS.map((row) => (
          <li key={row.key}>
            <PartIcon category={row.icon} size={17} />
            <span>{build.specs[row.key]}</span>
          </li>
        ))}
      </ul>

      <footer className="bcard__foot">
        <div className="bcard__price">
          {build.oldPrice && <s>${build.oldPrice.toLocaleString("en-US")}</s>}
          <strong>${build.price.toLocaleString("en-US")}</strong>
        </div>
        <motion.button
          className={`bcard__add ${added ? "bcard__add--done" : ""}`}
          onClick={add}
          whileTap={{ scale: 0.94 }}
        >
          {added ? t("builds.added") : t("builds.addToCart")}
        </motion.button>
      </footer>
    </motion.article>
  );
});

export default BuildCard;
