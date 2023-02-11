import styled from "styled-components";

export default function Comment({ id, commentWriter, content, date, time }) {
  const writeTime = time.slice(11, 19);

  return (
    <>
      <CommentBox>
        <div>
          <p>{content}</p>
        </div>
        <div>
          <p>{commentWriter}</p>
        </div>
        <TimeBox>
          <DateText>{date} </DateText>
          <p>{writeTime}</p>
        </TimeBox>
      </CommentBox>
    </>
  );
}

const CommentBox = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr 1fr;
  margin: 3em 0;
`;

const TimeBox = styled.div`
  display: flex;
  font-size: 14px;
  color: #777;
  line-height: 24px;
`;

const DateText = styled.p`
  margin-right: 0.5em;
`;
