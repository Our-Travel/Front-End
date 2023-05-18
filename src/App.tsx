import { Outlet, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Main from './pages/Main/Main';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ChattingList from './pages/Chatting/ChattingList';
import Chatting from './pages/Chatting/Chatting';
import ChattingEmpty from './pages/Chatting/ChattingEmpty';
import Post from './pages/Post/Post';
import Map from './pages/Map/Map';
import MyPage from './pages/MyPage/MyPage';
import Info from './pages/Info/Info';
import Navigation from './components/Navigation/Navigation';
import NotFound from './pages/NotFound/NotFound';
import Banner from './components/Main/Banner';
import SelectLocation from './pages/Main/SelectLocation';
import FindMate from './pages/Main/FindMate';
import MyWrite from './pages/MyPage/MyWrite';
import Favorite from './pages/MyPage/Favorite';
import Notice from './pages/MyPage/Notice';
import Board from './pages/Chatting/Board';

function App() {
  return (
    <div className="relative">
      <div className="absolute text-center right-[23%] h-screen border border-gray-200 w-[450px] max-h-[full]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Navigation />}>
            <Route path="/info" element={<Info />} />
            <Route path="/main" element={<Main />} />
            <Route path="/main/selectLocation" element={<SelectLocation />} />
            <Route path="/main/findmate" element={<FindMate />} />
            <Route path="/map" element={<Map />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/post" element={<Post />} />
            <Route path="/board" element={<Board />} />
            <Route path="/chattinglist" element={<ChattingList />} />
            <Route path="/mypage/mywrite" element={<MyWrite />} />
            <Route path="/mypage/favorite" element={<Favorite />} />
            <Route path="/mypage/notice" element={<Notice />} />
            <Route path="/chatting" element={<Chatting />} />
            <Route path="/chattingempty" element={<ChattingEmpty />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
