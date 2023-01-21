import { useEffect } from "react";
import { fireStore } from "./firebase";
import Main from "./Page/Main";

const App = () => {
  useEffect(() => {
    console.log(fireStore);
  });
  return (
    <>
      <Main />
      <div className="App">{fireStore._databaseId.projectId}</div>
    </>
  );
};

export default App;
