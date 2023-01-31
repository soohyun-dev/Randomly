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

const QuestionListContainer = styled.div`
  text-align: center;
  margin: 5em 0;
`;

const UserListContainer = styled.div`
  text-align: center;
  margin: 5em 0;
`;

const AddBtn = styled.button`
  cursor: pointer;
`;

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
      <QuestionListContainer>
        <div style={{ display: "inline-block" }}>
          <p>질문 관리</p>
          <div>
            <input
              type="text"
              placeholder="추가할 질문을 입력해주세요."
              onChange={(e) => {
                setNewQuestion(e.target.value);
              }}
            />
            <AddBtn onClick={addQuestion}>질문 추가</AddBtn>
          </div>
          <div>
            <table border="1">
              <th>No.</th>
              <th>질문</th>
              <th>수정하기</th>
              <th>삭제하기</th>
              {show
                ? Object.keys(questions.current).map((v, idx) => (
                    <QuestionTable
                      question={questions.current[~~v].question}
                      id={questions.current[~~v].id}
                      idx={idx}
                    />
                  ))
                : ""}
            </table>
          </div>
        </div>
      </QuestionListContainer>

      <hr />

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
              <th>No.</th>
              <th>유저</th>
              <th>수정하기</th>
              <th>삭제하기</th>
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
