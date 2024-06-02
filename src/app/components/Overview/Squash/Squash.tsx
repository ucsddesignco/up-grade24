'use client';

import Image from 'next/image';
import SquashGooglyEyes from '../SquashGooglyEyes/SquashGooglyEyes';
import SquashImage from '@/assets/images/squash.webp';
import './Squash.scss';
import { RefObject, useRef } from 'react';
import { useHandleSquashSizing } from './hooks/useHandleSquashSizing';

type SquashProps = {
  expectationRefs: {
    containerRef: RefObject<HTMLDivElement>;
    listRef: RefObject<HTMLUListElement>;
    titleRef: RefObject<HTMLHeadingElement>;
  };
};

export default function Squash({ expectationRefs }: SquashProps) {
  const { containerRef, listRef, titleRef } = expectationRefs;
  const squashContainerRef = useRef<HTMLDivElement>(null);
  const squashWrapperRef = useRef<HTMLDivElement>(null);

  useHandleSquashSizing({
    containerRef,
    listRef,
    titleRef,
    squashContainerRef,
    squashWrapperRef
  });

  return (
    <div ref={squashContainerRef} className="squash-container">
      <div ref={squashWrapperRef} className="squash-image-wrapper">
        <Image className="squash" src={SquashImage} alt="Squash" priority />
        <SquashGooglyEyes />
      </div>
    </div>
  );
}
