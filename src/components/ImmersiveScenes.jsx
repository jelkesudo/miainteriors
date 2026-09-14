import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageCircle, LayoutPanelTop, MonitorUp, DraftingCompass,
  Sparkles, ArrowUpRight
} from 'lucide-react';
import projects from '../data/projects.json';
import services from '../data/services.json';
import process from '../data/process.json';
import testimonials from '../data/testimonials.json';
import TestimonialsCarousel from './TestimonialsCarousel';

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function useSceneMotion(progress, index, count) {
  const segment = 1 / count;
  const center = (index + 0.5) * segment;
  const fade = segment * 0.34;
  const enter = clamp(center - segment * 0.48, 0, 1);
  const visibleStart = clamp(center - fade, 0, 1);
  const visibleEnd = clamp(center + fade, 0, 1);
  const exit = clamp(center + segment * 0.48, 0, 1);

  // The first scene is rendered immediately at progress=0.
  if (index === 0) {
    const opacity = useTransform(progress, [0, visibleEnd, exit], [1, 1, 0]);
    const scale = useTransform(progress, [0, center, exit], [1, 1, 0.92]);
    const y = useTransform(progress, [0, center, exit], ['0vh', '0vh', '-3vh']);
    const pointerEvents = useTransform(opacity, value => value > 0.45 ? 'auto' : 'none');
    return { opacity, scale, y, pointerEvents };
  }

  const opacity = useTransform(progress, [enter, visibleStart, visibleEnd, exit], [0, 1, 1, 0]);
  const scale = useTransform(progress, [enter, center, exit], [1.07, 1, 0.93]);
  const y = useTransform(progress, [enter, center, exit], ['3vh', '0vh', '-3vh']);
  const pointerEvents = useTransform(opacity, value => value > 0.45 ? 'auto' : 'none');
  return { opacity, scale, y, pointerEvents };
}

export function HeroScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const logoScale = useTransform(progress, [0, .08, .13], [1, .78, .45]);
  const logoY = useTransform(progress, [0, .08, .13], ['0vh','-4vh','-12vh']);
  return (
    <motion.section className="immersive-scene scene-hero" style={m}>
      <div className="scene-glow glow-one" />
      <motion.picture className="hero-mark hero-mark-v19" style={{ scale: logoScale, y: logoY }}>
        <source media="(max-width: 560px)" srcSet="/assets/mia_logo_bordo.png" />
        <img src="/assets/mia-logo-hero.webp" alt="Mia Interior Studio" width="900" height="900" fetchPriority="high" />
      </motion.picture>
      <div className="hero-scene-copy">
        <p className="scene-kicker">MIA INTERIOR STUDIO</p>
        <h1>Dve estetike.<em>Jedan dom.</em></h1>
        <p>Prostor koji spaja različite želje u celinu u kojoj se oboje prepoznajete.</p>
      </div>
      <div className="scroll-hint"><span>SCROLL</span><i /></div>
    </motion.section>
  );
}

export function PhilosophyScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const wordScale = useTransform(progress, [.10,.20,.26], [1.5,1,.76]);
  const wordOpacity = useTransform(progress, [.10,.16,.27], [0,.12,.04]);
  return (
    <motion.section className="immersive-scene scene-light" style={m}>
      <motion.div className="giant-word" style={{ scale: wordScale, opacity: wordOpacity }}>PROSTOR</motion.div>
      <div className="scene-copy centered-copy">
        <span className="scene-index">01</span>
        <p className="scene-kicker wine">NAŠ PRISTUP</p>
        <h2>Ne biramo stil pre nego što upoznamo osobu.</h2>
        <p>Gde spuštate ključeve? Gde nastaje gužva? Koliko stvari morate da sakrijete? Dobar enterijer počinje tim pitanjima — ne Pinterest folderom.</p>
      </div>
    </motion.section>
  );
}

