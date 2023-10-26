type AuthBtnProps = {
  label?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
};

const AuthBtn: React.FC<AuthBtnProps> = ({ type, label }) => {
  return (
    <button
      type={type}
      className="py-4 px-5 bg-black w-full rounded-full text-white font-medium text-[15px] hover:bg-opacity-80 transition-colors duration-200 font-exo"
    >
      {label}
    </button>
  );
};
export default AuthBtn;
