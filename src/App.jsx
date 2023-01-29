import { Route, Routes } from "react-router-dom";
import { fireStore } from "./firebase";
import GlobalStyle from "./GlobalStyle";
import Main from "./Page/Main";
import ManageQuestion from "./Page/ManageQuestion";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/ManageQuestion" element={<ManageQuestion />}></Route>
        {/*<div className="App">{fireStore._databaseId.projectId}</div>*/}
      </Routes>
    </>
  );
}
