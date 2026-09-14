import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ProjectGalleryLightbox({ images, title }) {
  const [openIndex, setOpenIndex] = useState(null);
  const touchStart = useRef(null);

  const isOpen = openIndex !== null;
  const close = () => setOpenIndex(null);
  const show = (index) => setOpenIndex((index + images.length) % images.length);
  const previous = () => show(openIndex - 1);
  const next = () => show(openIndex + 1);

  useEffect(() => {
    if (!isOpen) return undefined;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [isOpen, openIndex]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const delta = end - touchStart.current;
    if (Math.abs(delta) > 45) delta < 0 ? next() : previous();
    touchStart.current = null;
  };

  return (
    <>
      <section className="project-gallery-v18 page-shell" aria-label={`Galerija projekta ${title}`}>
        {images.map((src, index) => (
          <button
            className="project-gallery-thumb-v18"
            type="button"
            key={src}
            onClick={() => setOpenIndex(index)}
            aria-label={`Otvori sliku ${index + 1} od ${images.length}`}
          >
            <img src={src} alt={`${title} — prikaz ${index + 1}`} loading={index > 4 ? 'lazy' : 'eager'} />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </section>

      {isOpen && (
        <div className="project-lightbox-v18" role="dialog" aria-modal="true" aria-label={`Galerija projekta ${title}`} onMouseDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}>
          <button className="lightbox-close-v18" type="button" onClick={close} aria-label="Zatvori galeriju"><X size={24}/></button>
          <button className="lightbox-nav-v18 lightbox-prev-v18" type="button" onClick={previous} aria-label="Prethodna slika"><ChevronLeft size={26}/></button>

          <div className="lightbox-stage-v18" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={images[openIndex]} alt={`${title} — prikaz ${openIndex + 1}`} />
            <div className="lightbox-count-v18">{openIndex + 1} / {images.length}</div>
          </div>

          <button className="lightbox-nav-v18 lightbox-next-v18" type="button" onClick={next} aria-label="Sledeća slika"><ChevronRight size={26}/></button>
        </div>
      )}
    </>
  );
}
