import { useState, useEffect, useRef } from "react";
import { fireStore } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import NoticePosting from "./NoticePosting";
import { NoticeInfo } from "./types";

export default function Notice() {
  const [show, setShow] = useState(false);
  const notice = useRef<NoticeInfo[]>([]);
  const noticeInfo = collection(fireStore, "notice");

  const getNotice = async () => {
    const noticeData = await getDocs(query(noticeInfo, orderBy("time", "asc")));
    notice.current = noticeData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
  };
  getNotice();

  useEffect(() => {
    getNotice();
  }, [show]);

  return (
    <>
      <div>
        <Title>공지사항</Title>
      </div>
      <PostingList>
        {show
          ? Object.keys(notice.current).map((idx) => (
              <NoticePosting
                order={notice.current[idx].order}
                title={notice.current[idx].title}
                date={notice.current[idx].date}
                content={notice.current[idx].content}
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
