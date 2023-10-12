import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { useRecoilState } from 'recoil';

interface Modal {
  onClose: () => void;
}

const UploadProfile = ({ onClose }: Modal) => {
  const imagePopupRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File | string | Blob>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [update, setUpdate] = useRecoilState(profileUpdate);
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
    // 해당 이미지 파일 읽어오기
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      // 읽어온 이미지 파일 url 가져오기
      const readUrl = (e.currentTarget as FileReader).result as string;
      setImageUrl(readUrl);
    };
    // 인코딩된 데이터를 url로 변환하고 읽어오기
    fileReader.readAsDataURL(acceptedFiles[0]);
  }, []);

  // 새로운 프로필 이미지 post
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      const url = `${process.env.REACT_APP_REST_API_SERVER}/members/profile-image`;
      const response = await axios.post(url, formData, config);
      console.log(response);
      alert(response.data.msg);
      onClose();
      setUpdate(!update);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
