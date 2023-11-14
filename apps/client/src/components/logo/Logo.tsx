import { Link } from 'react-router-dom';

type LogoProps = {
  long?: boolean;
  sm?: boolean;
};

const Logo: React.FC<LogoProps> = ({ long, sm }) => {
  return (
    <Link
      to={'/'}
      className={`rounded-sm  font-inter font-medium tracking-tighter
      ${sm ? 'text-md' : 'text-xl'}
      `}
    >
      <span className="italic">eǝ. </span>
      <span className={`${!long ? 'hidden' : 'visible'} text-sm`}>
        evoke estate
      </span>
    </Link>
  );
};
export default Logo;
