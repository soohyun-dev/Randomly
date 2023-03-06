import { useState, useEffect, useRef } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { fireStore } from '../../../firebase'
import Comment from '../Comment'
import { QACommentInfo } from '../types'
import { CommentSection } from './styles'

export default function QAComment({ id }) {
    const [show, setShow] = useState<boolean>(false)
    const commentInfo = useRef<QACommentInfo[]>([])
    const QACommentInfos = collection(fireStore, `QA/${id}/comment`)

    const getQAComment = async () => {
        const QACommentData = await getDocs(query(QACommentInfos, orderBy('time', 'asc')))
        commentInfo.current = QACommentData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
        setShow(true)
    }

    useEffect(() => {
        getQAComment()
    }, [show])
    return (
        <CommentSection>
            {Object.keys(commentInfo.current).map((v) => (
                <Comment
                    id={commentInfo.current[v].id}
                    commentWriter={commentInfo.current[v].commentWriter}
                    content={commentInfo.current[v].content}
                    date={commentInfo.current[v].date}
                    time={commentInfo.current[v].time}
                />
            ))}
        </CommentSection>
    )
}
