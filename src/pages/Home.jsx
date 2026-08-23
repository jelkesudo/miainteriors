import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  HeroScene, PhilosophyScene, RoleScene, ProjectsScene, ServicesScene,
  ProcessScene, GuidesScene, TestimonialScene, ContactScene
} from '../components/ImmersiveScenes';

const scenes = [
  HeroScene,
  PhilosophyScene,
  RoleScene,
  ProjectsScene,
  ServicesScene,
  ProcessScene,
  GuidesScene,
  TestimonialScene,
  ContactScene,
];

export default function Home() {
  const ref = useRef(null);
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
