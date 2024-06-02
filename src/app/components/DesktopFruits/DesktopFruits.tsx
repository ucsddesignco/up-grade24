import Image from 'next/image';
import Pomegranate from '@/assets/images/pomegranate.webp';
import Apricot from '@/assets/images/Apricot.webp';
import './DesktopFruits.scss';

// Used to display desktop fruits that overlap with other sections
export default function DesktopFruits() {
  return (
    <div className="desktop-fruits">
      <div className="fruits-theme-section">
        <div id="desktop-pomegranate-container">
          <Image src={Pomegranate} alt="Pomegranate" id="desktop-pomegranate" />
        </div>
      </div>
      <div className="fruits-faq-section">
        <div id="desktop-apricot-container">
          <Image
            src={Apricot}
            alt="apricot"
            id="desktop-apricot-1"
            className="apricot"
          />
          <Image
            src={Apricot}
            alt="apricot"
            id="desktop-apricot-2"
            className="apricot"
          />
          <Image
            src={Apricot}
            alt="apricot"
            id="desktop-apricot-3"
            className="apricot"
          />
        </div>
      </div>
    </div>
  );
}
