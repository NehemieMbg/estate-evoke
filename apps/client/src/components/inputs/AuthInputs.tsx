import { Link } from 'react-router-dom';

const AuthInputs = () => {
  return (
    <div className="w-full">
      <div>
        <label htmlFor="" className="font-medium text-[15px]">
          Username or Email
        </label>
        <Link
          to="/forgot-password"
          className=" underline font-normal float-right text-[15px]"
        >
          Forgot ?
        </Link>
      </div>
      <input
        type="text"
        className="mt-1 w-full border-2 border-neutral-200 px-5 py-3.5 rounded-xl font-roboto text-[15px] font-light outline-blue-400 hover:input-shadow focus:input-shadow"
      />
    </div>
  );
};
export default AuthInputs;
