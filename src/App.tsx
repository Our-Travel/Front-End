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
import Banner from './components/Main/Banner';
import SelectLocation from './pages/Main/SelectLocation';
import FindMate from './pages/Main/FindMate';
import MyWrite from './pages/MyPage/MyWrite';
import Favorite from './pages/MyPage/Favorite';
import Notice from './pages/MyPage/Notice';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJib2R5Ijoie1wiaWRcIjoyLFwidXNlcm5hbWVcIjpcInVzZXIxQGV4YW1wbGUuY29tXCIsXCJuaWNrTmFtZVwiOlwidXNlcjFcIixcImF1dGhvcml0aWVzXCI6W3tcImF1dGhvcml0eVwiOlwiTUVNQkVSXCJ9XX0iLCJleHAiOjQ4Mzk1NTk2NTd9.vwU6sqkgglt3Ju-auzMkV9BeU-E35a1zTsUcYoWcPGnqGxd56yO8ROINWYJ8SjJMT_LMUfPW6FhMzbf_93SFiA';
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/local-place/spot?latitude=37.3422186&longitude=127.9201621', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.documents);
      });
  }, []);
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
            <Route path="/map" element={<Map token={token} />} />
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
