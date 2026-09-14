import { useSearchParams } from 'react-router-dom';
import services from '../data/services.json';

export default function Contact() {
  const [params] = useSearchParams();
  const requested = params.get('usluga') || '';

  return (
    <main className="route-page contact-route">
      <section className="contact-route-grid page-shell">
        <div>
          <p className="eyebrow light">Spremni za prvi korak?</p>
          <h1>Ispričajte nam nešto više o svom prostoru.</h1>
          <p>
            Odgovaramo u roku od 24 sata tokom radnih dana i dogovaramo uvodni
            online razgovor od 30 minuta.
          </p>
        </div>

        <form name="mia-upit" method="POST" data-netlify="true" className="react-contact-form">
          <input type="hidden" name="form-name" value="mia-upit" />
          <label>Ime i prezime<input name="ime" required /></label>
          <label>Email adresa<input name="email" type="email" required /></label>
          <label>Lokacija prostora<input name="lokacija" required /></label>
          <label>Vrsta prostora i kvadratura<input name="prostor" placeholder="npr. stan · 75 m²" required /></label>
          <label>
            Usluga
            <select name="usluga" defaultValue={requested}>
              <option value="">Nisam siguran/na — preporučite mi</option>
              {services.map(service => (
                <option key={service.slug} value={service.slug}>{service.title}</option>
              ))}
            </select>
          </label>
          <label>Kratak opis trenutnog problema<textarea name="problem" rows="5" required /></label>
          <label>Okvirni budžet za realizaciju<input name="budzet" placeholder="npr. 20.000 €" /></label>
          <button className="button cream" type="submit">Pošaljite upit</button>
        </form>
      </section>
    </main>
  );
}
