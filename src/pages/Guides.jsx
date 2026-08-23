import { useState } from 'react';
import { ShoppingBag, LoaderCircle } from 'lucide-react';

const products = [
  { variant:'MIA_PRODUCT_PLANNER', label:'PDF vodič · 64 strane', title:'Planer funkcionalnog doma', price:'19 €', tone:'light' },
  { variant:'MIA_PRODUCT_MOODBOARD', label:'PDF workbook', title:'Moodboard bez haosa', price:'12 €', tone:'wine' },
  { variant:'MIA_PRODUCT_CHECKLIST', label:'Checklist + PDF', title:'Pre prvog majstora', price:'9 €', tone:'line' },
];

export default function Guides() {
  const [loading, setLoading] = useState('');

  async function buy(product) {
    try {
      setLoading(product.variant);
      const res = await fetch('/.netlify/functions/create-checkout', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ productKey: product.variant })
      });
      if (!res.ok) throw new Error('Checkout nije konfigurisan');
      const data = await res.json();
      if (!data.url) throw new Error('Nedostaje checkout URL');
      window.location.href = data.url;
    } catch (e) {
      alert('Demo režim: u Netlify env varijablama podesi Lemon Squeezy store/variant podatke.');
    } finally {
      setLoading('');
    }
  }

  return (
    <main className="route-page guides-page">
      <section className="route-hero page-shell">
        <p className="eyebrow">Mia Digital Library</p>
        <h1>Profesionalan sistem za one koji uređuju sami.</h1>
        <p>Checkout se kreira preko Netlify funkcije — API ključ se ne šalje u browser.</p>
      </section>

      <section className="products-route page-shell">
        {products.map(p=>(
          <article className="product-route-card" key={p.variant}>
            <div className={`product-route-cover ${p.tone}`}>
              <small>{p.label}</small><strong>{p.title}</strong><span>MIA INTERIOR STUDIO</span>
            </div>
            <div className="product-route-info">
              <p>Digitalni proizvod koji kupac nakon kupovine dobija putem Lemon Squeezy delivery flow-a.</p>
              <div><strong>{p.price}</strong><button className="button solid wine" onClick={()=>buy(p)} disabled={loading===p.variant}>
                {loading===p.variant ? <LoaderCircle className="spin" size={16}/> : <ShoppingBag size={16}/>} Kupi
              </button></div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
