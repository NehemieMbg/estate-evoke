import { Link } from 'react-router-dom';

type FormInputsProps = {
  label?: string;
  link?: string;
  linkLabel?: string;
  type: string;
  name: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  underText?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInputs: React.FC<FormInputsProps> = ({
  name,
  type,
  label,
  link,
  linkLabel,
  error,
  defaultValue,
  placeholder,
  required,
  inputRef,
  underText,
  onChange,
}) => {
  return (
    <div className="w-full font-roboto">
      <div>
        <label htmlFor={name} className="font-normal font-exo text-[15px]">
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
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={inputRef}
        onChange={onChange}
        className={`mt-1 w-full border-2 border-neutral-200 px-5 py-3 rounded-xl font-roboto text-[15px] font-light outline-blue-400 hover:input-shadow focus:input-shadow
		${error ? 'border-red-300' : 'border-neutral-200'}
		${label?.toLocaleLowerCase().includes('username') ? 'lowercase' : ''}
		`}
      />
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      {underText && (
        <p className="mt-1.5 font-light text-neutral-400 font-exo text-[15px]">
          {underText}
        </p>
      )}
    </div>
  );
};
export default FormInputs;
