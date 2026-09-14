import { Link } from 'react-router-dom';
import projects from '../data/projects.json';

const excerpt = (text, max = 220) => text.length > max ? `${text.slice(0, max).trim()}…` : text;

export default function Projects() {
  return (
    <main className="route-page projects-classic-page projects-page-v18">
      <section className="projects-classic-hero page-shell">
        <p className="eyebrow">Portfolio</p>
        <h1>Projekti koji pričaju priču.</h1>
        <p>Svaki prostor polazi od drugačijeg problema, navika i očekivanja. Pogledajte kako su te potrebe pretvorene u konkretna rešenja.</p>
      </section>

      <section className="projects-grid-v18 page-shell">
        {projects.map((project, index) => (
          <article className="project-list-card-v18" key={project.slug}>
            <Link to={`/projekti/${project.slug}`} className="project-list-image-v18">
              <img src={project.cover} alt={project.title} loading={index > 2 ? 'lazy' : 'eager'} />
            </Link>
            <div className="project-list-copy-v18">
              <div className="classic-project-meta">
                <span>{project.type}</span>
                {project.area && <span>{project.area}</span>}
                <span>{project.location}</span>
              </div>
              <h2><Link to={`/projekti/${project.slug}`}>{project.title}</Link></h2>
              <p>{excerpt(project.summary, 190)}</p>
              <Link className="classic-project-link" to={`/projekti/${project.slug}`}>Pogledajte projekat <span>↗</span></Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
