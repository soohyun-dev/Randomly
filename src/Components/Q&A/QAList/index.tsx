import { Link } from 'react-router-dom'
import { ContentBox, PostingBox, TitleBox, WriterBox, WriteText } from './styles'

export default function QAList({ id, order, title, date, content, qaWriter }) {
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
