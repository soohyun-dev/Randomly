import { selectIsModalOpen, themeSlice } from 'features/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
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
