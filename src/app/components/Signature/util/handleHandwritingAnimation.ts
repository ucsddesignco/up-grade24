import { RefObject } from 'react';

type HandleHandwritingAnimationProps = {
  svgRef: RefObject<SVGSVGElement>;
  navContainerRef: RefObject<HTMLDivElement>;
  xElementRef: RefObject<HTMLSpanElement>;
  config: {
    maskPrefix: string;
    animationDuration: number;
    maskList: string[];
    heightOffset: string;
  };
};

export const handleHandwritingAnimation = ({
  svgRef,
  navContainerRef,
  xElementRef,
  config
}: HandleHandwritingAnimationProps) => {
  const { animationDuration, maskList, maskPrefix, heightOffset } = config;
  const applyContainer = svgRef.current;
  const navContainer = navContainerRef.current;
  const xElement = xElementRef.current;
  if (!applyContainer || !navContainer || !xElement) return;
  const navFullWidth = parseFloat(window.getComputedStyle(navContainer).width);
  const navPadding = parseFloat(
    window.getComputedStyle(navContainer).paddingLeft
  );
  const navWidth = navFullWidth - navPadding * 2;
  const xWidth = parseFloat(window.getComputedStyle(xElement).width);
  const maxWidth = Math.min(navWidth - xWidth - 20, 230);

  svgRef.current.style.width = `${maxWidth}px`;
  svgRef.current.style.transform = `translateX(${xWidth}px) translateY(${heightOffset})`;
  applyContainer.style.opacity = '1';
  let currentDelay = 0;
  for (let maskID of maskList) {
    const maskElement = document.querySelector(`#${maskPrefix}-mask-${maskID}`);
    if (!maskElement) return;
    const maskChildren = maskElement.children;
    for (var i = 0; i < maskChildren.length; i++) {
      const pathChild = maskChildren[i] as SVGPathElement;
      const length = pathChild.getTotalLength();
      pathChild.style.strokeDasharray = length.toString();
      pathChild.style.strokeDashoffset = length.toString();
      pathChild.style.animation = `dash ${animationDuration}s ${i * animationDuration + currentDelay}s linear forwards`;
    }
    currentDelay += maskChildren.length * animationDuration;
  }
};
