import { chooseFolder, selectFolder } from 'features/folderSlice'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CatagoryBox } from './styles'

const log = console.log

export default function Catagory() {
    const folders = useSelector(chooseFolder)
    const [catagory, setCatagory] = useState(['분류없음', 'react', 'js'])

    log(folders)
    return (
        <>
            <CatagoryBox>
                <select>
                    {catagory.map((title) => (
                        <option value={title}>{title}</option>
                    ))}
                </select>
            </CatagoryBox>
        </>
    )
}
