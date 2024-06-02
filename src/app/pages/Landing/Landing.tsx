import Sticker from '@/components/Sticker/Sticker';
import './Landing.scss';
import { PageRef } from '@/page';
import DcoSticker from '@/assets/stickers/dco-sticker.svg';
import Impact from '@/assets/stickers/impact.svg';

type LandingProps = {
  landingRef: PageRef;
};

export default function Landing({ landingRef }: LandingProps) {
  return (
    <section ref={landingRef} id="landing">
      <Sticker
        name="dco"
        image={<DcoSticker />}
        style={{ right: '50px', top: '15%' }}
        hideMobile
      />
      <Sticker
        name="impact"
        image={<Impact />}
        style={{ left: '10px', top: '55%' }}
        hideMobile
      />
      <p className="breadcrumb">.01 / Home</p>
    </section>
  );
}
