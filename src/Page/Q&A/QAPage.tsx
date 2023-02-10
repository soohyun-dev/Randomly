import Footer from "Components/Footer";
import Memo from "Components/Memo/Memo";
import Nav from "Components/Nav";
import Notice from "Components/Notice/Notice";
import QA from "Components/Q&A/QA";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function QAPage() {
  const [nowPage, setNowPage] = useState("공지사항");
  const Catagory = ["공지사항", "Q&A", "남길말"];

  const changeBtnColor = () => {
    Catagory.map((v) => {
      const items = document.getElementById(v);
      if (items !== null) {
        if (v === nowPage) {
          items.style.backgroundColor = "#bdbdbd";
        } else {
          items.style.backgroundColor = "#f5f5f5";
        }
      }
    });
  };

  const showComponent = () => {
    switch (nowPage) {
      case "공지사항":
        return <Notice />;
      case "Q&A":
        return <QA />;
      case "남길말":
        return <Memo />;
    }
  };

  useEffect(() => {
    changeBtnColor();
  }, [nowPage]);

  return (
    <>
      <Nav />

      <QASection>
        <div>
          <CatagoryDiv>
            <CatagoryButton
              id="공지사항"
              onClick={(e) => {
                setNowPage("공지사항");
              }}
            >
              공지사항
            </CatagoryButton>

            {/* <CatagoryButton
              id="Q&A"
              onClick={(e) => {
                setNowPage("Q&A");
              }}
            >
              Q&A
            </CatagoryButton>
            <CatagoryButton
              id="남길말"
              onClick={(e) => {
                setNowPage("남길말");
              }}
            >
              남길 말
            </CatagoryButton> */}
          </CatagoryDiv>
          <PostListDiv>{showComponent()}</PostListDiv>
        </div>
      </QASection>
      <Footer />
    </>
  );
}

const QASection = styled.section`
  text-align: left;
  margin: 7em 0;
`;

const CatagoryDiv = styled.div`
  width: 20%;
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
    opacity: 90%;
  }
`;

const PostListDiv = styled.div`
  text-align: center;
  vertical-align: top;
  width: 60%;
  display: inline-block;
`;
