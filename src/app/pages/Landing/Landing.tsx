'use client';
import Sticker from '@/components/Sticker/Sticker';
import './Landing.scss';
import Fruits from '@/components/Fruits/Fruits';
import { PageRef } from '@/page';
import Impact from '@/assets/stickers/impact.svg';
import CartIcon from '@/assets/icons/cart.svg';
import Signature from '@/components/Signature/Signature';
import { useRef } from 'react';
import DCOSticker from '@/assets/stickers/dco-sticker.png';
import Image from 'next/image';

type LandingProps = {
  landingRef: PageRef;
};

export default function Landing({ landingRef }: LandingProps) {
  const signatureContainerRef = useRef<HTMLDivElement>(null);
  return (
    <section ref={landingRef} id="landing">
      <Sticker
        name="dco"
        image={
          <Image
            src={DCOSticker}
            width="101"
            height="125"
            alt="Design Co Sticker"
          />
        }
        style={{ right: '50px', top: '15%' }}
        hideMobile
      />
      <Sticker
        name="impact"
        image={<Impact />}
        style={{ left: '10px', top: '55%' }}
        hideMobile
      />
      <div className="mobile-header">
        <h1>up-grade 2024</h1>
        <p>UCSD Design Co</p>
        <p>San Diego, CA</p>
        <h3>July 1st to September 6th</h3>
      </div>
      <p className="breadcrumb">.01 / Home</p>

      <Fruits />

      <div ref={signatureContainerRef} className="landing-signature-container">
        <Signature
          hideMobile={false}
          navContainerRef={signatureContainerRef}
          hoveringCart={false}
        />
      </div>
      <a className="add-me-to-cart">
        <CartIcon className="svg-cart" />
        <p>ADD ME TO CART</p>
      </a>
    </section>
  );
}
