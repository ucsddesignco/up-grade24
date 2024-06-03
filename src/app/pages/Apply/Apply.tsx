'use client';

import Footer from '@/components/Footer/Footer';
import 'keen-slider/keen-slider.min.css';
import './Apply.scss';
import { applyInfo } from './apply-info';
import Testimonial from '@/components/Testimonial/Testimonial';
import { useCallback, useEffect, useRef, useState } from 'react';
import GrapeSticker from '@/assets/stickers/grape.png';
import YuzuSticker from '@/assets/stickers/yuzu.png';
import Sticker from '@/components/Sticker/Sticker';
import { PageRef } from '@/page';
import TestimonialModal from '@/components/TestimonialModal/TestimonialModal';
import Image from 'next/image';

type ApplyProps = {
  applyRef: PageRef;
};

export default function Apply({ applyRef }: ApplyProps) {
  const [openModal, setOpenModal] = useState(false);
  const topOffsetRef = useRef<HTMLDivElement>(null);

  const handleEscapePress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenModal(false);
      }
    },
    [setOpenModal]
  );

  useEffect(() => {
    const applyContainer = applyRef.current;

    if (applyContainer && openModal) {
      applyContainer.addEventListener('keydown', handleEscapePress);
    }

    return () => {
      if (applyContainer) {
        applyContainer.removeEventListener('keydown', handleEscapePress);
      }
    };
  }, [applyRef, handleEscapePress, openModal]);

  return (
    <section id="apply" ref={applyRef}>
      <Sticker
        name="grape"
        image={
          <Image
            src={GrapeSticker}
            height="120"
            alt="Grape Sticker"
            draggable={false}
          />
        }
        style={{ right: '5%', top: '6%' }}
        hideMobile
      />
      <Sticker
        name="yuzu"
        image={
          <Image
            src={YuzuSticker}
            height="125"
            alt="Yuzu Sticker"
            draggable={false}
          />
        }
        style={{ bottom: '-8px', left: '38%' }}
      />
      <div className="top-section">
        <div ref={topOffsetRef} className="top-offset">
          <p className="breadcrumb">.05 / Apply</p>
          <h2>Why Apply?</h2>
          <hr className="line"></hr>
        </div>
        <ul className="grid">
          {applyInfo.map(item => (
            <li key={item.id}>
              <h3>{item.header}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
        <hr className="line"></hr>
      </div>
      <div className="bottom-section">
        <Testimonial setOpenModal={setOpenModal} />
        <Footer />
      </div>
      <TestimonialModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        topOffsetRef={topOffsetRef}
      />
    </section>
  );
}
