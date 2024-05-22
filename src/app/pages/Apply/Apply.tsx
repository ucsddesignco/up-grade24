'use client';

import Footer from '@/components/Footer/Footer';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import './Apply.scss';
import { applyInfo } from './apply-info';
import { testimonialInfo } from './testimonial-info';

export default function Apply() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    defaultAnimation: {
      duration: 1500
    },
    initial: currentSlide,
    slides: {
      origin: 'center',
      perView: 1
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  return (
    <section id="apply">
      <p className="breadcrumb">.05 / Apply</p>
      <h2>Why Apply?</h2>
      <hr className="line"></hr>
      <ul className="grid">
        {applyInfo.map(item => (
          <li key={item.id}>
            <h3>{item.header}</h3>
            <p>{item.content}</p>
          </li>
        ))}
        <li></li>
      </ul>
      <hr className="line"></hr>
      <div className="testimonials">
        <h3>See some testimonials from previous participants:</h3>
        <div className="navigation-wrapper">
          <div
            ref={sliderRef}
            className="keen-slider"
            style={{ maxWidth: 700, minWidth: 700 }}
          >
            {testimonialInfo.map(item => (
              <div
                className="keen-slider__slide testimonial-slide"
                key={item.id}
              >
                <p className="testimonial-text">{item.testimonial}</p>
                <p>- {item.reviewer}</p>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <button
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              >
                &lt;
              </button>
              <button
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}
