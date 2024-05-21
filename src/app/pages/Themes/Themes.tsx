import './Themes.scss';
import ThemesSlider from '@/components/ThemesSlider/ThemesSlider';
import { ThemesContent } from './constants';

export default function Themes() {
  return (
    <section id="themes">
      <p className="breadcrumb">.03 / Themes</p>
      <h2>{`What are this year's UP-Grade themes?`}</h2>
      <div className="slides-container">
        <p>Swipe right to see more.</p>
        <ThemesSlider slidesContent={ThemesContent}></ThemesSlider>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <h3>Themes</h3>
            </th>
            <th>
              <h3>Description</h3>
            </th>
            <th>
              <h3>Non-Profits</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {ThemesContent.map(theme => (
            <tr key={theme.theme}>
              <td>
                <h3
                  style={{
                    backgroundColor: theme.themeColor
                    // width: 'min-content'
                  }}
                >
                  {theme.theme}
                </h3>
              </td>
              <td>
                <p>{theme.description}</p>
              </td>
              <td>
                {theme.nonProfits.map((nonProfit, idx) => (
                  <p key={idx} className="non-profit">
                    {nonProfit}
                  </p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
