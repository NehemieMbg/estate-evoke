import { Outlet, useNavigate } from 'react-router-dom';
import { SettingsNav } from '../components';
import { useSelector } from 'react-redux';
import { User } from '../types/user-type';

const SettingsLayout = () => {
  const navigate = useNavigate();
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );
  if (!user) navigate('/');

  return (
    <section className="p-8 max-lg:pb-20 mt-16 h-full">
      <div className="flex max-[942px]:flex-col relative w-full h-full max-w-[878px] mx-auto gap-8">
        <div className="relative w-full max-w-[200px]">
          <SettingsNav />
        </div>
        <div className="w-full m-1">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default SettingsLayout;
