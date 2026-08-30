import { Link } from 'react-router-dom';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer footer-v9">
      <div className="footer-v9-main">
        <div className="footer-v9-brand">
          <img src="/assets/mia-logo-transparent-footer.webp" alt="Mia Interior Studio" />
          <p>Prostor prvo razumemo.<br/>Tek onda ga oblikujemo.</p>
        </div>

        <div className="footer-v9-nav">
          <div>
            <span className="footer-label">Studio</span>
            <Link to="/projekti">Projekti</Link>
            <Link to="/#usluge">Usluge</Link>
            <Link to="/o-nama">O nama</Link>
          </div>

          <div>
            <span className="footer-label">Kontakt</span>
            <Link to="/kontakt">Pošaljite upit <ArrowUpRight size={13}/></Link>
            <a href="mailto:info@miainteriorstudio.rs"><Mail size={13}/> Email</a>
            <a href="#"><Instagram size={13}/> Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-v9-bottom">
        <span>© 2026 Mia Interior Studio</span>
        <span>Interior architecture · Space planning</span>
      </div>
    </footer>
  );
}
