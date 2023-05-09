import { Link } from 'react-router-dom'
import { DateDiv, IdxDiv, PostingBox, TitleDiv } from './NoticeList.styled'

export default function NoticeList({ order, props }) {
    const { title, date, content } = props

    return (
        <Link
            to={`/NoticePosting/${order}`}
            state={{ title, date, content }}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            <PostingBox>
                <IdxDiv>
                    <p>{order}</p>
                </IdxDiv>
                <TitleDiv>
                    <p>{title}</p>
                </TitleDiv>
                <DateDiv>
                    <p>{date.slice(0, 10)}</p>
                </DateDiv>
            </PostingBox>
        </Link>
    )
}
