import StopWatch from 'Components/StopWatch'
import { chooseId } from 'features/folderSlice'
import { playSlice } from 'features/playSlice'
import { useQuestion } from 'hooks'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    CorrectBtn,
    QuestionBlock,
    QuestionCatagoryLabel,
    QuestionText,
    ShowBtn,
} from './ShowQuestion.styled'

export default function ShowQuestion({ result }: { result: number[] | [] }) {
    const [correctCnt, setCorrectCnt] = useState<Array<boolean>>([])
    const [toggleQuestion, setToggleQuestion] = useState<Array<boolean>>([])
    const folderId = useSelector(chooseId)
    const { data: questions, isLoading: isQuestionsLoading } = useQuestion(folderId)
    const dispatch = useDispatch()

    /**
     * 각 질문을 보이게하거나 안보이게 할 수 있다.
     *
     * @param {Number} toggle할 질문의 index
     */
    const toggleHandler = (idx: number) => {
        const change = [...toggleQuestion]
        change[idx] = !change[idx]
        setToggleQuestion(change)
    }

    /**
     * 텍스트를 누르면 맞았다는 표시로 color가 변경되며, 맞은 갯수가 카운트된다.
     * 맞은 표시의 텍스트를 누르면 취소된다.
     *
     * @param {Number} 맞은 표시를 할 질문의 index
     */
    const correctHandler = (idx: number) => {
        const change = [...correctCnt]
        change[idx] = !change[idx]
        dispatch(
            playSlice.actions.setCorrectCnt({
                correctCnt: change,
            })
        )
        setCorrectCnt(change)
    }

    return (
        <div>
            {!isQuestionsLoading &&
                result.map((v: number, idx: number) =>
                    toggleQuestion[result[idx]] ? (
                        <QuestionText key={`result-${v}`} color={correctCnt[v]}>
                            <QuestionBlock>
                                <ShowBtn
                                    color={toggleQuestion[result[idx]]}
                                    onClick={() => {
                                        toggleHandler(result[idx])
                                    }}
                                >
                                    질문 가리기
                                </ShowBtn>
                            </QuestionBlock>
                            <QuestionBlock>
                                {idx + 1}. {questions[v].question}
                            </QuestionBlock>
                            <QuestionBlock>
                                <CorrectBtn
                                    color={correctCnt[v]}
                                    onClick={(e) => {
                                        correctHandler(v)
                                    }}
                                >
                                    {correctCnt[v] ? '취소' : '맞음'}
                                </CorrectBtn>
                            </QuestionBlock>
                            <StopWatch />
                        </QuestionText>
                    ) : (
                        <QuestionText key={`result-${v}`} color={correctCnt[v]}>
                            <QuestionBlock>
                                <ShowBtn
                                    color={toggleQuestion[result[idx]]}
                                    onClick={(e) => {
                                        toggleHandler(result[idx])
                                    }}
                                >
                                    질문 보기
                                </ShowBtn>
                            </QuestionBlock>
                            <QuestionBlock>{idx + 1}.</QuestionBlock>
                        </QuestionText>
                    )
                )}
        </div>
    )
}
