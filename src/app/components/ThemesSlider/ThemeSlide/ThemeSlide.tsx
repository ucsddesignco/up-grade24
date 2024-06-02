import './ThemeSlide.scss';
import type { SlideContent } from '../ThemesSlider';

type content = {
  content: SlideContent;
};

export default function ThemeSlide({ content }: content) {
  return (
    <div className="theme-slide">
      <div className="top-section">
        <h3 style={{ backgroundColor: content.themeColor }}>{content.theme}</h3>
        <p>{content.description}</p>
      </div>
      <div className="bottom-section">
        <h4>Non-profits</h4>
        <hr />
        <ul className="non-profit-container">
          {content.nonProfits.map((nonProfit, idx) => (
            <li key={idx} className="non-profit">
              <a
                href={nonProfit.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {nonProfit.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
