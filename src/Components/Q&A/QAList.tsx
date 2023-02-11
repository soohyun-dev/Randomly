import styled from "styled-components";

export default function QAList({ order, title, date, content, user }) {
  console.log(order, title, date, content, user);
  return (
    <>
      <PostingBox>
        <TitleBox>
          <p>{title}</p>
        </TitleBox>
        <ContentBox>{content}</ContentBox>
        <div>{date}</div>
      </PostingBox>
    </>
  );
}

const PostingBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: left;
  width: 16em;
  height: 10em;
  padding: 0 1em;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }
  &:visited {
    text-decoration: none;
    color: black;
  }
`;

const TitleBox = styled.div`
  margin-top: 1em;
  height: 2em;
`;

const ContentBox = styled.div`
  align-content: center;
  height: 5em;
  gap: 2em 0;
`;
