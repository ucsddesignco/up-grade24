import { RefObject } from 'react';
import './ApplyNow.scss';
import ApplyNowSVG from './ApplyNowSVG';
// Credit to: https://css-tricks.com/how-to-get-handwriting-animation-with-irregular-svg-strokes/

type ApplyNowTypes = {
  applySVGRef: RefObject<SVGSVGElement>;
};

export default function ApplyNow({ applySVGRef }: ApplyNowTypes) {
  return (
    <>
      {/* prettier-ignore */}
      <svg className='apply-now-svg' ref={applySVGRef} viewBox='0 0 230 60' fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
        <mask id="apply-masks" >
          <g id="apply-mask-A">
            <path className='mask' d="M3 50.5L8 31L12.5 15.5" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M13 16L27 47" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M6 37L25.5 32.5" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-p-1">
            <path className='mask' d="M37 26.5L39.5 41L41 54" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M27.5 27.5L39 22L46 23L48 27L47 32.5L43 36L35 41.5" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-p-2">
            <path className='mask' d="M60.5 25.5L63 40L64.5 53" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M51 26.5L62.5 21L69.5 22L71.5 26L70.5 31.5L66.5 35L58.5 40.5" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-l">
            <path className='mask' d="M80 12L84 45" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-y">
            <path className='mask' d="M90.5 25L97 38L104.5 32.5L108 20.5" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M108 23V46L103.5 54L97.5 59" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-n">
            <path className='mask' d="M135 16.5L136 40" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M134.5 19L154 38" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M153 37L154 12.5" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-o">
            <path className='mask' d="M172 19L167.5 18.5L164 23L163.5 27.5L164.5 34L169.5 37L176 34L179.5 27.5L177 20L172 19Z" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-w">
            <path className='mask' d="M186 17.5L192.5 35.5L200 20.5L206.5 36L215 14.5" stroke="black" strokeWidth="5"/>
          </g>
          <g id="apply-mask-exclamation">
            <path className='mask' d="M228 0.5L225.5 13.5V27" stroke="black" strokeWidth="5"/>
            <path className='mask' d="M227 35L226 42.5" stroke="black" strokeWidth="5"/>
          </g>
        </mask>
      </defs>
      <ApplyNowSVG />
      </svg>
    </>
  );
}
