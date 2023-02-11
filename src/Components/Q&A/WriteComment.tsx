import { selectUser } from "features/userSlice";
import { fireStore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function WriteComment({ id }) {
  const [comment, setComment] = useState<string>("");
  const user = useSelector(selectUser);
  const QAInfo = collection(fireStore, `QA/${id}/comment`);

  const submitComment = async () => {
    const time = new Date();
    let month = String(time.getMonth() + 1);
    let day = String(time.getDate());
    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }
    const newData = {};
    newData["content"] = comment;
    newData["time"] = time;
    newData["date"] = `${time.getFullYear()}.${month}.${day}`;
    newData["commentWriter"] = user;
    await addDoc(QAInfo, newData);
    alert("댓글 작성이 완료되었습니다.");
    window.location.reload();
  };
  return (
    <>
      <section>
        <div>
          <input
            value={comment}
            placeholder="댓글을 입력해 주세요"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={submitComment}>댓글 작성</button>
        </div>
      </section>
    </>
  );
}
