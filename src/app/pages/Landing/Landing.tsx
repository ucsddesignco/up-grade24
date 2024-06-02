import './Landing.scss';
import { PageRef } from '@/page';

type LandingProps = {
  landingRef: PageRef;
};

export default function Landing({ landingRef }: LandingProps) {
  return (
    <section ref={landingRef} id="landing">
      <p className="breadcrumb">.01 / Home</p>
    </section>
  );
}
