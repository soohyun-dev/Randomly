import styled from "styled-components";

export default function Comment({ id, commentWriter, content, date, time }) {
  return (
    <>
      <CommentBox>
        <div>
          <p>{content}</p>
        </div>
        <WriterBox>
          <p>{commentWriter}</p>
        </WriterBox>
        <TimeBox>
          <DateText>{date} </DateText>
        </TimeBox>
      </CommentBox>
    </>
  );
}

const CommentBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  margin: 3em 0;
`;

const WriterBox = styled.div`
  font-size: 13px;
`;

const TimeBox = styled.div`
  display: flex;
  font-size: 12px;
  color: #777;
  line-height: 24px;
`;

const DateText = styled.p`
  margin-right: 0.5em;
`;
