import { chooseFolder, chooseId, selectFolder } from 'features/folderSlice'
import { questionsSlice, selectSelectedCatagory } from 'features/questionsSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { useFolder } from 'hooks'
import {
    CatagoryBox,
    CatagoryButton,
    NewCatagoryInput,
    CatagoryPlusButton,
    CatagoryUpdateButton,
    CatagoryDeleteButton,
} from './Catagory.styled'
import { fireStore } from '../../../firebase'

export default function Catagory({ nowPackage }) {
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)
    const { data: folders, isLoading: isFolderLoading } = useFolder(nowPackage)
    const chooseCatagory = useSelector(selectSelectedCatagory)
    const choose = useSelector(chooseFolder)
    const dispatch = useDispatch()
    const [catagory, setCatagory] = useState(folders[choose].catagory)
    const [newCatagory, setNewCatagory] = useState('')
    const [plusBtn, setPlusBtn] = useState(false)
    const [updateBtn, setUpdateBtn] = useState(false)

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
        await setNewCatagory('')
        alert('카테고리가 추가되었습니다.')
    }

    const deleteCatagory = async (target) => {
        const catagoryDoc = doc(fireStore, `users/${user}/packages/${folderId}`)
        const updateCatagory = catagory.filter((v) => v !== target)
        const newContent = { catagory: [...updateCatagory] }
        await updateDoc(catagoryDoc, newContent)
        alert(`${target} 카테고리가 삭제되었습니다.`)
    }

    const renderBtn = () => {
        if (catagory.length >= 7) {
            return ''
        }
        if (plusBtn) {
            return (
                <div>
                    <NewCatagoryInput
                        type="text"
                        value={newCatagory}
                        placeholder="추가할 카테고리를 입력해주세요."
                        onChange={(e) => setNewCatagory(e.target.value)}
                    />
                    <CatagoryPlusButton onClick={addCatagory}>추가</CatagoryPlusButton>
                    <CatagoryPlusButton onClick={() => setPlusBtn(false)}>취소</CatagoryPlusButton>
                </div>
            )
        }
        return <CatagoryPlusButton onClick={() => setPlusBtn(true)}> + </CatagoryPlusButton>
    }

    const renderUpdateBtn = () => {
        if (plusBtn) return ''
        return (
            <CatagoryUpdateButton
                onClick={() => {
                    setUpdateBtn(!updateBtn)
                    setPlusBtn(false)
                }}
            >
                {updateBtn ? '취소' : '수정'}
            </CatagoryUpdateButton>
        )
    }

    const renderDeleteBtn = (target) => {
        if (!updateBtn) return ''
        return <CatagoryDeleteButton onClick={() => deleteCatagory(target)}>x</CatagoryDeleteButton>
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
    }, [folders, newCatagory, choose, dispatch, catagory])

    return (
        <CatagoryBox>
            {!isFolderLoading &&
                folders[choose].catagory.map((title) => (
                    <CatagoryButton
                        value={title}
                        select={title === chooseCatagory ? 'choose' : 'no'}
                        onClick={clickCatagory}
                    >
                        {title}
                        {title !== '분류없음' ? renderDeleteBtn(title) : ''}
                    </CatagoryButton>
                ))}

            {updateBtn ? '' : renderBtn()}

            {renderUpdateBtn()}
        </CatagoryBox>
    )
}
