import HomeNavigation from '../components/sections/home/HomeNavigation';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <section className="px-6 py-8 bg-white">
      <HomeNavigation />

      <Outlet />
    </section>
  );
};
export default Home;
