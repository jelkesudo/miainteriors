# Mia Interior Studio — V19 deterministic parallax repair

Ova verzija rešava glavni scroll/parallax bug tako što više nema dva paralelna animation sistema.

- svih 7 scena koriste jedan deterministic active-scene sistem
- uvek je tačno jedna puna scena vidljiva
- prelaz na sledeću/prethodnu scenu koristi AnimatePresence crossfade + mali Y pomak
- nema useSpring kašnjenja
- nema duplih opacity transformacija Hero/Philosophy + wrapper
- nema praznog krem viewporta između scena
- reverse scroll radi simetrično
- hero koristi bordo transparentni logo na svetloj pozadini

Pokretanje:
```bash
npm install
npm run dev
```


## V19 sticky root fix
The blank-scroll bug was caused by `overflow-x:hidden` on `#root`. In CSS, that creates a scrolling/overflow container, so the nested `position: sticky` element sticks relative to `#root` instead of the viewport. Since `#root` grows with the whole page, the sticky scene simply stays at the top and the user scrolls into empty space.

Fix:
- `#root { overflow: visible !important; }`
- `html, body { overflow-x: clip !important; }`
- the only clipping container is `.parallax-sticky-v19` itself

## V19.2 mobile polish
- Landing featured-project cards have more breathing room on phones.
- Project CTA links no longer sit pinned to the very bottom of each card.
- Mobile service cards once again show their description text (up to 3 lines).
- The service CTA supporting sentence is visible again on mobile.
- Desktop layout is unchanged.
