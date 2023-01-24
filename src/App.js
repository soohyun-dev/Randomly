import Nav from "./Components/Nav";
import { fireStore } from "./firebase";
import GlobalStyle from "./GlobalStyle";
import Main from "./Page/Main";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Main />
      <div className="App">{fireStore._databaseId.projectId}</div>
    </>
  );
};

export default App;
