import { selectIsModalOpen, themeSlice } from 'features/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
    CloseButtonBox,
    DivideLine,
    ReviewDetailAdvise2Box,
    ReviewDetailAdviseBox,
    ReviewDetailBox,
    ReviewDetailCloseButton,
    ReviewDetailDateBox,
    ReviewDetailNameBox,
    ReviewDetailParagraph,
    ReviewDetailSection,
    ReviewDetailWriterBox,
} from './ReviewDetail.syled'

export default function ReviewDetail({ setModalOpen, data }) {
    const dispatch = useDispatch()
    const { memberName, selfIntroAdvise, answerAdvise, writerName, date } = data
    const reviewContainer = useRef(document.body)
    const isDetailBox = useRef(null)
    const isModalOpen = useSelector(selectIsModalOpen)
    const [isFirstRender, setIsFirstRender] = useState(true)

    const closeModal = () => {
        setModalOpen(false)
        dispatch(
            themeSlice.actions.setIsModalOpen({
                isModalOpen: false,
            })
        )
    }

    // 모달 창 열렸을 시, 외부 스크롤 차단
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    useEffect(() => {
        const modalCloseHandler = ({ target }) => {
            if (
                isModalOpen &&
                reviewContainer.current.contains(target) &&
                !isDetailBox.current.contains(target) &&
                !isFirstRender
            ) {
                setModalOpen(false)
                dispatch(
                    themeSlice.actions.setIsModalOpen({
                        isModalOpen: false,
                    })
                )
            }
            setIsFirstRender(false)
        }

        window.addEventListener('click', modalCloseHandler)
        return () => {
            window.removeEventListener('click', modalCloseHandler)
        }
    }, [isFirstRender, dispatch, isModalOpen, setModalOpen])

    return (
        <ReviewDetailSection ref={isDetailBox}>
            <ReviewDetailBox>
                <CloseButtonBox>
                    <ReviewDetailCloseButton onClick={closeModal}>X</ReviewDetailCloseButton>
                </CloseButtonBox>
                <ReviewDetailNameBox>
                    <p>To.{memberName}</p>
                </ReviewDetailNameBox>
                <ReviewDetailDateBox>
                    <p>{date.slice(0, 10)}</p>
                </ReviewDetailDateBox>
                <ReviewDetailAdviseBox>
                    <ReviewDetailParagraph>자기소개에 대한 피드백</ReviewDetailParagraph>
                    <div>
                        {selfIntroAdvise.split('\n').map((v) => {
                            return v === '' ? <br /> : <p>{v}</p>
                        })}
                    </div>
                </ReviewDetailAdviseBox>
                <DivideLine />
                <ReviewDetailAdvise2Box>
                    <ReviewDetailParagraph>질문에 대한 피드백</ReviewDetailParagraph>
                    <div>
                        {answerAdvise.split('\n').map((v) => {
                            return v === '' ? <br /> : <p>{v}</p>
                        })}
                    </div>
                </ReviewDetailAdvise2Box>
                <ReviewDetailWriterBox>
                    <p>From.{writerName}</p>
                </ReviewDetailWriterBox>
            </ReviewDetailBox>
        </ReviewDetailSection>
    )
}
