import React, { useCallback, useEffect } from 'react';
import { AccordionDataItem } from '../MyAccordion';

type UseSetAdjacentTriggerHeightProps = {
  triggerRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  accordionData: Array<AccordionDataItem>;
  COLUMN_COUNT: number;
};

export const useSetAdjacentTriggerHeight = ({
  triggerRefs,
  accordionData,
  COLUMN_COUNT
}: UseSetAdjacentTriggerHeightProps) => {
  const setAdjacentTriggerHeights = useCallback(() => {
    const allTriggers = triggerRefs.current;
    if (!allTriggers) return;

    const ROW_COUNT = accordionData.length / COLUMN_COUNT;

    for (let currentIndex = 0; currentIndex < ROW_COUNT; currentIndex++) {
      const adjacentIndex = currentIndex + ROW_COUNT;
      if (allTriggers[currentIndex] && allTriggers[adjacentIndex]) {
        //Reset height to auto for resizing
        allTriggers[currentIndex]!.style.height = 'auto';
        allTriggers[adjacentIndex]!.style.height = 'auto';
        const currentHeight = allTriggers[currentIndex]?.offsetHeight || 0;
        const adjacentHight = allTriggers[adjacentIndex]?.offsetHeight || 0;
        const maxHeight = `${Math.max(currentHeight, adjacentHight)}px`;

        if (allTriggers[currentIndex]!.style.height !== maxHeight) {
          allTriggers[currentIndex]!.style.height = maxHeight;
        }
        if (allTriggers[adjacentIndex]!.style.height !== maxHeight) {
          allTriggers[adjacentIndex]!.style.height = maxHeight;
        }
      }
    }
  }, [accordionData.length, COLUMN_COUNT, triggerRefs]); // These dependencies aren't expected to change

  useEffect(() => {
    setAdjacentTriggerHeights();
    window.addEventListener('resize', setAdjacentTriggerHeights);

    return () => {
      window.removeEventListener('resize', setAdjacentTriggerHeights);
    };
  }, [setAdjacentTriggerHeights]);
};
