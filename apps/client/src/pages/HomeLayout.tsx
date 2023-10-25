import { Outlet } from 'react-router-dom';
import { SignIn } from '../components';

const HomeLayout = () => {
  return (
    <div>
      <main className="min-h-screen w-screen">
        <SignIn />
        <Outlet />
      </main>
    </div>
  );
};
export default HomeLayout;
