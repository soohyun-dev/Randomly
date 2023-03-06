import { selectUser } from 'features/userSlice'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDateTime } from 'Utils/getTime'
import { fireStore } from '../../../firebase'
import { NewData } from './types'

export default function WriteComment({ id }) {
    const [comment, setComment] = useState<string>('')
    const user = useSelector(selectUser)
    const QAInfo = collection(fireStore, `QA/${id}/comment`)

    const submitComment = async () => {
        const newData: NewData = {}
        newData.content = comment
        newData.time = new Date()
        newData.date = getDateTime()
        newData.commentWriter = user
        await addDoc(QAInfo, newData)
        alert('댓글 작성이 완료되었습니다.')
        window.location.reload()
    }
    return (
        <section>
            <div>
                <input
                    value={comment}
                    placeholder="댓글을 입력해 주세요"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={submitComment}>댓글 작성</button>
            </div>
        </section>
    )
}
