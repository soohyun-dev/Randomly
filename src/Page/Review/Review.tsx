import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { ReviewSection } from './Review.styled'

export default function Review() {
    return (
        <>
            <Nav />
            <ReviewSection>
                <div>
                    <p>내 평가 찾기</p>
                    <input placeholder="이름" />
                </div>
            </ReviewSection>
            <Footer />
        </>
    )
}
