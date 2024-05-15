import './Home.scss';

import Landing from './pages/Landing/Landing';
import Overview from './pages/Overview/Overview';
import Themes from './pages/Themes/Themes';
import FAQ from './pages/FAQ/FAQ';
import Apply from './pages/Apply/Apply';
import Navbar from './components/Navbar/Navbar';

export default async function Home() {
  return (
    <main className="home_page">
      <Navbar />
      <div className="main-content">
        <Landing />
        <Overview />
        <Themes />
        <FAQ />
        {/* Footer is inside Apply */}
        <Apply />
      </div>
    </main>
  );
}
