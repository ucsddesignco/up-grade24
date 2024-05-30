'use client';
import Link from 'next/link';
import './Navbar.scss';
import { useState, useEffect, useRef } from 'react';
import Hamburger from './Hamburger/Hamburger';
import FocusTrap from 'focus-trap-react';
import FAQ from '@/pages/FAQ/FAQ';
import { handleToggle } from './hooks/handleToggle';

type NavbarProps = {
  pageRefs: {
    mainRef: React.RefObject<HTMLElement>;
    landingRef: React.RefObject<HTMLElement>;
    overviewRef: React.RefObject<HTMLElement>;
    themesRef: React.RefObject<HTMLElement>;
    faqRef: React.RefObject<HTMLElement>;
    applyRef: React.RefObject<HTMLElement>;
  }
}

const NAV_LINKS = [
  { href: '#landing', text: 'Home' },
  { href: '#overview', text: 'Overview' },
  { href: '#themes', text: 'Themes' },
  { href: '#faq', text: 'FAQ' },
  { href: '#apply', text: 'Apply' }
];

const PAGE_TYPES = ["Home", "Overview", "Themes", "FAQ", "Apply"]


export default function Navbar({pageRefs}: NavbarProps) {
  const { mainRef, landingRef, overviewRef, themesRef, faqRef, applyRef } = pageRefs;
  const [numAstericks, setNumAsterisks] = useState(0);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const asterisksRef1 = useRef<HTMLDivElement | null>(null);
  const asterisksRef2 = useRef<HTMLDivElement | null>(null);
  const [currPage, setCurrPage] = useState('Home');

  const {toggleHamburger, isHamburgerOpen, hamburgerInnerRef} = handleToggle({navContainerRef});

  useEffect(() => {
    const mainElement = mainRef.current;
    const landingElement = landingRef.current;
    const overviewElement = overviewRef.current;
    const themesElement = themesRef.current;
    const faqElement = faqRef.current;
    const applyElement = applyRef.current;
    
    /**
     * Sets the current page
     * Current page is based on what part of scroll we are at
    */
    if (!mainElement || !landingElement || !overviewElement || !themesElement || !faqElement || !applyElement) return;

    const pagesList = [landingElement, overviewElement, themesElement, faqElement, applyElement]
    const handleScroll = () => {
      const scrollPosition = mainElement.scrollTop || 0;
      
      pagesList.forEach((page, index) => {
        const pageTop = page.offsetTop;
        const pageBottom = pageTop + page.clientHeight;
        
        const halfScrollPosition = scrollPosition + window.innerHeight/2;
        if(halfScrollPosition > pageTop && halfScrollPosition < pageBottom){
          setCurrPage(PAGE_TYPES[index]);
        }
      });
    }

    mainElement.addEventListener("scroll", handleScroll)
    /**
     * Dynamically set the number of astricks
     */
    const updateAsterisks = () => {
      if (asterisksRef1.current) {
        const width = asterisksRef1.current.getBoundingClientRect().width;
        const calcNumAstericks = Math.floor(width / 10);
        setNumAsterisks(calcNumAstericks);
      }
      if (asterisksRef2.current) {
        const width = asterisksRef2.current.getBoundingClientRect().width;
        const calcNumAstericks = Math.floor(width / 10);
        setNumAsterisks(calcNumAstericks);
      }
    };


    updateAsterisks();
    window.addEventListener('resize', updateAsterisks);

    return () => {
      window.removeEventListener('resize', updateAsterisks)
      mainElement.removeEventListener('scroll', handleScroll)
    };
  }, []);

  return (
    <FocusTrap active={isHamburgerOpen}>
      <nav>
        <Hamburger
          isHamburgerOpen={isHamburgerOpen}
          toggleHamburger={toggleHamburger}
          hamburgerInnerRef={hamburgerInnerRef}
        />

        <div
          ref={navContainerRef}
          className={`nav-container slideTransition ${isHamburgerOpen ? 'panel-open is-active' : 'panel-close'}`}
        >
          <Link href="/">
            <h1 style={{ paddingBottom: '7px' }}>UP-GRADE 2024</h1>
            <h3>
              UCSD Design Co <br /> San Diego, CA
            </h3>
            <h2 style={{ paddingTop: '7px' }}>JUNE 1ST TO AUGUST 13TH</h2>
          </Link>
          <h2 ref={asterisksRef1} className="asterisk">
            {'*'.repeat(numAstericks)}
          </h2>
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                aria-current={currPage === link.text}
                className={`nav-link-container ${currPage === link.text ? 'active' : ''}`}
              >
                <Link href={link.href} passHref legacyBehavior>
                  <a
                    onClick={() => {
                      isHamburgerOpen ? toggleHamburger() : null;
                      setCurrPage(PAGE_TYPES[index]);
                    }}
                  >
                    <div className="nav-link-list">
                      <h3 className="nav-link" style={{backgroundColor: currPage === link.text ? '#f5ff85' : ''}}>
                        {link.text.toUpperCase()}
                      </h3>
                      <h3 style={{ marginLeft: 'auto' }}>
                        {`.0${index + 1}`}
                      </h3>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <h2 ref={asterisksRef2} className="asterisk">
            {'*'.repeat(numAstericks)}
          </h2>

          <div className="nav-footer">
            <div className={'apply-now'}>
              <h1>Apply Now</h1>
            </div>

            <button className="add-me-to-cart">
              <svg
                className="svg-cart"
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="25"
                viewBox="0 0 44 25"
                fill="none"
              >
                <path
                  d="M1.5 1.57288H42L37.4949 23.3151H6.08701L1.5 1.57288Z"
                  stroke="#FCFCFC"
                  strokeWidth="2"
                />
                <path
                  d="M4.5 15.5729L39.5 15.5729"
                  stroke="#FCFCFC"
                  strokeWidth="2"
                />
                <path d="M3.5 8.57288H40.5" stroke="#FCFCFC" strokeWidth="2" />
                <path
                  d="M28.5 1.57288L27.5 23.0729"
                  stroke="#FCFCFC"
                  strokeWidth="2"
                />
                <path
                  d="M15.5 1.57288L16.5 23.0729"
                  stroke="#FCFCFC"
                  strokeWidth="2"
                />
              </svg>
              <h3 style={{ marginLeft: '20px' }}>ADD ME TO CART</h3>
            </button>

            <div>
              <p>
                THANK YOU FOR CHECKING OUT <br /> UCSD DESIGN CO’S UP-GRADE
              </p>
              <a href="mailto:hello@ucsddesign.co">
                <p style={{ textDecoration: 'underline' }}>
                  hello@ucsddesign.co
                </p>
              </a>
            </div>
          </div>
        </div>
        <div
          className={`dark_overlay ${isHamburgerOpen ? 'is-active' : ''}`}
          aria-hidden="true"
          onClick={() => {
            toggleHamburger();
          }}
        ></div>
      </nav>
    </FocusTrap>
  );
}
