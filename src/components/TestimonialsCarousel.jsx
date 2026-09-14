import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsCarousel({ items }) {
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const touchStart = useRef(null);

  const go = (direction) => {
    setActive((current) => (current + direction + items.length) % items.length);
  };

  const recalc = () => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[active];
    if (!viewport || !slide) return;
    const viewportWidth = viewport.clientWidth;
    const slideWidth = slide.offsetWidth;

    // Center the real DOM position of the active slide. The carousel gap is
    // percentage-based (4%), so treating it as a pixel number accumulates an
    // offset error toward the last slides, especially on mobile. offsetLeft
    // already includes the browser-resolved gap and keeps first/last slides
    // aligned exactly like every slide in between.
    const slideCenter = slide.offsetLeft + slideWidth / 2;
    setOffset(viewportWidth / 2 - slideCenter);
  };

  useLayoutEffect(recalc, [active, items.length]);

  useEffect(() => {
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [active]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const delta = end - touchStart.current;
    if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div className="testimonials-carousel-v18">
      <div
        className="testimonials-carousel-viewport-v18"
        ref={viewportRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="testimonials-carousel-track-v18"
          ref={trackRef}
          style={{ transform: `translate3d(${offset}px,0,0)` }}
        >
          {items.map((item, index) => (
            <article
              ref={(node) => { slideRefs.current[index] = node; }}
              className={`testimonial-slide-v18 ${index === active ? 'is-active' : ''}`}
              key={`${item.name}-${index}`}
              aria-hidden={index !== active}
            >
              <span className="testimonial-quote-v18">“</span>
              <blockquote>{item.text}</blockquote>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </div>

      <div className="testimonials-controls-v18">
        <button type="button" onClick={() => go(-1)} aria-label="Prethodni testimonial"><ChevronLeft size={18}/></button>
        <div className="testimonials-dots-v18">
          {items.map((item, index) => (
            <button
              type="button"
              key={`${item.name}-dot`}
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Prikaži testimonial ${index + 1}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Sledeći testimonial"><ChevronRight size={18}/></button>
      </div>
    </div>
  );
}
