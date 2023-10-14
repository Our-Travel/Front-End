import { Link } from 'react-router-dom';
import Feedback from './Feedback';
import { useState } from 'react';
import { langConvert } from 'Atom/atom';
import { useRecoilValue } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';

const ChoiceTab = () => {
  const [modal, setModal] = useState<boolean>(false);
  // 다국어
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);
  const openModal = () => {
    setModal(true);
  };
  return (
    <div className="w-full">
      <div className="flex felx-row items-center justify-center my-6 text-gray-500">
        <button className="text-gray-500" onClick={openModal}>
          feedback
        </button>
        <span className="mx-5">|</span>
        <Link to="/signup" className="px-3">
          <span>{m('SIGN_UP')}</span>
        </Link>
        <span className="mx-5">|</span>
        <Link to="/main" className="px-3">
          <span>{m('TAKE_A_TOUR')}</span>
        </Link>
      </div>
      {modal && <Feedback setModal={setModal} />}
    </div>
  );
};

export default ChoiceTab;
