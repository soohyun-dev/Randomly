import { useState, useEffect, useRef } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import { fireStore } from "../../firebase";
import { QAInfo } from "./types";
import QAList from "./QAList";

export default function QA() {
  const [show, setShow] = useState<boolean>(false);
  const QA = useRef<QAInfo[]>([]);
  const QAInfo = collection(fireStore, "QA");

  const getQA = async () => {
    const QAData = await getDocs(QAInfo);
    QA.current = QAData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
  };

  console.log(QA);

  useEffect(() => {
    getQA();
  }, [show]);
  return (
    <>
      <div>
        <Title>Q&A</Title>
      </div>
      <WriteBox>
        <WriteBtn>글쓰기</WriteBtn>
      </WriteBox>
      <QAListBox>
        {Object.keys(QA.current).map((v, idx) => (
          <QAList
            order={QA.current.length - idx}
            title={QA.current[v].title}
            date={QA.current[v].date}
            content={QA.current[v].content}
            user={QA.current[v].user}
          />
        ))}
      </QAListBox>
    </>
  );
}

const Title = styled.h1`
  font-size: 44px;
`;

const QAListBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5em 2em;
  margin: 5em 0;
`;

const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
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
