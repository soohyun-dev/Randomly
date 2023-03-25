import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import useReview from 'hooks/useReview'
import { ReviewSection } from './Review.styled'

export default function Review() {
    const { data: reviews, isLoading: isReviewLoading } = useReview()
    console.log(reviews)
    return (
        <>
            <Nav />
            <ReviewSection>
                <div>
                    <p>내 평가 찾기</p>
                    <input placeholder="이름" />
                </div>
                <div>{!isReviewLoading && Object.keys(reviews).map((v) => <div>{v}</div>)}</div>
            </ReviewSection>
            <Footer />
        </>
    )
}
