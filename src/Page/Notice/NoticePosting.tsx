import Footer from "Components/Footer";
import Nav from "Components/Nav";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

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
  width: 60%;
`;
const TitleDiv = styled.div`
  margin: 1em 0;
  text-align: left;
  font-size: 24px;
`;

const DateDiv = styled.div`
  margin: 2em 0;
  text-align: left;
`;

const DateText = styled.label`
  color: #777;
`;

const DivLine = styled.hr`
  background: #f5f5f5;
  height: 0.1em;
  border: 0;
`;

const WriteText = styled.label`
  margin: 0em 2em;
  color: #777;
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
