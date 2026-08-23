import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import projects from '../data/projects.json';

export default function ProjectDetail() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <main className="route-page">
        <section className="route-hero page-shell">
          <p className="eyebrow">404</p>
          <h1>Projekat nije pronađen.</h1>
          <Link className="classic-project-link" to="/projekti">Nazad na projekte</Link>
        </section>
      </main>
    );
  }

  const prev = projects[(projectIndex - 1 + projects.length) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="route-page project-detail-v5">
      <section className="project-detail-hero page-shell">
        <Link className="project-back-link" to="/projekti"><ArrowLeft size={15}/> Svi projekti</Link>

        <div className="project-detail-title">
          <div>
            <p className="eyebrow">{project.type} · {project.area}</p>
            <h1>{project.title}</h1>
          </div>

          <div className="project-facts">
            <div><span>Lokacija</span><strong>{project.location}</strong></div>
            <div><span>Godina</span><strong>{project.year}</strong></div>
            <div><span>Karakter</span><strong>{project.style}</strong></div>
          </div>
        </div>
      </section>

      <section className="project-detail-main-image page-shell">
        <div className={`classic-project-image detail-main ${project.tone}`}>
          <span>DODAJ GLAVNI RENDER / FOTOGRAFIJU</span>
        </div>
      </section>

      <section className="project-detail-story page-shell">
        <div>
          <p className="eyebrow">Kontekst projekta</p>
          <h2>Prostor mora prvo da reši stvaran život.</h2>
        </div>
        <p>{project.summary}</p>
      </section>

      <section className="project-detail-two-col page-shell">
        <article>
          <span className="detail-number">01</span>
          <p className="eyebrow">Izazov</p>
          <h3>Šta je trebalo rešiti?</h3>
          <p>{project.challenge}</p>
        </article>

        <article>
          <span className="detail-number">02</span>
          <p className="eyebrow">Rešenje</p>
          <h3>Kako smo odgovorili?</h3>
          <p>{project.solution}</p>
        </article>
      </section>

      <section className="project-detail-services page-shell">
        <p className="eyebrow">Obim saradnje</p>
        <div>
          {project.services.map(service => <span key={service}>{service}</span>)}
        </div>
      </section>

      <section className="project-detail-gallery page-shell">
        {project.gallery.map((label, index) => (
          <div className={`classic-project-image gallery-${index+1} ${project.tone}`} key={label}>
            <span>{label} · DODAJ SLIKU</span>
          </div>
        ))}
      </section>

      <section className="project-detail-nav page-shell">
        <Link to={`/projekti/${prev.slug}`}>
          <small>Prethodni projekat</small>
          <strong><ArrowLeft size={18}/> {prev.title}</strong>
        </Link>
        <Link to={`/projekti/${next.slug}`}>
          <small>Sledeći projekat</small>
          <strong>{next.title} <ArrowRight size={18}/></strong>
        </Link>
      </section>
    </main>
  );
}
