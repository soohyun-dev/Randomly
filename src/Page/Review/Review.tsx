import Footer from 'Components/Footer'
import Loading from 'Components/Loading'
import Nav from 'Components/Nav'
import ReviewPagination from 'Components/Pagination/ReviewPagination'
import ReviewPostingList from 'Components/Review/ReviewPostingList'
import { selectIsModalOpen } from 'features/themeSlice'
import useReview from 'hooks/useReview'
import ErrorPage from 'Page/Error'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSelector } from 'react-redux'
import {
    ReviewAllSection,
    ReviewCatagoryBox,
    ReviewCatagorySection,
    ReviewContent,
    ReviewSearchButton,
    ReviewSearchInput,
    ReviewSection,
    ReviewTitleContent,
    ReviewTitleParagraph,
} from './Review.styled'

export default function Review() {
    const { data: reviews, isLoading: isReviewLoading } = useReview()
    const [searchWord, setSearchWord] = useState('')
    const [searchTarget, setSearchTarget] = useState('')
    const isModalOpen = useSelector(selectIsModalOpen)
    const [listSize, setListSize] = useState(8)

    const searchHandler = () => {
        setSearchTarget(searchWord)
    }

    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            searchHandler()
            alert('검색되었습니다.')
        }
    }

    return (
        <>
            <Nav isModalOpen={isModalOpen} />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <ReviewAllSection>
                    <ReviewSection props={isModalOpen}>
                        <ReviewContent>
                            <ReviewTitleParagraph>이름으로 검색해보세요</ReviewTitleParagraph>
                            <ReviewTitleContent>나에 대한 평가 확인해보기</ReviewTitleContent>{' '}
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
                    <ReviewCatagorySection>
                        <ReviewCatagoryBox>
                            <select onChange={(e) => setListSize(+e.target.value)}>
                                <option value={8}>8개</option>
                                <option value={16}>16개</option>
                            </select>
                        </ReviewCatagoryBox>
                    </ReviewCatagorySection>
                    <Suspense fallback={<Loading />}>
                        <ReviewPostingList searchTarget={searchTarget} listSize={listSize} />
                    </Suspense>
                </ReviewAllSection>
                {!isReviewLoading && (
                    <ReviewPagination reviewLength={reviews.length} listSize={listSize} />
                )}
            </ErrorBoundary>
            <Footer />
        </>
    )
}
