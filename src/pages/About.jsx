import team from '../data/team.json';

export default function About() {
  return (
    <main className="route-page about-page">
      <section className="about-hero page-shell">
        <p className="eyebrow">O studiju</p>
        <h1>Prostor ne nastaje iz jedne ideje. Nastaje iz dobrog tima.</h1>
        <p>
          Mia Interior Studio vodi Miljana Božić, uz mrežu saradnika koji se
          uključuju tamo gde projekat to traži — od tehničke razrade do realizacije.
        </p>
      </section>

      <section className="team-list page-shell">
        {team.map((person, index) => (
          <article className={`team-person ${index % 2 ? 'reverse' : ''}`} key={`${person.name}-${index}`}>
            <div className="team-photo-placeholder">
              <span>{person.label}</span>
            </div>

            <div className="team-person-copy">
              <span className="team-index">0{index + 1}</span>
              <p className="eyebrow">{person.role}</p>
              <h2>{person.name}</h2>
              <p>{person.bio}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="about-note page-shell">
        <p className="eyebrow">Način rada</p>
        <h2>Jedna osoba vodi ideju. Pravi stručnjaci se uključuju kada su potrebni.</h2>
        <p>
          Tako projekat zadržava jasan autorski pravac, a klijent dobija podršku
          koja je zaista potrebna u svakoj fazi.
        </p>
      </section>

      <section className="about-cta">
        <div className="page-shell about-cta-inner">
          <p className="eyebrow">Vaš prostor</p>
          <h2>Imate prostor koji želite da rešimo zajedno?</h2>
          <p>
            Prvi korak je kratka konsultacija. Upoznajemo prostor, vaše potrebe i
            očekivanja, pa tek onda predlažemo naredne korake.
          </p>
          <a className="button cream about-cta-button" href="/kontakt">
            Zakažite konsultaciju
          </a>
        </div>
      </section>
    </main>
  );
}
