import React, {
  useRef,
  useEffect,
  useId,
  useState,
  useLayoutEffect,
} from "react";
import getQuestionNums, { MakeNums } from "../../Utils/MakeNums";
import { fireStore } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import Nav from "../../Components/Nav";
import StopWatch from "../../Components/StopWatch/Stopwatch";
import Footer from "../../Components/Footer";
import { QuestionInfo, UserInfo } from "./types";
import { selectUser } from "Features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ManagePackageInfo } from "../Manage/types";

export default function PlayInterview() {
  const [open, setOpen] = useState<Array<boolean[] | boolean>>([false]);
  const [bool, setBool] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [questions, setQuestions] = useState<QuestionInfo[]>([]);
  const [result, setResult] = useState<Array<Array<number>>>([]);
  const [correctCnt, setCorrectCnt] = useState<Array<boolean>>([]);
  const [toggleQuestion, setToggleQuestion] = useState<Array<boolean>>([]);
  const [orderMember, setOrderMember] = useState<Array<number>>([]);
  const [nowPackage, setNowPackage] = useState<string>("0");
  const [show, setShow] = useState<boolean>(false);
  const packages = useRef<ManagePackageInfo[]>([]);
  const [packageId, setPackageId] = useState<string>("");
  const uniqueId = useId();

  const user = useSelector(selectUser);
  const packageInfo = collection(fireStore, `users/${user}/packages`);
  const userInfo =
    packageId === ""
      ? collection(fireStore, `users/${user}/packages`)
      : collection(fireStore, `users/${user}/packages/${packageId}/members`);

  const questionInfo =
    packageId === ""
      ? collection(fireStore, `users/${user}/questions`)
      : collection(fireStore, `users/${user}/packages/${packageId}/questions`);

  /**
   * 질문의 각 인덱스를 팀원에게 shuffle해서 분배시킨다.
   * 버튼을 누를 때마다 랜덤의 번호들이 생성되어 팀원들에게 부여된다.
   *
   * @param {e} 질문 분배 버튼 이벤트
   */
  const makeArray = () => {
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
  const openHandler = (idx: number) => {
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
  const toggleHandler = (idx: number) => {
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
  const correctHandler = (idx: number) => {
    let change = [...correctCnt];
    change[idx] = !change[idx];
    setCorrectCnt(change);
  };

  /**
   * 맞은 질문의 갯수를 세주는 함수.
   *
   * @param {Number} 맞은 갯수를 카운트할 팀원의 index
   */
  const checkCorrect = (member: number) => {
    if (result.length === 0) return 0;
    let correct = 0;
    result[member].forEach((q) => {
      if (correctCnt[q]) {
        correct += 1;
      }
    });
    return correct;
  };

  const changePackage = (now) => {
    setNowPackage(now);
    setResult([]);
    setOpen([]);
    setCorrectCnt([]);
    setToggleQuestion([]);
    setBool(false);
  };

  const getPackages = async () => {
    const packageData = await getDocs(
      query(packageInfo, orderBy("time", "asc"))
    );
    packages.current = packageData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
    setPackageId(packages.current[nowPackage].id);
  };

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
    alert("순서 변경이 완료되었습니다!");
  };

  const showQuestion = result.map((_, i) => (
    <div>
      {result[i].map((v: number, idx: number) =>
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

  const showUsers = users.map((value: UserInfo, idx: number) => (
    <UserContainer key={uniqueId}>
      <NameContainer>
        <UpperLeft>
          <MemberTitle>팀원명 : </MemberTitle>
          <MemberName>
            {orderMember.length === 0
              ? value.member
              : users[orderMember[idx]].member}
          </MemberName>
        </UpperLeft>
        <UpperMiddle></UpperMiddle>
        <UpperRight>
          <CorrectText> 맞은 갯수: {checkCorrect(idx)} 개</CorrectText>
        </UpperRight>
      </NameContainer>
      <ButtonContainer>
        {bool ? (
          <OpenButton
            color={open[idx]}
            onClick={(e) => {
              openHandler(idx);
            }}
          >
            {open[idx] ? "질문 닫기" : "질문 열기"}
          </OpenButton>
        ) : (
          <NoticeText>질문 분배를 해주세요😋</NoticeText>
        )}
      </ButtonContainer>
      {open[idx] ? showQuestion[idx] : ""}
    </UserContainer>
  ));

  useEffect(() => {
    if (user !== null) {
      getPackages();
      getUsers();
      getQuestions();
      setNowPackage(nowPackage);
    }
  }, [result, orderMember, nowPackage, packages, packageId]);

  return (
    <>
      <Nav />
      <section style={{ textAlign: "center" }}>
        <Title>INTERVIEW</Title>
        <PageGuide>
          팀원끼리 서로 랜덤의 질문을 배정받고 인터뷰 연습을 하는 공간입니다.
        </PageGuide>
        {user === null ? (
          ""
        ) : (
          <PageGuide>인터뷰를 할 폴더를 골라주세요. </PageGuide>
        )}
      </section>
      <PackageSection>
        <PackageDiv>
          {Object.keys(packages.current).map((v, idx) => (
            <PackageBox
              onClick={() => {
                changePackage(v);
              }}
            >
              <PackageTitle>{packages.current[v].title}</PackageTitle>
              <PackageDate>{packages.current[v].idx.slice(0, 10)}</PackageDate>
            </PackageBox>
          ))}
        </PackageDiv>
      </PackageSection>
      <PackageTitleDiv>
        <PackageTitleText>
          {show &&
            packages.current.length > 0 &&
            packages.current[nowPackage].title}
        </PackageTitleText>
      </PackageTitleDiv>

      <section style={{ textAlign: "center" }}>
        <MainContainer>
          {user === null ? (
            <ManageAccessSection>
              <ManageAccessTitle>로그인 해주세요😋</ManageAccessTitle>
              <Link
                to="/Login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <LinkLoginBtn>로그인하러 가기 ➡️</LinkLoginBtn>
              </Link>
            </ManageAccessSection>
          ) : (
            <OrderContainer>
              <div>
                <ShuffleName onClick={shuffleName}>이름 순서 변경</ShuffleName>
              </div>
              <div>
                <MakeQuestionNums color={bool} onClick={makeArray}>
                  {bool ? "질문 재분배" : "질문 분배 시작"}
                </MakeQuestionNums>
              </div>
              {bool ? (
                <GuideToggle>
                  질문 분배가 완료되었습니다. 질문을 확인해주세요.
                </GuideToggle>
              ) : (
                <GuideToggle>
                  질문이 분배되기 전입니다. 🔼 버튼을 눌러 질문을 분배해주세요!
                </GuideToggle>
              )}
              <USER>{user === null ? "" : showUsers}</USER>
            </OrderContainer>
          )}
        </MainContainer>
      </section>
      <Footer />
    </>
  );
}

const Title = styled.h1`
  font-size: 48px;
  margin: 3em 0 2em 0;
`;

const PageGuide = styled.p`
  font-size: 17px;
  padding: 1em 0;
  //   &:hover {
  //     font-size: 24px;
  //     transition: 0.8s;
  //   }
`;

const MainContainer = styled.div`
  margin: 7em 7em;
`;

const ShuffleName = styled.button`
  cursor: pointer;
  width: 180px;
  height: 50px;
  margin-bottom: 1em;
  color: #ffff;
  background-color: #03a9f4;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  &:hover {
    opacity: 80%;
  }
`;

const OrderContainer = styled.div`
  text-align: center;
`;

const MakeQuestionNums = styled.button<{
  color: any;
  onClick: any;
}>`
  cursor: pointer;
  width: 180px;
  height: 50px;
  margin-bottom: 2em;
  color: white;
  background-color: ${({ color }) => (color ? "#009688" : "#448aff")};
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  &:hover {
    opacity: 70%;
  }
`;

const GuideToggle = styled.p`
  margin: 2em 0 5em 0;
`;

const ManageAccessSection = styled.section`
  display: felx;
  justify-content: center;
  margin: 5em 0;
`;

const ManageAccessTitle = styled.label`
  margin: 0 1em;
  font-size: 24px;
`;

const LinkLoginBtn = styled.p`
  height: 3em;
  margin: 4em 0;
  line-height: 3em;
  background-color: #f5f5f5;
  border: none;
  border-radius: 10px;
  &:hover {
    opacity: 70%;
  }
`;

const UpperLeft = styled.div`
  width: 20%;
`;

const UpperMiddle = styled.div`
  width: 55%;
`;

const UpperRight = styled.div`
  width: 25%;
`;

const USER = styled.div`
  display: inline-block;
`;

const UserContainer = styled.div`
  background-color: #f5f5f5;
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
  background-color: #651fff;
  color: white;
  padding: 5px 10px;
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

const NoticeText = styled.p`
  margin: 2em 0;
  padding: 3em 0;
`;

const OpenButton = styled.button<{ color: any }>`
  cursor: pointer;
  width: 120px;
  height: 40px;
  margin: 20px 0;
  color: white;
  background-color: ${({ color }) => (color ? "#00695c" : "#5c8aff")};
  border: none;
  border-radius: 10px;
  font-size: 17px;
  fint-weight: 600;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  &:hover {
    opacity: 70%;
  }
`;

const QuestionText = styled.p<{ color: any }>`
  font-size: 21px;
  font-weight: 600;
  margin: 40px 15px;
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.color ? "blue" : "black")};
  display: flex;
`;

const ShowBtn = styled.button<{ color: any }>`
  width: 80px;
  padding: 8px 0;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.color ? "#ef5350" : "#66bb6a")};
  color: white;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  font-weight: 600;
  &:hover {
    opacity: 70%;
  }
`;

const CorrectBtn = styled.button<{ color: any }>`
  width: 3em;
  padding: 4px 0;
  margin-left: 1em;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.color ? "#ff8a80" : "#64b5f6")};
  color: white;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`;

const PackageSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PackageTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 5em 0;
`;

const PackageTitleText = styled.p`
  font-size: 24px;
`;

const PackageDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PackageBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 15em;
  height: 10em;
  border: none;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 2em 1em;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }
`;

const PackageTitle = styled.div`
  font-size: 20px;
  margin: 1em 0;
`;
const PackageDate = styled.div`
  color: #777;
`;
