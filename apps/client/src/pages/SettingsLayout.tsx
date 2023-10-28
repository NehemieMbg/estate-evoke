import { Link, Outlet, useLocation } from 'react-router-dom';
import { settingsNav } from '../constants';

const SettingsLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const path = pathname.split('/')[2];
  console.log(path);
  return (
    <section className="p-8 mt-16 h-full">
      <div className="w-full h-full max-w-[878px] mx-auto flex gap-8">
        <div className="flex flex-col gap-2 w-full max-w-[200px]">
          {settingsNav.map((nav) => (
            <Link
              key={nav.path}
              to={nav.path}
              className={`font-roboto text-[15px]  pl-4
			${
        path === nav.path.split('/')[2]
          ? 'font-semibold border-l-2 border-l-neutral-800'
          : 'font-normal'
      }
			`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
        <div className="w-full overflow-x-scroll">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default SettingsLayout;
