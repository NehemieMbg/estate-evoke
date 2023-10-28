import { useRef, useState } from 'react';
import { FormBtn } from '..';
import useClickOutside from '../../hooks/useClickOutside';

type DeleteAccountCardProps = {
  setCardIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cardIsOpen: boolean;
};

const DeleteAccountCard: React.FC<DeleteAccountCardProps> = ({
  setCardIsOpen,
  cardIsOpen,
}) => {
  const cardRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  useClickOutside(cardRef, () => setCardIsOpen(false));

  const handleDeleteAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <div
      className={`fixed backdrop top-0 left-0 right-0 bottom-0 flex items-center justify-center
	transition-all duration-200
	${cardIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
	`}
    >
      <form
        ref={cardRef}
        onSubmit={handleDeleteAccount}
        className="auth-container flex flex-col gap-12"
      >
        <h1 className="font-exo text-6xl">We're sorry to let you go</h1>

        <div className="flex flex-col gap-2 font-exo text-base text-neutral-600 font-light tracking-tight">
          <p>
            If you prefer fewer email notifications, you can adjust the settings
            here. If you're looking to change your username, you can do so here.
          </p>
          <p>
            Please note, once your account is deleted, the action is
            irreversible. There will be no way to retrieve your account or its
            data.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FormBtn label="Keep account" onClick={() => setCardIsOpen(false)} />

          <FormBtn
            label="Delete account"
            type="submit"
            isLoading={isLoading}
            className="bg-white border-[1px] border-neutral-900 text-neutral-950 font-normal"
          />
        </div>
      </form>
    </div>
  );
};
export default DeleteAccountCard;
