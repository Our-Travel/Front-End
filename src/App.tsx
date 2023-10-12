import { Route, Routes } from 'react-router-dom';
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
import HostList from './pages/Main/HostList';
import MyWrite from './pages/MyPage/MyWrite';
import Favorite from './pages/MyPage/Favorite';
import Notice from './pages/MyPage/Notice';
import { useState } from 'react';
import Board from './pages/Board/Board';
import WriteBoard from './pages/Board/WriteBoard';
import Host from './pages/MyPage/Host';
import KakaoRedirect from './pages/SignIn/KakaoRedirect';
import ProfileEdit from 'components/MypageInfo/ProfileEdit';

function App() {
  const [token, setToken] = useState('');

  return (
    <div className="relative">
      <div className="w-full h-screen main-backGround max-h-[60rem] ">
        <div className="absolute w-full h-full max-w-[28rem] max-h-[60rem] text-center left-1/2 -translate-x-1/2 xl:left-[65%] bg-white h-screen border border-gray-200">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Navigation />}>
              <Route path="/info" element={<Info />} />
              <Route path="/main" element={<Main />} />
              <Route path="/main/selectLocation" element={<SelectLocation />} />
              <Route path="/main/hostlist/:regionCode/:regionName" element={<HostList />} />
              <Route path="/map" element={<Map token={token} />} />
              <Route path="/board" element={<Board />} />
              <Route path="/board/writeboard" element={<WriteBoard />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/profileEdit" element={<ProfileEdit />} />
              <Route path="/mypage/mywrite" element={<MyWrite />} />
              <Route path="/mypage/favorite" element={<Favorite />} />
              <Route path="/mypage/notice" element={<Notice />} />
              <Route path="/mypage/host" element={<Host />} />
              <Route path="/mypage/host/edit" element={<Host />} />
              <Route path="/chatting/:roomnum" element={<Chatting />} />
              <Route path="/chattinglist" element={<ChattingList />} />
              <Route path="/oauth2/redirect/:token" element={<KakaoRedirect />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
