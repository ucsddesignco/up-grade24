'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import './ThemesSlider.scss';
import ThemeSlide from './ThemeSlide/ThemeSlide';
import SliderArrow from './SliderArrow/SliderArrow';

import { useEffect, useState } from 'react';

export type SlideContent = {
  theme: string;
  themeColor?: string;
  description: string;
  nonProfits: {
    link: string;
    text: string;
  }[];
};

export default function ThemesSlider({
  slidesContent
}: {
  slidesContent: Array<SlideContent>;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    breakpoints: {
      '(min-width: 550px)': {
        slides: { origin: 'center', perView: 1.5, spacing: 0 }
      },
      '(min-width: 979px)': {
        slides: { origin: 'center', perView: 1.5, spacing: 10 }
      },
      '(min-width: 1200px)': {
        slides: { origin: 'center', perView: 2.5, spacing: 20 }
      },
      '(min-width: 1400px)': {
        slides: { perView: 3, spacing: 20 }
      }
    },
    slides: {
      perView: 1
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  useEffect(() => {
    const checkTablet = () => {
      if (window.innerWidth <= 979) {
        setIsTablet(true);
      } else {
        setIsTablet(false);
      }
    };

    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  //TODO: add aria controls and labels to slide navigation

  return (
    <div
      className="theme-slider-container"
      style={isTablet ? { width: '100%' } : {}}
    >
      <div ref={sliderRef} className="keen-slider">
        {slidesContent.map(slide => (
          <div className="keen-slider__slide" key={slide.theme}>
            <ThemeSlide content={slide} />
          </div>
        ))}
      </div>

      <div className="theme-slider-nav">
        <span className="dots">
          {loaded &&
            [...Array(instanceRef.current?.slides.length)].map(
              (_, slideIdx) => (
                <button
                  key={slideIdx}
                  className={
                    'dot' + (currentSlide === slideIdx ? ' active' : '')
                  }
                  onClick={() => instanceRef.current?.moveToIdx(slideIdx)}
                ></button>
              )
            )}
        </span>
        <span className="arrows">
          <SliderArrow
            left
            onClick={e => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          />
          <SliderArrow
            onClick={e => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            disabled={currentSlide === 2}
          />
        </span>
      </div>
    </div>
  );
}
