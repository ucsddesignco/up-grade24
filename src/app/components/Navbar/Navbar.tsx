'use client';
import Link from 'next/link';
import './Navbar.scss';
import { useState, useRef, RefObject } from 'react';
import Hamburger from './Hamburger/Hamburger';
import FocusTrap from 'focus-trap-react';
import { useHandleHamburger } from './hooks/useHandleHamburger';
import { useHandleScroll } from './hooks/useHandleScroll';
import Signature from '../Signature/Signature';

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

// Overshoot number of asterisks, as it will anything past first line will be hidden
const NUM_ASTERISKS = 50;

const PAGE_TYPES = ['Home', 'Overview', 'Themes', 'FAQ', 'Apply'] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export default function Navbar({ pageRefs }: NavbarProps) {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const asterisksRef1 = useRef<HTMLDivElement | null>(null);
  const asterisksRef2 = useRef<HTMLDivElement | null>(null);
  const [currPage, setCurrPage] = useState<PageType>('Home');
  const [hoveringCart, setHoveringCart] = useState(false);

  const { toggleHamburger, isHamburgerOpen, hamburgerInnerRef } =
    useHandleHamburger({ navContainerRef });

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
            <h1>UP-GRADE 2024</h1>
          </Link>
          <div className="event-logistics">
            <h3>
              UCSD Design Co <br /> San Diego, CA
            </h3>
            <p className="event-date">JUNE 1ST TO AUGUST 13TH</p>
          </div>
          <span aria-hidden={true} ref={asterisksRef1} className="asterisk">
            {'*'.repeat(NUM_ASTERISKS)}
          </span>
          <ul className="nav-link-list">
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
                    <div className="nav-link">
                      <h3
                        className="nav-link-text"
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
          <span aria-hidden={true} ref={asterisksRef2} className="asterisk">
            {'*'.repeat(NUM_ASTERISKS)}
          </span>

          <div className="nav-footer">
            {/* <ApplyNow navContainerRef={navContainerRef} /> */}
            {/* <FutureUpgrader/> */}
            <Signature
              navContainerRef={navContainerRef}
              hoveringCart={hoveringCart}
            />
            <a
              className="add-me-to-cart"
              onMouseEnter={() => {
                setHoveringCart(true);
              }}
              onMouseLeave={() => {
                setHoveringCart(false);
              }}
            >
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
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M4.5 15.5729L39.5 15.5729"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M3.5 8.57288H40.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M28.5 1.57288L27.5 23.0729"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M15.5 1.57288L16.5 23.0729"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <p>ADD ME TO CART</p>
            </a>

            <div className="thank-you-container">
              <p className="thank-you-label">
                {`THANK YOU FOR CHECKING OUT`} <br />{' '}
                {`UCSD DESIGN CO'S UP-GRADE`}
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
