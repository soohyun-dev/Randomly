import { chooseFolder, chooseId, selectFolder } from 'features/folderSlice'
import { questionsSlice, selectCatagoryList, selectSelectedCatagory } from 'features/questionsSlice'
import { fireStore } from '../../../firebase'
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CatagoryBox } from './styles'
import { selectUser } from 'features/userSlice'

const log = console.log

export default function Catagory() {
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)
    const folders = useSelector(selectFolder)
    const choose = useSelector(chooseFolder)
    const catago = useSelector(selectSelectedCatagory)
    const CatagoryList = useSelector(selectCatagoryList)
    const catagoryInfo = collection(fireStore, `users/${user}/packages/${folderId}/catagory`)
    const dispatch = useDispatch()
    const [catagory, setCatagory] = useState(folders[choose].catagory)
    const [newCatagory, setNewCatagory] = useState('')

    const clickCatagory = (e) => {
        dispatch(
            questionsSlice.actions.setSelectedCatagory({
                selectedCatagory: e.target.value,
            })
        )
    }

    const addCatagory = async () => {
        const catagoryDoc = doc(fireStore, `users/${user}/packages/${folderId}`)
        const newContent = { catagory: [...catagory, newCatagory] }
        await updateDoc(catagoryDoc, newContent)
        setNewCatagory('')
        alert('카테고리가 추가되었습니다.')
    }

    useEffect(() => {
        setCatagory(folders[choose].catagory)
        dispatch(
            questionsSlice.actions.setCatagoryList({
                catagoryList: folders[choose].catagory,
            })
        )
        dispatch(
            questionsSlice.actions.setSelectedCatagory({
                selectedCatagory: '분류없음',
            })
        )
    }, [folders, newCatagory])

    return (
        <>
            <CatagoryBox>
                <select id="Catagory" onChange={clickCatagory}>
                    {folders[choose].catagory.map((title) => (
                        <option value={title}>{title}</option>
                    ))}
                </select>
                <div>
                    <input
                        type="text"
                        value={newCatagory}
                        placeholder="추가할 질문을 입력해주세요."
                        onChange={(e) => setNewCatagory(e.target.value)}
                    />
                    <button onClick={addCatagory}>카테고리 추가</button>
                </div>
            </CatagoryBox>
        </>
    )
}
