import './FAQ.scss';
import MyAccordion from '@/components/MyAccordion/MyAccordion';
import { FAQContent } from './constants';
import Image from 'next/image';
import Apricot from '@/assets/images/Apricot.webp';
import { PageRef } from '@/page';
import SustainabilitySticker from '@/assets/stickers/sustainability.png';
import MelonSticker from '@/assets/stickers/melon.png';
import OrangeSticker from '@/assets/stickers/orange.png';
import Sticker from '@/components/Sticker/Sticker';

type FAQProps = {
  faqRef: PageRef;
};

export default function FAQ({ faqRef }: FAQProps) {
  return (
    <section ref={faqRef} id="faq">
      <Sticker
        name="sustainability"
        image={
          <Image
            src={SustainabilitySticker}
            height="125"
            alt="Sustainability Sticker"
            draggable={false}
          />
        }
        style={{ right: '7%', top: '8%' }}
        hideMobile
      />
      <Sticker
        name="melon"
        image={
          <Image
            src={MelonSticker}
            height="125"
            alt="Melon Sticker"
            draggable={false}
          />
        }
        style={{ right: '7%', bottom: '15%' }}
      />
      <Sticker
        name="orange"
        image={
          <Image
            src={OrangeSticker}
            height="100"
            alt="Orange Sticker"
            draggable={false}
          />
        }
        style={{ left: '38%', bottom: '12%' }}
        hideMobile
      />
      <p className="breadcrumb">.04 / FAQ</p>
      <h2>Frequently Asked Questions</h2>
      <MyAccordion accordionData={FAQContent} />

      <Image
        src={Apricot}
        alt="apricot"
        id="apricot-1"
        className="apricot mobile"
      />
      <Image
        src={Apricot}
        alt="apricot"
        id="apricot-2"
        className="apricot mobile"
      />

      <div id="apricot-container">
        <Image src={Apricot} alt="apricot" id="apricot-3" className="apricot" />
        <Image src={Apricot} alt="apricot" id="apricot-4" className="apricot" />
        <Image src={Apricot} alt="apricot" id="apricot-5" className="apricot" />
      </div>
      <hr className="mobile-line" />
    </section>
  );
}
