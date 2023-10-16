import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ModalButton from '../../components/Modal/ModalButton';
import axios from 'axios';
import regions from '../../util/region';
import PostForm from '../../components/Board/PostForm';
import { getStatusInKorean } from '../../util/status';
import { useRecoilValue } from 'recoil';
import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';

interface Props {
  setEditBoard: Dispatch<SetStateAction<boolean>>;
  item: any;
}

const EditBoard = ({ setEditBoard, item }: Props) => {
  const [boardId, setBoardId] = useState('');
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
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [editPage, setEditPage] = useState<boolean>(false);

  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  //현재페이지 닫기
  const closeEdit = () => {
    setEditBoard(false);
  };

  //버튼클릭시 모달열리게하기
  const deleteBaord = () => {
    setDeleteModal(true);
  };
  const finishBaord = () => {
    setFinishModal(true);
  };
  const editBoard = () => {
    setEditPage(true);
  };

  //삭제하기모달 -> 삭제하기 누르면 넘어오는 함수
  const handleDeleteButton = () => {
    setDeleteModal(false); // 모달 닫기
    deleteMyBoard();
  };

  //마감하기모달 -> 마감하기 버튼 클릭시 넘어오는 함수
  const handleFinishButton = () => {
    setFinishModal(false);
    closedMyBoard();
  };

  //게시글 수정
  const handleEditSubmit = () => {
    editMyBoard();
    setEditPage(false);
  };

  //지역코드를 지역명으로 전처리
  const findKeyByValue = (value: number) => {
    const region = regions.find((region) => region.value === value);
    return region ? region.key : 'Unknown'; // 해당하는 key를 찾으면 출력하고, 없으면 'Unknown'을 출력
  };
  const area = findKeyByValue(item.region_code);

  //게시글 삭제 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const deleteMyBoard = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 여행 게시글 작성 요청
      const boardsUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/${item.board_id}`;
      await axios.delete(boardsUrl, {
        headers: headers,
      });

      alert('게시글이 성공적으로 삭제되었습니다!');
      closeEdit();
      window.location.reload();
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

  //수정된부분 통신@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const editMyBoard = async () => {
    const storedToken = localStorage.getItem('token');
    const updatedData = {
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
      const boardsUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/edit/${boardId}`;
      await axios.patch(boardsUrl, updatedData, {
        headers: headers,
      });

      alert('게시글 수정이 완료되었습니다!');
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
  //마감하기 통신@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const closedMyBoard = async () => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    try {
      // 여행 게시글 작성 요청
      const boardsUrl = `${process.env.REACT_APP_REST_API_SERVER}/boards/${boardId}`;
      await axios.patch(
        boardsUrl,
        {},
        {
          headers: headers,
        }
      );

      alert('게시글 수정이 완료되었습니다!');
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

  useEffect(() => {
    // 기존 데이터를 초기 상태로 설정
    setTitle(item.title);
    setContent(item.content);
    setLocation(item.region_code);
    setGatherStartDate(item.recruitment_period_start);
    setGatherEndDate(item.recruitment_period_end);
    setTripStartDate(item.journey_period_start);
    setTripEndDate(item.journey_period_end);
    setTravelers(item.number_of_travelers);
    setBoardId(item.board_id);
  }, [item]);

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

  /* -------------------------------------------------------------------------- */
  /*                                 //모집상태 전처리                                 */
  /* -------------------------------------------------------------------------- */
  const statusFromServer = item.recruitment_status; // 서버로부터 받은 상태 (예: OPEN, UPCOMING 등)
  const statusInKorean = getStatusInKorean(statusFromServer); // 한글 상태로 변환

  return (
    <div className="relative h-full w-full bg-white">
      {editPage && (
        <div className="absolute top-0  w-full h-full">
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
            onSubmit={handleEditSubmit}
          />
        </div>
      )}

      {deleteModal && <ModalButton title={m('QUESTION_DELETE')} button={m('DELETE')} setModal={setDeleteModal} handleButton={handleDeleteButton} />}
      {finishModal && <ModalButton title={m('QUESTION_CLOSE')} button={m('DEADLINE')} setModal={setFinishModal} handleButton={handleFinishButton} />}
      <div className="mx-auto pt-8">
        <h3 className="font-medium mb-5 text-2xl">{item.title}</h3>
        <button onClick={closeEdit} className="absolute right-10 top-8 buttonHoverSize125">
          <AiOutlineClose className=" w-[30px] h-[30px]" />
        </button>
        <div className="border rounded-lg mx-4 h-[170px] text-left px-3 py-2">{item.content}</div>
        <div className="mt-8 mx-4 text-left">
          <div className="flex text-sm my-3">
            <div className="w-1/5 font-semibold text-gray-600">여행지</div>
            <span className="text-gray-500">{area}</span>
          </div>
          <div className="flex text-sm my-3">
            <div className="w-1/5 font-semibold text-gray-600">모집기간</div>
            <span className="text-gray-500">
              {item.recruitment_period_start} ~ {item.recruitment_period_end}
            </span>
            <span className="ml-6 font-semibold text-orange-500 animate-bounce z-[-1]">{statusInKorean}</span>
          </div>
          <div className="flex text-sm my-3">
            <div className="w-1/5 font-semibold text-gray-600">여행기간</div>
            <span className="text-gray-500">
              {item.journey_period_start} ~ {item.journey_period_end}
            </span>
          </div>
          <div className="flex text-sm my-3">
            <div className="w-1/5 font-semibold text-gray-600">여행인원</div>
            <span className="text-gray-500">{item.number_of_travelers}</span>
          </div>
        </div>
        <div className="my-10 left-1/2 mx-20">
          <button onClick={editBoard} className="w-full h-8 my-2 rounded-lg text-lg font-semibold buttonHoverSize buttonHoverColor">
            {m('MODIFY')}
          </button>
          <button onClick={deleteBaord} className="w-full h-8 my-2 rounded-lg text-lg font-semibold buttonHoverSize buttonHoverColor">
            {m('DELETE')}
          </button>
          <button onClick={finishBaord} className="w-full h-8 my-2 rounded-lg text-lg font-semibold buttonHoverSize buttonHoverColor">
            {m('DEADLINE')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
