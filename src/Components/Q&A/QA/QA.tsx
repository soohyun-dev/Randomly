import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { useQA } from 'hooks'
import QAList from '../QAList'
import { QAListBox, Title, TitleDiv, WriteBox, WriteBtn } from './QA.styled'

export default function QA() {
    const user = useSelector(selectUser)
    const { data, isLoading } = useQA()
    const qa = data

    return (
        <>
            <TitleDiv>
                <Title>Q&A</Title>
            </TitleDiv>
            <WriteBox>
                {/* 로그인 유저 구분 */}
                {user === null ? (
                    ''
                ) : (
                    <Link to="/WriteQA">
                        <WriteBtn>글쓰기</WriteBtn>
                    </Link>
                )}
            </WriteBox>
            <QAListBox>
                {!isLoading &&
                    Object.keys(qa).map((v, idx) => (
                        <QAList props={qa[v]} order={qa.length - idx} />
                    ))}
            </QAListBox>
        </>
    )
}
