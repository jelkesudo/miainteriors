import { motion } from 'framer-motion';
import {
  LandingProjects,
  LandingServices,
  LandingProcess,
  LandingTestimonials,
  LandingContact,
} from '../components/LandingSections';

const reveal = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={`ease-reveal ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroPanel() {
  return (
    <section className="ease-hero">
      <div className="scene-glow glow-one" />
      <motion.div
        className="ease-hero-logo-wrap"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <img className="ease-hero-logo" src="/assets/mia-logo-bordo.png" alt="Mia Interior Studio" fetchPriority="high" />
      </motion.div>
      <motion.div
        className="hero-scene-copy ease-hero-copy"
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="scene-kicker">MIA INTERIOR STUDIO</p>
        <h1>Dve estetike.<em>Jedan dom.</em></h1>
        <p>Prostor koji spaja različite želje u celinu u kojoj se oboje prepoznajete.</p>
      </motion.div>
      <div className="scroll-hint"><span>SCROLL</span><i /></div>
    </section>
  );
}

function PhilosophyPanel() {
  return (
    <section className="ease-philosophy">
      <div className="giant-word ease-giant-word">PROSTOR</div>
      <Reveal className="scene-copy centered-copy">
        <span className="scene-index">01</span>
        <p className="scene-kicker wine">NAŠ PRISTUP</p>
        <h2>Ne biramo stil pre nego što upoznamo osobu.</h2>
        <p>Gde spuštate ključeve? Gde nastaje gužva? Koliko stvari morate da sakrijete? Dobar enterijer počinje tim pitanjima — ne Pinterest folderom.</p>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <main className="home-ease-v20">
      <HeroPanel />
      <PhilosophyPanel />
      <Reveal><LandingProjects /></Reveal>
      <Reveal><LandingServices /></Reveal>
      <Reveal><LandingProcess /></Reveal>
      <Reveal><LandingTestimonials /></Reveal>
      <Reveal><LandingContact /></Reveal>
    </main>
  );
}
