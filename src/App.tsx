import WriteNotice from "Components/Notice/WriteNotice";
import QAPage from "Page/Q&A/QAPage";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import LoginPage from "./Page/Login/login";
import Main from "./Page/Main";
import Manage from "./Page/Manage/Manage";
import Mypage from "./Page/MyPage/Mypage";
import PlayInterview from "./Page/Play/PlayInterview";

export default function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/PlayInterview" element={<PlayInterview />}></Route>
        <Route path="/Manage" element={<Manage />}></Route>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/Mypage" element={<Mypage />}></Route>
        <Route path="/QAPage" element={<QAPage />}></Route>
        <Route path="/WriteNotice" element={<WriteNotice />}></Route>
      </Routes>
    </>
  );
}
