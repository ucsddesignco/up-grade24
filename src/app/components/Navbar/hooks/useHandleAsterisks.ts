import { RefObject, useEffect, useState } from 'react';

type UseHandleAsterisksProps = {
  asterisksRef1: RefObject<HTMLDivElement>;
  asterisksRef2: RefObject<HTMLDivElement>;
};

export const useHandleAsterisks = ({
  asterisksRef1,
  asterisksRef2
}: UseHandleAsterisksProps) => {
  const [numAstericks, setNumAsterisks] = useState(0);

  // TODO: add animation when asterisk first load in to make it less jarring (stagger effect?)
  useEffect(() => {
    /**
     * Dynamically set the number of astricks
     */
    const updateAsterisks = () => {
      if (asterisksRef1.current) {
        const width = asterisksRef1.current.getBoundingClientRect().width;
        const calcNumAstericks = Math.floor(width / 10);
        setNumAsterisks(calcNumAstericks);
      }
      if (asterisksRef2.current) {
        const width = asterisksRef2.current.getBoundingClientRect().width;
        const calcNumAstericks = Math.floor(width / 10);
        setNumAsterisks(calcNumAstericks);
      }
    };

    // updateAsterisks();
    window.addEventListener('resize', updateAsterisks);

    return () => {
      window.removeEventListener('resize', updateAsterisks);
    };
  });

  return { numAstericks };
};
