import { useRef, useEffect, Dispatch, SetStateAction } from 'react';

interface modal {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}
const modalButton: { text: string }[] = [{ text: '한국어 (South Korea)' }, { text: 'English' }];

export default function Modal({ open, close }: modal) {
  const outside = useRef<HTMLDivElement>(null);
  const languageButton = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    close(false);
  };

  const clickOutside = (e: MouseEvent) => {
    if (outside.current === e.target) {
      closeModal();
    }
  };

  const escClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    document.addEventListener('keydown', escClose);
    return () => {
      document.removeEventListener('click', clickOutside);
      document.removeEventListener('keydown', escClose);
    };
  });

  return open ? (
    <div className="fixed w-[450px] h-full top-0 bg-black bg-opacity-30 z-30" ref={outside}>
      <div className="centerPosition relative w-96 h-72 rounded-xl text-xl overflow-hidden bg-white flex flex-col">
        <h1>sojupa</h1>
        <div></div>
      </div>
    </div>
  ) : null;
}
