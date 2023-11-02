import { Outlet } from 'react-router-dom';
import { Auth } from '.';
import { Navbar } from '../components';

const HomeLayout = () => {
  return (
    <div>
      <main className="w-screen min-h-screen">
        <Navbar />
        <Auth />

        <Outlet />
      </main>
    </div>
  );
};
export default HomeLayout;
