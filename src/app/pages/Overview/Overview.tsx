import './Overview.scss';
import CalendarIcon from '@/assets/icons/calendar.svg';
import TimerIcon from '@/assets/icons/timer.svg';
import { EXPECTATIONS_LIST, PAST_PROJECTS } from './constants';
import Expectations from '@/components/Overview/Expectations/Expectations';
import PastProjects from '@/components/Overview/PastProjects/PastProjects';
import { PageRef } from '@/page';
import Sticker from '@/components/Sticker/Sticker';
import BananaSticker from '@/assets/stickers/banana-can.png';
import BreadSticker from '@/assets/stickers/bread.png';
import Image from 'next/image';

type OverviewProps = {
  overviewRef: PageRef;
};

export default function Overview({ overviewRef }: OverviewProps) {
  return (
    <section ref={overviewRef} id="overview">
      <Sticker
        name="banana-can"
        image={
          <Image
            src={BananaSticker}
            height="150"
            alt="Banana Sticker"
            draggable={false}
          />
        }
        style={{ right: '-45px' }}
      />
      <Sticker
        name="bread"
        image={
          <Image
            src={BreadSticker}
            height="150"
            alt="Bread Sticker"
            draggable={false}
          />
        }
        style={{ left: '10px', top: '55%' }}
      />
      <p className="breadcrumb">.02 / OVERVIEW</p>
      <h2>What is UP-Grade?</h2>
      <div className="overview-content">
        <div className="top-content">
          <div className="details-container">
            <p className="description">
              UP-Grade is a 10-week summer internship-style program where
              students will get the opportunity to work alongside a local,
              nonprofit organization to elevate their branding and boost their
              exposure within the community.
            </p>
            <div className="logistics-container">
              <div>
                <CalendarIcon />
                <span>July 1st - Sept. 6th</span>
              </div>
              <div>
                <TimerIcon />
                <span>12-15 Hours Per Week</span>
              </div>
            </div>
          </div>
          <PastProjects pastProjects={PAST_PROJECTS} />
        </div>
        <Expectations expectationsList={EXPECTATIONS_LIST} />
      </div>
      <hr className="mobile-line" />
    </section>
  );
}
