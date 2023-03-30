import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { getDateTime } from 'utils/GetTime'
import { fireStore } from '../../../firebase'
import {
    ReviewAdviseTextArea,
    ReviewFormButton,
    ReviewFormButtonBox,
    ReviewFormSection,
    ReviewFormTitle,
    ReviewToBox,
    ReviewUserBox,
    ReviewUserInput,
} from './ReviewForm.styled'

interface NewData {
    idx?: number
    memberName?: string
    writerName?: string
    selfIntroAdvise?: string
    answerAdvise?: string
    time?: Date
    date?: string
}

export default function ReviewForm() {
    const [memberName, setMemberName] = useState('')
    const [selfIntroAdvise, setSelfIntroAdvise] = useState('')
    const [answerAdvise, setAnswerAdvise] = useState('')
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
        newData.answerAdvise = answerAdvise
        newData.date = getDateTime()
        newData.time = new Date()

        await addDoc(reviewDatabaseInfo, newData).then((doc) => {
            docId = doc.id
        })
        alert('리뷰가 추가되었습니다.')
        setMemberName('')
        setSelfIntroAdvise('')
        setAnswerAdvise('')
        setWriterName('익명')
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
                <ReviewUserBox>
                    <ReviewToBox>
                        <p>To</p>
                        <ReviewUserInput
                            onChange={(e) => setMemberName(e.target.value)}
                            value={memberName}
                            placeholder="평가할 팀원명"
                        />
                    </ReviewToBox>
                    <ReviewToBox>
                        <p>From</p>
                        <ReviewUserInput
                            onChange={(e) => setWriterName(e.target.value)}
                            value={writerName}
                            placeholder="평가자"
                        />
                    </ReviewToBox>
                </ReviewUserBox>
                <ReviewUserBox>
                    <div>
                        <p>자기소개 피드백</p>
                        <ReviewAdviseTextArea
                            onChange={(e) => setSelfIntroAdvise(e.target.value)}
                            value={selfIntroAdvise}
                            placeholder="자기소개 Confirm"
                        />
                    </div>
                    <div>
                        <p>질문 답변 피드백</p>
                        <ReviewAdviseTextArea
                            onChange={(e) => setAnswerAdvise(e.target.value)}
                            value={answerAdvise}
                            placeholder="질문 답변 Confirm"
                        />
                    </div>
                </ReviewUserBox>
                <ReviewFormButtonBox>
                    <ReviewFormButton onClick={() => submitHandler()}>피드백 제출</ReviewFormButton>
                </ReviewFormButtonBox>
            </div>
        </ReviewFormSection>
    )
}
