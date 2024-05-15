'use client';
import Link from 'next/link';
import './Navbar.scss';
import React, { useState } from 'react';
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
            <h1>UP-GRADE 2024</h1>
          </Link>
          <ul>
            {links.map(link => (
              <li key={link.href}>
                <Link href={link.href} passHref legacyBehavior>
                  <a
                    onClick={() => {
                      isHamburgerOpen ? toggleHamburger() : null;
                    }}
                  >
                    {link.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
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
