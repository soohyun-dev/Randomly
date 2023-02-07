import Footer from "Components/Footer";
import Nav from "Components/Nav";
import { useLocation } from "react-router-dom";
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
        <div>
          <div>
            <h1>{title}</h1>
          </div>
        </div>

        <div>
          <div>
            <p>{date}</p>
          </div>
        </div>
        <div>
          <div>
            <p>{content}</p>
          </div>
        </div>
      </PostingSection>
      <Footer />
    </>
  );
}

const PostingSection = styled.section`
  text-align: center;
  margin: 10em 0;
`;
