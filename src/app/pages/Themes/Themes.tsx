import './Themes.scss';
import ThemesSlider from '@/components/ThemesSlider/ThemesSlider';
import { ThemesContent } from './constants';
import pomegranateImg from '@/assets/images/pomegranate.webp';
import Image from 'next/image';

export default function Themes() {
  return (
    <section id="themes">
      <p className="breadcrumb">.03 / Themes</p>
      <h2>{`Get a Taste Of Our Fresh Themes.`}</h2>
      <hr className="title-line" />
      {/* <p>Swipe right to see more.</p> */}
      <ThemesSlider slidesContent={ThemesContent} />
      <div className="pomegranate-container">
        <Image src={pomegranateImg} alt="Pomegranate" className="pomegranate" />
      </div>
    </section>
  );
}
