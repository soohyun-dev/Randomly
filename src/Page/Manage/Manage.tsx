import styled from 'styled-components'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from 'Page/Error'
import ManageUser from 'Components/ManageInterview/ManageUser'
import ManageQuestion from 'Components/ManageInterview/ManageQuestion'
import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { selectUser } from 'features/userSlice'
import { getDateTime } from 'utils/GetTime'
import { useFolder } from 'hooks'
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
} from './Manage.styled'

export default function Manage() {
    const [page, setPage] = useState<string>('question')
    const [nowPackage, setNowPackage] = useState('0')
    const user = useSelector(selectUser)
    const [updateBtn, setUpdateBtn] = useState(false)
    const packageInfo = collection(fireStore, `users/${user}/packages`)
    const { data, isLoading } = useFolder(nowPackage)
    const folders = data

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

    const changeView = (value: string) => {
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

    return (
        <>
            <Nav />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <TitleSection>
                    <Title>MANAGE</Title>
                </TitleSection>
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
                        {!isLoading &&
                            Object.keys(folders).map((v) => (
                                <PackageBox
                                    onClick={() => {
                                        setNowPackage(v)
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
                        {folders !== undefined && folders.length > 0 && folders[nowPackage].title}
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
                    ? user !== null &&
                      !isLoading &&
                      folders.length > 0 && <ManageQuestion nowPackage={nowPackage} />
                    : user !== null && <ManageUser />}
            </ErrorBoundary>

            <Footer />
        </>
    )
}
