import React, { useRef, useEffect } from 'react';

interface modal {
  setOpen: any;
}

const modalButton: { text: string }[] = [{ text: '한국어 (South Korea)' }, { text: 'English' }];

export default function LanguageModal({ setOpen }: modal) {
  const clickClose = useRef<HTMLDivElement>(null);

  // const modalClose = () => {
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   document.addEventListener('click', clickOutside);
  //   document.addEventListener('keydown', escClose);
  //   return () => {
  //     document.removeEventListener('click', clickOutside);
  //     document.removeEventListener('keydown', escClose);
  //   };
  // });

  // const clickOutside = (e: React.MouseEvent) => {
  //   if (clickClose.current === e.target) {
  //     modalClose();
  //   }
  // };

  // const escClose = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Esc') {
  //     modalClose();
  //   }
  // };

  return (
    <div className="fixed w-[450px] h-full top-0 bg-black bg-opacity-30 z-30" ref={clickClose}>
      <div className="centerPosition relative w-64 h-32 rounded-xl text-xl overflow-hidden bg-white flex flex-col">
        {modalButton.map(({ text }, index) => (
          <button type="button" key={index} className="flex flex-col flex-grow items-center justify-center line after:absolute after:top-1/2 last:after:content-none hover:bg-gray-200">
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
