import './Landing.scss';
import Fruits from '@/components/Fruits/Fruits';

export default function Landing() {
  return (
    <section id="landing">
      <div className="mobile-header">
        <h1>up-grade 2024</h1>
        <p>UCSD Design Co</p>
        <p>San Diego, CA</p>
        <h3>june 1st to august 13th</h3>
      </div>
      <p className="breadcrumb">.01 / Home</p>
      <Fruits />
      {/* <Signature
        navContainerRef={navContainerRef}
        hoveringCart={hoveringCart}
      /> */}
      <a className="add-me-to-cart">
        <p>ADD ME TO CART</p>
      </a>
    </section>
  );
}
