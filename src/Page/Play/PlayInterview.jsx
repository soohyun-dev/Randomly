import { useEffect, useId, useState } from "react";
import getQuestionNums, { MakeNums } from "../../Utils/MakeNums";
import { fireStore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import Nav from "../../Components/Nav";
import StopWatch from "../../Components/StopWatch/Stopwatch";

export default function PlayInterview() {
  const [open, setOpen] = useState(false);
  const [bool, setBool] = useState(false);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);
  const [correctCnt, setCorrectCnt] = useState([]);
  const [toggleQuestion, setToggleQuestion] = useState([]);
  const [orderMember, setOrderMember] = useState([]);
  const uniqueId = useId();
  const userInfo = collection(fireStore, "member");
  const questionInfo = collection(fireStore, "questions");

  /**
   * 질문의 각 인덱스를 팀원에게 shuffle해서 분배시킨다.
   * 버튼을 누를 때마다 랜덤의 번호들이 생성되어 팀원들에게 부여된다.
   *
   * @param {e} 질문 분배 버튼 이벤트
   */
  const makeArray = (e) => {
    e.preventDefault();
    alert("질문 분배가 완료되었습니다!");
    setResult(getQuestionNums(users.length, Object.keys(questions).length));
    setOpen(Array.from({ length: users.length }, () => false));
    setCorrectCnt(
      Array.from({ length: Object.keys(questions).length - 1 }, () => false)
    );
    setToggleQuestion(
      Array.from({ length: Object.keys(questions).length - 1 }, () => false)
    );
    setBool(true);
  };

  /**
   * 버튼을 누르면 해당하는 유저의 질문 목록이 열린다.
   * 열린상태에서 누르면 닫힌다.
   *
   * @param {Number} 질문을 열거나 닫을 팀원의 index
   */
  const openHandler = (idx) => {
    if (!bool) {
      alert("질문 분배를 해주세요!");
    }
    let change = [...open];
    change[idx] = !change[idx];
    setOpen(change);
  };

  /**
   * 각 질문을 보이게하거나 안보이게 할 수 있다.
   *
   * @param {Number} toggle할 질문의 index
   */
  const toggleHandler = (idx) => {
    let change = [...toggleQuestion];
    change[idx] = !change[idx];
    setToggleQuestion(change);
  };
  /**
   * 텍스트를 누르면 맞았다는 표시로 color가 변경되며, 맞은 갯수가 카운트된다.
   * 맞은 표시의 텍스트를 누르면 취소된다.
   *
   * @param {Number} 맞은 표시를 할 질문의 index
   */
  const correctHandler = (idx) => {
    let change = [...correctCnt];
    change[idx] = !change[idx];
    setCorrectCnt(change);
  };

  /**
   * 맞은 질문의 갯수를 세주는 함수.
   *
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

  const showQuestion = result.map((_, i) => (
    <div>
      {result[i].map((v, idx) =>
        toggleQuestion[result[i][idx]] ? (
          <QuestionText color={correctCnt[v]}>
            <QuestionBlock>
              <ShowBtn
                color={toggleQuestion[result[i][idx]]}
                onClick={(e) => {
                  toggleHandler(result[i][idx]);
                }}
              >
                질문 가리기
              </ShowBtn>
            </QuestionBlock>
            <QuestionBlock>
              {idx + 1}. {questions[v].question}
            </QuestionBlock>
            <QuestionBlock>
              <CorrectBtn
                color={correctCnt[v]}
                onClick={(e) => {
                  correctHandler(v);
                }}
              >
                {correctCnt[v] ? "취소" : "맞음"}
              </CorrectBtn>
            </QuestionBlock>
            <StopWatch />
          </QuestionText>
        ) : (
          <QuestionText color={correctCnt[v]}>
            <QuestionBlock>
              <ShowBtn
                color={toggleQuestion[result[i][idx]]}
                onClick={(e) => {
                  toggleHandler(result[i][idx]);
                }}
              >
                질문 보기
              </ShowBtn>
            </QuestionBlock>
            <QuestionBlock>{idx + 1}.</QuestionBlock>
          </QuestionText>
        )
      )}
    </div>
  ));

  const showUsers = users.map((value, idx) => (
    <UserContainer key={uniqueId}>
      <NameContainer>
        <UpperLeft>
          <MemberTitle>팀원명: </MemberTitle>
          <MemberName>
            {orderMember.length === 0
              ? value.user
              : users[orderMember[idx]].user}
          </MemberName>
        </UpperLeft>
        <UpperMiddle></UpperMiddle>
        <UpperRight>
          <CorrectText> 맞은 갯수: {checkCorrect(idx)} 개</CorrectText>
        </UpperRight>
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

  const getQuestions = async () => {
    const data = await getDocs(questionInfo);
    setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getUsers = async () => {
    const data = await getDocs(userInfo);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const shuffleName = () => {
    setOrderMember(MakeNums(Object.keys(users).length));
  };

  useEffect(() => {
    getUsers();
    getQuestions();
  }, [result, orderMember]);

  console.log(questions);
  console.log(users);
  console.log(orderMember);

  return (
    <>
      <Nav />
      <div>
        <MainContainer>
          <OrderContainer>
            <div>
              <ShuffleName onClick={shuffleName}>이름 순서 변경</ShuffleName>
            </div>
            <div>
              {" "}
              <MakeQuestionNums color={bool} onClick={makeArray}>
                {bool ? "질문 분배 완료" : "질문 분배 시작"}
              </MakeQuestionNums>
            </div>
            {bool ? (
              <GuideToggle>
                질문 분배가 완료되었습니다. 질문을 확인해주세요.
              </GuideToggle>
            ) : (
              ""
            )}
          </OrderContainer>
          {showUsers}
        </MainContainer>
      </div>
    </>
  );
}

const MainContainer = styled.div`
  position: absolute;
  left: 9%;
  top: 20%;
`;

const ShuffleName = styled.button`
  cursor: pointer;
  width: 180px;
  height: 50px;
  margin-bottom: 2em;
  color: #00695c;
  background-color: #69f0ae;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 500;
  font-family: "Nanum Gothic", sans-serif;
  &:hover {
    opacity: 70%;
  }
`;

const OrderContainer = styled.div`
  text-align: center;
`;

const MakeQuestionNums = styled.button`
  cursor: pointer;
  width: 180px;
  height: 50px;
  margin-bottom: 2em;
  color: white;
  background-color: ${(props) => (props.color ? "#009688" : "#8bc34a")};
  border: none;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 500;
  font-family: "Nanum Gothic", sans-serif;
  &:hover {
    opacity: 70%;
  }
`;

const GuideToggle = styled.p`
  font-weight: 600;
`;

const UpperLeft = styled.div`
  width: 20%;
`;

const UpperMiddle = styled.div`
  width: 60%;
`;

const UpperRight = styled.div`
  width: 20%;
`;

const UserContainer = styled.div`
  background-color: #eaeaea;
  width: 80em;
  border-radius: 10px;
`;

const NameContainer = styled.div`
  width: 100%;
  display: flex;
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

const QuestionBlock = styled.div`
  display: inline-block;
  line-height: 35px;
`;

const CorrectText = styled.label`
  font-size: 22px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const OpenButton = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  margin: 20px 0;
  color: white;
  background-color: ${(props) => (props.color ? "#00695c" : "#5c8aff")};
  border: none;
  border-radius: 10px;
  font-size: 17px;
  fint-weight: 600;
  font-family: "Nanum Gothic", sans-serif;
  &:hover {
    opacity: 70%;
  }
`;

const QuestionText = styled.p`
  font-size: 21px;
  font-weight: 600;
  margin: 40px 15px;
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.color ? "blue" : "black")};
  display: flex;
`;

const ShowBtn = styled.button`
  width: 80px;
  padding: 8px 0;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.color ? "#ef5350" : "#66bb6a")};
  color: white;
  font-family: "Nanum Gothic", sans-serif;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    opacity: 70%;
  }
`;

const CorrectBtn = styled.button`
  width: 3em;
  padding: 4px 0;
  margin-left: 1em;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.color ? "#ff8a80" : "#64b5f6")};
  color: white;
  font-family: "Nanum Gothic", sans-serif;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`;