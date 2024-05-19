import './FAQ.scss';
import MyAccordion from '@/components/Accordion/MyAccordion';
import { FAQContent } from './constants';

export default function FAQ() {
  return (
    <section id="faq">
      <p className="breadcrumb">.04 / FAQ</p>
      <h2>Commonly Asked Questions</h2>

      <MyAccordion accordionData={FAQContent} />
    </section>
  );
}
