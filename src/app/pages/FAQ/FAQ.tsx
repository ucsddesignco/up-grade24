import './FAQ.scss';
import MyAccordion from '@/components/MyAccordion/MyAccordion';
import { FAQContent } from './constants';
import Image from 'next/image';
import Apricot from '@/assets/images/Apricot.webp';
import { PageRef } from '@/page';
import Sustainability from '@/assets/stickers/sustainability.svg';
import Melon from '@/assets/stickers/melon.svg';
import Orange from '@/assets/stickers/orange.svg';
import Sticker from '@/components/Sticker/Sticker';

type FAQProps = {
  faqRef: PageRef;
};

export default function FAQ({ faqRef }: FAQProps) {
  return (
    <section ref={faqRef} id="faq">
      <Sticker
        name="sustainability"
        image={<Sustainability />}
        style={{ left: '35%', bottom: '30%' }}
        hideMobile
      />
      <Sticker
        name="melon"
        image={<Melon />}
        style={{ right: '7%', bottom: '15%' }}
      />
      <Sticker
        name="orange"
        image={<Orange />}
        style={{ left: '30%', bottom: '4%' }}
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
    </section>
  );
}
