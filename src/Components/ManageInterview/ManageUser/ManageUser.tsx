import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { chooseId } from 'features/folderSlice'
import { useMember } from 'hooks'
import { fireStore } from '../../../firebase'
import UserTable from '../UserTable'
import { AddBtn, Table, Th, ThNoRight, UserInput, UserListContainer } from './ManageUser.styled'
import { NewData } from './types'

export default function ManageUser() {
    const [newMember, setNewMember] = useState<string>('')
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)

    const { data, isLoading } = useMember(folderId)
    const members = data

    /**
     * 유저 추가
     *
     * @param {Number}
     */
    const addUser = async () => {
        const userInfo = collection(fireStore, `users/${user}/packages/${folderId}/members`)
        const idx = Object.keys(members).length
        const newData: NewData = {}
        newData.idx = idx
        newData.member = newMember
        newData.time = new Date()
        await addDoc(userInfo, newData)
        alert('유저가 추가되었습니다.')
        setNewMember('')
    }

    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            addUser()
        }
    }

    return (
        <UserListContainer>
            <div>
                <div>
                    <UserInput
                        value={newMember}
                        type="text"
                        placeholder="추가할 참여자를 입력해주세요."
                        onChange={(e) => {
                            setNewMember(e.target.value)
                        }}
                        onKeyDown={enterSubmit}
                    />
                    <AddBtn onClick={addUser}>참여자 추가</AddBtn>
                </div>
                <div style={{ display: 'inline-block' }}>
                    <Table>
                        <thead>
                            <tr>
                                <Th>No.</Th>
                                <Th>참여자</Th>
                                <Th>수정하기</Th>
                                <ThNoRight>삭제하기</ThNoRight>
                            </tr>
                        </thead>
                        {isLoading
                            ? ''
                            : Object.keys(members).map((v, idx) => (
                                  <UserTable
                                      member={members[+v].member}
                                      id={members[+v].id}
                                      idx={idx}
                                  />
                              ))}
                    </Table>
                </div>
            </div>
        </UserListContainer>
    )
}
