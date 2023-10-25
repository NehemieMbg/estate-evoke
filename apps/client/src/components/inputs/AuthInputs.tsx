const AuthInputs = () => {
  return (
    <div className="w-full">
      <label htmlFor="" className="font-medium text-sm">
        Username or Email
      </label>
      <input
        type="text"
        className="mt-1 w-full border-2 border-neutral-200 px-5 py-3.5 rounded-xl font-roboto font-light outline-blue-400 hover:input-shadow focus:input-shadow"
      />
    </div>
  );
};
export default AuthInputs;
