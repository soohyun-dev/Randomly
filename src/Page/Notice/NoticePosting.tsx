import Footer from "Components/Footer";
import Nav from "Components/Nav";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Posting } from "./types";

export default function NoticePosting() {
  const location = useLocation();
  const [title, date, content] = [
    location.state.title,
    location.state.date,
    location.state.content,
  ];

  return (
    <>
      <Nav />
      <PostingSection>
        <PostingDiv>
          <TitleDiv>
            <div>
              <h1>{title}</h1>
            </div>
          </TitleDiv>

          <DateDiv>
            <div>
              <DateText>{date}</DateText>
              <WriteText>운영진</WriteText>
            </div>
          </DateDiv>
          <DivLine />
          <ContentDiv>
            <div>
              <p>{content}</p>
            </div>
          </ContentDiv>
          <LinkDiv>
            <div>
              <Link
                to="/QAPage"
                style={{ textDecoration: "none", color: "black" }}
              >
                <LinkText>⬅️ 목록으로</LinkText>
              </Link>
            </div>
          </LinkDiv>
        </PostingDiv>
      </PostingSection>
      <Footer />
    </>
  );
}

const PostingSection = styled.section`
  text-align: center;
  margin-top: 6em;
`;

const PostingDiv = styled.div`
  display: inline-block;
  width: 70%;
`;
const TitleDiv = styled.div`
  margin: 1em 0;
  text-align: left;
`;

const DateDiv = styled.div`
  margin: 2em 0;
  text-align: left;
`;

const DateText = styled.label`
  color: #777;
`;

const DivLine = styled.hr`
background: #777
height: 1em;
`;

const WriteText = styled.label`
  margin: 0em 2em;
`;

const ContentDiv = styled.div`
  margin: 3em 0;
  text-align: left;
  min-height: 30em;
`;

const LinkDiv = styled.div`
  text-align: left;
`;

const LinkText = styled.p`
  text-decoration: underline;
`;
