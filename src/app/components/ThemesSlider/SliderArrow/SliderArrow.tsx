/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

import './SliderArrow.scss';

type SliderArrowProps = {
  disabled: boolean;
  left?: boolean;
  onClick: (_e: any) => void;
};

// TODO: consider replacing svgs with react svg element

export default function SliderArrow({
  disabled,
  left,
  onClick
}: SliderArrowProps) {
  const disabledClass = disabled ? ' arrow--disabled' : '';
  return (
    <button
      onClick={e => onClick(e)}
      className={`slider-arrow ${left ? 'arrow--left' : 'arrow--right'} ${disabledClass}`}
    >
      <svg
        width="13"
        height="18"
        viewBox="0 0 13 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        {left && <path d="M12 1.5L2 8.86842L12 16.5" />}
        {!left && <path d="M1 1.5L11 8.86842L1 16.5" />}
      </svg>
    </button>
  );
}
