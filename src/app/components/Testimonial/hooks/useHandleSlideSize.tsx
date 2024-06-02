import { Dispatch, SetStateAction, useEffect } from 'react';

type UseHandleSlideSize = {
  perView: number;
  setPerView: Dispatch<SetStateAction<number>>;
};

export const useHandleSlideSize = ({
  perView,
  setPerView
}: UseHandleSlideSize) => {
  // Update width of each slides for smaller screen sizes
  useEffect(() => {
    const testimonials = document.querySelector(
      '.testimonials'
    ) as HTMLDivElement;
    const bottomSection = testimonials.querySelector(
      '.bottom-section'
    ) as HTMLUListElement;
    const sliderContainer = testimonials.querySelector(
      '.testimonial-slider'
    ) as HTMLUListElement;
    const currentSliderBg = testimonials.querySelector(
      '.center-background'
    ) as HTMLDivElement;
    const modalButton = testimonials.querySelector(
      '.testimonials-modal-button'
    ) as HTMLDivElement;
    if (!bottomSection || !sliderContainer || !currentSliderBg) return;

    const sliderRect = sliderContainer.getBoundingClientRect();
    let newPerView = perView;
    if (sliderRect.height < 140) {
      modalButton.style.display = 'block';
      modalButton.style.opacity = '1';
      return;
    }
    if (window.innerWidth < 550) {
      newPerView = 1;
      sliderContainer.classList.add('hide-both');
    } else if (
      (sliderRect.height < 170 && sliderRect.width < 1200) ||
      (sliderRect.width < 650 && sliderRect.width > 550)
    ) {
      newPerView = 1.5;
      currentSliderBg.classList.add('not-center');
      currentSliderBg.style.width = `calc(${(1 / newPerView) * 100}% - 1rem)`;
      sliderContainer.classList.add('hide-left');
    } else if (sliderRect.width < 550) {
      newPerView = 1;
      currentSliderBg.style.width = `calc(${(1 / newPerView) * 100}% - 2rem)`;
      sliderContainer.classList.add('hide-both');
    } else if (sliderRect.height < 180 || sliderRect.width < 800) {
      newPerView = 2;
      currentSliderBg.classList.add('not-center');
      currentSliderBg.style.width = `calc(${(1 / newPerView) * 100}% - 1rem)`;
      sliderContainer.classList.add('hide-left');
    } else if (sliderRect.height < 200) {
      newPerView = 2.5;
      currentSliderBg.classList.add('not-center');
      currentSliderBg.style.width = `calc(${(1 / newPerView) * 100}% - 1rem)`;
      sliderContainer.classList.add('hide-left');
    }

    if (perView !== newPerView) {
      setPerView(newPerView);
    }

    bottomSection.style.opacity = '1';
    currentSliderBg.style.opacity = '1';
  }, [perView, setPerView]);
};
