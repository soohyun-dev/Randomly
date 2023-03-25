import {
    AnswerAdviseContainer,
    AnswerAdviseParagraph,
    DateParagraph,
    IntreviewerNameParagraph,
    NameContainter,
    ReviewPostingContent,
    SelfIntroAdviseContainer,
    SelfIntroAdviseParagraph,
    WriterContainer,
} from './ReviewPosting.styled'

export default function ReviewPosting({
    id,
    memberName,
    selfIntroAdvise,
    answerAdvise,
    writerName,
    date,
}) {
    return (
        <ReviewPostingContent>
            <NameContainter>
                <IntreviewerNameParagraph>👨‍💻 {memberName}</IntreviewerNameParagraph>
                <DateParagraph>{date.slice(0, 10)}</DateParagraph>
            </NameContainter>
            <SelfIntroAdviseContainer>
                <SelfIntroAdviseParagraph>자기소개에 대한 평가</SelfIntroAdviseParagraph>
                {`${selfIntroAdvise.slice(0, 50)} ...`}
            </SelfIntroAdviseContainer>
            <AnswerAdviseContainer>
                <AnswerAdviseParagraph>질문 답변에 대한 평가</AnswerAdviseParagraph>
                {`${answerAdvise.slice(0, 50)} ...`}
            </AnswerAdviseContainer>
            <WriterContainer>
                <p>평가자: {writerName}</p>
            </WriterContainer>
        </ReviewPostingContent>
    )
}
