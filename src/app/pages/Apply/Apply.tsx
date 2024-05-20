'use client';

import Footer from '@/components/Footer/Footer';
import 'keen-slider/keen-slider.min.css';
import './Apply.scss';
import { applyInfo } from './apply-info';

export default function Apply() {
  return (
    <section id="apply">
      <p className="breadcrumb">.05 / Apply</p>
      <h2>Why Apply?</h2>
      <hr className="line"></hr>
      <ul className="grid">
        {applyInfo.map(item => (
          <li key={item.id}>
            <h3>{item.header}</h3>
            <p>{item.content}</p>
          </li>
        ))}
        <li></li>
      </ul>
      <hr className="line"></hr>
      <div className="testimonials">
        <h3>See some testimonials from previous participants:</h3>
      </div>
      <Footer />
    </section>
  );
}
