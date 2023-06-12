import React, { MutableRefObject, RefObject, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import { MypageTab, Profile } from '../../components/MypageInfo/MypageInfo';
import { Link } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';
import { BsPatchCheckFill } from 'react-icons/bs';
import { MdLogout, MdOutlineMail, MdPersonRemove } from 'react-icons/md';
import { IconType } from 'react-icons';
import Modal from '../../components/Modal/Modal';
import UploadProfile from '../../components/Modal/UploadProfile';

const icons: { Icon: IconType; link: string; text: string }[] = [
  {
    Icon: BiBell,
    link: '/mypage/notice',
    text: '공지사항',
  },
  {
    Icon: MdLogout,
    link: '/',
    text: '로그아웃',
  },
  {
    Icon: MdOutlineMail,
    link: '/',
    text: '고객센터',
  },
  {
    Icon: MdPersonRemove,
    link: '/',
    text: '회원탈퇴',
  },
];
const logOutModal: { text: string }[] = [{ text: '로그아웃' }, { text: '취소' }];
const memberShipModal: { text: string }[] = [{ text: '회원탈퇴' }, { text: '취소' }];
const MyPage = () => {
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [file, setFile] = useState(null);
  const [modalOpen, setModal] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('');
  const [uploadModalOpen, setUploadModal] = useState<boolean>(false);
  const handleImage = () => {
    setUploadModal(true);
  };
  const closeImagePopup = () => {
    setUploadModal(false);
  };

  const isOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setModal(!modalOpen);
    setIcon(target.name);
  };

  return (
    //     <>
    //       <Header title={'마이페이지'} />
    //       <div className="flex flex-col gap-4 w-[25rem] mx-auto my-6">
    //         <Profile />
    //         {showImagePopup && (
    //           <UploadProfile
    //             onClose={function (): void {
    //               throw new Error('Function not implemented.');
    //             }}
    //           />
    //         )}

    //         <button className="w-[25rem] h-9 mb-7 border rounded border-main-color text-main-color hover:bg-main-color hover:text-white" onClick={handleImage}>
    //           프로필 수정
    //         </button>
    //         <div className="flex flex-col gap-5 line">
    //           <MypageTab name={'내가 작성한 글'} link={'/mypage/mywrite'} />
    //           <MypageTab name={'즐겨찾기'} link={'/mypage/favorite'} />
    //         </div>
    //         <div className="grid grid-cols-2 w-80 h-60 mx-auto my-3">
    //           {icons.map(({ Icon, link, text }, index) => (
    //             <div key={index} className="flex items-center justify-center">
    //               <Link to={link} className="flex flex-col items-center p-3">
    //                 <Icon className="w-12 h-12" />
    //                 <p>{text}</p>
    //               </Link>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </>
    //   );
    // };

    // export default MyPage;

    <>
      <Header title={'마이페이지'} icon={''} back={false} />
      <div className="flex flex-col gap-4 w-[25rem] mx-auto my-6">
        <Profile />
        <button onClick={handleImage} className="w-[25rem] h-9 mb-7 border rounded border-main-color text-main-color hover:bg-main-color hover:text-white">
          프로필 수정
        </button>
        <div className="flex flex-col gap-5 line">
          <MypageTab name={'내가 작성한 글'} link={'/mypage/mywrite'} />
          <MypageTab name={'즐겨찾기'} link={'/mypage/favorite'} />
        </div>
        <ul className="grid grid-cols-2 w-80 h-60 mx-auto my-3">
          {icons.map(({ Icon, link, text }, index) => (
            <li key={index} className="flex items-center justify-center">
              {index <= 1 ? (
                <Link to={link} className="flex flex-col items-center p-3">
                  <Icon className={`w-11 h-11 mb-1 + ${index ? '' : 'text-main-color'}`} />
                  <p>{text}</p>
                </Link>
              ) : (
                <button type="button" name={text} className="p-3" onClick={isOpen}>
                  <div className="flex flex-col items-center pointer-events-none">
                    <Icon className="w-11 h-11 mb-1" />
                    <p>{text}</p>
                  </div>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {<Modal open={modalOpen} close={setModal} data={icon === '로그아웃' ? logOutModal : memberShipModal} page={'mypage'} />}
      {uploadModalOpen && <UploadProfile onClose={closeImagePopup} />}
    </>
  );
};

export default MyPage;
