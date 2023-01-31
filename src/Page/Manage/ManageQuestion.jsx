import { useEffect, useState } from "react";
import { fireStore } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import styled from "styled-components";
import Nav from "../../Components/Nav";
import QuestionTable from "../../Components/ManageInterview/QuestionTable";
import { useRef } from "react";
import UserTable from "../../Components/ManageInterview/UserTable";

export default function ManageQuestion() {
  const [show, setShow] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newUser, setNewUser] = useState("");
  const questions = useRef([]);
  const users = useRef([]);
  const questionInfo = collection(fireStore, "questions");
  const userInfo = collection(fireStore, "member");

  const getQuestions = async () => {
    const questionData = await getDocs(
      query(questionInfo, orderBy("time", "asc"))
    );
    questions.current = questionData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
  };

  const getUsers = async () => {
    const userData = await getDocs(query(userInfo, orderBy("time", "asc")));
    users.current = userData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
    console.log(users.current);
  };

  /**
   * 질문 추가
   *
   * @param {Number}
   */
  const addQuestion = async () => {
    const idx = Object.keys(questions.current).length;
    const newData = {};
    newData["idx"] = idx;
    newData["question"] = newQuestion;
    newData["time"] = new Date();
    await addDoc(questionInfo, newData);
    getQuestions();
    window.location.reload();
  };

  /**
   * 질문 추가
   *
   * @param {Number}
   */
  const addUser = async () => {
    const idx = Object.keys(users.current).length;
    const newData = {};
    newData["idx"] = idx;
    newData["user"] = newUser;
    newData["time"] = new Date();
    await addDoc(userInfo, newData);
    alert("유저가 추가되었습니다.");
    getUsers();
    window.location.reload();
  };

  useEffect(() => {
    getQuestions();
    getUsers();
  }, [questions, users]);

  return (
    <>
      <Nav />
      <section style={{ textAlign: "center" }}>
        <Title>MANAGE</Title>
        <PageGuide>이 페이지에서는 질문과 유저를 관리할 수 있습니다.</PageGuide>
        <PageGuide>하단에서 확인해보세요. </PageGuide>
      </section>
      <QuestionListContainer>
        <div>
          <div>
            <MiniTitle>질문 관리</MiniTitle>
          </div>
          <div>
            <QuestionInput
              type="text"
              placeholder="추가할 질문을 입력해주세요."
              onChange={(e) => {
                setNewQuestion(e.target.value);
              }}
            />
            <AddBtn onClick={addQuestion}>질문 추가</AddBtn>
          </div>
          <div style={{ display: "inline-block" }}>
            <Table border="1">
              <thead>
                <tr>
                  <Th>No.</Th>
                  <Th>질문</Th>
                  <Th>수정하기</Th>
                  <ThNoRight>삭제하기</ThNoRight>
                </tr>
              </thead>
              {show
                ? Object.keys(questions.current).map((v, idx) => (
                    <QuestionTable
                      question={questions.current[~~v].question}
                      id={questions.current[~~v].id}
                      idx={idx}
                    />
                  ))
                : ""}
            </Table>
          </div>
        </div>
      </QuestionListContainer>

      <DivLine />

      <UserListContainer>
        <div style={{ display: "inline-block" }}>
          <p>유저 관리</p>
          <div>
            <input
              type="text"
              placeholder="추가할 유저를 입력해주세요."
              onChange={(e) => {
                setNewUser(e.target.value);
              }}
            />
            <AddBtn onClick={addUser}>유저 추가</AddBtn>
          </div>
          <div>
            <table border="1">
              <thead>
                <tr>
                  <Th>No.</Th>
                  <Th>유저</Th>
                  <Th>수정하기</Th>
                  <ThNoRight>삭제하기</ThNoRight>
                </tr>
              </thead>
              {show
                ? Object.keys(users.current).map((v, idx) => (
                    <UserTable
                      user={users.current[~~v].user}
                      id={users.current[~~v].id}
                      idx={idx}
                    />
                  ))
                : ""}
            </table>
          </div>
        </div>
      </UserListContainer>
    </>
  );
}

const Title = styled.h1`
  font-size: 48px;
  margin: 3em 0 2em 0;
`;

const PageGuide = styled.p`
  font-size: 17px;
`;

const MiniTitle = styled.p`
  font-size: 36px;
  margin: 3em 0 2em 0;
`;

const QuestionListContainer = styled.section`
  text-align: center;
  margin: 5em 0;
`;

const QuestionInput = styled.input`
  width: 40em;
  height: 3em;
  padding-left: 1em;
  border: 2px solid #eeeeee;
  border-radius: 10px;
  margin: 2em 0 5em 5em;
`;

const UserListContainer = styled.div`
  text-align: center;
  margin: 5em 0;
`;

const AddBtn = styled.button`
  width: 6em;
  height: 3em;
  margin: 0 1em;
  font-size: 14px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #424242;
  &:hover {
    opacity: 80%;
  }
`;

const DivLine = styled.hr`
  color: #eeeeee;
`;

const Table = styled.table`
  width: 70em;
  border-top: 2px solid;
`;

const Th = styled.th`
  padding: 2em 0;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const ThNoRight = styled.th`
  padding: 2em 0;
  border-bottom: 1px solid #e0e0e0;
`;
