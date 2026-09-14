import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import projects from '../data/projects.json';
import services from '../data/services.json';
import process from '../data/process.json';
import testimonials from '../data/testimonials.json';
import TestimonialsCarousel from './TestimonialsCarousel';

const serviceSummaries = {
  savetovanje: 'Za konkretnu dilemu pre nego što doneseš odluku ili potrošiš novac.',
  'plan-uredjenja': 'Raspored, stil i materijali za jednu prostoriju — jasno i primenljivo.',
  'online-koncept': 'Raspored, 3D prikazi i shopping lista za prostor koji želiš da urediš online.',
  'projekat-enterijera': 'Za adaptaciju, teren i kompletnu projektnu i tehničku razradu enterijera.',
};

const shortPrices = {
  savetovanje: '50 €',
  'plan-uredjenja': '150 €',
  'online-koncept': 'od 359 €',
  'projekat-enterijera': 'po ponudi',
};

export function LandingProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section id="projekti" className="landing-section landing-projects-section">
      <div className="landing-shell">
        <div className="landing-section-head projects-head-v18">
          <div>
            <p className="eyebrow">Izdvojeni projekti</p>
            <h2>Projekti koji pričaju priču.</h2>
          </div>
          <Link className="section-link-v18" to="/projekti">Svi projekti <ArrowUpRight size={15}/></Link>
        </div>

        <div className="featured-projects-grid-v18">
          {featured.map((project) => (
            <article className="featured-project-card-v18" key={project.slug}>
              <Link className="featured-project-image-v18" to={`/projekti/${project.slug}`}>
                <img src={project.cover} alt={project.title} loading="lazy" />
              </Link>
              <div className="featured-project-copy-v18">
                <p>{project.type}{project.area ? ` · ${project.area}` : ''}</p>
                <h3><Link to={`/projekti/${project.slug}`}>{project.title}</Link></h3>
                <Link className="featured-project-open-v18" to={`/projekti/${project.slug}`}>Otvori projekat <ArrowUpRight size={13}/></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingServices() {
  return (
    <section id="usluge" className="landing-section landing-services-section">
      <div className="landing-shell services-layout-v18">
        <div className="services-intro-v18">
          <p className="eyebrow">Usluge</p>
          <h2>Koliko podrške vam je potrebno?</h2>
          <p>Od stručnog mišljenja o konkretnoj dilemi do kompletne adaptacije i tehničke razrade enterijera.</p>
        </div>

        <div className="services-cards-v18">
          {services.map((service, index) => (
            <article className="service-card-v18" key={service.slug}>
              <span className="service-num-v18">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{serviceSummaries[service.slug] || service.description}</p>
              <strong>{shortPrices[service.slug] || service.price}</strong>
            </article>
          ))}
        </div>

        <div className="services-cta-v18">
          <div>
            <h3>Imaš ideju za svoj prostor?</h3>
            <p>Pošalji nam nekoliko osnovnih informacija i javićemo ti koji tip saradnje ima najviše smisla.</p>
          </div>
          <Link className="button-v18 button-v18-primary" to="/kontakt">Pošalji nam upit <ArrowUpRight size={15}/></Link>
        </div>
      </div>
    </section>
  );
}

export function LandingProcess() {
  return (
    <section id="proces" className="landing-section landing-process-section">
      <div className="landing-shell process-layout-v18">
        <aside className="process-intro-v18">
          <p className="eyebrow">Od prve poruke do prostora po tvojoj meri</p>
          <h2>Svaki dobar prostor počinje razgovorom.</h2>
          <p>Od samog početka znaš šta možeš da očekuješ i koji je sledeći korak.</p>

          <div className="questionnaire-preview-v18">
            <img src="/assets/upitnik-preview.webp" alt="Preview upitnika za koncept enterijera" loading="lazy" />
            <div className="questionnaire-fade-v18" />
            <div className="questionnaire-caption-v18">
              <strong>Upitnik za koncept enterijera</strong>
              <span>Primer dokumenta koji koristimo u procesu razumevanja prostora.</span>
            </div>
          </div>
        </aside>

        <div className="process-steps-v18">
          {process.map((item) => (
            <article className="process-step-v18" key={item.number}>
              <div className="process-step-number-v18">{item.number}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingTestimonials() {
  return (
    <section id="utisci" className="landing-section landing-testimonials-section">
      <div className="landing-shell">
        <div className="testimonials-head-v18">
          <p className="eyebrow">Utisci klijenata</p>
          <h2>Kako saradnja izgleda sa druge strane.</h2>
        </div>
        <TestimonialsCarousel items={testimonials} />
      </div>
    </section>
  );
}

export function LandingContact() {
  return (
    <section id="kontakt" className="landing-contact-v18">
      <div className="landing-shell landing-contact-inner-v18">
        <p className="eyebrow">Započnimo projekat</p>
        <h2>Imaš prostor.<br/>Hajde da vidimo šta sve može da postane.</h2>
        <p>Pošalji nam osnovne informacije o prostoru i javićemo se sa predlogom sledećeg koraka.</p>
        <div className="landing-contact-actions-v18">
          <Link className="button-v18 button-v18-light" to="/kontakt">Pošalji nam upit <ArrowUpRight size={15}/></Link>
          <Link className="landing-contact-textlink-v18" to="/projekti">Pogledaj projekte</Link>
        </div>
      </div>
    </section>
  );
}
