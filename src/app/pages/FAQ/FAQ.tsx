import './FAQ.scss';
import {PageRef} from '@/page'

type FAQProps = {
  faqRef: PageRef;
}

export default function FAQ({faqRef}: FAQProps) {
  return (
    <section ref={faqRef} id="faq">
      <p className="breadcrumb">.04 / FAQ</p>
      <h2>Commonly Asked Questions</h2>
    </section>
  );
}
