import Footer from 'Components/Footer'
import Loading from 'Components/Loading'
import Nav from 'Components/Nav'
import ReviewPosting from 'Components/Review/ReviewPosting'
import useReview from 'hooks/useReview'
import ErrorPage from 'Page/Error'
import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
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
    const [searchWord, setSearchWord] = useState('')
    const [searchResult, setSearchResult] = useState(reviews)

    const searchHandler = () => {
        const orderIdx = Object.keys(reviews).filter((v) => {
            return reviews[v].memberName === searchWord
        })
        const result = orderIdx.map((v) => {
            return reviews[v]
        })

        setSearchResult(result)
    }

    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            searchHandler()
        }
    }

    useEffect(() => {
        setSearchResult(reviews)
    }, [reviews])

    return (
        <>
            <Nav />
            <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<Loading />}>
                    <ReviewSection>
                        <ReviewContent>
                            <ReviewTitleParagraph>이름으로 검색해보세요</ReviewTitleParagraph>
                            <ReviewTitleContent>나에 대한 평가 확인해보기</ReviewTitleContent>
                            <ReviewSearchInput
                                onChange={(e) => setSearchWord(e.target.value)}
                                value={searchWord}
                                placeholder="이름을 입력하세요."
                                onKeyDown={enterSubmit}
                            />
                            <ReviewSearchButton onClick={() => searchHandler()}>
                                검색
                            </ReviewSearchButton>
                        </ReviewContent>
                    </ReviewSection>
                    <ReviewPostingListSection>
                        {Object.keys(searchResult).map((v) => (
                            <ReviewPosting
                                id={searchResult[v].idx}
                                memberName={searchResult[v].memberName}
                                selfIntroAdvise={searchResult[v].selfIntroAdvise}
                                answerAdvise={searchResult[v].answerAdvise}
                                writerName={searchResult[v].writerName}
                                date={searchResult[v].date}
                            />
                        ))}
                    </ReviewPostingListSection>
                </Suspense>
            </ErrorBoundary>
            <Footer />
        </>
    )
}
