import { useEffect, useId, useState } from "react";
import MakeNums, { getQuestionNums } from "../Utils/MakeNums";
import styled from "styled-components";
import { fireStore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MainContainer = styled.div`
  position: absolute;
  left: 40%;
  top: 30%;
`;

const Main = () => {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);
  const [bool, setBool] = useState(false);
  const uniqueId = useId();

  const userInfo = collection(fireStore, "member");
  const questionInfo = collection(fireStore, "question");
  const makeArray = (e) => {
    e.preventDefault();
    setResult(getQuestionNums(5, 20));
    setBool(true);
  };

  console.log(questions);

  const showQuestion = result.map((v, idx) => (
    <div>
      질문
      {result[idx].map((v) => (
        <h3>{questions[0][v]}</h3>
      ))}
      <hr />
    </div>
  ));

  const showUsers = users.map((value, idx) => (
    <div key={uniqueId}>
      <h3>Name: {value.name}</h3>
      {showQuestion[idx]}
    </div>
  ));

  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(userInfo);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getQuestions = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(questionInfo);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    getQuestions();
  }, [result]);

  return (
    <>
      <div>
        <MainContainer>
          {/* <input onChange={(e) => setNumber(e.target.value)} /> */}
          <button onClick={makeArray}>생성</button>
          {bool ? result.join(", ") : ""}
          {showUsers}
        </MainContainer>
      </div>
    </>
  );
};

export default Main;
