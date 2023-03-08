import { chooseFolder, chooseId, selectFolder } from 'features/folderSlice'
import { questionsSlice, selectCatagoryList, selectSelectedCatagory } from 'features/questionsSlice'
import { fireStore } from '../../../firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
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

    const clickCatagory = (e) => {
        dispatch(
            questionsSlice.actions.setSelectedCatagory({
                selectedCatagory: e.target.value,
            })
        )
    }

    useEffect(() => {
        setCatagory(folders[choose].catagory)
        dispatch(
            questionsSlice.actions.setCatagoryList({
                catagoryList: folders[choose].catagory,
            })
        )
    }, [catagory, folders])

    return (
        <>
            <CatagoryBox>
                <select id="Catagory" onChange={clickCatagory}>
                    {folders[choose].catagory.map((title) => (
                        <option value={title}>{title}</option>
                    ))}
                </select>
            </CatagoryBox>
        </>
    )
}
