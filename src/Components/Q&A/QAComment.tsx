import { useState, useEffect, useRef } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireStore } from "../../firebase";
import Comment from "./Comment";
import { QACommentInfo } from "./types";
import styled from "styled-components";

export default function QAComment({ id }) {
  const [show, setShow] = useState<boolean>(false);
  const commentInfo = useRef<QACommentInfo[]>([]);
  const QACommentInfo = collection(fireStore, `QA/${id}/comment`);

  const getQAComment = async () => {
    const QACommentData = await getDocs(
      query(QACommentInfo, orderBy("time", "asc"))
    );
    commentInfo.current = QACommentData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
  };

  useEffect(() => {
    getQAComment();
  }, [show]);
  return (
    <>
      <CommentSection>
        {Object.keys(commentInfo.current).map((v, idx) => (
          <Comment
            id={commentInfo.current[v].id}
            commentWriter={commentInfo.current[v].commentWriter}
            content={commentInfo.current[v].content}
            date={commentInfo.current[v].date}
            time={commentInfo.current[v].time}
          />
        ))}
      </CommentSection>
    </>
  );
}

const CommentSection = styled.section`
  display: inline-block;
  width: 60%;
`;
