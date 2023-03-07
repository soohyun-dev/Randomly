import { useState, useEffect, useRef } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { fireStore } from '../../../firebase'
import { QAInfo } from '../types'
import QAList from '../QAList'
import { QAListBox, Title, TitleDiv, WriteBox, WriteBtn } from './styles'

export default function QA() {
    const [show, setShow] = useState<boolean>(false)
    const qa = useRef<QAInfo[]>([])
    const QAInfos = collection(fireStore, 'QA')
    const user = useSelector(selectUser)

    const getQA = async () => {
        const QAData = await getDocs(query(QAInfos, orderBy('time', 'desc')))
        qa.current = QAData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
        setShow(true)
    }

    useEffect(() => {
        getQA()
    }, [show])
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
                {Object.keys(qa.current).map((v, idx) => (
                    <QAList
                        id={qa.current[v].id}
                        order={qa.current.length - idx}
                        title={qa.current[v].title}
                        date={qa.current[v].date}
                        content={qa.current[v].content}
                        qaWriter={qa.current[v].qaWriter}
                    />
                ))}
            </QAListBox>
        </>
    )
}
