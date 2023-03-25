import { useState } from 'react'
import { ReviewSection, ReviewTitle } from './Review.styled'

export default function Review() {
    const [kakaoId, setKakaoId] = useState('')
    const [memberName, setMemberName] = useState('')
    const [selfIntroAdvise, setSelfIntroAdvise] = useState('')
    const [answerAdivse, setAnswerAdivse] = useState('')

    const submitHandler = () => {
        return null
    }

    return (
        <ReviewSection>
            <div>
                <ReviewTitle>팀원 리뷰</ReviewTitle>
                <div>
                    <input value="카카오톡 ID" />
                </div>
                <div>
                    <input value="팀원명" />
                </div>
                <div>
                    <textarea value="자기소개 Confirm" />
                </div>
                <div>
                    <textarea value="질문에 대한 Confirm" />
                </div>
                <div>
                    <button>보내기</button>
                </div>
            </div>
        </ReviewSection>
    )
}
