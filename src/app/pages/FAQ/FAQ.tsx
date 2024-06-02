import './FAQ.scss';
import MyAccordion from '@/components/MyAccordion/MyAccordion';
import { FAQContent } from './constants';
import Image from 'next/image';
import Apricot from '@/assets/images/Apricot.webp';

export default function FAQ() {
  return (
    <section id="faq">
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
