import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { selectUser } from 'features/userSlice'
import { useSelector } from 'react-redux'
import { chooseId } from 'features/folderSlice'
import { fireStore } from '../../../firebase'
import { Btn, Td, TdNoRight, Tr, UpdateBtn, UserInput, UserTd } from './styles'

export default function UserTable({ member, id, idx }) {
    const [newMember, setNewMember] = useState<string>(member)
    const [update, setUpdate] = useState<boolean>(false)
    const [change, getChange] = useState<boolean>(false)
    const [updateBtnToggle, setUpdateBtnToggle] = useState<boolean>(false)
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)

    /**
     * 유저 이름 수정
     *
     * @param {Number} 수정할 유저의 id값
     */

    const updateQuestion = async (id) => {
        const questionDoc = doc(fireStore, `users/${user}/packages/${folderId}/members`, id)
        const newContent = { member: newMember }
        await updateDoc(questionDoc, newContent)
        await getChange(!change)
    }

    /**
     * 유저 삭제
     *
     * @param {Number} 삭제할 유저의 id값
     */
    const checkDelete = (id) => {
        const deleteQuestion = async (id) => {
            const memberDoc = doc(fireStore, `users/${user}/packages/${folderId}/members`, id)
            await deleteDoc(memberDoc)
        }
        if (window.confirm('정말 삭제합니까?')) {
            deleteQuestion(id)
            alert('삭제되었습니다.')
            getChange(!change)
        }
    }

    useEffect(() => {}, [change])

    return (
        <Tr>
            <Td>{idx + 1}</Td>
            <UserTd>
                {update ? (
                    <UserInput value={newMember} onChange={(e) => setNewMember(e.target.value)} />
                ) : (
                    member
                )}
            </UserTd>
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
                            수정 완료
                        </Btn>
                        <Btn
                            onClick={() => {
                                setUpdate(!update)
                                setUpdateBtnToggle(!updateBtnToggle)
                            }}
                        >
                            수정 취소
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
