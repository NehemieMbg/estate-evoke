import { Form, Link } from 'react-router-dom';
import { DesignCard, DesignInput } from '../components';
import { useRef, useState } from 'react';

const DesignLayout = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [enableContinue, setEnableContinue] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  return (
    <section className="py-6 min-[900px]:px-6 w-full design gap-4">
      <div className="font-exo text-sm flex justify-between mb-2 max-[900px]:px-6">
        <Link
          to={'..'}
          className="bg-white hover:bg-neutral-50 transition-colors duration-200 text-neutral-500 py-2 px-5 border border-neutral-200 rounded-full "
        >
          Cancel
        </Link>
        <button
          onClick={() => setCardIsOpen(true)}
          disabled={!enableContinue}
          className={`bg-black hover:bg-opacity-80 text-white font-light transition-colors duration-200  py-2 px-5 border  rounded-full
          ${!enableContinue && 'bg-opacity-50 cursor-not-allowed'}
          `}
        >
          Continue
        </button>
      </div>

      <Form>
        <DesignInput
          inputRef={inputRef}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setEnableContinue={setEnableContinue}
        />
        <DesignCard
          cardIsOpen={cardIsOpen}
          setCardIsOpen={setCardIsOpen}
          imageUrl={imageUrl}
        />
      </Form>
    </section>
  );
};
export default DesignLayout;
