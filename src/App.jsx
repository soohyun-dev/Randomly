import { Route, Routes } from "react-router-dom";
import { fireStore } from "./firebase";
import GlobalStyle from "./GlobalStyle";
import Main from "./Page/Main";
import Manage from "./Page/Manage/Manage";
import PlayInterview from "./Page/Play/PlayInterview";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/PlayInterview" element={<PlayInterview />}></Route>
        <Route path="/Manage" element={<Manage />}></Route>
        {/*<div className="App">{fireStore._databaseId.projectId}</div>*/}
      </Routes>
    </>
  );
}
