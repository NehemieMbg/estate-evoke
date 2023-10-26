import { Link } from 'react-router-dom';

type AuthInputsProps = {
  label?: string;
  link?: string;
  linkLabel?: string;
  type: string;
  name: string;
  error?: string;
};

const AuthInputs: React.FC<AuthInputsProps> = ({
  name,
  type,
  label,
  link,
  linkLabel,
  error,
}) => {
  return (
    <div className="w-full">
      <div>
        <label htmlFor={name} className="font-medium text-sm">
          {label}
        </label>
        {linkLabel && (
          <Link
            to={link || '.'}
            className=" underline font-normal float-right text-[15px]"
          >
            {linkLabel}
          </Link>
        )}
      </div>
      <input
        type={type}
        id={name}
        name="name"
        className={`mt-1 w-full border-2 border-neutral-200 px-5 py-3.5 rounded-xl font-roboto text-[15px] font-light outline-blue-400 hover:input-shadow focus:input-shadow
		${error ? 'border-red-300' : 'border-neutral-200'}
		`}
      />
      {error && (
        <p className="text-sm text-red-400 mt-1">Wrong Email or Password!</p>
      )}
    </div>
  );
};
export default AuthInputs;
