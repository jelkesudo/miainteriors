import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  LandingProjects,
  LandingServices,
  LandingProcess,
  LandingTestimonials,
  LandingContact,
} from '../components/LandingSections';

const sceneCount = 7;

function HeroPanel() {
  return (
    <section className="static-scene-v19 static-hero-v19">
      <div className="scene-glow glow-one" />
      <img
        className="static-hero-logo-v19"
        src="/assets/mia_logo_bordo.png"
        alt="Mia Interior Studio"
        width="1024"
        height="1024"
        fetchPriority="high"
      />
      <div className="hero-scene-copy static-hero-copy-v19">
        <p className="scene-kicker">MIA INTERIOR STUDIO</p>
        <h1>Dve estetike.<em>Jedan dom.</em></h1>
        <p>Prostor koji spaja različite želje u celinu u kojoj se oboje prepoznajete.</p>
      </div>
      <div className="scroll-hint"><span>SCROLL</span><i /></div>
    </section>
  );
}

function PhilosophyPanel() {
  return (
    <section className="static-scene-v19 static-philosophy-v19">
      <div className="giant-word static-giant-word-v19">PROSTOR</div>
      <div className="scene-copy centered-copy">
        <span className="scene-index">01</span>
        <p className="scene-kicker wine">NAŠ PRISTUP</p>
        <h2>Ne biramo stil pre nego što upoznamo osobu.</h2>
        <p>Gde spuštate ključeve? Gde nastaje gužva? Koliko stvari morate da sakrijete? Dobar enterijer počinje tim pitanjima — ne Pinterest folderom.</p>
      </div>
    </section>
  );
}

const scenes = [
  HeroPanel,
  PhilosophyPanel,
  LandingProjects,
  LandingServices,
  LandingProcess,
  LandingTestimonials,
  LandingContact,
];

export default function Home() {
  const storyRef = useRef(null);
  const lastProgress = useRef(0);
  const { hash } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const safe = Math.max(0, Math.min(0.999999, value));
    const nextIndex = Math.min(sceneCount - 1, Math.floor(safe * sceneCount));
    const nextDirection = value >= lastProgress.current ? 1 : -1;
    lastProgress.current = value;

    setDirection(nextDirection);
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  useEffect(() => {
    if (!hash || !storyRef.current) return;
    const map = { '#projekti': 2, '#usluge': 3, '#proces': 4, '#utisci': 5, '#kontakt': 6 };
    const index = map[hash];
    if (index == null) return;

    const maxScroll = Math.max(0, storyRef.current.offsetHeight - window.innerHeight);
    // Land safely inside the requested segment, not exactly on its boundary.
    const progress = (index + 0.2) / sceneCount;
    requestAnimationFrame(() => window.scrollTo(0, Math.round(maxScroll * progress)));
  }, [hash]);

  const ActiveScene = scenes[activeIndex];

  return (
    <main className="home-v19">
      <section className="parallax-story-v19" ref={storyRef}>
        <div className="parallax-sticky-v19">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={activeIndex}
              className={`scene-panel-v19 whole-scene-${activeIndex}-v19`}
              initial={{ opacity: 0, y: direction > 0 ? '7vh' : '-7vh' }}
              animate={{ opacity: 1, y: '0vh' }}
              exit={{ opacity: 0, y: direction > 0 ? '-7vh' : '7vh' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <ActiveScene parallax />
            </motion.div>
          </AnimatePresence>

          <div className="global-progress global-progress-v19">
            <motion.div style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </section>
    </main>
  );
}
