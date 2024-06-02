'use client';
import { RefObject, useEffect, useRef } from 'react';
import ApplyNow from '../ApplyNow/ApplyNow';
import FutureUpgrader from '../FutureUpgrader/FutureUpgrader';
import './Signature.scss';
import { handleHandwritingAnimation } from './util/handleHandwritingAnimation';

type SignatureProps = {
  hoveringCart: boolean;
  navContainerRef: RefObject<HTMLDivElement>;
};

const APPLY_CONFIG = {
  maskPrefix: 'apply',
  animationDuration: 0.055,
  maskList: ['A', 'p-1', 'p-2', 'l', 'y', 'n', 'o', 'w', 'exclamation'],
  heightOffset: '0%'
};

const FUTURE_CONFIG = {
  maskPrefix: 'future',
  animationDuration: 0.05,
  //   prettier-ignore
  maskList: ['F', 'u1', 't', 'u2', 'r1', 'e1', 'U', 'p', 'dash', 'g', 'r2', 'a', 'd', 'e2', 'r3'],
  heightOffset: '15%'
};

export default function Signature({
  hoveringCart,
  navContainerRef
}: SignatureProps) {
  const xElementRef = useRef<HTMLSpanElement>(null);
  const applySVGRef = useRef<SVGSVGElement>(null);
  const futureSVGRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!hoveringCart) {
      console.log('APPLY NOW ANIMATION!');
      handleHandwritingAnimation({
        svgRef: applySVGRef,
        navContainerRef,
        xElementRef,
        config: APPLY_CONFIG
      });
    } else {
      console.log('FUTURE UPGRADER ANIMATION!');
      handleHandwritingAnimation({
        svgRef: futureSVGRef,
        navContainerRef,
        xElementRef,
        config: FUTURE_CONFIG
      });
    }
  }, [hoveringCart, navContainerRef]);

  return (
    <div className="signature">
      <div className="signature-container">
        <span ref={xElementRef}>X</span>
        <div className="line" />
      </div>
      {!hoveringCart ? (
        <ApplyNow applySVGRef={applySVGRef} />
      ) : (
        <FutureUpgrader futureSVGRef={futureSVGRef} />
      )}
    </div>
  );
}
