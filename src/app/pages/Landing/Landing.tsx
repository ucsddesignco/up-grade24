import './Landing.scss';
import Fruits from '@/components/Fruits/Fruits';

export default function Landing() {
  return (
    <section id="landing">
      <p className="breadcrumb">.01 / Home</p>
      <Fruits />
    </section>
  );
}
