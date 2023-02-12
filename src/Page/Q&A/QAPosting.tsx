import Footer from "Components/Footer";
import Nav from "Components/Nav";
import WriteComment from "Components/Q&A/WriteComment";
import { selectUser } from "features/userSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import QAComment from "../../Components/Q&A/QAComment";

export default function QAPosting() {
  const location = useLocation();
  const { id, title, date, content, qaWriter, idx } = location.state;
  const user = useSelector(selectUser);

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
            <WriterText>{qaWriter}</WriterText>
          </WriterDiv>
          <DivLine />
          <ContentDiv>
            <p>{content}</p>
          </ContentDiv>
          <DivLine />
        </PostingDiv>
        {user === null ? "" : <WriteComment id={id} />}
        <QAComment id={id} />
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
