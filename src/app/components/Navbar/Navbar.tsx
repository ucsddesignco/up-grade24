'use client';
import Link from 'next/link';
import './Navbar.scss';
import React, { useState, useEffect, useRef } from 'react';
import Hamburger from './Hamburger/Hamburger';
import FocusTrap from 'focus-trap-react';

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

  const [numAstericks, setNumAsterisks] = useState(0);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /**
     * Dynamically set the number of astricks
     */
    const updateAsterisks = () => {
      if (navContainerRef.current) {
        const width = navContainerRef.current.offsetWidth;
        const calcNumAstericks = Math.ceil(width / 10);
        console.log(width);
        console.log(calcNumAstericks);
        setNumAsterisks(calcNumAstericks);
      }
    };

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
              <li key={link.href}>
                <Link href={link.href} passHref legacyBehavior>
                  <a
                    onClick={() => {
                      isHamburgerOpen ? toggleHamburger() : null;
                    }}
                  >
                    <div className="nav-link-list">
                      <h3 className="nav-link">{link.text.toUpperCase()}</h3>{' '}
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
            <div style={{ marginBottom: '40px' }}>
              <h1>Apply Now</h1>
            </div>

            <button className="add-me-to-cart">
              <p>ADD ME TO CART</p>
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
