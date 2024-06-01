'use client';

import { useRef } from 'react';
import './Expectations.scss';
import Squash from '@/components/Overview/Squash/Squash';

type Expectation = {
  id: string;
  text: string;
};
type ExpectationsProps = {
  expectationsList: Expectation[];
};
export default function Expectations({ expectationsList }: ExpectationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  return (
    <div ref={containerRef} className="expectations-container">
      <h3 ref={titleRef}>{`Here’s what you can expect from UP-Grade 2024:`}</h3>
      <ul ref={listRef} className="expectations-list">
        {expectationsList.map(expectation => (
          <li key={expectation.id}>
            <span className="arrow">→</span>
            <span>{expectation.text}</span>
          </li>
        ))}
      </ul>
      <Squash expectationRefs={{ containerRef, listRef, titleRef }} />
    </div>
  );
}
