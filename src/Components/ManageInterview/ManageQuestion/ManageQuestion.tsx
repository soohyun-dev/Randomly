import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { selectSelectedCatagory } from 'features/questionsSlice'
import { chooseId } from 'features/folderSlice'

import { useQuestion } from 'hooks'
import QuestionTable from '../QuestionTable'
import { fireStore } from '../../../firebase'
import {
    AddBtn,
    DelelteAllSection,
    PreAddText,
    QuestionInput,
    QuestionListContainer,
    Table,
    Th,
    ThNoRight,
} from './ManageQuestion.styled'
import { NewData } from './types'
import Catagory from '../Catagory'

export default function ManageQuestion() {
    const [newQuestion, setNewQuestion] = useState<string>('')
    const [preAddQuestion, setPreAddQuestions] = useState<string>('')
    const [preAddIdx, setPreAddIdx] = useState<number>()
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)
    const seletedCatagory = useSelector(selectSelectedCatagory)

    const { data, isLoading, error } = useQuestion(folderId)
    const questions = data

    /**
     * 질문 추가
     *
     */

    const addQuestion = async () => {
        const questionsInfo = collection(fireStore, `users/${user}/packages/${folderId}/questions`)
        const idx = Object.keys(questions).length
        const newData: NewData = {}
        newData.idx = idx
        newData.question = newQuestion
        newData.time = new Date()
        newData.catagory = seletedCatagory
        await addDoc(questionsInfo, newData)
        setPreAddQuestions(newQuestion)
        setPreAddIdx(idx + 1)
        setNewQuestion('')
        alert('질문이 추가되었습니다.')
    }

    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            addQuestion()
        }
    }

    //   /**
    //    * 전체 질문 삭제
    //    *
    //    */
    //   const deleteAll = () => {
    //     const deleteAllQuestion = () => {
    //       Object.keys(packages.current).map((v) => {
    //         const deleteQuestion = async (id) => {
    //           const questionDoc = doc(fireStore, "questions", id);
    //           await deleteDoc(questionDoc);
    //         };
    //         deleteQuestion(packages.current[~~v].id);
    //       });
    //     };

    //     if (window.confirm("등록된 질문들을 모두 삭제하십니까?")) {
    //       if (window.confirm("정말 삭제하십니까? 다시 한번 선택해주세요.")) {
    //         deleteAllQuestion();
    //         alert("모든 질문들이 삭제되었습니다. 새로고침 해주세요.");
    //       }
    //     }
    //   };

    return (
        <QuestionListContainer>
            <div>
                <div>
                    <Catagory />
                    <QuestionInput
                        type="text"
                        value={newQuestion}
                        placeholder="추가할 질문을 입력해주세요."
                        onChange={(e) => setNewQuestion(e.target.value)}
                        onKeyDown={enterSubmit}
                    />
                    <AddBtn onClick={addQuestion}>질문 추가</AddBtn>
                    {preAddQuestion === '' ? (
                        ''
                    ) : (
                        <PreAddText>
                            이전 추가 질문 : {preAddIdx}. {preAddQuestion}
                        </PreAddText>
                    )}
                </div>
                <div style={{ display: 'inline-block' }}>
                    <Table>
                        <thead>
                            <tr>
                                <Th>No.</Th>
                                <Th>카테고리</Th>
                                <Th>질문</Th>
                                <Th>수정하기</Th>
                                <ThNoRight>삭제하기</ThNoRight>
                            </tr>
                        </thead>
                        {isLoading
                            ? ''
                            : Object.keys(questions).map((v, idx) => (
                                  <QuestionTable
                                      question={questions[+v].question}
                                      id={questions[+v].id}
                                      idx={idx}
                                      catagory={questions[+v].catagory}
                                  />
                              ))}
                    </Table>
                </div>
            </div>
            <DelelteAllSection>
                {/* <DeleteAllBtn onClick={deleteAll}>전체삭제</DeleteAllBtn> */}
            </DelelteAllSection>
        </QuestionListContainer>
    )
}
