import { fireStore } from "./firebase";
import Main from "./Page/Main";

const App = () => {
  return (
    <>
      <Main />
      <div className="App">{fireStore._databaseId.projectId}</div>
    </>
  );
};

export default App;
