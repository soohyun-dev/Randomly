import styled from "styled-components";

export default function Announcement() {
  return (
    <>
      <div>
        <Title>공지사항</Title>
      </div>
      <PostingList></PostingList>
    </>
  );
}

const Title = styled.h1`
  font-size: 44px;
`;

const PostingList = styled.div`
  display: inline-block;
`;
