import { useEffect, useId, useState } from "react";
import { getQuestionNums } from "../Utils/MakeNums";
import styled from "styled-components";
import { fireStore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MainContainer = styled.div`
  position: absolute;
  left: 32%;
  top: 20%;
`;

const MakeQuestionNums = styled.button`
  cursor: pointer;
  width: 180px;
  height: 50px;
  margin: 0 0 2em 10em;
  color: ${(props) => (props.color ? "#5c8aff" : "black")};
  border: solid 3px ${(props) => (props.color ? "#5c8aff" : "black")};
  border-radius: 10px;
  font-size: 22px;
  font-weight: 500;
  font-family: "Nanum Gothic", sans-serif;
  &:hover {
    opacity: 70%;
  }
`;

const GuideToggle = styled.p`
  margin-left: 13.5em;
`;

const UserContainer = styled.div`
  background-color: #eaeaea;
  width: 40em;
  border-radius: 10px;
`;

const NameContainer = styled.div`
  margin: 40px 0;
  padding: 30px 40px;
`;

const MemberTitle = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

const MemberName = styled.label`
  font-size: 22px;
  font-weight: 600;
  background-color: #651fff;
  color: white;
  padding: 6px 10px;
  border-radius: 10px;
`;

const CorrectText = styled.label`
  margin-left: 12em;
  font-size: 22px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  margin-left: 16em;
  justify-items: center;
`;

const OpenButton = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  margin: 20px 0;
  color: ${(props) => (props.color ? "red" : "#5c8aff")};
  border: solid 2px ${(props) => (props.color ? "red" : "#5c8aff")};
  border-radius: 10px;
  font-size: 17px;
  fint-weight: 600;
  font-family: "Nanum Gothic", sans-serif;
  &:hover {
    opacity: 70%;
  }
`;

const QuestionText = styled.p`
  font-size: 26px;
  font-weight: 600;
  margin: 40px 40px;
  padding: 13px 20px;
  cursor: pointer;
  color: ${(props) => (props.color ? "blue" : "black")};
  &:hover {
    opacity: 70%;
  }
`;

const Main = () => {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [bool, setBool] = useState(false);
  const [correctCnt, setCorrectCnt] = useState([]);
  const uniqueId = useId();

  const userInfo = collection(fireStore, "member");
  const questionInfo = collection(fireStore, "question");
  const makeArray = (e) => {
    e.preventDefault();
    setResult(
      getQuestionNums(users.length, Object.keys(questions[0]).length - 1)
    );
    setOpen(Array.from({ length: users.length }, () => false));
    setCorrectCnt(
      Array.from({ length: Object.keys(questions[0]).length - 1 }, () => false)
    );
    setBool(true);
  };

  const openHandler = (idx) => {
    let change = [...open];
    change[idx] = !change[idx];
    setOpen(change);
  };

  const correctHandler = (idx) => {
    let change = [...correctCnt];
    change[idx] = !change[idx];
    setCorrectCnt(change);
  };

  const checkCorrect = (member) => {
    if (result.length === 0) return 0;
    let correct = 0;
    result[member].forEach((q) => {
      if (correctCnt[q]) {
        correct += 1;
      }
    });
    return correct;
  };

  const showQuestion = result.map((v, i) => (
    <div>
      {result[i].map((v, idx) => (
        <QuestionText
          color={correctCnt[v]}
          onClick={(e) => {
            correctHandler(v);
          }}
        >
          {idx + 1}. {questions[0][v]}
        </QuestionText>
      ))}
    </div>
  ));

  const showUsers = users.map((value, idx) => (
    <UserContainer key={uniqueId}>
      <NameContainer>
        <MemberTitle>팀원명: </MemberTitle>
        <MemberName>{value.name}</MemberName>
        <CorrectText>맞은 갯수: {checkCorrect(idx)} 개</CorrectText>
      </NameContainer>
      <ButtonContainer>
        <OpenButton
          color={open[idx]}
          onClick={(e) => {
            openHandler(idx);
          }}
        >
          {open[idx] ? "질문 닫기" : "질문 열기"}
        </OpenButton>
      </ButtonContainer>
      {open[idx] ? showQuestion[idx] : ""}
    </UserContainer>
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
          <div>
            <MakeQuestionNums color={bool} onClick={makeArray}>
              {bool ? "질문 분배 완료" : "질문 분배 시작"}
            </MakeQuestionNums>
            {bool ? <GuideToggle>하단의 질문을 확인해주세요.</GuideToggle> : ""}
          </div>
          {showUsers}
        </MainContainer>
      </div>
    </>
  );
};

export default Main;
