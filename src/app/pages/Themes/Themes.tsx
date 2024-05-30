import './Themes.scss';
import { PageRef } from '@/page'

type ThemesProps = {
  themesRef: PageRef;
}

export default function Themes({themesRef}: ThemesProps) {
  return (
    <section ref={themesRef} id="themes">
      <p className="breadcrumb">.03 / Themes</p>
      <h2>{`What are this year's UP-Grade themes?`}</h2>
    </section>
  );
}
