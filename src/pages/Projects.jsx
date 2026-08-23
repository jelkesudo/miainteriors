import { Link } from 'react-router-dom';
import projects from '../data/projects.json';

export default function Projects() {
  return (
    <main className="route-page projects-classic-page">
      <section className="projects-classic-hero page-shell">
        <p className="eyebrow">Portfolio</p>
        <h1>Projekti koji pričaju priču.</h1>
        <p>
          Svaki projekat počinje drugačijim načinom života, drugačijim prostorom
          i drugačijim problemom koji treba rešiti.
        </p>
      </section>

      <section className="projects-classic-grid page-shell">
        {projects.map((project, index) => (
          <article className={`classic-project-card ${index % 3 === 0 ? 'is-wide' : ''}`} key={project.slug}>
            <Link to={`/projekti/${project.slug}`} className="classic-project-image-link">
              <div className={`classic-project-image ${project.tone}`}>
                <span>DODAJ SLIKU / RENDER</span>
              </div>
            </Link>

            <div className="classic-project-copy">
              <div className="classic-project-meta">
                <span>{project.type}</span>
                <span>{project.area}</span>
                <span>{project.location}</span>
              </div>

              <h2>
                <Link to={`/projekti/${project.slug}`}>{project.title}</Link>
              </h2>

              <p>{project.summary}</p>

              <Link className="classic-project-link" to={`/projekti/${project.slug}`}>
                Pogledajte projekat <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
