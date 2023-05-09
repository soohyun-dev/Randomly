import {
    AnswerAdviseContainer,
    AnswerAdviseParagraph,
    DateParagraph,
    IntreviewerNameParagraph,
    NameContainter,
    ReviewPostingButton,
    ReviewPostingContent,
    SelfIntroAdviseContainer,
    SelfIntroAdviseParagraph,
    WriterContainer,
} from './ReviewPosting.styled'

export default function ReviewPosting({ props, onClick }) {
    const { id, memberName, selfIntroAdvise, answerAdvise, writerName, date, password } = props
    const clickHandler = () => {
        onClick()
    }

    const formatText = (text) => {
        return text.length < 37 ? text : `${text.slice(0, 40)}...`
    }

    return (
        <ReviewPostingContent onClick={() => clickHandler()}>
            <NameContainter>
                <IntreviewerNameParagraph>👨‍💻 {memberName}</IntreviewerNameParagraph>
                <DateParagraph>{date.slice(0, 10)}</DateParagraph>
            </NameContainter>
            <SelfIntroAdviseContainer>
                <SelfIntroAdviseParagraph>자기소개에 대한 평가</SelfIntroAdviseParagraph>
                {formatText(selfIntroAdvise)}
            </SelfIntroAdviseContainer>
            <AnswerAdviseContainer>
                <AnswerAdviseParagraph>질문 답변에 대한 평가</AnswerAdviseParagraph>
                {formatText(answerAdvise)}
            </AnswerAdviseContainer>
            <WriterContainer>
                <p>평가자: {writerName}</p>
            </WriterContainer>
        </ReviewPostingContent>
    )
}
