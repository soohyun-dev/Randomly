import Footer from 'Components/Footer'
import Loading from 'Components/Loading'
import Nav from 'Components/Nav'
import ReviewDetail from 'Components/Review/ReviewDetail'
import ReviewPosting from 'Components/Review/ReviewPosting'
import { selectIsModalOpen, themeSlice } from 'features/themeSlice'
import useReview from 'hooks/useReview'
import ErrorPage from 'Page/Error'
import { Suspense, useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import {
    ReviewAllSection,
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
    const [modalOpen, setModalOpen] = useState(false)
    const [showData, setShowData] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)
    const dispatch = useDispatch()
    const isModalOpen = useSelector(selectIsModalOpen)

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

    const showModal = (posting) => {
        setShowData(posting)
        setModalOpen(true)
        setIsFirstRender(false)
        dispatch(
            themeSlice.actions.setIsModalOpen({
                isModalOpen: true,
            })
        )
    }

    useEffect(() => {
        setSearchResult(reviews)
        if (isFirstRender) {
            // 페이지 초기 접속시 isModalOpen 값 초기화
            dispatch(
                themeSlice.actions.setIsModalOpen({
                    isModalOpen: false,
                })
            )
        }
    }, [reviews, modalOpen, dispatch, isFirstRender])

    return (
        <>
            <Nav />
            <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<Loading />}>
                    <ReviewAllSection props={isModalOpen}>
                        <ReviewSection>
                            <ReviewContent>
                                <ReviewTitleParagraph>이름으로 검색해보세요</ReviewTitleParagraph>
                                <ReviewTitleContent>
                                    나에 대한 평가 확인해보기
                                </ReviewTitleContent>{' '}
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
                                    key={searchResult[v].id}
                                    id={searchResult[v].id}
                                    memberName={searchResult[v].memberName}
                                    selfIntroAdvise={searchResult[v].selfIntroAdvise}
                                    answerAdvise={searchResult[v].answerAdvise}
                                    writerName={searchResult[v].writerName}
                                    date={searchResult[v].date}
                                    onClick={() => showModal(searchResult[v])}
                                />
                            ))}
                            {modalOpen && (
                                <ReviewDetail setModalOpen={setModalOpen} data={showData} />
                            )}
                        </ReviewPostingListSection>
                    </ReviewAllSection>
                </Suspense>
            </ErrorBoundary>
            <Footer />
        </>
    )
}
