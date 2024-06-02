'use client';
import { CSSProperties, ReactNode, useRef } from 'react';
import Draggable from 'react-draggable';
import './Sticker.scss';

type StickerProps = {
  name: string;
  image: ReactNode;
  style: CSSProperties;
  hideMobile?: boolean;
};

export default function Sticker({
  name,
  image,
  style,
  hideMobile = false
}: StickerProps) {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className={`${name}-sticker sticker boop ${hideMobile ? 'hide-mobile' : ''}`}
        aria-hidden="true"
        style={style}
      >
        {image}
      </div>
    </Draggable>
  );
}
