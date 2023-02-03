import { useEffect, useState } from "react";
import { fireStore } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import styled from "styled-components";
import QuestionTable from "../../Components/ManageInterview/QuestionTable";
import { useRef } from "react";

export default function ManageQuestion({ idx }) {
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
   */
  const addQuestion = async () => {
    const idx = Object.keys(questions.current).length;
    const newData = {};
    newData["idx"] = idx;
    newData["question"] = newQuestion;
    newData["time"] = new Date();
    await addDoc(questionInfo, newData);
    setNewQuestion("");
    getQuestions();
    alert("질문이 추가되었습니다.");
  };

  /**
   * 전체 질문 삭제
   *
   */
  const deleteAll = () => {
    const deleteAllQuestion = () => {
      Object.keys(questions.current).map((v) => {
        const deleteQuestion = async (id) => {
          const questionDoc = doc(fireStore, "questions", id);
          await deleteDoc(questionDoc);
        };
        deleteQuestion(questions.current[~~v].id);
      });
    };

    if (window.confirm("등록된 질문들을 모두 삭제하십니까?")) {
      if (window.confirm("정말 삭제하십니까? 다시 한번 선택해주세요.")) {
        deleteAllQuestion();
        alert("모든 질문들이 삭제되었습니다. 새로고침 해주세요.");
      }
    }
  };

  const onChange = (e) => {
    setNewQuestion(e.target.value);
  };

  useEffect(() => {
    getQuestions();
  }, [newQuestion]);

  return (
    <>
      <QuestionListContainer>
        <div>
          <div>
            <QuestionInput
              type="text"
              value={newQuestion}
              placeholder="추가할 질문을 입력해주세요."
              onChange={onChange}
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
        <DelelteAllSection>
          <DeleteAllBtn onClick={deleteAll}>전체삭제</DeleteAllBtn>
        </DelelteAllSection>
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

const DelelteAllSection = styled.section`
  margin: 7em 0;
`;

const DeleteAllBtn = styled.button`
  width: 140px;
  height: 50px;
  border: none;
  border-radius: 15px;
  background-color: #eeeeee;
  color: white;
  font-size: 24px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  cursor: pointer;
  &:hover {
    opacity: 70%;
    background-color: red;
    transition: 0.5s;
  }
`;
