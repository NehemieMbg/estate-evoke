import { CircularIndeterminate } from '..';

type AuthBtnProps = {
  label?: string;
  isLoading?: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
};

const AuthBtn: React.FC<AuthBtnProps> = ({ type, label, isLoading }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="py-4 px-5 bg-black w-full rounded-full text-white font-medium text-[15px] hover:bg-opacity-80 transition-colors duration-200 font-exo"
    >
      {isLoading ? (
        <CircularIndeterminate className="scale-[.5] h-7 -mt-1.5" />
      ) : (
        ` ${label}`
      )}
    </button>
  );
};
export default AuthBtn;
