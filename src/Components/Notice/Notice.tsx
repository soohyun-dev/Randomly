import { useState, useEffect, useRef } from "react";
import { fireStore } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import NoticeList from "./NoticeList";
import { NoticeInfo } from "./types";
import { useSelector } from "react-redux";
import { selectUser } from "features/userSlice";
import { Link } from "react-router-dom";

export default function Notice() {
  const [show, setShow] = useState(false);
  const notice = useRef<NoticeInfo[]>([]);
  const noticeInfo = collection(fireStore, "notice");
  const user = useSelector(selectUser);
  const getNotice = async () => {
    const noticeData = await getDocs(
      query(noticeInfo, orderBy("time", "desc"))
    );
    notice.current = noticeData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
  };

  useEffect(() => {
    getNotice();
  }, [show]);

  return (
    <>
      <div>
        <Title>공지사항</Title>
        {user === "Ysh" ? (
          <div style={{ textAlign: "right" }}>
            <Link to="/WriteNotice">
              <button>글쓰기</button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <PostingList>
        {show
          ? Object.keys(notice.current).map((v, idx) => (
              <NoticeList
                order={notice.current.length - idx}
                title={notice.current[v].title}
                date={notice.current[v].date}
                content={notice.current[v].content}
              />
            ))
          : ""}
      </PostingList>
    </>
  );
}

const Title = styled.h1`
  font-size: 44px;
`;

const PostingList = styled.div`
  display: inline-block;
  align-items: center;
`;
