'use client';

import Footer from '@/components/Footer/Footer';
import 'keen-slider/keen-slider.min.css';
import './Apply.scss';

export default function Apply() {
  return (
    <section id="apply">
      <p className="breadcrumb">.05 / Apply</p>
      <h2>Why Apply?</h2>
      <hr className="line"></hr>
      <div className="grid">
        <div className="row">
          <div className="grid-item">
            <h3 className="question">
              Create Meaningful Solutions for Social Impact Nonprofits
            </h3>
            <p>
              Bring your visions to reality, design with intention,
              problem-solve and overcome obstacles, and work to create lasting
              change for a larger community!
            </p>
          </div>
          <div className="grid-item">
            <h3 className="question">UP-Grade your resume + portfolio</h3>
            <p>
              Gain real-world experience through a fully developed project and
              stand out from other student designers with a personal story about
              your involvement in the project process!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="grid-item">
            <h3 className="question">
              Put classroom knowledge to real-world Use
            </h3>
            <p>
              Bring your knowledge of technical and soft skills (and all things
              design process related) to active and practical use, further
              refining your skills along the way!
            </p>
          </div>
          <div className="grid-item">
            <h3 className="question">
              Network with peers and industry professionals
            </h3>
            <p>
              Collaborate with leaders in local nonprofit organizations, connect
              with tech industry professionals, and get to know project mentors!
            </p>
          </div>
        </div>
      </div>
      <hr className="line"></hr>
      <div className="testimonials">
        <h3>See some testimonials from previous participants:</h3>
      </div>
      <Footer />
    </section>
  );
}
