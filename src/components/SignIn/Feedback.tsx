import { langConvert } from 'Atom/atom';
import { Button } from 'components/Button/Button';
import useMultilingual from 'hooks/useMultilingual';
import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Feedback = ({ setModal }: Props) => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <div onClick={closeModal} className="absolute w-full h-full centerPosition  bg-gray-400 opacity-25" />
      <div className="w-full absolute z-20 centerPosition px-4">
        <div className="w-full px-3 py-3 bg-pink-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 my-2 text-lg">{m('FEEDBACK')}</h3>
          <textarea className="w-full h-[20rem] py-2 px-3" placeholder={m('PROVIDE_OPINION')}></textarea>
          <Button name={'SEND'} page={false} active onClick={closeModal} />
        </div>
      </div>
    </>
  );
};

export default Feedback;
