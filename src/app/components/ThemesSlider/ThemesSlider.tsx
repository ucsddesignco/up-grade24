'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import ThemeSlide from './ThemeSlide/ThemeSlide';
import './ThemesSlider.scss';

import { useState } from 'react';

export type slideContent = {
  theme: string;
  description: string;
  nonProfits: Array<string>;
};

type ThemesSliderProps = { slidesContent: Array<slideContent> };

export default function ThemesSlider({ slidesContent }: ThemesSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  return (
    <div className="nav-wrapper">
      <div ref={sliderRef} className="keen-slider">
        {slidesContent.map(slide => (
          <div className="keen-slider__slide" key={slide.theme}>
            <ThemeSlide content={slide} />
          </div>
        ))}
      </div>
      <span className="dots">
        {loaded &&
          [...Array(instanceRef.current?.slides.length)].map((_, slideIdx) => (
            <button
              key={slideIdx}
              className={'dot' + (currentSlide === slideIdx ? ' active' : '')}
              onClick={() => instanceRef.current?.moveToIdx(slideIdx)}
            ></button>
          ))}
      </span>
    </div>
  );
}
