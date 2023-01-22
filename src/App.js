import { fireStore } from "./firebase";
import GlobalStyle from "./GlobalStyle";
import Main from "./Page/Main";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Main />
      <div className="App">{fireStore._databaseId.projectId}</div>
    </>
  );
};

export default App;
