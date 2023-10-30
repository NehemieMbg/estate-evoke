import { CircularIndeterminate } from '..';

type deleteAccountBtnProps = {
  label?: string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const deleteAccountBtn: React.FC<deleteAccountBtnProps> = ({
  type,
  label,
  onClick,
  isLoading,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`relative py-2.5 px-6 bg-black rounded-full text-black font-light text-[15px] hover:bg-opacity-80 transition-colors duration-200 font-exo
      ${className}
      `}
    >
      <span className={`${!isLoading ? 'visible' : 'invisible'}`}>{label}</span>
      <span
        className={`absolute left-[50%] translate-x-[-50%] ${
          isLoading ? 'visible' : 'invisible'
        }`}
      >
        <CircularIndeterminate className="scale-[.5] h-7 -mt-1.5" />
      </span>
    </button>
  );
};
export default deleteAccountBtn;
