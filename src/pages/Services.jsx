import { Ruler, PenTool, MessageCircle, Box, Building2 } from 'lucide-react';

const services = [
  ['01', Ruler, 'Space planning', 'Za situacije kada prostor ne funkcioniše kako treba. Radimo raspored, zone, komunikacije, dimenzije i nameštaj pre nego što biramo estetiku.'],
  ['02', PenTool, 'Kompletno projektovanje enterijera', 'Od briefa i osnove do moodboard-a, 3D vizualizacija, materijala, rasvete i dokumentacije za izvođenje.'],
  ['03', MessageCircle, 'Konsultacije', 'Fokusiran termin za rešavanje konkretnih dilema oko rasporeda, materijala, boja, rasvete ili opremanja.'],
  ['04', Box, '3D vizualizacije', 'Realistična provera prostora pre početka radova ili kupovine elemenata.'],
  ['05', Building2, 'Poslovni i ugostiteljski prostori', 'Prostor koji prati način korišćenja, tok gosta i identitet brenda.'],
];

export default function Services() {
  return (
    <main className="route-page">
      <section className="route-hero page-shell"><p className="eyebrow">Usluge</p><h1>Od dobrog rasporeda do poslednjeg detalja.</h1></section>
      <section className="services-route page-shell">
        {services.map(([n,Icon,title,text])=>(
          <article key={n}>
            <div className="services-route-head"><span>{n}</span><Icon strokeWidth={1.2}/></div>
            <h2>{title}</h2><p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
