import { Outlet } from 'react-router-dom';
import { Auth } from '.';

const HomeLayout = () => {
  return (
    <div>
      <main className="min-h-screen w-screen">
        <Auth />
        <Outlet />
      </main>
    </div>
  );
};
export default HomeLayout;
