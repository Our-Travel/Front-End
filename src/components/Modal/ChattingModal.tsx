import { useRef, useEffect, Dispatch, SetStateAction, useState } from 'react';

//수민님이 작성한 부분인데 해당 페이지에 모달창이 필요없을듯 해서
//이부분은 한번 더 고민해보고 살릴지 버릴지 해야할 듯 합니다 - 윤호
interface modal {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  modalButtonList: { text: string }[];
}
// const modalButton: { text: string }[] = [{ text: '나가기' }, { text: '모하지' }, { text: '모하지' }];

export default function ChattingModal({ open, close, modalButtonList }: modal) {
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
      <div className="centerPosition relative w-64 h-36 rounded-xl text-xl overflow-hidden bg-white flex flex-col">
        {modalButtonList.map(({ text }, index) => (
          <button type="button" key={index} className="flex flex-col flex-grow items-center justify-center border-b-[1px] first:text-main-color last:border-b-0  hover:bg-gray-200" ref={languageButton}>
            {text}
          </button>
        ))}
      </div>
    </div>
  ) : null;
}