export function ProjectsScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const card1 = useTransform(progress, [.34,.43,.49], [.82,1,1.05]);
  const card2 = useTransform(progress, [.34,.43,.49], [.74,.94,1.01]);
  const card3 = useTransform(progress, [.34,.43,.49], [.68,.88,.98]);
  const featured = projects.slice(0, 3);

  return (
    <motion.section className="immersive-scene scene-projects" style={m}>
      <div className="scene-side-title">
        <p className="scene-kicker wine">IZDVOJENI PROJEKTI</p>
        <h2>Projekti koji pričaju priču.</h2>
        <Link to="/projekti">Svi projekti <ArrowUpRight size={15}/></Link>
      </div>

      <div className="project-deck">
        {featured.map((project, i) => {
          const scales = [card1, card2, card3];
          const classes = ['pf-1','pf-2','pf-3'];

          return (
            <motion.div className={`project-frame ${classes[i]}`} style={{ scale: scales[i] }} key={project.slug}>
              <Link to={`/projekti/${project.slug}`} className="project-frame-link">
                <img className="project-frame-image" src={project.cover} alt={project.title} loading="lazy" />
                <small>{project.type.toUpperCase()} · {project.area}</small>
                <strong>{project.title}</strong>
                <span className="project-open">Otvori projekat ↗</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

const serviceIcons = [MessageCircle, LayoutPanelTop, MonitorUp, DraftingCompass];

export function ServicesScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);

  return (
    <motion.section id="usluge" className="immersive-scene scene-services scene-services-v17" style={m}>
      <div className="service-center service-center-v17">
        <p className="scene-kicker">USLUGE</p>
        <h2>Koliko podrške vam je potrebno?</h2>
        <p className="service-center-copy">
          Od stručnog mišljenja o konkretnoj dilemi do kompletne adaptacije i tehničke razrade enterijera.
        </p>
      </div>

      <div className="services-summary-grid">
        {services.map((service, i) => (
          <article className="service-summary-card" key={service.slug}>
            <div className="service-summary-number">0{i + 1}</div>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <strong>{service.price}</strong>
          </article>
        ))}
      </div>

      <div className="services-cta-inline">
        <div>
          <span>Imaš ideju za svoj prostor?</span>
          <p>Pošalji nam osnovne informacije i predložićemo ti koji nivo usluge ima najviše smisla.</p>
        </div>
        <Link className="scene-button wine-button" to="/kontakt">
          Pošalji nam upit <ArrowUpRight size={14}/>
        </Link>
      </div>
    </motion.section>
  );
}


export function ProcessScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const sceneStart = index / count;
  const sceneEnd = (index + 1) / count;
  const local = useTransform(progress, [sceneStart, sceneEnd], [0, 0.999]);
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(local, 'change', (value) => {
    const next = Math.min(process.length - 1, Math.floor(value * process.length));
    setActiveStep((current) => current === next ? current : next);
  });

  const item = process[activeStep];

  return (
    <motion.section className="immersive-scene scene-process scene-process-v17" style={m}>
      <div className="process-fixed-copy process-fixed-copy-v17">
        <p className="scene-kicker wine">OD PRVE PORUKE DO PROSTORA PO TVOJOJ MERI</p>
        <h2>Svaki dobar prostor počinje razgovorom.</h2>
        <p className="process-intro-text">
          Od samog početka znaš šta možeš da očekuješ i koji je sledeći korak.
        </p>

        <div className="process-progress-v17">
          {process.map((step, i) => (
            <span key={step.number} className={i <= activeStep ? 'is-active' : ''}>
              {step.number}
            </span>
          ))}
        </div>

        <div className="questionnaire-preview process-document-preview">
          <img src="/assets/upitnik-preview.webp" alt="Upitnik za koncept enterijera" loading="lazy" />
          <div className="questionnaire-blur-layer" aria-hidden="true"></div>
          <div className="questionnaire-preview-label">
            <span>UPITNIK ZA KONCEPT ENTERIJERA</span>
            <small>Primer dokumenta koji koristimo u procesu razumevanja prostora</small>
          </div>
        </div>
      </div>

      <div className="process-stage-v17">
        <AnimatePresence mode="wait">
          <motion.article
            className="process-card process-card-v17"
            key={item.number}
            initial={{ opacity: 0, y: 24, scale: .985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: .99 }}
            transition={{ duration: .22, ease: 'easeOut' }}
          >
            <span>{item.number}</span>
            <Sparkles/>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.number === '02' && (
              <Link className="process-inline-link" to="/kontakt?usluga=savetovanje">
                Zakaži savetovanje ↗
              </Link>
            )}
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="process-final-cta-v17">
        <span>Spremni za prvi korak?</span>
        <Link to="/kontakt">Ispričaj nam o svom prostoru <ArrowUpRight size={14}/></Link>
      </div>
    </motion.section>
  );
}

/* PDF / DIGITAL LIBRARY PAUSED — prodaja će za sada ići preko Instagrama.
export function GuidesScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const z1 = useTransform(progress, [.72,.80,.86], [120,0,-40]);
  const z2 = useTransform(progress, [.72,.80,.86], [180,10,-60]);
  const z3 = useTransform(progress, [.72,.80,.86], [230,20,-80]);
  return (
    <motion.section className="immersive-scene scene-guides" style={m}>
      <div className="guide-copy">
        <p className="scene-kicker wine">MIA DIGITAL LIBRARY</p>
        <h2>Znanje koje možete primeniti odmah.</h2>
        <p>PDF vodiči, checkliste i workbook materijali za one koji uređuju sami — ali ne žele da nagađaju.</p>
        <Link className="scene-button wine-button" to="/vodici"><ShoppingBag size={15}/> Pogledajte vodiče <ArrowUpRight size={14}/></Link>
      </div>
      <div className="guide-books">
        <motion.div className="guide-book gb1" style={{ y:z1 }}><small>PDF VODIČ</small><strong>Planer funkcionalnog doma</strong><span>MIA</span></motion.div>
        <motion.div className="guide-book gb2" style={{ y:z2 }}><small>WORKBOOK</small><strong>Moodboard bez haosa</strong><span>MIA</span></motion.div>
        <motion.div className="guide-book gb3" style={{ y:z3 }}><small>CHECKLIST</small><strong>Pre prvog majstora</strong><span>MIA</span></motion.div>
      </div>
    </motion.section>
  );
}

*/
export function TestimonialScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);

  return (
    <motion.section className="immersive-scene scene-testimonial scene-testimonial-v17" style={m}>
      <div className="testimonial-scene-heading">
        <p className="scene-kicker wine">UTISCI KLIJENATA</p>
        <h2>Kako saradnja izgleda sa druge strane.</h2>
      </div>
      <TestimonialsCarousel items={testimonials} compact />
    </motion.section>
  );
}

