import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { Link } from 'react-router-dom'
import { useNotice } from 'hooks'
import NoticeList from '../NoticeList'
import { PostingList, Title, WriteBtn } from './Notice.styled'

export default function Notice() {
    const user = useSelector(selectUser)
    const { data, isLoading } = useNotice()
    const notice = data

    return (
        <>
            <div>
                <Title>공지사항</Title>
                {user === 'Ysh' ? (
                    <div style={{ textAlign: 'right' }}>
                        <Link to="/WriteNotice">
                            <WriteBtn>글쓰기</WriteBtn>
                        </Link>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <PostingList>
                {!isLoading &&
                    Object.keys(notice).map((v, idx) => (
                        <NoticeList
                            order={notice.length - idx}
                            title={notice[v].title}
                            date={notice[v].date}
                            content={notice[v].content}
                        />
                    ))}
            </PostingList>
        </>
    )
}
