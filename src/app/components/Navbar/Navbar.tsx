'use client';
import Link from 'next/link';
import './Navbar.scss';
import { useState, useRef, RefObject } from 'react';
import Hamburger from './Hamburger/Hamburger';
import FocusTrap from 'focus-trap-react';
import { useHandleHamburger } from './hooks/useHandleHamburger';
import { useHandleAsterisks } from './hooks/useHandleAsterisks';
import { useHandleScroll } from './hooks/useHandleScroll';

type NavbarProps = {
  pageRefs: {
    mainRef: RefObject<HTMLElement>;
    landingRef: RefObject<HTMLElement>;
    overviewRef: RefObject<HTMLElement>;
    themesRef: RefObject<HTMLElement>;
    faqRef: RefObject<HTMLElement>;
    applyRef: RefObject<HTMLElement>;
  };
};

const NAV_LINKS = [
  { href: '#landing', text: 'Home' },
  { href: '#overview', text: 'Overview' },
  { href: '#themes', text: 'Themes' },
  { href: '#faq', text: 'FAQ' },
  { href: '#apply', text: 'Apply' }
];

const PAGE_TYPES = ['Home', 'Overview', 'Themes', 'FAQ', 'Apply'] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export default function Navbar({ pageRefs }: NavbarProps) {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const asterisksRef1 = useRef<HTMLDivElement | null>(null);
  const asterisksRef2 = useRef<HTMLDivElement | null>(null);
  const [currPage, setCurrPage] = useState<PageType>('Home');

  const { toggleHamburger, isHamburgerOpen, hamburgerInnerRef } =
    useHandleHamburger({ navContainerRef });

  const { numAstericks } = useHandleAsterisks({ asterisksRef1, asterisksRef2 });

  useHandleScroll({ setCurrPage, pageRefs, PAGE_TYPES });

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
                      <h3
                        className="nav-link"
                        style={{
                          backgroundColor:
                            currPage === link.text ? '#f5ff85' : ''
                        }}
                      >
                        {link.text.toUpperCase()}
                      </h3>
                      <h3 style={{ marginLeft: 'auto' }}>{`.0${index + 1}`}</h3>
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
