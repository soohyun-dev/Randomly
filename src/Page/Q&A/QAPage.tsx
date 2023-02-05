import Footer from "Components/Footer";
import Nav from "Components/Nav";
import Announcement from "Components/Q&A/Announcement";
import styled from "styled-components";

export default function QAPage() {
  return (
    <>
      <Nav />
      <QASection>
        <CatagoryDiv>
          <CatagoryButton>공지사항</CatagoryButton>
          <CatagoryButton>Q&A</CatagoryButton>
          <CatagoryButton>남길 말</CatagoryButton>
        </CatagoryDiv>
        <PostListDiv>
          <Announcement />
        </PostListDiv>
        <RightDiv></RightDiv>
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
  width: 30%;
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
  width: 40%;
  display: inline-block;
`;

const RightDiv = styled.div`
  width: 20%;
  display: inline-block;
`;
