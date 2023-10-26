import { Outlet } from 'react-router-dom';
import { SignIn, SignUp } from '../components';

const HomeLayout = () => {
  return (
    <div>
      <main className="min-h-screen w-screen">
        <SignIn />
        <SignUp />
        <Outlet />
      </main>
    </div>
  );
};
export default HomeLayout;
