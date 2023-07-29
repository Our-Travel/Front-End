import { Outlet, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Main from './pages/Main/Main';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ChattingList from './pages/Chatting/ChattingList';
import Chatting from './pages/Chatting/Chatting';
import Map from './pages/Map/Map';
import MyPage from './pages/MyPage/MyPage';
import Info from './pages/Info/Info';
import Navigation from './components/Navigation/Navigation';
import NotFound from './pages/NotFound/NotFound';
import SelectLocation from './pages/Main/SelectLocation';
import FindMate from './pages/Main/FindMate';
import MyWrite from './pages/MyPage/MyWrite';
import Favorite from './pages/MyPage/Favorite';
import Notice from './pages/MyPage/Notice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './pages/Chatting/Board';
import WriteBoard from './pages/Chatting/WriteBoard';
import Host from './pages/MyPage/Host';
import KakaoRedirect from './pages/SignIn/KakaoRedirect';
import EditBoard from './pages/MyPage/EditBoard';

function App() {
  const [token, setToken] = useState('');
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_REST_API_SERVER}/members/login`, {
        username: 'test@test.com',
        password: 'qwe123@@',
      })
      .then((res) => {
        setToken(res.headers.authentication);
      });
  }, []);

  return (
    <div className="relative">
      <div className="absolute text-center right-[23%] h-screen border border-gray-200 w-[450px] max-h-[full] overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/kakao/redirect" element={<KakaoRedirect />} />
          {/* <Route path="/login/oauth2/code/kakao" element={<KakaoRedirect />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Navigation />}>
            <Route path="/info" element={<Info />} />
            <Route path="/main" element={<Main />} />
            <Route path="/main/selectLocation" element={<SelectLocation />} />
            <Route path="/main/findmate" element={<FindMate />} />
            <Route path="/map" element={<Map token={token} />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/writeboard" element={<WriteBoard />} />
            <Route path="/board/chattinglist" element={<ChattingList />} />
            <Route path="/board/chatting" element={<Chatting />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/mywrite" element={<MyWrite />} />
            <Route path="/mypage/editBoard" element={<EditBoard />} />
            <Route path="/mypage/favorite" element={<Favorite />} />
            <Route path="/mypage/notice" element={<Notice />} />
            <Route path="/mypage/host" element={<Host />} />
            <Route path="/chatting" element={<Chatting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
