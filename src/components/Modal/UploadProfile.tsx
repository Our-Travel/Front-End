import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseSquare } from 'react-icons/ai';

interface Modal {
  onClose: () => void;
}

const UploadProfile = ({ onClose }: Modal) => {
  const imagePopupRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const test = acceptedFiles[0];
    const text = new FileReader();

    text.onloadend = (e) => {
      const result = (e.currentTarget as FileReader).result as string;
      setFile(test);
      setImageUrl(result);
      // console.log(test);
    };
    text.readAsDataURL(test);
  }, []);

  const handleUpload = async () => {
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJib2R5Ijoie1wiaWRcIjoyLFwidXNlcm5hbWVcIjpcInVzZXIxQGV4YW1wbGUuY29tXCIsXCJuaWNrTmFtZVwiOlwidXNlcjFcIixcImF1dGhvcml0aWVzXCI6W3tcImF1dGhvcml0eVwiOlwiTUVNQkVSXCJ9XX0iLCJleHAiOjQ4NDAxNjAxNTB9.4zsGU8u_ccyDCZQsSNUcCdX6bS2krAvp6y3tmMWcq0vfyeIbYN978JVgP58pXuouH0AVzLkUNr-F3ZEq2ohkPQ';
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data',
    };

    const formData = new FormData();
    formData.append('file', imageUrl);

    await axios
      .post('http://localhost:8080/api/mypage/upload', formData, { headers })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        window.alert('업로드에 실패했습니다.');
      });

    // axios.get('http://localhost:8080/api/mypage', { headers }).then((response) => {
    //   if (response.data) {
    //     console.log(response.data.data);
    //   } else {
    //     console.log('파일을 저장하는데 실패했습니다.');
    //   }
    // });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
