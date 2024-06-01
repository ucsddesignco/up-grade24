import { RefObject } from 'react';
import './FutureUpgrader.scss';
import FutureUpgraderSVG from './FutureUpgraderSVG';
// Credit to: https://css-tricks.com/how-to-get-handwriting-animation-with-irregular-svg-strokes/

type FutureUpgraderTypes = {
  futureSVGRef: RefObject<SVGSVGElement>;
};

export default function FutureUpgrader({ futureSVGRef }: FutureUpgraderTypes) {
  return (
    <>
      {/* prettier-ignore */}
      <svg className='future-upgrader-svg' ref={futureSVGRef} width="219" height="87" viewBox="0 0 219 87" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Future Upgrader</title>
        <defs>
            <mask id="future-masks">
                {/* Future */}
                <g id="future-mask-F">
                    <path className='mask' d="M7 14L12 39" stroke="black" strokeWidth="5"/>
                    <path className='mask' d="M0 13.5H22.5" stroke="black" strokeWidth="5"/>
                    <path className='mask' d="M8.5 26.5L24.5 24.5" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-u1">
                    <path className='mask' d="M30.5 18L29.5 31L32 37.5L36.5 35.5L40.5 29L43.5 21L47.5 40" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-t">
                    <path className='mask' d="M50.5 26L70 23.5" stroke="black" strokeWidth="5"/>
                    <path className='mask' d="M60 10V40.5L68.5 36L75.5 31" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-u2">
                    <path className="mask" d="M80.5619 16.3324L80.0883 29.3622L82.849 35.7558L87 33L90.9984 26.9192L93.6726 18.8044L98 38" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-r1">
                    <path className='mask' d="M103 13.5L109 35.5L109.5 24.5L113 17L121.5 11.5" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-e1">
                 <path className='mask' d="M126 23L140 17.5L136.5 14.5L130.5 13.5L125.5 20L127 26.5L133 30.5L144 26" stroke="black" strokeWidth="5"/>
                </g>
                {/* Upgrader */}
                <g id="future-mask-U">
                    <path className='mask' d="M10 60.5L7.5 78.5L12 81L17.5 80.5L25.5 74.5L24 58.5" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-p">
                    <path className='mask' d="M38.5 57.5L41 72V85" stroke="black" strokeWidth="5"/>
                    <path className='mask' d="M28.5 57.8533L39 52.5L49.2577 53.7731L51.0886 57.8533L49.8594 63.3066L45.7164 66.6362L37.4999 74" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-dash">
                    <path className='mask' d="M57 69.5L75.5 67" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-g">
                    <path className='mask' d="M96.5 52L91 50L86 53.5L81 64V70.5L87.5 72.5L98 69V63L100.5 79.5" stroke="black" strokeWidth="5"/>
                    <path className='mask' d="M87 62.5L108 60" stroke="black" strokeWidth="5"/>
                 </g>
                <g id="future-mask-r2">
                    <path className='mask' d="M111 56L117 78L117.5 67L121 59.5L129.5 54" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-a">
                    <path className='mask' d="M132 60.5L141 52.5L146 54L147 73L139 77L135 74.5L136.5 68.5L141.5 65.5L152.5 73" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-d">
                    <path className='mask' d="M165.5 41.5L173 75" stroke="black" strokeWidth="5"/>
                    <path className='mask' d="M167 56.5L158.5 60.5L156.5 68.5L163 72.5L172.5 71" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-e2">
                    <path className='mask' d="M178.5 63.5L192.5 58L189 55L183 54L178 60.5L179.5 67L185.5 71L196 66" stroke="black" strokeWidth="5"/>
                </g>
                <g id="future-mask-r3">
                    <path className='mask' d="M199 51L204 73L205.5 62L208 55L217.5 49" stroke="black" strokeWidth="5"/>
                </g>
            </mask>
        </defs>
        <FutureUpgraderSVG />
    </svg>
    </>
  );
}
