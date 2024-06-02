import './FAQ.scss';
import { PageRef } from '@/page';
import MyAccordion from '@/components/MyAccordion/MyAccordion';
import { FAQContent } from './constants';

type FAQProps = {
  faqRef: PageRef;
};

export default function FAQ({ faqRef }: FAQProps) {
  return (
    <section ref={faqRef} id="faq">
      <p className="breadcrumb">.04 / FAQ</p>
      <h2>Frequently Asked Questions</h2>
      <MyAccordion accordionData={FAQContent} />
    </section>
  );
}
