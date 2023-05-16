import { Outlet, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Main from './pages/Main/Main';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Chatting from './pages/Chatting/Chatting';
import Map from './pages/Map/Map';
import MyPage from './pages/MyPage/MyPage';
import Info from './pages/Info/Info';
import Navigation from './components/Navigation/Navigation';
import NotFound from './pages/NotFound/NotFound';
import MyWrite from './pages/MyPage/MyWrite';
import Favorite from './pages/MyPage/Favorite';
import Notice from './pages/MyPage/Notice';

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
            <Route path="/map" element={<Map />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/mywrite" element={<MyWrite />} />
            <Route path="/mypage/favorite" element={<Favorite />} />
            <Route path="/mypage/notice" element={<Notice />} />
            <Route path="/chatting" element={<Chatting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
