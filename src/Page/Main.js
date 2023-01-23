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
  font-size: 23px;
  font-weight: 600;
  margin: 40px 40px;
  padding: 10px 20px;
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

  /**
   * 질문의 각 인덱스를 팀원에게 shuffle해서 분배시킨다.
   * 버튼을 누를 때마다 랜덤의 번호들이 생성되어 팀원들에게 부여된다.
   * @param {e} 질문 분배 버튼 이벤트
   */
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

  /**
   * 버튼을 누르면 해당하는 유저의 질문 목록이 열린다.
   * 열린상태에서 누르면 닫힌다.
   * @param {Number} 질문을 열거나 닫을 팀원의 index
   */
  const openHandler = (idx) => {
    let change = [...open];
    change[idx] = !change[idx];
    setOpen(change);
  };

  /**
   * 텍스트를 누르면 맞았다는 표시로 color가 변경되며, 맞은 갯수가 카운트된다.
   * 맞은 표시의 텍스트를 누르면 취소된다.
   * @param {Number} 맞은 표시를 할 질문의 index
   */
  const correctHandler = (idx) => {
    let change = [...correctCnt];
    change[idx] = !change[idx];
    setCorrectCnt(change);
  };

  /**
   * 맞은 질문의 갯수를 세주는 함수.
   * @param {Number} 맞은 갯수를 카운트할 팀원의 index
   */
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

  /**
   * 질문 목록을 보여주는 함수
   */
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

  /**
   * 유저 정보를 보여주는 함수
   */
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
    // * 유저 정보를 불러옴.
    const getUsers = async () => {
      const data = await getDocs(userInfo);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    // * 질문 목록을 불러옴.
    const getQuestions = async () => {
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
