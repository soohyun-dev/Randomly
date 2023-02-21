import WriteNotice from "Page/Notice/WriteNotice";
import NoticePosting from "Page/Notice/NoticePosting";
import QAPage from "Page/Q&A/QAPage";
import QAPosting from "Page/Q&A/QAPosting";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./Page/Login/login";
import Main from "./Page/Main";
import Manage from "./Page/Manage/Manage";
import Mypage from "./Page/MyPage/Mypage";
import PlayInterview from "./Page/Play/PlayInterview";
import WriteQA from "Page/Q&A/WriteQA";
import { useSelector } from "react-redux";
import { selectTheme } from "features/themeSlice";

export default function App(): JSX.Element {
  const theme = useSelector(selectTheme);

  return (
    <>
      <GlobalStyle theme={theme} />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/PlayInterview" element={<PlayInterview />}></Route>
        <Route path="/Manage" element={<Manage />}></Route>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/Mypage" element={<Mypage />}></Route>
        <Route path="/QAPage" element={<QAPage />}></Route>
        <Route path="/WriteNotice" element={<WriteNotice />}></Route>
        <Route path="/WriteQA" element={<WriteQA />}></Route>
        <Route path="/NoticePosting/:order" element={<NoticePosting />}></Route>
        <Route path="/QAposting/:order" element={<QAPosting />}></Route>
      </Routes>
    </>
  );
}
