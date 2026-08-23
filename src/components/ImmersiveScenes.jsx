import { motion, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Ruler, PenTool, MessageCircle, Box, Building2,
  Sparkles, FileCheck2, ShoppingBag, ArrowUpRight
} from 'lucide-react';
import projects from '../data/projects.json';

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
      <motion.img
        className="hero-mark"
        src="/assets/mia-logo-hero.webp"
        alt="Mia Interior Studio"
        width="900"
        height="900"
        style={{ scale: logoScale, y: logoY }}
        fetchPriority="high"
      />
      <div className="hero-scene-copy">
        <p className="scene-kicker">INTERIOR ARCHITECTURE · SPACE PLANNING</p>
        <h1>Prostor koji ne izgleda samo lepo.<em>Prostor u kojem prepoznajete sebe.</em></h1>
        <p>Skrolujte. Stranica ostaje na mestu — ideja se menja pred vama.</p>
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

export function RoleScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const leftX = useTransform(progress, [.22,.31,.36], ['-20vw','0vw','5vw']);
  const rightX = useTransform(progress, [.22,.31,.36], ['20vw','0vw','-5vw']);
  return (
    <motion.section className="immersive-scene scene-role" style={m}>
      <div className="role-center">
        <p className="scene-kicker wine">DVE DISCIPLINE · JEDAN PROSTOR</p>
        <h2>Prvo rešavamo.<br/>Zatim oblikujemo.</h2>
      </div>
      <motion.article className="role-float role-left" style={{ x:leftX }}>
        <Ruler />
        <span>01</span>
        <h3>Space planner</h3>
        <p>Zone, komunikacije, mere, ergonomija i maksimalno korišćenje kvadrature.</p>
      </motion.article>
      <motion.article className="role-float role-right" style={{ x:rightX }}>
        <PenTool />
        <span>02</span>
        <h3>Arhitekta enterijera</h3>
        <p>Materijali, rasveta, nameštaj, atmosfera, 3D i dokumentacija za izvođenje.</p>
      </motion.article>
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
                <div className={`fake-image ${project.tone}`}>DODAJ SLIKU</div>
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

const serviceData = [
  [Ruler,'Space planning'],
  [PenTool,'Enterijer'],
  [MessageCircle,'Konsultacije'],
  [Box,'3D vizualizacije'],
  [Building2,'Poslovni prostori'],
];

export function ServicesScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const ringScale = useTransform(progress, [.45,.55,.63], [.72,1,.88]);
  return (
    <motion.section className="immersive-scene scene-services" style={m}>
      <div className="service-center">
        <p className="scene-kicker">USLUGE PRILAGOĐENE VAMA</p>
        <h2>Koliko podrške vam je stvarno potrebno?</h2>
        <Link className="scene-button" to="/usluge">Pogledajte usluge <ArrowUpRight size={14}/></Link>
      </div>
      <motion.div className="services-ring" style={{ scale:ringScale }}>
        {serviceData.map(([Icon,title],i)=>(
          <div className={`orbit-service os-${i+1}`} key={title}>
            <Icon strokeWidth={1.25}/><span>{title}</span>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

const process = [
  ['01','Upoznavanje i brief','Razumemo način života, prostor, rok i budžet.'],
  ['02','Organizacija prostora','Kvadratura dobija logiku pre estetike.'],
  ['03','Vizuelni pravac','Materijali, boje i atmosfera postaju jasni.'],
  ['04','3D vizualizacija','Vidite odluke pre nego što ih platite.'],
  ['05','Dokumentacija','Majstori dobijaju jasne mere i detalje.'],
];

export function ProcessScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const sceneStart = index / count;
  const sceneEnd = (index + 1) / count;
  const local = useTransform(progress, [sceneStart, sceneEnd], [0, 1]);

  return (
    <motion.section className="immersive-scene scene-process" style={m}>
      <div className="process-fixed-copy">
        <p className="scene-kicker wine">KAKO IZGLEDA SARADNJA</p>
        <h2>Jedan ekran.<br/>Pet jasnih koraka.</h2>
      </div>
      <div className="process-stack">
        {process.map(([n,title,text],i)=><ProcessCard key={n} local={local} index={i} item={[n,title,text]}/>)}
      </div>
    </motion.section>
  );
}

function ProcessCard({ local, index, item }) {
  const [n,title,text] = item;
  const center = (index + .5) / 5;
  const opacity = useTransform(local, [Math.max(0,center-.18), center-.08, center+.08, Math.min(1,center+.18)], [0,1,1,0]);
  const scale = useTransform(local, [Math.max(0,center-.18),center,Math.min(1,center+.18)], [.86,1,.9]);
  const y = useTransform(local, [Math.max(0,center-.18),center,Math.min(1,center+.18)], ['7vh','0vh','-7vh']);
  return (
    <motion.article className="process-card" style={{ opacity,scale,y }}>
      <span>{n}</span><Sparkles/>
      <h3>{title}</h3><p>{text}</p>
    </motion.article>
  );
}

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

export function TestimonialScene({ progress, index, count }) {
  const m = useSceneMotion(progress, index, count);
  const qScale = useTransform(progress, [.82,.90,.94], [.72,1,.94]);
  return (
    <motion.section className="immersive-scene scene-testimonial" style={m}>
      <motion.div className="testimonial-card" style={{ scale:qScale }}>
        <span className="quote">“</span>
        <blockquote>Najviše nam je značilo što projekat nije krenuo od toga šta je moderno, nego od toga kako nas petoro stvarno funkcionišemo u stanu.</blockquote>
        <strong>Ana & Marko</strong><small>Porodični stan · demo testimonial</small>
      </motion.div>
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
        <p className="contact-final-copy">Mia Interior Studio · space planning · arhitektura enterijera · konsultacije</p>
        <div className="contact-final-actions">
          <Link className="scene-button wine-button" to="/kontakt">Pošaljite upit <ArrowUpRight size={15}/></Link>
          <Link className="scene-text-link" to="/projekti">Pogledajte projekte</Link>
        </div>
      </div>
    </motion.section>
  );
}
