import { addDoc, collection } from 'firebase/firestore'
import { getDateTime } from 'utils/GetTime'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { selectIsFolderModalOpen, themeSlice } from 'features/themeSlice'
import { fireStore } from '../../../firebase'
import {
    FolderModalButton,
    FolderModalInput,
    FolderNameModalSection,
} from './FolderAddModal.styled'

export default function FolderAddModal() {
    const dispatch = useDispatch()
    const manageContainer = useRef(document.body)
    const isModalBox = useRef(null)
    const user = useSelector(selectUser)
    const isFolderModalOpen = useSelector(selectIsFolderModalOpen)
    const [newFolderName, setNewFolderName] = useState('새폴더')
    const [isFirstRender, setIsFirstRender] = useState(true)

    const packageInfo = collection(fireStore, `users/${user}/packages`)

    const newFolderHandler = () => {
        dispatch(
            themeSlice.actions.setIsFolderModalOpen({
                isFolderModalOpen: false,
            })
        )
    }

    const plusFolder = async () => {
        if (window.confirm('새로운 폴더를 추가하시겠습니까?')) {
            alert('추가되었습니다!')
            const idx = getDateTime()
            await addDoc(packageInfo, {
                idx,
                title: newFolderName,
                time: new Date(),
                catagory: ['분류없음'],
            })

            setNewFolderName('새폴더')
            newFolderHandler()
        }
    }

    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            plusFolder()
        }
    }

    // 모달창 토글시 외부 스크롤 금지
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    // 모달을 닫을 조건들을 계산하고 해당되면 닫는다.
    useEffect(() => {
        const modalCloseHandler = ({ target }) => {
            if (
                isFolderModalOpen &&
                manageContainer.current.contains(target) &&
                !isModalBox.current.contains(target) &&
                !isFirstRender
            ) {
                dispatch(
                    themeSlice.actions.setIsFolderModalOpen({
                        isFolderModalOpen: false,
                    })
                )
            }
        }
        setIsFirstRender(false)

        window.addEventListener('click', modalCloseHandler)
        return () => {
            window.removeEventListener('click', modalCloseHandler)
        }
    }, [dispatch, isFolderModalOpen, isFirstRender])

    return (
        <FolderNameModalSection ref={isModalBox}>
            <p>등록할 폴더 이름</p>
            <FolderModalInput
                onChange={(e) => setNewFolderName(e.target.value)}
                value={newFolderName}
                maxLength={15}
                onKeyDown={enterSubmit}
            />
            <div>
                <FolderModalButton onClick={() => plusFolder()}>등록</FolderModalButton>
                <FolderModalButton onClick={() => newFolderHandler()}>취소</FolderModalButton>
            </div>
        </FolderNameModalSection>
    )
}
