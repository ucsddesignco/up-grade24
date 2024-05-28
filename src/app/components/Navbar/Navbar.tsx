'use client';
import Link from 'next/link';
import './Navbar.scss';
import React, { useState, useEffect, useRef } from 'react';
import Hamburger from './Hamburger/Hamburger';
import FocusTrap from 'focus-trap-react';
//import { link } from 'fs';

//type NavbarProps = {}
//type Pages = 'Home' | 'Overview' | 'Themes' | 'FAQ' | 'Apply'

export default function Navbar() {
  const hamburgerInnerRef = React.useRef<HTMLSpanElement>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const links = [
    { href: '#landing', text: 'Home' },
    { href: '#overview', text: 'Overview' },
    { href: '#themes', text: 'Themes' },
    { href: '#faq', text: 'FAQ' },
    { href: '#apply', text: 'Apply' }
  ];

  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);

    if (!isHamburgerOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsHamburgerOpen(false);
          document.body.style.overflow = 'auto';
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
      document.querySelector('main')?.setAttribute('aria-hidden', 'true');
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.querySelector('main')?.removeAttribute('aria-hidden');
      // Add transition to hamburger menu background color when closing navbar
      if (hamburgerInnerRef.current) {
        hamburgerInnerRef.current.style.transition =
          'transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19), background-color 0.3s';
        hamburgerInnerRef.current.addEventListener('animationend', () => {
          hamburgerInnerRef.current!.style.transition =
            'transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
        });
      }
    }
  };

  /* Vars for setting Astricks */
  const [numAstericks, setNumAsterisks] = useState(0);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  /* Vars for Setting Current Page */
  //const pageList = ['Home', 'Overview', 'Themes', 'FAQ', 'Apply']
  const [currPage, setCurrPage] = useState('Home');

  /* Vars for Setting the Highlights Width and Hight */
  const [highlightWidth, setHighlightWidth] = useState(0);
  const [highlightHeight, setHighlightHeight] = useState(0);
  const highlight = useRef<HTMLDivElement | null>(null);
  const navLink = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    /**
     * Dynamically set the number of astricks
     */
    const updateAsterisks = () => {
      if (navContainerRef.current) {
        const width = navContainerRef.current.offsetWidth;
        const calcNumAstericks = Math.floor(width / 10);
        setNumAsterisks(calcNumAstericks);
      }
    };

    /**
     * If a page is seleted; then update the highlight
     */
    const updateHighlightSize = () => {
      if (highlight.current && navLink.current) {
        const linkWidth = navLink.current?.offsetWidth;
        const linkHight = navLink.current?.offsetHeight;
        setHighlightWidth(linkWidth || 0);
        setHighlightHeight(linkHight || 0);
      }
    };

    /**
     * Sets the current page
     * Current page is based on what part of scroll we are at
     */
    setCurrPage('Home');

    updateHighlightSize();
    updateAsterisks();
    window.addEventListener('resize', updateAsterisks);

    return () => window.removeEventListener('resize', updateAsterisks);
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
          className={`nav-container ${isHamburgerOpen ? 'panel-open is-active' : 'panel-close'}`}
        >
          <Link href="/">
            <h1 style={{ paddingBottom: '7px' }}>UP-GRADE 2024</h1>
            <h3>
              UCSD Design Co <br /> San Diego, CA
            </h3>
            <h2 style={{ paddingTop: '7px' }}>JUNE 1ST TO AUGUST 13TH</h2>
          </Link>
          <h2 ref={navContainerRef} className="asterisk">
            {'*'.repeat(numAstericks)}
          </h2>
          <ul>
            {links.map(link => (
              <li
                key={link.href}
                className={`nav-link-container ${currPage === link.text ? 'active' : ''}`}
              >
                <Link href={link.href} passHref legacyBehavior>
                  <a
                    onClick={() => {
                      isHamburgerOpen ? toggleHamburger() : null;
                    }}
                  >
                    <div className="nav-link-list">
                      {link.text === currPage ? (
                        <div
                          className="highlight"
                          ref={highlight}
                          style={{
                            width: highlightWidth + 5,
                            height: highlightHeight + 2
                          }}
                        ></div>
                      ) : null}
                      <h3 className="nav-link" ref={navLink}>
                        {link.text.toUpperCase()}
                      </h3>{' '}
                      <h3 style={{ marginLeft: 'auto' }}>
                        {' '}
                        .0{links.indexOf(link) + 1}{' '}
                      </h3>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <h2 ref={navContainerRef} className="asterisk">
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
                  stroke-width="2"
                />
                <path
                  d="M4.5 15.5729L39.5 15.5729"
                  stroke="#FCFCFC"
                  stroke-width="2"
                />
                <path d="M3.5 8.57288H40.5" stroke="#FCFCFC" stroke-width="2" />
                <path
                  d="M28.5 1.57288L27.5 23.0729"
                  stroke="#FCFCFC"
                  stroke-width="2"
                />
                <path
                  d="M15.5 1.57288L16.5 23.0729"
                  stroke="#FCFCFC"
                  stroke-width="2"
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
