import Footer from "Components/Footer";
import Nav from "Components/Nav";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function QAPosting() {
  const location = useLocation();
  const { title, date, content, user, idx } = location.state;

  return (
    <>
      <Nav />
      <PostingSection>
        <PostingDiv>
          <TitleDiv>
            <p>{title}</p>
          </TitleDiv>
          <WriterDiv>
            <DateText>{date}</DateText>
            <WriterText>{user}</WriterText>
          </WriterDiv>
          <DivLine />
          <ContentDiv>
            <p>{content}</p>
          </ContentDiv>
          <DivLine />
        </PostingDiv>
      </PostingSection>
      <Footer />
    </>
  );
}

const PostingSection = styled.div`
  text-align: center;
  margin: 5em;
`;

const PostingDiv = styled.div`
  display: inline-block;
  text-align: left;
  width: 60%;
`;
const TitleDiv = styled.div`
  margin: 1em 0;
  font-size: 24px;
`;

const WriterDiv = styled.div`
  display: flex;
`;

const DateText = styled.label`
  color: #777;
`;

const WriterText = styled.p`
  margin: 0em 2em;
  color: #777;
`;

const DivLine = styled.hr`
  background: #f5f5f5;
  height: 0.1em;
  border: 0;
`;

const ContentDiv = styled.div`
  margin: 3em 0;
  min-height: 30em;
`;
