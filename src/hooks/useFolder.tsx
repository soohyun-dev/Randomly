import { folderSlice } from 'features/folderSlice'
import { selectUser } from 'features/userSlice'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { fireStore } from '../firebase'

const getFolder = async (folderInfo) => {
    const folderData = await getDocs(query(folderInfo, orderBy('time', 'asc')))
    const folder = folderData.docs.map((docTarget: any) => ({
        ...docTarget.data(),
        id: docTarget.id,
    }))

    return folder
}

export const useFolder = (nowPackage) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const folderInfo = collection(fireStore, `users/${user}/packages`)
    const folder = useQuery('folders', () => getFolder(folderInfo))

    if (user !== null && folder.data !== undefined) {
        dispatch(
            folderSlice.actions.choose({
                choose: +nowPackage,
                id: folder.data[nowPackage].id,
            })
        )
        dispatch(
            folderSlice.actions.setFolder({
                folders: folder.data,
            })
        )
    }

    return folder
}
