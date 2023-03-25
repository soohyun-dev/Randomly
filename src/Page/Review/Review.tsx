import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import ReviewPosting from 'Components/Review/ReviewPosting'
import useReview from 'hooks/useReview'
import {
    ReviewContent,
    ReviewPostingListSection,
    ReviewSearchButton,
    ReviewSearchInput,
    ReviewSection,
    ReviewTitleContent,
    ReviewTitleParagraph,
} from './Review.styled'

export default function Review() {
    const { data: reviews, isLoading: isReviewLoading } = useReview()
    console.log(reviews)
    return (
        <>
            <Nav />
            <ReviewSection>
                <ReviewContent>
                    <ReviewTitleParagraph>이름으로 검색해보세요</ReviewTitleParagraph>
                    <ReviewTitleContent>나에 대한 평가 확인해보기</ReviewTitleContent>
                    <ReviewSearchInput placeholder="이름을 입력하세요." />
                    <ReviewSearchButton>검색</ReviewSearchButton>
                </ReviewContent>
            </ReviewSection>
            <ReviewPostingListSection>
                {!isReviewLoading &&
                    Object.keys(reviews).map((v) => (
                        <ReviewPosting
                            id={reviews[v].idx}
                            memberName={reviews[v].memberName}
                            selfIntroAdvise={reviews[v].selfIntroAdvise}
                            answerAdvise={reviews[v].answerAdvise}
                            writerName={reviews[v].writerName}
                            date={reviews[v].date}
                        />
                    ))}
            </ReviewPostingListSection>
            <Footer />
        </>
    )
}
