import { selectUser } from 'features/userSlice'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { fireStore } from '../firebase'

const getMember = async (questionsInfo) => {
    const memberData = await getDocs(query(questionsInfo, orderBy('time', 'asc')))
    const members = memberData.docs.map((docTarget: any) => ({
        ...docTarget.data(),
        id: docTarget.id,
    }))

    return members
}

const useMember = (folderId) => {
    const user = useSelector(selectUser)
    const queryEnabled = Boolean(user && folderId)
    const memberInfo = queryEnabled
        ? collection(fireStore, `users/${user}/packages/${folderId}/members`)
        : null
    const member = useQuery(`members${folderId}`, () => (folderId ? getMember(memberInfo) : []), {
        enabled: !!folderId,
    })
    return member.data !== undefined ? member : { isLoading: true, isError: false, data: [] }
}

export default useMember
