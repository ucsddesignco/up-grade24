'use client';

import { useRef } from 'react';
import './SquashGooglyEyes.scss';
import { useEyesFollowCursor } from './hooks/useEyesFollowCursor';

export default function SquashGooglyEyes() {
  const eye1Ref = useRef<SVGSVGElement>(null);
  const eye2Ref = useRef<SVGSVGElement>(null);
  const pupil1Ref = useRef<SVGGElement>(null);
  const pupil2Ref = useRef<SVGGElement>(null);

  // Logic for googly eyes to follow cursor
  useEyesFollowCursor({
    pupilRefs: { pupil1Ref, pupil2Ref },
    eyeRefs: { eye1Ref, eye2Ref }
  });

  return (
    //prettier-ignore
    <div className='googly-eyes-container'>
        <svg ref={eye1Ref} className='googly-eyes' id="googly-eye1" width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="outer-circle1" filter="url(#filter0_d_2381_2875)">
              <circle cx="31.2339" cy="28.6925" r="28.2323" fill="white"></circle>
            </g>
            <g ref={pupil1Ref} id="pupil1">
              <circle cx="30.6305" cy="28.6305" r="18.6305" fill="#212121"></circle>
              <ellipse cx="30.7527" cy="20.8439" rx="4.28333" ry="4.28802" fill="white" fillOpacity="0.5"></ellipse>
            </g>
            <defs>
              <filter id="filter0_d_2381_2875" x="0.0473552" y="0.460205" width="62.3731" height="62.3731" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
              <feOffset dy="2.95423"></feOffset>
              <feGaussianBlur stdDeviation="1.47712"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2381_2875"></feBlend>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2381_2875" result="shape"></feBlend>
              </filter>
            </defs>
        </svg>
        <svg ref={eye2Ref} className='googly-eyes' id="googly-eye2" width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="outer-circle2" filter="url(#filter0_d_2381_2875)">
              <circle cx="31.7171" cy="28.7567" r="28.2323" fill="white"/>
            </g>
            <g ref={pupil2Ref} id='pupil2'>
              <circle cx="30.6305" cy="28.6305" r="18.6305" fill="#212121"></circle>
              <ellipse cx="30.7527" cy="20.8439" rx="4.28333" ry="4.28802" fill="white" fillOpacity="0.5"></ellipse>
            </g>
           <defs>
              <filter id="filter0_d_2381_2875" x="0.0473552" y="0.460205" width="62.3731" height="62.3731" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
              <feOffset dy="2.95423"></feOffset>
              <feGaussianBlur stdDeviation="1.47712"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="out"></feComposite>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2381_2875"></feBlend>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2381_2875" result="shape"></feBlend>
              </filter>
            </defs>
        </svg>
    </div>
  );
}
