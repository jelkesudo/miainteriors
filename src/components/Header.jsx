import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  ['/projekti', 'Projekti'],
  ['/usluge', 'Usluge'],
  ['/vodici', 'PDF vodiči'],
  ['/kontakt', 'Kontakt'],
];

export default function Header({ immersive = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`site-header ${immersive ? 'immersive-header' : 'standard-header'} ${scrolled ? 'is-scrolled' : ''}`}>
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <img
          src="/assets/logo-nav-bordo.webp"
          width="140"
          height="90"
          alt="Mia Interior Studio"
          decoding="async"
          fetchPriority="high"
        />
      </Link>

      <nav className={`desktop-nav ${open ? 'is-open' : ''}`}>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
        <Link className="header-cta" to="/kontakt" onClick={() => setOpen(false)}>
          Pošaljite upit <ArrowUpRight size={14} />
        </Link>
      </nav>

      <button className="menu-button" onClick={() => setOpen(v => !v)} aria-label="Meni" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
