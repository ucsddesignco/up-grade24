'use client';

import React, { useRef } from 'react';
import './Home.scss';

import Landing from './pages/Landing/Landing';
import Overview from './pages/Overview/Overview';
import Themes from './pages/Themes/Themes';
import FAQ from './pages/FAQ/FAQ';
import Apply from './pages/Apply/Apply';
import Navbar from './components/Navbar/Navbar';

export type PageRef = React.RefObject<HTMLElement>;

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const themesRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const applyRef = useRef<HTMLElement>(null);

  return (
    <main className="home_page">
      <Navbar
        pageRefs={{
          mainRef,
          landingRef,
          overviewRef,
          themesRef,
          faqRef,
          applyRef
        }}
      />
      <div ref={mainRef} className="main-content">
        <Landing landingRef={landingRef} />
        <Overview overviewRef={overviewRef} />
        <Themes themesRef={themesRef} />
        <FAQ faqRef={faqRef} />
        {/* Footer is inside Apply */}
        <Apply applyRef={applyRef} />
      </div>
    </main>
  );
}
