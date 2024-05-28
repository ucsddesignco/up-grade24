import './FAQ.scss';
import MyAccordion from '@/components/MyAccordion/MyAccordion';
import { FAQContent } from './constants';

export default function FAQ() {
  return (
    <section id="faq">
      <p className="breadcrumb">.04 / FAQ</p>
      <h2>Frequently Asked Questions</h2>
      <MyAccordion accordionData={FAQContent} />
    </section>
  );
}
