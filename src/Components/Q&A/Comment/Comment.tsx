import { CommentBox, DateText, TimeBox, WriterBox } from './Comment.styled'

export default function Comment({ id, commentWriter, content, date, time }) {
    return (
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
    )
}
