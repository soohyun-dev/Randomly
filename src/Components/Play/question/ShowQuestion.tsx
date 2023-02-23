import StopWatch from "Components/StopWatch/Stopwatch";
import { selectQuestions } from "features/questionsSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CorrectBtn, QuestionBlock, QuestionText, ShowBtn } from "./style";

export default function ShowQuestion({ result, i }) {
  const [correctCnt, setCorrectCnt] = useState<Array<boolean>>([]);
  const [toggleQuestion, setToggleQuestion] = useState<Array<boolean>>([]);

  const questions = useSelector(selectQuestions);

  /**
   * 각 질문을 보이게하거나 안보이게 할 수 있다.
   *
   * @param {Number} toggle할 질문의 index
   */
  const toggleHandler = (idx: number) => {
    let change = [...toggleQuestion];
    change[idx] = !change[idx];
    setToggleQuestion(change);
  };

  /**
   * 텍스트를 누르면 맞았다는 표시로 color가 변경되며, 맞은 갯수가 카운트된다.
   * 맞은 표시의 텍스트를 누르면 취소된다.
   *
   * @param {Number} 맞은 표시를 할 질문의 index
   */
  const correctHandler = (idx: number) => {
    let change = [...correctCnt];
    change[idx] = !change[idx];
    setCorrectCnt(change);
  };

  return (
    <>
      <div>
        {result[i].map((v: number, idx: number) =>
          toggleQuestion[result[i][idx]] ? (
            <QuestionText color={correctCnt[v]}>
              <QuestionBlock>
                <ShowBtn
                  color={toggleQuestion[result[i][idx]]}
                  onClick={(e) => {
                    toggleHandler(result[i][idx]);
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
                    correctHandler(v);
                  }}
                >
                  {correctCnt[v] ? "취소" : "맞음"}
                </CorrectBtn>
              </QuestionBlock>
              <StopWatch />
            </QuestionText>
          ) : (
            <QuestionText color={correctCnt[v]}>
              <QuestionBlock>
                <ShowBtn
                  color={toggleQuestion[result[i][idx]]}
                  onClick={(e) => {
                    toggleHandler(result[i][idx]);
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
    </>
  );
}
