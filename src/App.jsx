import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';

function ScrollReset() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Prevent the browser from restoring an old deep scroll position
    // (especially noticeable on this 900vh immersive homepage).
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Use the numeric overload so CSS scroll-behavior cannot turn this
    // into an animated scroll.
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    return () => {
      // Keep manual restoration for the SPA lifetime.
      // We intentionally do not restore "auto" between route transitions.
    };
  }, []);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const immersive = pathname === '/';

  return (
    <>
      <ScrollReset />
      <Header immersive={immersive} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projekti" element={<Projects />} />
        <Route path="/projekti/:slug" element={<ProjectDetail />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/o-nama" element={<About />} />
      </Routes>
      {!immersive && <Footer />}
    </>
  );
}
