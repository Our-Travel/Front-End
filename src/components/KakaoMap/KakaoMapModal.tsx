import React, { useRef, useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { HiHeart } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { BsShare } from 'react-icons/bs';

const KakaoMapModal = ({ locationList, setModalClose, clickIndex }: any) => {
  const modalRef = useRef(null);
  const modalClose = () => {
    setModalClose(false);
  };

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  });

  const clickOutside = (e: any) => {
    // console.log(modalRef.current);

    if (modalRef.current === e.target) {
      modalClose();
    }
  };
  console.log('모달 호출됨');

  // const item = qualifiedList === null ? kinderList[index] : qualifiedList[index];
  // const { CRNAME, CRTELNO, CRTYPENAME, NRTRROOMCNT, CHCRTESCNT, CRCAPAT, CRCHCNT, CRCARGBNAME, CCTVINSTLCNT, CRADDR, ZIPCODE, CRHOME } = item;

  let thing: any = null;
  locationList.map((item: any) => {
    if (clickIndex === item.content_id) {
      thing = item;
    }
  });
  console.log(thing.home_page);

  const { address, content_type_id, home_page, image, over_view, tel, tel_name, title } = thing;

  return (
    // <div className="fixed h-screen top-0 bottom-0 bg-black bg-opacity-30 z-30" ref={modalRef}></div>
    <div className="fixed h-screen w-[450px] top-0 bottom-0 bg-black bg-opacity-0 z-30" ref={modalRef}>
      <div className="relative max-w-[35rem] h-[25rem] mapModalPosition text-lg text-left p-2 rounded-t-3xl border-4 border-white bg-white z-50 lg:max-w-[45rem] lg:h-[40rem] lg:text-xl">
        <div className="flex flex-row h-[12%] items-center justify-center text-center border-b-2 border-gray-300 py-2 gap-3">
          {/* <button type="button" className="absolute top-1 right-1 p-3" onClick={modalClose}>
            <GrClose className="w-5 h-5" />
          </button> */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-center justify-center truncate lg:text-3xl">{title}</h2>
            {/* <p className="text-lg lg:text-xl truncate">{`주소) ${address || '제공되지 않습니다.'}`}</p> */}
          </div>
        </div>
        <div className="py-6 border-b-2 border-gray-300">
          <div className="inline-block align-top">
            <img src={image} alt="" className="w-32 h-32" />
          </div>
          <div className="inline-block ml-3 align-middle">
            <p>{title}</p>
            <p>{address}</p>
          </div>
        </div>
        <div className="py-4">
          {over_view && <p>{over_view}</p>}
          {home_page && <p className="text-blue-500" dangerouslySetInnerHTML={{ __html: home_page }}></p>}
        </div>
        {/* <div className="absolute bottom-0"> */}
        <div className="relative traslate-y-full">
          <div className="flex justify-around">
            <div className="flex gap-2">
              <button type="button">
                <HiOutlineHeart className="w-5 h-5" />
              </button>
              <p>Add to Favorites</p>
            </div>
            <span className="border-r-2 border-gray-300"></span>
            <div className="flex gap-2">
              <button type="button">
                <BsShare className="w-5 h-5" />
              </button>
              <p>Share Location</p>
            </div>
          </div>
        </div>
        {/* <img src="/util/characters.svg" alt="캐릭터3명이미지" className="absolute bottom-0 right-0" /> */}
      </div>
    </div>
  );
};

export default KakaoMapModal;
