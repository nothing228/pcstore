import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n/LanguageContext";
import PCIllustration from "./PCIllustration";
import "../styles/cart.scss";

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, removeItem, clear } = useCart();
  const { t } = useLang();
  const [ordered, setOrdered] = useState(false);

  const checkout = () => {
    setOrdered(true);
    clear();
    setTimeout(() => setOrdered(false), 3200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="cart"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            role="dialog"
            aria-label={t("cart.title")}
          >
            <header className="cart__head">
              <h3>{t("cart.title")}</h3>
              <button className="cart__close" onClick={closeCart} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </header>

            <div className="cart__body">
              <AnimatePresence mode="popLayout">
                {ordered && (
                  <motion.div
                    className="cart__success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="cart__success-icon"
                      initial={{ scale: 0, rotate: -40 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                    >
                      ✓
                    </motion.div>
                    <p>{t("cart.success")}</p>
                  </motion.div>
                )}

                {!ordered && items.length === 0 && (
                  <motion.div
                    className="cart__empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="cart__empty-icon">🛒</div>
                    <h4>{t("cart.empty")}</h4>
                    <p>{t("cart.emptyHint")}</p>
                    <button className="btn btn--primary" onClick={closeCart}>
                      {t("cart.continue")}
                    </button>
                  </motion.div>
                )}

                {!ordered &&
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="cart__item"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="cart__item-art" style={{ background: `linear-gradient(135deg, ${item.accent}33, transparent)` }}>
                        <PCIllustration
                          accent={item.accent}
                          accent2={item.accent2 ?? "#00e5ff"}
                          uid={`cart-${item.id}`}
                        />
                      </div>
                      <div className="cart__item-info">
                        <strong>{item.title}</strong>
                        <span>{item.subtitle}</span>
                        <em>${(item.price * item.qty).toLocaleString("en-US")}{item.qty > 1 ? ` · ×${item.qty}` : ""}</em>
                      </div>
                      <button className="cart__item-remove" onClick={() => removeItem(item.id)} aria-label={t("cart.remove")}>
                        <svg width="15" height="15" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                          <path d="M3 3l10 10M13 3L3 13" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {items.length > 0 && !ordered && (
              <footer className="cart__foot">
                <div className="cart__total">
                  <span>{t("cart.total")}</span>
                  <motion.strong key={total} initial={{ scale: 1.15 }} animate={{ scale: 1 }}>
                    ${total.toLocaleString("en-US")}
                  </motion.strong>
                </div>
                <button className="btn btn--primary cart__checkout" onClick={checkout}>
                  {t("cart.checkout")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
