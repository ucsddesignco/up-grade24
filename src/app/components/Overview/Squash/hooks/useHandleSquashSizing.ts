import { RefObject, useEffect } from 'react';

// Threshold for space under expectation list to determine if squash should be aligned to the left
const SPACE_THRESHOLD = 130;
// The smaller end of the squash is about 60% of its height
const SQUASH_SMALLER_END_RATIO = 0.67; // 309 / 465

const TABLET_BREAKPOINT = 1000;

type UseHandleSquashSizingProps = {
  containerRef: RefObject<HTMLDivElement>;
  listRef: RefObject<HTMLUListElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  squashContainerRef: RefObject<HTMLDivElement>;
  squashWrapperRef: RefObject<HTMLDivElement>;
};

export const useHandleSquashSizing = ({
  containerRef,
  listRef,
  titleRef,
  squashContainerRef,
  squashWrapperRef
}: UseHandleSquashSizingProps) => {
  useEffect(() => {
    const container = containerRef.current;
    const squashContainer = squashContainerRef.current;
    const squashWrapper = squashWrapperRef.current;
    const title = titleRef.current;
    const listRect = listRef.current?.getBoundingClientRect();

    if (!container || !title || !listRect || !squashContainer || !squashWrapper)
      return;

    const handleSquashSizing = () => {
      if (window.innerWidth < TABLET_BREAKPOINT) {
        // Reset styles potentially set by logic below
        squashContainer.style.justifyContent = '';
        squashWrapper.style.height = '';
        squashWrapper.classList.remove('pop-up');
      } else {
        const containerRect = container.getBoundingClientRect();
        const containerPadding = parseInt(
          getComputedStyle(container).paddingTop
        );
        const spaceUnderList = containerRect.height - listRect.height;
        const spaceUnderTitle =
          containerRect.height - title.getBoundingClientRect().height;

        // If there's too little space under list, make the squash aligned to the left
        if (spaceUnderList < SPACE_THRESHOLD) {
          squashContainer.style.justifyContent = 'flex-start';
          squashContainer.style.left = '5%';
          squashWrapper.style.height = `${spaceUnderTitle / 1.5}px`;
        } else {
          const squashHeight =
            spaceUnderList +
            listRect.height * (1 - SQUASH_SMALLER_END_RATIO) -
            containerPadding;
          squashWrapper.style.height = `${squashHeight}px`;
        }
        squashWrapper.classList.add('pop-up');
      }
    };

    handleSquashSizing();

    window.addEventListener('resize', handleSquashSizing);

    return () => {
      window.removeEventListener('resize', handleSquashSizing);
    };
  }, [containerRef, listRef, squashContainerRef, squashWrapperRef, titleRef]);
};