export function ContactScene({ progress, index, count }) {
  const start = Math.max(0, index / count - 0.035);
  const settle = Math.min(1, (index + 0.36) / count);
  const opacity = useTransform(progress, [start, settle, 1], [0, 1, 1]);
  const scale = useTransform(progress, [start, settle, 1], [1.06, 1, 1]);
  const y = useTransform(progress, [start, settle, 1], ['3vh', '0vh', '0vh']);
  const pointerEvents = useTransform(opacity, value => value > 0.45 ? 'auto' : 'none');

  return (
    <motion.section className="immersive-scene scene-contact" style={{ opacity, scale, y, pointerEvents }}>
      <img src="/assets/mia-logo-hero.webp" className="contact-mark" alt="" aria-hidden="true"/>
      <div className="contact-center">
        <p className="scene-kicker wine">ZAPOČNIMO PROJEKAT</p>
        <h2>Imate prostor.<br/>Hajde da vidimo šta sve može da postane.</h2>
        <p className="contact-final-copy">Mia Interior Studio · savetovanje · plan uređenja · online koncept · projekat enterijera</p>
        <div className="contact-final-actions">
          <Link className="scene-button wine-button" to="/kontakt">Pošaljite upit <ArrowUpRight size={15}/></Link>
          <Link className="scene-text-link" to="/projekti">Pogledajte projekte</Link>
        </div>
      </div>
    </motion.section>
  );
}
