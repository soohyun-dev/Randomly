import { Suspense, useState, useEffect, useRef } from 'react'
import { collection, collectionGroup, getDocs, orderBy, query } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { Link } from 'react-router-dom'
import { NoticeInfo } from './types'
import { fireStore } from '../../../firebase'
import NoticeList from '../NoticeList'
import { PostingList, Title, WriteBtn } from './styles'

export default function Notice() {
    const comment = query(collectionGroup(fireStore, 'day'))
    const getComment = async () => {
        const querySnapshot = await getDocs(comment)
        querySnapshot.forEach((doc) => {
            console.log(2, doc.id, ' => ', doc.data())
        })
    }

    const [show, setShow] = useState(false)
    const notice = useRef<NoticeInfo[]>([])
    const noticeInfo = collection(fireStore, 'notice')
    const commentInfo = collectionGroup(fireStore, 'comment')
    const user = useSelector(selectUser)
    const getNotice = async () => {
        const noticeData = await getDocs(query(noticeInfo, orderBy('time', 'desc')))
        notice.current = noticeData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
        setShow(true)
    }

    useEffect(() => {
        getComment()
        getNotice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

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
                {Object.keys(notice.current).map((v, idx) => (
                    <NoticeList
                        order={notice.current.length - idx}
                        title={notice.current[v].title}
                        date={notice.current[v].date}
                        content={notice.current[v].content}
                    />
                ))}
            </PostingList>
        </>
    )
}
