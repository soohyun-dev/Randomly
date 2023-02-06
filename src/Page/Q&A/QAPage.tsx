import Footer from "Components/Footer";
import Nav from "Components/Nav";
import Notice from "Components/Notice/Notice";
import QA from "Components/Q&A/QA";
import { useState } from "react";
import styled from "styled-components";

export default function QAPage() {
  const [nowPage, setNowPage] = useState("공지사항");

  const showComponent = () => {
    switch (nowPage) {
      case "공지사항":
        return <Notice />;
      case "Q&A":
        return <QA />;
    }
  };

  return (
    <>
      <Nav />
      <QASection>
        <CatagoryDiv>
          <CatagoryButton onClick={(e) => setNowPage("공지사항")}>
            공지사항
          </CatagoryButton>
          <CatagoryButton onClick={(e) => setNowPage("Q&A")}>
            Q&A
          </CatagoryButton>
          <CatagoryButton onClick={(e) => setNowPage("남길말")}>
            남길 말
          </CatagoryButton>
        </CatagoryDiv>
        <PostListDiv>{showComponent()}</PostListDiv>
      </QASection>
      <Footer />
    </>
  );
}

const QASection = styled.section`
  text-align: center;
  margin: 7em 0;
`;

const CatagoryDiv = styled.div`
  width: 15%;
  display: inline-block;
`;

const CatagoryButton = styled.button`
  display: block;
  margin: 3em 3em;
  padding: 1em 2em;
  border: none;
  border-radius: 15px;
  font-weight: 550;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  cursor: pointer;
  &:hover {
    font-weight: 600;
    opacity: 70%;
    transition: 0.3s;
  }
`;

const PostListDiv = styled.div`
  vertical-align: top;
  width: 80%;
  display: inline-block;
`;
