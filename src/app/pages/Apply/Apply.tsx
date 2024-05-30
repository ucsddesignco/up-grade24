import Footer from '@/components/Footer/Footer';
import './Apply.scss';
import { PageRef } from '@/page';

type ApplyProps = {
  applyRef: PageRef;
};

export default function Apply({ applyRef }: ApplyProps) {
  return (
    <section ref={applyRef} id="apply">
      <p className="breadcrumb">.05 / Apply</p>
      <h2>Why Apply?</h2>
      <Footer />
    </section>
  );
}
