import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { chooseId } from 'features/folderSlice'
import { fireStore } from '../../../firebase'
import { Btn, QuestionInput, QustionTd, Td, TdNoRight, Tr, UpdateBtn } from './styles'

export default function QuestionTable({ question, id, idx }) {
    const [newQuestion, setNewQuestion] = useState(question)
    const [update, setUpdate] = useState(false)
    const [updateBtnToggle, setUpdateBtnToggle] = useState(false)
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)

    /**
     * 질문 수정
     *
     * @param {Number} 수정할 질문의 id값
     */

    const updateQuestion = async (id) => {
        const questionDoc = doc(fireStore, `users/${user}/packages/${folderId}/questions`, id)
        const newContent = { question: newQuestion }
        await updateDoc(questionDoc, newContent)
        window.location.reload()
    }

    /**
     * 질문 삭제
     *
     * @param {Number} 삭제할 질문의 id값
     */
    const checkDelete = (id) => {
        const deleteQuestion = async (id) => {
            const questionDoc = doc(fireStore, `users/${user}/packages/${folderId}/questions`, id)
            await deleteDoc(questionDoc)
            window.location.reload()
        }
        if (window.confirm('정말 삭제합니까?')) {
            deleteQuestion(id)
            alert('삭제되었습니다.')
        }
    }

    return (
        <Tr>
            <Td>{idx + 1}</Td>
            <QustionTd>
                {update ? (
                    <QuestionInput
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                ) : (
                    question
                )}
            </QustionTd>
            <Td>
                {updateBtnToggle ? (
                    <div>
                        <Btn
                            onClick={() => {
                                alert('수정 완료되었습니다.')
                                updateQuestion(id)
                                setUpdate(!update)
                                setUpdateBtnToggle(!updateBtnToggle)
                            }}
                        >
                            완료
                        </Btn>
                        <Btn
                            onClick={() => {
                                setUpdate(!update)
                                setUpdateBtnToggle(!updateBtnToggle)
                            }}
                        >
                            취소
                        </Btn>
                    </div>
                ) : (
                    <UpdateBtn
                        onClick={() => {
                            setUpdate(!update)
                            setUpdateBtnToggle(!updateBtnToggle)
                        }}
                    >
                        수정
                    </UpdateBtn>
                )}
            </Td>
            <TdNoRight>
                <Btn
                    onClick={() => {
                        checkDelete(id)
                    }}
                >
                    삭제
                </Btn>
            </TdNoRight>
        </Tr>
    )
}
