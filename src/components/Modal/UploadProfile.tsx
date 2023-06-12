import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import axios from 'axios';

interface Modal {
  onClose: () => void;
}

const UploadProfile = ({ onClose }: Modal) => {
  const imagePopupRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // 폼데이터 구성
    const formData = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    formData.append('file', acceptedFiles[0]);
    console.log(acceptedFiles[0]);

    // 배포시에는 지워줘야 합니다.
    axios.defaults.baseURL = 'http://localhost:8080/';
    await axios.post('/api/mypage/upload', formData, config).then((res) => {
      console.log(res);
    });

    // const test = acceptedFiles[0];
    // const text = new FileReader();

    // text.onloadend = (e) => {
    //   const result = (e.currentTarget as FileReader).result as string;
    //   setFile(test);
    //   setImageUrl(result);
    // };
    // text.readAsDataURL(test);
  }, []);

  const handleUpload = async () => {
    // 이미지 업로드 로직을 구현합니다.
    // 업로드된 이미지를 서버로 전송하고, 성공적으로 업로드된 후에 처리할 작업을 수행합니다.
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', 'jpg'],
    },
  });

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (imagePopupRef.current && !imagePopupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [imagePopupRef, onClose]);

  return (
    <div className="fixed w-[450px] h-full top-0 bg-black bg-opacity-30 z-30">
      <div className="centerPosition relative w-[400px] rounded-xl text-xl overflow-hidden bg-white flex flex-col" ref={imagePopupRef}>
        <div className="text-center">
          <div className="flex relative">
            <span className="text-xl font-semibold text-gray-700 mx-auto mt-3">프로필 사진 편집</span>
            <button className="absolute right-2 top-4 flex bottom-[5px] text-base" onClick={onClose}>
              <AiOutlineCloseSquare className="translate-y-1" />
              <span className="mr-3">닫기</span>
            </button>
          </div>

          <div {...getRootProps()} className={`border-2 ${imageUrl ? 'border-main-color' : 'border-gray-400'} border-dashed rounded-lg p-4  text-lg text-center mx-2 my-3`}>
            <input {...getInputProps()} />
            <div>
              {isDragReject ? <p>확장자를 확인해주세요.</p> : ''}
              <p className="text-gray-400">jpg/png 파일 가능</p>
            </div>
            {imageUrl ? (
              <img src={imageUrl} alt="업로드 이미지" className="w-full rounded-lg object-cover" />
            ) : (
              <p className="text-gray-500">{isDragActive ? '여기에 이미지를 드롭하세요' : '이곳에 원하시는 이미지를 드래그하시거나 클릭해서 이미지를 선택해주세요.'}</p>
            )}
          </div>
          {imageUrl && (
            <div>
              <button onClick={handleUpload} className={`border-2 ${imageUrl ? 'border-main-color text-main-color font-bold' : 'border-gray-400'} text-base font-semibold border-2 rounded-xl border-gray-200 px-4 py-1 mb-3`}>
                업로드
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProfile;

//업로드 버튼 눌렀을때
// const handleUpload = async () => {
//   if (userId) {
//     const imageRef = ref(storage, `${userId.uid}/new-profile-photo`);
//     const profile = await uploadString(imageRef, imageUrl, "data_url");
//     const fileUrl = await getDownloadURL(profile.ref);
//     updateProfile(auth.currentUser, {
//       photoURL: fileUrl,
//     });
//     setUserProfile(fileUrl);
//     alert("프로필 수정이 완료되었습니다");
//     onClose();
//   }
// };
