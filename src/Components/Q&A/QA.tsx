import { useState, useEffect, useRef } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import { fireStore } from "../../firebase";
import { QAInfo } from "./types";
import QAList from "./QAList";
import { Link } from "react-router-dom";

export default function QA() {
  const [show, setShow] = useState<boolean>(false);
  const QA = useRef<QAInfo[]>([]);
  const QAInfo = collection(fireStore, "QA");

  const getQA = async () => {
    const QAData = await getDocs(query(QAInfo, orderBy("time", "desc")));
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
      <TitleDiv>
        <Title>Q&A</Title>
      </TitleDiv>
      <WriteBox>
        <Link to="/WriteQA">
          <WriteBtn>글쓰기</WriteBtn>
        </Link>
      </WriteBox>
      <QAListBox>
        {Object.keys(QA.current).map((v, idx) => (
          <QAList
            order={QA.current.length - idx}
            title={QA.current[v].title}
            date={QA.current[v].date}
            content={QA.current[v].content}
            qaWriter={QA.current[v].qaWriter}
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
  gap: 5em 4em;
  margin: 5em 0;
`;

const TitleDiv = styled.div`
  width: 90%;
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
