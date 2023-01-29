import { fireStore } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function QuestionTable({ question, id }) {
  const checkDelete = (id) => {
    const deleteQuestion = async (id) => {
      // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
      const userDoc = doc(fireStore, "questions", id);
      // deleteDoc을 이용해서 삭제
      await deleteDoc(userDoc);
    };
    if (window.confirm("정말 삭제합니까?")) {
      deleteQuestion(id);
      alert("삭제되었습니다.");
      window.location.reload();
    }
  };

  return (
    <>
      <tr>
        <td>{question}</td>
        <td>수정</td>
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
