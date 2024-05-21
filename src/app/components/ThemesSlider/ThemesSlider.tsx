import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import ThemeSlide from './ThemeSlide/ThemeSlide';
import './ThemesSlider.scss';

export type slideContent = {
  theme: string;
  description: string;
  nonProfits: Array<string>;
};

type ThemesSliderProps = { slidesContent: Array<slideContent> };

export default function ThemesSlider({ slidesContent }: ThemesSliderProps) {
  const [sliderRef] = useKeenSlider(
    {
      slideChanged() {
        console.log('slide changed');
      }
    },
    [
      // add plugins here
    ]
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {slidesContent.map(slide => (
        <div className="keen-slider__slide" key={slide.theme}>
          <ThemeSlide content={slide} />
        </div>
      ))}
    </div>
  );
}
