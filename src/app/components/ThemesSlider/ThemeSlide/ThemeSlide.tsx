import './ThemeSlide.scss';

type slideContent = {
  theme: string;
  description: string;
  nonProfits: Array<string>;
};

export default function ThemeSlide({ content }: slideContent) {
  return (
    <div>
      <h3>{content.theme}</h3>
      <p>{content.description}</p>
      <h4>Non-profits</h4>
      {content.nonProfits.map(nonProfit => (
        <p key={nonProfit}></p>
      ))}
    </div>
  );
}
