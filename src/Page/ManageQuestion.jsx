import { useEffect, useState } from "react";
import { fireStore } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import styled from "styled-components";
import Nav from "../Components/Nav";
import QuestionTable from "../Components/Interview/QuestionTable";
import { useRef } from "react";

export default function ManageQuestion() {
  const [show, setShow] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const questions = useRef([]);
  const questionInfo = collection(fireStore, "questions");

  const getQuestions = async () => {
    const data = await getDocs(query(questionInfo, orderBy("time", "asc")));
    questions.current = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
    console.log(questions.current);
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
    alert("질문이 추가되었습니다.");
    getQuestions();
    window.location.reload();
  };

  useEffect(() => {
    getQuestions();
  }, [questions]);

  return (
    <>
      <Nav />
      <div>
        <p>질문관리</p>
        <div>
          <input
            type="text"
            placeholder="추가할 질문을 입력해주세요."
            onChange={(e) => {
              setNewQuestion(e.target.value);
            }}
          />
          <button onClick={addQuestion}>질문 추가</button>
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
    </>
  );
}
