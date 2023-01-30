import { fireStore } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

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
      <tr>
        <td>{idx}</td>
        <td>
          {update ? (
            <input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
          ) : (
            question
          )}
        </td>
        <td>
          {updateBtnToggle ? (
            <div>
              <button
                onClick={() => {
                  alert("수정 완료되었습니다.");
                  updateQuestion(id);
                  setUpdate(!update);
                  setUpdateBtnToggle(!updateBtnToggle);
                }}
              >
                수정 완료
              </button>
              <button
                onClick={() => {
                  setUpdate(!update);
                  setUpdateBtnToggle(!updateBtnToggle);
                }}
              >
                수정 취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setUpdate(!update);
                setUpdateBtnToggle(!updateBtnToggle);
              }}
            >
              수정
            </button>
          )}
        </td>
        <td>
          <button
            onClick={() => {
              checkDelete(id);
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    </>
  );
}
