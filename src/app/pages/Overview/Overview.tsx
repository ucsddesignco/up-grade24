import './Overview.scss';
import {PageRef} from '@/page'

type OverviewProps = {
  overviewRef: PageRef;
}

export default function Overview({overviewRef} : OverviewProps) {
  return (
    <section ref={overviewRef} id="overview">
      <p className="breadcrumb">.02 / OVERVIEW</p>
      <h2>What is UP-Grade?</h2>
      <p>
        UP-Grade is a 10-week online summer program where students will get the
        opportunity to work closely alongside a local, nonprofit organization to
        amplify and boost their exposure.
      </p>
      <h3>{`CHECK OUT OUR PAST COHORT'S COMPLETED PROJECTS`}</h3>
    </section>
  );
}
