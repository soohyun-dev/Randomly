import { selectUser } from 'features/userSlice'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { fireStore } from '../firebase'

const getFolder = async (folderInfo) => {
    const folderData = await getDocs(query(folderInfo, orderBy('time', 'asc')))
    const folder = folderData.docs.map((docTarget: any) => ({
        ...docTarget.data(),
        id: docTarget.id,
    }))

    return folder
}

export const useFolder = () => {
    const user = useSelector(selectUser)
    const folderInfo = collection(fireStore, `users/${user}/packages`)
    return useQuery('folders', () => getFolder(folderInfo))
}
