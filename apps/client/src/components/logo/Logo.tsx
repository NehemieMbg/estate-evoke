import { Link } from 'react-router-dom';

type LogoProps = {
  long?: boolean;
};

const Logo: React.FC<LogoProps> = ({ long }) => {
  return (
    <Link
      to={'/'}
      className="rounded-sm text-xl font-inter font-medium tracking-tighter"
    >
      <span className="italic">eǝ. </span>
      <span className={`${!long ? 'hidden' : 'visible'} text-sm`}>
        evoke estate
      </span>
    </Link>
  );
};
export default Logo;
