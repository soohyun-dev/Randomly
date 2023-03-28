import {
    CloseButtonBox,
    ReviewDetailAdvise2Box,
    ReviewDetailAdviseBox,
    ReviewDetailCloseButton,
    ReviewDetailDateBox,
    ReviewDetailNameBox,
    ReviewDetailParagraph,
    ReviewDetailSection,
    ReviewDetailWriterBox,
} from './ReviewDetail.syled'

export default function ReviewDetail({ setModalOpen, data }) {
    const { memberName, selfIntroAdvise, answerAdvise, writerName, date } = data

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <ReviewDetailSection>
            <CloseButtonBox>
                <ReviewDetailCloseButton onClick={closeModal}>X</ReviewDetailCloseButton>
            </CloseButtonBox>
            <ReviewDetailNameBox>
                <p>{memberName}</p>
            </ReviewDetailNameBox>
            <ReviewDetailDateBox>
                <p>{date}</p>
            </ReviewDetailDateBox>
            <ReviewDetailAdviseBox>
                <ReviewDetailParagraph>자기소개에 대한 피드백</ReviewDetailParagraph>
                <div>
                    {selfIntroAdvise.split('\n').map((v) => {
                        return v === '' ? <br /> : <p>{v}</p>
                    })}
                </div>
            </ReviewDetailAdviseBox>
            <ReviewDetailAdvise2Box>
                <ReviewDetailParagraph>질문에 대한 피드백</ReviewDetailParagraph>
                <div>
                    {answerAdvise.split('\n').map((v) => {
                        return v === '' ? <br /> : <p>{v}</p>
                    })}
                </div>
            </ReviewDetailAdvise2Box>
            <ReviewDetailWriterBox>
                <p>{writerName}</p>
            </ReviewDetailWriterBox>
        </ReviewDetailSection>
    )
}
