import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import './TestimonialModal.scss';
import { TESTIMONIAL_LIST } from '../Testimonial/constants';
import { useKeenSlider } from 'keen-slider/react';

type TestimonialModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  topOffsetRef: RefObject<HTMLDivElement>;
};

export default function TestimonialModal({
  openModal,
  setOpenModal,
  topOffsetRef
}: TestimonialModalProps) {
  const testimonialModalRef = useRef<HTMLDivElement>(null);
  const [sliderRef] = useKeenSlider<HTMLUListElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15
    }
  });

  useEffect(() => {
    const topOffsetElement = topOffsetRef.current;
    const testimonialModal = testimonialModalRef.current;
    if (!topOffsetElement || !testimonialModal) return;

    const topOffsetRect = topOffsetElement.getBoundingClientRect();
    const heightOffset = topOffsetRect.height + 50;
    testimonialModal.style.setProperty('--title-height', `${heightOffset}px`);
    testimonialModal.style.transform = `translateY(${topOffsetRect.height}px)`;
  }, [topOffsetRef]);

  return (
    <div className="testimonial-modal-container">
      <div
        onClick={() => setOpenModal(false)}
        className="modal-overlay"
        aria-hidden="true"
        style={openModal ? { opacity: '1' } : {}}
      ></div>
      <div
        ref={testimonialModalRef}
        className="testimonial-modal"
        style={openModal ? { opacity: '1', pointerEvents: 'auto' } : {}}
      >
        <div className="modal-title-container">
          <h3>Testimonials:</h3>
          <button onClick={() => setOpenModal(false)} className="close-button">
            {/* prettier-ignore */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00071 7.41379L10.587 11.9993L12.0013 10.5852L7.41505 5.9997L12.0014 1.41409L10.5871 0L6.00071 4.58561L1.41433 0L0 1.41409L4.58638 5.9997L0.000128787 10.5852L1.41446 11.9993L6.00071 7.41379Z" fill="#FCFCFC"/>
          </svg>
          </button>
        </div>
        <div className="modal-content">
          <ul ref={sliderRef} className="keen-slider testimonial-modal-slider">
            {TESTIMONIAL_LIST.map(testimonial => (
              <li key={testimonial.id} className="keen-slider__slide">
                <p>{testimonial.text}</p>
                <p className="reviewer">- {testimonial.reviewer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
