import "./ThankYou.css";

export default function ThankYou() {
  return (
    <main className="thank-you-page">
      <div className="thank-you-content">
        <span className="thank-you-eyebrow">
          PORUKA JE POSLATA
        </span>

        <h1>
          Hvala na <em>upitu.</em>
        </h1>

        <p>
          Tvoja poruka je uspešno poslata.
          <br />
          Javićemo ti se uskoro sa predlogom sledećeg koraka.
        </p>

        <a href="/" className="thank-you-button">
          NAZAD NA POČETNU
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  );
}