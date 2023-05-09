import { CommentBox, DateText, TimeBox, WriterBox } from './Comment.styled'

export default function Comment({ props }) {
    const { id, commentWriter, content, date, time } = props

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
