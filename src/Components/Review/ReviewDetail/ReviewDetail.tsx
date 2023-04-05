import { selectIsModalOpen, themeSlice } from 'features/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import {
    CloseButtonBox,
    DivideLine,
    ReviewDetailAdvise,
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
import { fireStore } from '../../../firebase'

export default function ReviewDetail({ setModalOpen, data }) {
    const dispatch = useDispatch()
    const { id, memberName, selfIntroAdvise, answerAdvise, writerName, date, password } = data
    const reviewContainer = useRef(document.body)
    const isDetailBox = useRef(null)
    const isModalOpen = useSelector(selectIsModalOpen)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [toggleInput, setToggleInput] = useState(false)
    const [inputPassword, setInputPassword] = useState('')

    const closeModal = () => {
        setModalOpen(false)
        dispatch(
            themeSlice.actions.setIsModalOpen({
                isModalOpen: false,
            })
        )
    }

    const modifyHandler = () => {
        setToggleInput(!toggleInput)
    }

    const deleteHandler = () => {
        if (password === inputPassword) {
            const deleteReviewPosting = async (id) => {
                const reviewDoc = doc(fireStore, 'review', id)
                await deleteDoc(reviewDoc)
            }
            if (window.confirm('정말 삭제하시겠습니까?')) {
                deleteReviewPosting(id)
                alert('삭제되었습니다.')
                closeModal()
            }
        } else {
            alert('비밀번호가 틀렸습니다.')
        }
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
                    {toggleInput && (
                        <div>
                            <input
                                onChange={(e) => setInputPassword(e.target.value)}
                                value={inputPassword}
                                placeholder="등록한 게시물 비밀번호 "
                            />
                            <button onClick={() => deleteHandler()}>삭제</button>
                            <button onClick={() => modifyHandler()}>취소</button>
                        </div>
                    )}
                    {!toggleInput && <button onClick={() => modifyHandler()}>수정</button>}
                    <ReviewDetailCloseButton onClick={closeModal}>X</ReviewDetailCloseButton>
                </CloseButtonBox>
                <ReviewDetailNameBox>
                    <p>To.{memberName}</p>
                </ReviewDetailNameBox>
                <ReviewDetailDateBox>
                    <p>{date.slice(0, 10)}</p>
                </ReviewDetailDateBox>
                <ReviewDetailAdvise>
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
                </ReviewDetailAdvise>
                <ReviewDetailWriterBox>
                    <p>From.{writerName}</p>
                </ReviewDetailWriterBox>
            </ReviewDetailBox>
        </ReviewDetailSection>
    )
}
