import './Themes.scss';
import ThemesSlider from '@/components/ThemesSlider/ThemesSlider';
import { ThemesContent } from './constants';
import pomegranateImg from '@/assets/images/pomegranate.webp';
import Image from 'next/image';
import { PageRef } from '@/page';
import Sticker from '@/components/Sticker/Sticker';
import Capybara from '@/assets/stickers/capybara.svg';
import Rooting from '@/assets/stickers/rooting.svg';
import Figjam from '@/assets/stickers/figjam.svg';

type ThemesProps = {
  themesRef: PageRef;
};

export default function Themes({ themesRef }: ThemesProps) {
  return (
    <section ref={themesRef} id="themes">
      <Sticker name="capybara" image={<Capybara />} style={{ right: '50px' }} />
      <Sticker
        name="rooting"
        image={<Rooting />}
        style={{ left: '10px', top: '55%' }}
        hideMobile
      />
      <Sticker
        name="figjam"
        image={<Figjam />}
        style={{ right: '30%', bottom: '0%' }}
        hideMobile
      />
      <p className="breadcrumb">.03 / Themes</p>
      <h2>{`Get a Taste Of Our Fresh Themes.`}</h2>
      <ThemesSlider slidesContent={ThemesContent} />
      <div className="pomegranate-container">
        <Image src={pomegranateImg} alt="Pomegranate" className="pomegranate" />
      </div>
    </section>
  );
}
