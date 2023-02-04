import { Route, Routes } from "react-router-dom";
import { fireStore } from "./firebase";
import GlobalStyle from "./GlobalStyle";
import LoginPage from "./Page/Login/login";
import Main from "./Page/Main";
import Manage from "./Page/Manage/Manage";
import Mypage from "./Page/MyPage/Mypage";
import PlayInterview from "./Page/Play/PlayInterview";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/PlayInterview" element={<PlayInterview />}></Route>
        <Route path="/Manage" element={<Manage />}></Route>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/Mypage" element={<Mypage />}></Route>
      </Routes>
    </>
  );
}
