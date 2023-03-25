import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { getDateTime } from 'utils/GetTime'
import { fireStore } from '../../firebase'
import { ReviewFormSection, ReviewFormTitle } from './ReviewForm.styled'

interface NewData {
    idx?: number
    memberName?: string
    writerName?: string
    selfIntroAdvise?: string
    answerAdivse?: string
    time?: Date
    date?: string
}

export default function ReviewForm() {
    const [memberName, setMemberName] = useState('')
    const [selfIntroAdvise, setSelfIntroAdvise] = useState('')
    const [answerAdivse, setAnswerAdivse] = useState('')
    const [writerName, setWriterName] = useState('익명')

    const reviewDatabaseInfo = collection(fireStore, 'review')

    /**
     *  팀원 평가 추가
     *
     * @param {}
     */
    const addReview = async () => {
        const newData: NewData = {}
        let docId = ''
        newData.memberName = memberName
        newData.writerName = writerName
        newData.selfIntroAdvise = selfIntroAdvise
        newData.answerAdivse = answerAdivse
        newData.date = getDateTime()
        newData.time = new Date()

        await addDoc(reviewDatabaseInfo, newData).then((doc) => {
            docId = doc.id
        })
        alert('리뷰가 추가되었습니다.')
        setMemberName('')
        setSelfIntroAdvise('')
        setAnswerAdivse('')
        setWriterName('')
    }

    const submitHandler = () => {
        if (window.confirm('리뷰를 추가하시겠습니까?')) {
            addReview()
        }
        return null
    }

    return (
        <ReviewFormSection>
            <div>
                <ReviewFormTitle>팀원 리뷰</ReviewFormTitle>
                <div>
                    <input
                        onChange={(e) => setMemberName(e.target.value)}
                        value={memberName}
                        placeholder="평가할 팀원명"
                    />
                </div>
                <div>
                    <textarea
                        onChange={(e) => setSelfIntroAdvise(e.target.value)}
                        value={selfIntroAdvise}
                        placeholder="자기소개 Confirm"
                    />
                </div>
                <div>
                    <textarea
                        onChange={(e) => setAnswerAdivse(e.target.value)}
                        value={answerAdivse}
                        placeholder="질문 답변 Confirm"
                    />
                </div>
                <div>
                    <input
                        onChange={(e) => setWriterName(e.target.value)}
                        value={writerName}
                        placeholder="평가자"
                    />
                </div>
                <div>
                    <button onClick={() => submitHandler()}>보내기</button>
                </div>
            </div>
        </ReviewFormSection>
    )
}
