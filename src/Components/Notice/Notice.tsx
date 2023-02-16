import { useState, useEffect, useRef, Suspense } from "react";
import { fireStore } from "../../firebase";
import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import styled from "styled-components";
import { NoticeInfo } from "./types";
import { useSelector } from "react-redux";
import { selectUser } from "Features/userSlice";
import { Link } from "react-router-dom";
import NoticeList from "./NoticeList";

export default function Notice() {
  const comment = query(collectionGroup(fireStore, "day"));
  const getComment = async () => {
    const querySnapshot = await getDocs(comment);
    querySnapshot.forEach((doc) => {
      console.log(2, doc.id, " => ", doc.data());
    });
  };

  const [show, setShow] = useState(false);
  const notice = useRef<NoticeInfo[]>([]);
  const noticeInfo = collection(fireStore, "notice");
  const commentInfo = collectionGroup(fireStore, "comment");
  console.log(commentInfo);
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
    getComment();
    getNotice();
  }, [show]);

  return (
    <>
      <div>
        <Title>공지사항</Title>
        {user === "Ysh" ? (
          <div style={{ textAlign: "right" }}>
            <Link to="/WriteNotice">
              <WriteBtn>글쓰기</WriteBtn>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <PostingList>
        {Object.keys(notice.current).map((v, idx) => (
          <NoticeList
            order={notice.current.length - idx}
            title={notice.current[v].title}
            date={notice.current[v].date}
            content={notice.current[v].content}
          />
        ))}
      </PostingList>
    </>
  );
}
const Sample = styled.p`
  font-size: 59px;
`;

const Title = styled.h1`
  font-size: 44px;
`;

const PostingList = styled.div`
  display: inline-block;
  align-items: center;
`;

const WriteBtn = styled.button`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  width: 5em;
  height: 2.5em;
  border-radius: 10px;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
`;
