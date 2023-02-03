import { fireStore } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const INSERT = "questions/INSERT";
const UPDATE = "questions/UPDATE";
const REMOVE = "questions/REMOVE";

/**
 * 질문 추가 createAction
 *
 * @param {Number} 추가할 질문 idx
 * @param {String} 추가할 질문 텍스트
 * @param {date} 추가한 날짜
 */
export const insert = createAction(INSERT, (idx, text, date) => ({
  idx: idx,
  text,
  time: date,
}));

/**
 * 질문 수정 createAction
 *
 * @param {Number} 수정할 질문 id
 */
export const update = createAction(UPDATE, (id) => id);

/**
 * 질문 삭제 createAction
 *
 * @param {Number} 삭제할 질문 id
 */
export const remove = createAction(REMOVE, (id) => id);

console.log(remove(1));
const initialState = {
  idx: "",
};

// const questions = handleActions({
//   [REMOVE]: (state, { payload: id }) => {
//     const deleteQuestion = async (id) => {
//       const questionDoc = doc(fireStore, "questions", id);
//       await deleteDoc(questionDoc);
//     };
//     if (window.confirm("정말 삭제합니까?")) {
//       deleteQuestion(id);
//       alert("삭제되었습니다.");
//     }
//   },
//   initialState,
// });

function questions(state = initialState, action) {
  switch (action.type) {
    case REMOVE:
      const deleteQuestion = async (id) => {
        const questionDoc = doc(fireStore, "questions", id);
        await deleteDoc(questionDoc);
      };
      if (window.confirm("정말 삭제합니까?")) {
        deleteQuestion(state.idx);
        alert("삭제되었습니다.");
      }
      break;

    default:
      return state;
  }
}

export default questions;
