export default function Contact() {
  return (
    <main className="route-page contact-route">
      <section className="contact-route-grid page-shell">
        <div>
          <p className="eyebrow light">Započnimo projekat</p>
          <h1>Imate prostor. Hajde da vidimo šta sve može da postane.</h1>
          <p>Pošaljite osnovne informacije. Forma je spremna za Netlify Forms.</p>
        </div>
        <form name="mia-upit" method="POST" data-netlify="true" className="react-contact-form">
          <input type="hidden" name="form-name" value="mia-upit" />
          <label>Ime i prezime<input name="ime" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Kvadratura<input name="kvadratura" placeholder="npr. 75 m²" /></label>
          <label>Usluga<select name="usluga"><option>Space planning</option><option>Kompletan projekat</option><option>Konsultacije</option><option>3D vizualizacije</option></select></label>
          <label>Recite nam o prostoru<textarea name="poruka" rows="6" /></label>
          <button className="button cream" type="submit">Pošaljite upit</button>
        </form>
      </section>
    </main>
  );
}
