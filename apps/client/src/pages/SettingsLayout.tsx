import { Outlet } from 'react-router-dom';
import { SettingsNav } from '../components';

const SettingsLayout = () => {
  return (
    <section className="p-8 mt-16 h-full">
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
