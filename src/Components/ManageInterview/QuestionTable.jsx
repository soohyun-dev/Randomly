import { fireStore } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";

export default function QuestionTable({ question, id, idx }) {
  const [newQuestion, setNewQuestion] = useState(question);
  const [update, setUpdate] = useState(false);
  const [updateBtnToggle, setUpdateBtnToggle] = useState(false);

  /**
   * 질문 수정
   *
   * @param {Number} 수정할 질문의 id값
   */

  const updateQuestion = async (id) => {
    const questionDoc = doc(fireStore, "questions", id);
    const newContent = { question: newQuestion };
    await updateDoc(questionDoc, newContent);
    window.location.reload();
  };

  /**
   * 질문 삭제
   *
   * @param {Number} 삭제할 질문의 id값
   */
  const checkDelete = (id) => {
    console.log(id);
    const deleteQuestion = async (id) => {
      const questionDoc = doc(fireStore, "questions", id);
      await deleteDoc(questionDoc);
      window.location.reload();
    };
    if (window.confirm("정말 삭제합니까?")) {
      deleteQuestion(id);
      alert("삭제되었습니다.");
    }
  };

  return (
    <>
      <Tr>
        <Td>{idx + 1}</Td>
        <Td>
          {update ? (
            <QuestionInput
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
          ) : (
            question
          )}
        </Td>
        <Td>
          {updateBtnToggle ? (
            <div>
              <Btn
                onClick={() => {
                  alert("수정 완료되었습니다.");
                  updateQuestion(id);
                  setUpdate(!update);
                  setUpdateBtnToggle(!updateBtnToggle);
                }}
              >
                수정 완료
              </Btn>
              <Btn
                onClick={() => {
                  setUpdate(!update);
                  setUpdateBtnToggle(!updateBtnToggle);
                }}
              >
                수정 취소
              </Btn>
            </div>
          ) : (
            <Btn
              onClick={() => {
                setUpdate(!update);
                setUpdateBtnToggle(!updateBtnToggle);
              }}
            >
              수정
            </Btn>
          )}
        </Td>
        <TdNoRight>
          <Btn
            onClick={() => {
              checkDelete(id);
            }}
          >
            삭제
          </Btn>
        </TdNoRight>
      </Tr>
    </>
  );
}

const Tr = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const Td = styled.td`
  padding: 1.5em 0;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const TdNoRight = styled.td`
  padding: 1.5em 0;
  border-bottom: 1px solid #e0e0e0;
`;

const QuestionInput = styled.input`
  width: 40em;
  height: 3em;
  padding-left: 1em;
  border: 2px solid #eeeeee;
  border-radius: 10px;
`;

const Btn = styled.button`
  width: 4em;
  height: 2.5em;
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
