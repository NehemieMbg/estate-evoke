import { Link } from 'react-router-dom';

type BioInputProps = {
  label?: string;
  link?: string;
  linkLabel?: string;
  name: string;
  error?: string;
  placeholder?: string;
  underText?: string;
  required?: boolean;
  defaultValue?: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const BioInput: React.FC<BioInputProps> = ({
  name,
  label,
  link,
  linkLabel,
  error,
  defaultValue,
  placeholder,
  underText,
  required,
  inputRef,
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
      <textarea
        id={name}
        name="name"
        rows={6}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={inputRef}
        onChange={onChange}
        className={`mt-1 w-full border-2 border-neutral-200 px-5 py-3 rounded-xl font-roboto text-[15px] font-light outline-blue-400 hover:input-shadow focus:input-shadow min-h-[163px]
		${error ? 'border-red-300' : 'border-neutral-200'}
		${label?.toLocaleLowerCase().includes('username') ? 'lowercase' : ''}
		`}
      />
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      {underText && (
        <p className="text-neutral-400 font-exo font-light text-[15px]">
          {underText}
        </p>
      )}
    </div>
  );
};
export default BioInput;
