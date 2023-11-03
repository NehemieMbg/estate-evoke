import { useState } from 'react';

export const useShowCard = () => {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [canClose, setCanClose] = useState(false);
  let hoverTimer: NodeJS.Timeout;

  const handleMouseEnter = () => {
    hoverTimer = setTimeout(() => {
      setCardIsOpen(true);
      setCanClose(false);
      setTimeout(() => {
        setCanClose(true);
      }, 500);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    if (canClose) {
      setCardIsOpen(false);
    }
  };

  return { cardIsOpen, setCardIsOpen, handleMouseEnter, handleMouseLeave };
};
export default useShowCard;
