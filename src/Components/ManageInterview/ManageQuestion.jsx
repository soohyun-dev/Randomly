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
  const questions = useRef([]);
  const questionInfo = collection(fireStore, "questions");

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

  useEffect(() => {
    getQuestions();
  }, [questions]);

  return (
    <>
      <QuestionListContainer>
        <div>
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
    </>
  );
}

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

const Table = styled.table`
  width: 70em;
  border-top: 2px solid;
`;

const Th = styled.th`
  padding: 1em 0;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const ThNoRight = styled.th`
  padding: 1em 0;
  border-bottom: 1px solid #e0e0e0;
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
