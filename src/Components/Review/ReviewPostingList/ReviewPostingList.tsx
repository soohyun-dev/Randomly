import Loading from 'Components/Loading'
import ReviewPosting from 'Components/Review/ReviewPosting'
import { selectIsModalOpen, themeSlice } from 'features/themeSlice'
import useReview from 'hooks/useReview'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReviewDetail from '../ReviewDetail'
import { ReviewPostingListSection } from './ReviewPostingList.styled'

export default function ReviewPostingList({ nowPage, searchTarget, listSize }) {
    const { data: reviews, isLoading: isReviewLoading } = useReview()
    const [searchResult, setSearchResult] = useState(reviews)
    const [modalOpen, setModalOpen] = useState(false)
    const [showData, setShowData] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)
    const dispatch = useDispatch()
    const isModalOpen = useSelector(selectIsModalOpen)
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

        const searchHandler = () => {
            if (searchTarget !== '') {
                const orderIdx = Object.keys(reviews).filter((v) => {
                    return reviews[v].memberName.includes(searchTarget)
                })
                const result = orderIdx.map((v) => {
                    return reviews[v]
                })

                setSearchResult(result)
            }
        }

        if (isFirstRender) {
            // 페이지 초기 접속시 isModalOpen 값 초기화
            dispatch(
                themeSlice.actions.setIsModalOpen({
                    isModalOpen: false,
                })
            )
        }

        searchHandler()
    }, [reviews, modalOpen, dispatch, isFirstRender, searchTarget])

    console.log(nowPage, listSize)

    return (
        <>
            {modalOpen && <ReviewDetail setModalOpen={setModalOpen} data={showData} />}
            {isReviewLoading ? (
                <Loading />
            ) : (
                <ReviewPostingListSection props={isModalOpen}>
                    {Object.keys(searchResult).map((v, idx) =>
                        idx < nowPage * listSize && idx >= (nowPage - 1) * listSize ? (
                            <ReviewPosting
                                key={searchResult[v].id}
                                props={searchResult[v]}
                                onClick={() => showModal(searchResult[v])}
                            />
                        ) : (
                            ''
                        )
                    )}
                </ReviewPostingListSection>
            )}
        </>
    )
}
