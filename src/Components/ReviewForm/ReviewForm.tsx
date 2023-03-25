import { useState } from 'react'
import { ReviewFormSection, ReviewFormTitle } from './ReviewForm.styled'

export default function ReviewForm() {
    const [memberName, setMemberName] = useState('')
    const [selfIntroAdvise, setSelfIntroAdvise] = useState('')
    const [answerAdivse, setAnswerAdivse] = useState('')
    const [writerName, setWriterName] = useState('익명')

    const submitHandler = () => {
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
