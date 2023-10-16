import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ModalButton from '../../components/Modal/ModalButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/Board/PostForm';
import { langConvert } from 'Atom/atom';
import { useRecoilValue } from 'recoil';
import useMultilingual from 'hooks/useMultilingual';

const WriteBoard = () => {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  //제목, 내용, 위치
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState(0);
  //모집기간 설정
  const [gatherStartDate, setGatherStartDate] = useState<string>('');
  const [gatherEndDate, setGatherEndDate] = useState<string>('');
  //여행기간설정
  const [TripStartDate, setTripStartDate] = useState<string>('');
  const [TripEndDate, setTripEndDate] = useState<string>('');
  //여행인원
  const [travelers, setTravelers] = useState(0);
  //서버로 통신 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const write = async () => {
    const storedToken = localStorage.getItem('token');
    const postData = {
      title: title,
      content: content,
      region_code: location,
      recruitment_period_start: gatherStartDate,
      recruitment_period_end: gatherEndDate,
      journey_period_start: TripStartDate,
      journey_period_end: TripEndDate,
      number_of_travelers: travelers,
    };
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 여행 게시글 작성 요청
      const boardsUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards`;
      const response = await axios.post(boardsUrl, postData, {
        headers: headers,
      });

      alert('게시글 작성이 완성되었습니다!');
      navigate('/board');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // 에러가 발생하면 해당 에러 메시지를 알림으로 보여줌
        alert(error.response.data.msg);
      } else {
        // 기타 에러 처리
        alert('데이터를 받아오는 과정에 문제가 생겼습니다.😹');
      }
    }
  };

  //작성하기버튼 누르면 -> 작성하기 한번더 확인하는 모달 띄우기
  const handleSubmit = () => {
    setModal(true);
  };

  //확인하는 모달에서도 작성하기를 누르면 모달 닫고 통신 시작
  const handleWriteBoardButton = () => {
    setModal(false); // 모달 닫기
    write();
  };

  const handleTravelersChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    if (isNaN(Number(value))) {
      alert('숫자를 입력해주세요!');
    } else {
      if (Number(value) <= 30) {
        setTravelers(Number(value));
      } else {
        setTravelers(0);
        const element = document.getElementById('maxTravelers');
        if (element) {
          element.classList.add('text-red-500');
          element.classList.add('animate-pulse');
        }
      }
    }
  };

  return (
    <div className="relative h-full">
      <Header title="WRITE_POST" back={true} icon={''} />
      {modal && <ModalButton title={m('WRITE_POST_ALERT')} button={m('Write')} setModal={setModal} handleButton={handleWriteBoardButton} />}
      <div className="w-[90%] mx-auto">
        <PostForm
          title={title}
          content={content}
          location={location}
          gatherStartDate={gatherStartDate}
          gatherEndDate={gatherEndDate}
          TripStartDate={TripStartDate}
          TripEndDate={TripEndDate}
          travelers={travelers}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onLocationChange={(e) => setLocation(Number(e.target.value))}
          onGatherStartDateChange={(e) => setGatherStartDate(e.target.value)}
          onGatherEndDateChange={(e) => setGatherEndDate(e.target.value)}
          onTripStartDateChange={(e) => setTripStartDate(e.target.value)}
          onTripEndDateChange={(e) => setTripEndDate(e.target.value)}
          onTravelersChange={handleTravelersChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default WriteBoard;
