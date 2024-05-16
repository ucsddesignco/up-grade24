import Fruits from '@/components/Fruits/Fruits';
import './Landing.scss';

export default function Landing() {
  return (
    <section id="landing">
      <p className="breadcrumb">.01 / Home</p>
      <Fruits />
    </section>
  );
}
