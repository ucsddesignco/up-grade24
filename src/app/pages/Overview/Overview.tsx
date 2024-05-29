import './Overview.scss';
import CalendarIcon from '@/assets/icons/calendar.svg';
import MentorIcon from '@/assets/icons/mentor.svg';
import { EXPECTATIONS_LIST, PAST_PROJECTS } from './constants';
import Expectations from '@/components/Overview/Expectations/Expectations';
import PastProjects from '@/components/Overview/PastProjects/PastProjects';

export default function Overview() {
  return (
    <section id="overview">
      <p className="breadcrumb">.02 / OVERVIEW</p>
      <h2>What is UP-Grade?</h2>
      <div className="overview-content">
        <div className="top-content">
          <div className="details-container">
            <p className="description">
              UP-Grade is a 10-week online summer program where students will
              get the opportunity to work closely alongside a local, nonprofit
              organization to amplify and boost their exposure.
            </p>
            <div className="logistics-container">
              <div>
                <CalendarIcon />
                <span>June 1st to August 13th</span>
              </div>
              <div>
                <MentorIcon />
                <span>6 student teams, 14 mentors</span>
              </div>
            </div>
          </div>
          <PastProjects pastProjects={PAST_PROJECTS} />
        </div>
        <Expectations expectationsList={EXPECTATIONS_LIST} />
      </div>
    </section>
  );
}
