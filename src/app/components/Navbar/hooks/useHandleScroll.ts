import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { PageType } from '../Navbar';

type UseHandleScrollType = {
  setCurrPage: Dispatch<SetStateAction<PageType>>;
  pageRefs: {
    mainRef: RefObject<HTMLElement>;
    landingRef: RefObject<HTMLElement>;
    overviewRef: RefObject<HTMLElement>;
    themesRef: RefObject<HTMLElement>;
    faqRef: RefObject<HTMLElement>;
    applyRef: RefObject<HTMLElement>;
  };
  PAGE_TYPES: readonly ['Home', 'Overview', 'Themes', 'FAQ', 'Apply'];
};

export const useHandleScroll = ({
  setCurrPage,
  pageRefs,
  PAGE_TYPES
}: UseHandleScrollType) => {
  const { mainRef, landingRef, overviewRef, themesRef, faqRef, applyRef } =
    pageRefs;
  useEffect(() => {
    const mainElement = mainRef.current;
    const landingElement = landingRef.current;
    const overviewElement = overviewRef.current;
    const themesElement = themesRef.current;
    const faqElement = faqRef.current;
    const applyElement = applyRef.current;
    console.log(
      mainElement,
      landingElement,
      overviewElement,
      themesElement,
      faqElement,
      applyElement
    );

    /**
     * Sets the current page
     * Current page is based on what part of scroll we are at
     */
    if (
      !mainElement ||
      !landingElement ||
      !overviewElement ||
      !themesElement ||
      !faqElement ||
      !applyElement
    )
      return;

    const pagesList = [
      landingElement,
      overviewElement,
      themesElement,
      faqElement,
      applyElement
    ];
    const handleScroll = () => {
      console.log('test');
      const scrollPosition = mainElement.scrollTop || 0;

      pagesList.forEach((page, index) => {
        const pageTop = page.offsetTop;
        const pageBottom = pageTop + page.clientHeight;

        const halfScrollPosition = scrollPosition + window.innerHeight / 2;
        if (halfScrollPosition > pageTop && halfScrollPosition < pageBottom) {
          setCurrPage(PAGE_TYPES[index]);
        }
      });
    };

    mainElement.addEventListener('scroll', handleScroll);
    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [
    PAGE_TYPES,
    applyRef,
    faqRef,
    landingRef,
    mainRef,
    overviewRef,
    setCurrPage,
    themesRef
  ]);
};
