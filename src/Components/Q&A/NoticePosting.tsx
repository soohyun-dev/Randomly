import styled from "styled-components";

export default function NoticePosting({ order, title, date, content }) {
  return (
    <>
      <PostingBox>
        <IdxDiv>
          <p>{order}</p>
        </IdxDiv>
        <TitleDiv>
          <p>{title}</p>
        </TitleDiv>
        <DateDiv>
          <p>{date}</p>
        </DateDiv>
      </PostingBox>
    </>
  );
}

const PostingBox = styled.div`
  display: flex;
  margin: 3em 2em;
  background-color: #f5f5f5;
  width: 50em;
  height: 4em;
  border-radius: 15px;
  cursor: pointer;
  align-items: center;
  &:hover {
    box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }
`;

const IdxDiv = styled.div`
  width: 15%;
`;

const TitleDiv = styled.div`
  text-align: left;
  width: 65%;
`;

const DateDiv = styled.div`
  width: 30%;
`;
