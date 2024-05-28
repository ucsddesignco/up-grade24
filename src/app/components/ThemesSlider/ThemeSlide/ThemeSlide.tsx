import './ThemeSlide.scss';
import type { slideContent } from '../ThemesSlider';

type content = {
  content: slideContent;
};

export default function ThemeSlide({ content }: content) {
  return (
    <div className="theme-slide">
      <div>
        <h3 style={{ backgroundColor: content.themeColor }}>{content.theme}</h3>
        <p>{content.description}</p>
      </div>
      <div>
        <h4>Non-profits</h4>
        {content.nonProfits.map((nonProfit, idx) => (
          <p key={idx} className="non-profit">
            {nonProfit}
          </p>
        ))}
      </div>
    </div>
  );
}
