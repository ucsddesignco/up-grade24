import './ThemeSlide.scss';
import type { slideContent } from '../ThemesSlider';

type content = {
  content: slideContent;
};

export default function ThemeSlide({ content }: content) {
  return (
    <div className="theme-slide">
      <h3 style={{ backgroundColor: content.themeColor }}>{content.theme}</h3>
      <p>{content.description}</p>
      <h4>Non-profits</h4>
      {content.nonProfits.map((nonProfit, idx) => (
        <p key={idx} className="non-profit">
          {nonProfit}
        </p>
      ))}
    </div>
  );
}
