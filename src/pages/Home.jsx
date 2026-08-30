import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  HeroScene, PhilosophyScene, ProjectsScene, ServicesScene,
  ProcessScene, TestimonialScene, ContactScene
} from '../components/ImmersiveScenes';

const scenes = [
  HeroScene,
  PhilosophyScene,
  ProjectsScene,
  ServicesScene,
  ProcessScene,
  TestimonialScene,
  ContactScene,
];

export default function Home() {
  const ref = useRef(null);
  const { hash } = useLocation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start','end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.22,
    restDelta: 0.0005,
  });

  useEffect(() => {
    if (hash !== '#usluge' || !ref.current) return;

    // ServicesScene is scene 4 of 7 (index 3).
    // The landing is a sticky scroll-story, so a normal DOM anchor cannot
    // target the visual scene. Jump to the center of that scroll segment.
    const servicesIndex = 3;
    const progress = (servicesIndex + 0.5) / scenes.length;
    const maxScroll = Math.max(0, ref.current.offsetHeight - window.innerHeight);

    requestAnimationFrame(() => {
      window.scrollTo(0, Math.round(maxScroll * progress));
    });
  }, [hash]);

  return (
    <main className="immersive-home" ref={ref}>
      <div className="immersive-sticky">
        {scenes.map((Scene, index) => (
          <Scene
            key={index}
            progress={smooth}
            index={index}
            count={scenes.length}
          />
        ))}
        <div className="global-progress">
          <motion.div style={{ scaleX: smooth }} />
        </div>
      </div>
    </main>
  );
}
