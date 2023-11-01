import HomeNavigation from '../components/sections/home/HomeNavigation';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home px-6 py-3 bg-white">
      <HomeNavigation />

      <Outlet />
    </section>
  );
};
export default Home;
