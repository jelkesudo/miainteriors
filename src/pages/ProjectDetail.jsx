import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import projects from '../data/projects.json';
import ProjectGalleryLightbox from '../components/ProjectGalleryLightbox';

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
  const facts = [
    ['Lokacija', project.location],
    ['Površina', project.area],
    ['Godina', project.year],
    ['Budžet', project.budget],
    ['Realizacija', project.period],
    ['Obim', project.scope],
  ].filter(([, value]) => value);

  const gallery = project.gallery?.length ? project.gallery : [project.cover];

  return (
    <main className="route-page project-detail-v18">
      <section className="project-detail-hero-v18 page-shell">
        <Link className="project-back-link" to="/projekti"><ArrowLeft size={15}/> Svi projekti</Link>
        <p className="eyebrow project-detail-kicker-v18">{project.type}{project.area ? ` · ${project.area}` : ''}</p>

        <div className="project-detail-title-v18">
          <h1>{project.title}</h1>
          <div className="project-facts-v18">
            {facts.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="project-detail-main-image page-shell">
        <button className="project-cover-button-v18" type="button" aria-label="Pogledaj galeriju" onClick={() => document.querySelector('.project-gallery-thumb-v18')?.click()}>
          <img className="project-detail-cover" src={project.cover} alt={project.title} />
          <span>Pogledaj galeriju ↗</span>
        </button>
      </section>

      <section className="project-detail-story-v18 page-shell">
        <div>
          <p className="eyebrow">Priča projekta</p>
          <h2>Rešenje koje polazi od načina na koji se prostor zaista koristi.</h2>
        </div>
        <p>{project.description}</p>
      </section>

      {project.testimonial && (
        <section className="project-testimonial-v18 page-shell">
          <span>“</span>
          <blockquote>{project.testimonial.text}</blockquote>
          <strong>{project.testimonial.name}</strong>
        </section>
      )}

      <div className="project-gallery-heading-v18 page-shell">
        <p className="eyebrow">Galerija</p>
        <h2>Detalji projekta.</h2>
        <p>Klikni na bilo koju sliku za prikaz preko celog ekrana.</p>
      </div>
      <ProjectGalleryLightbox images={gallery} title={project.title} />

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
