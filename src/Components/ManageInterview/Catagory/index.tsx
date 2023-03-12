import { chooseFolder, chooseId, selectFolder } from 'features/folderSlice'
import { questionsSlice, selectSelectedCatagory } from 'features/questionsSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { CatagoryBox, CatagoryButton, NewCatagoryInput, PlusCatagoryButton } from './styles'
import { fireStore } from '../../../firebase'

export default function Catagory() {
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)
    const folders = useSelector(selectFolder)
    const chooseCatagory = useSelector(selectSelectedCatagory)
    const choose = useSelector(chooseFolder)
    const dispatch = useDispatch()
    const [catagory, setCatagory] = useState(folders[choose].catagory)
    const [newCatagory, setNewCatagory] = useState('')
    const [chooseBtn, setChooseBtn] = useState(false)

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

    const renderBtn = () => {
        if (catagory.length >= 5) {
            return ''
        }
        if (chooseBtn) {
            return (
                <div>
                    <NewCatagoryInput
                        type="text"
                        value={newCatagory}
                        placeholder="추가할 질문을 입력해주세요."
                        onChange={(e) => setNewCatagory(e.target.value)}
                    />
                    <PlusCatagoryButton onClick={addCatagory}>추가</PlusCatagoryButton>
                    <PlusCatagoryButton onClick={() => setChooseBtn(false)}>
                        {' '}
                        취소{' '}
                    </PlusCatagoryButton>
                </div>
            )
        }
        return <PlusCatagoryButton onClick={() => setChooseBtn(true)}> + </PlusCatagoryButton>
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
        <CatagoryBox>
            {folders[choose].catagory.map((title) => (
                <CatagoryButton
                    value={title}
                    select={title === chooseCatagory ? 'choose' : 'no'}
                    onClick={clickCatagory}
                >
                    {title}
                </CatagoryButton>
            ))}

            {renderBtn()}
        </CatagoryBox>
    )
}
