import { Link } from 'react-router-dom'
import { ContentBox, PostingBox, TitleBox, WriterBox, WriteText } from './QAList.styled'

export default function QAList({ props, order }) {
    const { id, title, date, content, qaWriter } = props
    return (
        <Link
            to={`/QAPosting/${order}`}
            state={{
                id,
                title,
                date,
                content,
                qaWriter,
                idx: order,
            }}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            <PostingBox>
                <TitleBox>
                    <p>{title}</p>
                </TitleBox>
                <ContentBox>{content}</ContentBox>
                <WriterBox>
                    <WriteText>{qaWriter}</WriteText>
                    <WriteText>{date.slice(0, 10)}</WriteText>
                </WriterBox>
            </PostingBox>
        </Link>
    )
}
