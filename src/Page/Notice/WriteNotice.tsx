import Footer from "Components/Footer";
import Nav from "Components/Nav";
import { fireStore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function WriteNotice() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const noticeInfo = collection(fireStore, "notice");
  const navigate = useNavigate();

  const addNotice = async () => {
    if (window.confirm("글작성을 완료하시겠습니까?")) {
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
      newData["title"] = title;
      newData["content"] = content;
      newData["time"] = time;
      newData["date"] = `${time.getFullYear()}.${month}.${day}`;
      await addDoc(noticeInfo, newData);
      alert("글 작성이 완료되었습니다.");
      navigate("/QAPage");
    }
  };

  return (
    <>
      <Nav />
      <WriteNoticeSection>
        <div>
          <Title>공지사항 작성</Title>
        </div>
        <div>
          <div>
            <label>제목</label>
            <input
              value={title}
              placeholder="제목"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label>내용</label>
            <input
              value={content}
              placeholder="내용"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button onClick={addNotice}>글 작성</button>
        </div>
      </WriteNoticeSection>
      <Footer />
    </>
  );
}

const WriteNoticeSection = styled.section`
  text-align: center;
  margin: 7em 0;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
`;
