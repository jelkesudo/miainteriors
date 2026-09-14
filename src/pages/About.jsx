import { Link } from 'react-router-dom';
import team from '../data/team.json';

const profiles = [
  {
    ...team[0],
    desktop: '/assets/team-v19/miljana-wide.webp',
    mobile: '/assets/team-v19/miljana-portrait.webp',
  },
  {
    ...team[1],
    desktop: '/assets/team-v19/ognjen-wide.webp',
    mobile: '/assets/team-v19/ognjen-portrait.webp',
  },
];

export default function About() {
  return (
    <main className="route-page about-page about-page-v18">
      <section className="about-hero about-hero-v18 page-shell">
        <p className="eyebrow">O studiju</p>
        <h1>Dve perspektive, jedan osećaj doma.</h1>
        <p>
          Mia Interior Studio spaja senzibilitet za atmosferu i svakodnevni život
          sa tehničkom preciznošću i jasnom arhitektonskom logikom.
        </p>
      </section>

      <section className="team-list-v18 page-shell">
        {profiles.map((person, index) => (
          <article className={`team-person-v18 ${index % 2 ? 'reverse' : ''}`} key={person.name}>
            <picture className="team-photo-v18">
              <source media="(max-width: 560px)" srcSet={person.mobile} />
              <img src={person.desktop} alt={person.name} />
            </picture>

            <div className="team-copy-v18">
              <p className="eyebrow">{person.role}</p>
              <h2>{person.name}</h2>
              <p>{person.bio}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="about-editorial-v18 page-shell">
        <div className="about-editorial-copy-v18">
          <p className="eyebrow">Zajedno</p>
          <h2>Dve perspektive, jedan osećaj doma.</h2>
          <p className="about-editorial-lead-v18">
            Miljanin senzibilitet za atmosferu, organske forme i čovekov doživljaj prostora
            susreće se sa Ognjenovom tehničkom preciznošću, jasnom geometrijom i arhitektonskom logikom.
          </p>
          <p>
            Njihove različite perspektive ne predstavljaju kompromis, već se međusobno dopunjuju;
            ideja istovremeno dobija čvrstu strukturu, funkciju, toplinu i karakter.
          </p>
          <p>
            Zajedno stvaraju prostore koji podržavaju svakodnevni život, u kojima se ljudi osećaju
            prijatno i kojima žele da se vraćaju.
          </p>
          <p className="about-editorial-closing-v18">
            Njihov cilj nije da svakom projektu nametnu isti prepoznatljiv stil, već da oblikuju
            autentičan osećaj doma prema ljudima koji će u njemu živeti.
          </p>
        </div>

        <div className="about-process-collage-v18">
          <figure className="apc-v18 apc-v18-1"><img src="/assets/team-v19/process-1.webp" alt="Mia Interior Studio materijali i uzorci" /></figure>
          <figure className="apc-v18 apc-v18-2"><img src="/assets/team-v19/process-2.webp" alt="Rad na konceptu enterijera" /></figure>
          <figure className="apc-v18 apc-v18-3"><img src="/assets/team-v19/process-3.webp" alt="Mia Interior Studio proces" /></figure>
          <figure className="apc-v18 apc-v18-4"><img src="/assets/team-v19/process-4.webp" alt="Materijali i tehnička razrada" /></figure>
        </div>
      </section>

      <section className="about-cta about-cta-v18">
        <div className="page-shell about-cta-inner">
          <p className="eyebrow">Vaš prostor</p>
          <h2>Imaš ideju za svoj prostor?</h2>
          <p>
            Ispričaj nam šta planiraš, šta ti trenutno ne funkcioniše i šta želiš da postigneš.
            Javićemo ti koji naredni korak ima najviše smisla.
          </p>
          <Link className="button cream about-cta-button" to="/kontakt">
            Pošalji nam upit
          </Link>
        </div>
      </section>
    </main>
  );
}
