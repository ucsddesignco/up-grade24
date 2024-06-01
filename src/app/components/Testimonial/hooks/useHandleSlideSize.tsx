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
    const sliderWidth = sliderRect.width;
    const sliderHeight = sliderRect.height;
    console.log({ sliderWidth, sliderHeight });
    let newPerView = perView;
    if (sliderRect.height < 140) {
      modalButton.style.display = 'block';
      modalButton.style.opacity = '1';
      console.log('wah');
      return;
    }
    if (sliderRect.height < 180 && sliderRect.width < 1200) {
      newPerView = 1.5;
      currentSliderBg.classList.add('not-center');
      currentSliderBg.style.width = `calc(${(1 / newPerView) * 100}% - 1rem)`;
      sliderContainer.classList.add('hide-left');
    } else if (sliderRect.height < 205) {
      newPerView = 2;
      currentSliderBg.classList.add('not-center');
      currentSliderBg.style.width = `calc(${(1 / newPerView) * 100}% - 1rem)`;
      sliderContainer.classList.add('hide-left');
    }

    if (perView !== newPerView) {
      setPerView(newPerView);
    }

    console.log(bottomSection);

    bottomSection.style.opacity = '1';
    currentSliderBg.style.opacity = '1';
  }, [perView, setPerView]);
};
