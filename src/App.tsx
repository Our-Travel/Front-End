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

function App() {
  const [token, setToken] = useState('');
  useEffect(() => {
    axios
      .post('http://localhost:8080/api/members/login', {
        username: 'user1@example.com',
        password: '1234',
      })
      .then((res) => {
        setToken(res.data.data.access_token);
      });
  }, []);

  return (
    <div className="relative">
      <div className="absolute text-center right-[23%] h-screen border border-gray-200 w-[450px] max-h-[full] overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/kakao/redirect" element={<KakaoRedirect />} /> */} // 카카오로그인 닫아둠
          {/* <Route path="/oauth2/kakao" element={<KakaoRedirect />} /> */} // 서버미완성
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
