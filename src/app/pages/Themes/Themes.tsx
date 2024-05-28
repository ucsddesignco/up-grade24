import './Themes.scss';
import ThemesSlider from '@/components/ThemesSlider/ThemesSlider';
import { ThemesContent } from './constants';

export default function Themes() {
  return (
    <section id="themes">
      <p className="breadcrumb">.03 / Themes</p>
      <h2>{`What are this year's UP-Grade themes?`}</h2>
      {/* <p>Swipe right to see more.</p> */}
      <ThemesSlider slidesContent={ThemesContent} />
    </section>
  );
}
