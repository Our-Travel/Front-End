import { useRef, useEffect, Dispatch, SetStateAction, useState } from 'react';

interface modal {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

export default function ChattingModal({ open, close }: modal) {
  const outside = useRef<HTMLDivElement>(null);
  const languageButton = useRef<HTMLButtonElement>(null);
  const modalButton: { text: string }[] = [{ text: '나가기' }, { text: '모하지' }, { text: '모하지' }];

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
      <div className="centerPosition relative w-64 h-36 rounded-xl text-xl overflow-hidden bg-white flex flex-col">
        {modalButton.map(({ text }, index) => (
          <button type="button" key={index} className="flex flex-col flex-grow items-center justify-center border-b-[1px] first:text-main-color last:border-b-0  hover:bg-gray-200" ref={languageButton}>
            {text}
          </button>
        ))}
      </div>
    </div>
  ) : null;
}