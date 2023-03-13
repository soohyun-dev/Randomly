import styled from 'styled-components'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { folderSlice, selectFolder } from 'features/folderSlice'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from 'Page/Error'
import ManageUser from 'Components/ManageInterview/ManageUser'
import ManageQuestion from 'Components/ManageInterview/ManageQuestion'
import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { getDateTime } from 'utils/GetTime'
import { selectUser } from 'features/userSlice'
import { fireStore } from '../../firebase'
import {
    ManageAccessSection,
    ManageAccessTitle,
    ManageHeaderDiv,
    ManageHeaderSection,
    PackageBox,
    PackageDate,
    PackageDiv,
    PackageSection,
    PackageTitle,
    PackageTitleDiv,
    PackageTitleText,
    FolderPlusButton,
    Title,
    TitleSection,
    FolderUpdateButton,
    FolderOrderBox,
    FolderDeleteButton,
} from './styles'

export default function Manage() {
    const [show, setShow] = useState<boolean>(false)
    const [page, setPage] = useState<string>('question')
    const [nowPackage, setNowPackage] = useState('0')
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const folders = useSelector(selectFolder)
    const [updateBtn, setUpdateBtn] = useState(false)
    const packageInfo = collection(fireStore, `users/${user}/packages`)
    const MiniTitle = styled.label<{ target?: any }>`
        padding: 0 0.5em;
        font-size: 24px;
        cursor: pointer;
        color: ${(props) => (props.target === page ? 'black' : '#e0e0e0')};
        text-decoration: ${(props) => (props.target === page ? 'underline' : '')};
        text-underline-position: under;
        &:hover {
            opacity: 80%;
        }
    `

    const getPackages = useCallback(async () => {
        const packageData = await getDocs(query(packageInfo, orderBy('time', 'asc')))

        dispatch(
            folderSlice.actions.setFolder({
                folders: packageData.docs.map((docTarget) => ({
                    ...docTarget.data(),
                    id: docTarget.id,
                })),
            })
        )
        setShow(true)
    }, [dispatch, packageInfo])

    const changeView = (value) => {
        setPage(value)
    }

    const plusPackage = async () => {
        if (window.confirm('새로운 폴더를 추가하시겠습니까?')) {
            alert('추가되었습니다!')
            const idx = getDateTime()
            await addDoc(packageInfo, {
                idx,
                title: `새폴더`,
                time: new Date(),
                catagory: ['분류없음'],
            })

            await window.location.reload()
        }
    }

    const checkDelete = async (target) => {
        const deleteFolder = async (id) => {
            const folderDoc = doc(fireStore, `users/${user}/packages`, id)
            await deleteDoc(folderDoc)
            window.location.reload()
        }
        if (window.confirm(`${folders[target].title} 폴더를 정말 삭제합니까?`)) {
            deleteFolder(folders[target].id)
            alert('삭제되었습니다.')
        }
    }

    const renderDeleteBtn = (target) => {
        if (!updateBtn) return ''
        return <FolderDeleteButton onClick={() => checkDelete(target)}>삭제</FolderDeleteButton>
    }

    useEffect(() => {
        if (user !== null) {
            getPackages()
            if (folders.length >= 1) {
                console.log('지금패키지', nowPackage)
                dispatch(
                    folderSlice.actions.choose({
                        choose: +nowPackage,
                        id: folders[nowPackage].id,
                    })
                )
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPackage, dispatch])

    return (
        <>
            <Nav />
            <TitleSection>
                <Title>MANAGE</Title>
            </TitleSection>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <ManageHeaderSection>
                    <ManageHeaderDiv>
                        <MiniTitle
                            target="question"
                            onClick={() => {
                                changeView('question')
                            }}
                        >
                            질문 관리
                        </MiniTitle>
                        <MiniTitle>|</MiniTitle>
                        <MiniTitle
                            target="user"
                            onClick={() => {
                                changeView('user')
                            }}
                        >
                            참여자 관리
                        </MiniTitle>
                    </ManageHeaderDiv>
                    {user !== null && (
                        <FolderOrderBox>
                            {updateBtn ? (
                                ''
                            ) : (
                                <FolderPlusButton onClick={() => plusPackage()}>
                                    질문 폴더 추가
                                </FolderPlusButton>
                            )}
                            <FolderUpdateButton onClick={() => setUpdateBtn(!updateBtn)}>
                                {updateBtn ? '수정 취소' : '질문 폴더 수정'}
                            </FolderUpdateButton>
                        </FolderOrderBox>
                    )}
                </ManageHeaderSection>
                <PackageSection>
                    <PackageDiv>
                        {Object.keys(folders).map((v) => (
                            <PackageBox
                                onClick={() => {
                                    setNowPackage(v)
                                    dispatch(
                                        folderSlice.actions.choose({
                                            choose: v,
                                        })
                                    )
                                }}
                            >
                                <PackageTitle>{folders[v].title}</PackageTitle>
                                <PackageDate>{folders[v].idx.slice(0, 10)}</PackageDate>
                                {renderDeleteBtn(v)}
                            </PackageBox>
                        ))}
                    </PackageDiv>
                </PackageSection>
                <PackageTitleDiv>
                    <PackageTitleText>
                        {show && folders.length > 0 && folders[nowPackage].title}
                    </PackageTitleText>
                </PackageTitleDiv>
                {user !== null ? (
                    ''
                ) : (
                    <ManageAccessSection>
                        <ManageAccessTitle>로그인 해주세요😋</ManageAccessTitle>
                    </ManageAccessSection>
                )}
                {page === 'question'
                    ? user !== null && show && folders.length > 0 && <ManageQuestion />
                    : user !== null && <ManageUser />}
            </ErrorBoundary>
            <Footer />
        </>
    )
}
