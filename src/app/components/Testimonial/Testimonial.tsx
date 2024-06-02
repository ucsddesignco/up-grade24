import { Dispatch, SetStateAction, useState } from 'react';
import './Testimonial.scss';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { TESTIMONIAL_LIST } from './constants';
import { useHandleSlideSize } from './hooks/useHandleSlideSize';

type TestimonialProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function Testimonial({ setOpenModal }: TestimonialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [perView, setPerView] = useState(3);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: perView,
      spacing: 10
    }
  });

  useHandleSlideSize({ perView, setPerView });

  const slideWidthStyles = {
    width: `${1 / perView}%`,
    maxWidth: `${1 / perView}%`,
    minWidth: `${1 / perView}%`
  };

  return (
    <div className="testimonials">
      <button
        className="testimonials-modal-button"
        onClick={() => {
          console.log('test'), setOpenModal(true);
        }}
      >
        See testimonials from previous participants:
      </button>
      <div className="bottom-section">
        <h3>See some testimonials from previous participants:</h3>
        <div className="slider-wrapper">
          <div className="center-background"></div>
          {/* Show Modal Button when height is too small */}
          <ul ref={sliderRef} className="keen-slider testimonial-slider">
            {TESTIMONIAL_LIST.map(testimonial => (
              <li
                key={testimonial.id}
                className="keen-slider__slide"
                style={slideWidthStyles}
              >
                <p>{testimonial.text}</p>
                <p className="reviewer">- {testimonial.reviewer}</p>
              </li>
            ))}
          </ul>
          {loaded && instanceRef.current && (
            <div className="arrow-container">
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />
              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </div>
          )}
          {loaded && instanceRef.current && (
            <div className="dots">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
