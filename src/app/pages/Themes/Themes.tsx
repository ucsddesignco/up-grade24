import './Themes.scss';
import ThemesSlider from '@/components/ThemesSlider/ThemesSlider';
import { ThemesContent } from './constants';
import pomegranateImg from '@/assets/images/pomegranate.webp';
import Image from 'next/image';
import { PageRef } from '@/page';
import Sticker from '@/components/Sticker/Sticker';
import CapybaraSticker from '@/assets/stickers/capybara.png';
import RootingSticker from '@/assets/stickers/rooting.png';
import FigjamSticker from '@/assets/stickers/figjam.png';

type ThemesProps = {
  themesRef: PageRef;
};

export default function Themes({ themesRef }: ThemesProps) {
  return (
    <section ref={themesRef} id="themes">
      <Sticker
        name="capybara"
        image={
          <Image
            src={CapybaraSticker}
            height="125"
            alt="Capybara Sticker"
            draggable={false}
          />
        }
        style={{ right: '50px' }}
      />
      <Sticker
        name="rooting"
        image={
          <Image
            src={RootingSticker}
            height="140"
            alt="Rooting Sticker"
            draggable={false}
          />
        }
        style={{ left: '10px', top: '55%' }}
        hideMobile
      />
      <Sticker
        name="figjam"
        image={
          <Image
            src={FigjamSticker}
            height="150"
            alt="Figjam Sticker"
            draggable={false}
            priority
          />
        }
        style={{ right: '30%', bottom: '0%' }}
        hideMobile
      />
      <p className="breadcrumb">.03 / Themes</p>
      <h2>{`Get a Taste Of Our Fresh Themes.`}</h2>
      <ThemesSlider slidesContent={ThemesContent} />
      <div className="pomegranate-container">
        <Image src={pomegranateImg} alt="Pomegranate" className="pomegranate" />
      </div>
      <hr className="mobile-line" />
    </section>
  );
}
