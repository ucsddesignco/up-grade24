import React from 'react';
import './Hamburger.scss';

type HamburgerProps = {
  isHamburgerOpen: boolean;
  toggleHamburger: () => void;
  hamburgerInnerRef: React.RefObject<HTMLSpanElement>;
};

export default function Hamburger({
  isHamburgerOpen,
  toggleHamburger,
  hamburgerInnerRef
}: HamburgerProps) {
  return (
    <>
      <button
        className={`hamburger ${isHamburgerOpen ? 'is-active' : ''}`}
        onClick={() => {
          toggleHamburger();
        }}
        aria-label={isHamburgerOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isHamburgerOpen}
      >
        <div className="container">
          <span ref={hamburgerInnerRef} className="line"></span>
        </div>
      </button>
    </>
  );
}
