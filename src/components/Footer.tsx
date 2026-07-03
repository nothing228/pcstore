import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import "../styles/footer.scss";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            EXAMPLE<b>PC</b>
          </div>
          <p>{t("footer.tagline")}</p>
        </div>

        <div className="footer__col">
          <h4>{t("footer.shop")}</h4>
          <Link to="/builds">{t("nav.builds")}</Link>
          <Link to="/configurator">{t("nav.configurator")}</Link>
        </div>

        <div className="footer__col">
          <h4>{t("footer.support")}</h4>
          <a href="#warranty">{t("footer.warranty")}</a>
          <a href="#delivery">{t("footer.delivery")}</a>
          <a href="#faq">{t("footer.faq")}</a>
        </div>

        <div className="footer__col">
          <h4>{t("footer.contacts")}</h4>
          <a href="tel:+998712005050">+998 71 200-50-50</a>
          <a href="mailto:hello@examplepc.uz">hello@examplepc.uz</a>
          <span>Tashkent · Mon–Sat 10:00–20:00</span>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} EXAMPLE PC. {t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
