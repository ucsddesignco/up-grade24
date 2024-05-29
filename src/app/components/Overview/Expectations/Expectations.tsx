import Image from 'next/image';
import Squash from '@/assets/images/squash.webp';
import './Expectations.scss';
import SquashGooglyEyes from '../SquashGoogleEyes/SquashGooglyEyes';

type Expectation = {
  id: string;
  text: string;
};
type ExpectationsProps = {
  expectationsList: Expectation[];
};
export default function Expectations({ expectationsList }: ExpectationsProps) {
  return (
    <div className="expectations-container">
      <h3>{`Here's what you can expect from UP-Grade:`}</h3>
      <ul className="expectations-list">
        {expectationsList.map(expectation => (
          <li key={expectation.id}>
            <span className="arrow">→</span>
            <span>{expectation.text}</span>
          </li>
        ))}
      </ul>
      <div className="squash-container">
        <div className="squash-image-wrapper">
          <Image className="squash" src={Squash} alt="Squash" />
          <SquashGooglyEyes />
        </div>
      </div>
    </div>
  );
}
