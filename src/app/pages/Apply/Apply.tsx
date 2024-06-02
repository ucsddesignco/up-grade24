'use client';

import Footer from '@/components/Footer/Footer';
import 'keen-slider/keen-slider.min.css';
import './Apply.scss';
import { applyInfo } from './apply-info';
import Testimonial from '@/components/Testimonial/Testimonial';
import { useCallback, useEffect, useRef, useState } from 'react';
import TestimonialModal from '@/components/TestimonialModal/TestimonialModal';

export default function Apply() {
  const [openModal, setOpenModal] = useState(false);
  const topOffsetRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);

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
  }, [handleEscapePress, openModal]);

  return (
    <section id="apply" ref={applyRef}>
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
