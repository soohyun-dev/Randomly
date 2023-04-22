import styled from 'styled-components'
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDoc, doc } from 'firebase/firestore'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from 'Page/Error'
import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { selectUser } from 'features/userSlice'
import { useFolder } from 'hooks'
import Loading from 'Components/Loading'
import FolderAddModal from 'Components/ManageInterview/FolderAddModal'
import { selectIsFolderModalOpen, themeSlice } from 'features/themeSlice'
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
    ManageSection,
} from './Manage.styled'

const ManageQuestion = React.lazy(() => import('Components/ManageInterview/ManageQuestion'))
const ManageUser = React.lazy(() => import('Components/ManageInterview/ManageUser'))

export default function Manage() {
    const dispatch = useDispatch()
    const [page, setPage] = useState<string>('question')
    const [nowPackage, setNowPackage] = useState('0')
    const user = useSelector(selectUser)
    const [updateBtn, setUpdateBtn] = useState(false)
    const { data, isLoading } = useFolder(nowPackage)
    const folders = data
    const isFolderModalOpen = useSelector(selectIsFolderModalOpen)
    const [isFirstRender, setIsFirstRender] = useState(true)

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

    const newFolderHandler = () => {
        setIsFirstRender(false)
        dispatch(
            themeSlice.actions.setIsFolderModalOpen({
                isFolderModalOpen: true,
            })
        )
    }

    const checkDelete = async (target) => {
        const deleteFolder = async (id) => {
            const folderDoc = doc(fireStore, `users/${user}/packages`, id)
            await deleteDoc(folderDoc)
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
        if (isFirstRender) {
            // 페이지 초기 접속시 isFolderModalOpen 값 초기화
            dispatch(
                themeSlice.actions.setIsFolderModalOpen({
                    isFolderModalOpen: false,
                })
            )
        }

        setIsFirstRender(false)
    }, [dispatch, isFirstRender])

    return (
        <>
            <Nav isModalOpen={isFolderModalOpen} />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                {isFolderModalOpen && <FolderAddModal />}
                <ManageSection props={isFolderModalOpen}>
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
                                    <FolderPlusButton onClick={() => newFolderHandler()}>
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
                            {folders !== undefined &&
                                folders.length > 0 &&
                                folders[nowPackage].title}
                        </PackageTitleText>
                    </PackageTitleDiv>
                    {user !== null ? (
                        ''
                    ) : (
                        <ManageAccessSection>
                            <ManageAccessTitle>로그인 해주세요😋</ManageAccessTitle>
                        </ManageAccessSection>
                    )}
                    <Suspense fallback={<Loading />}>
                        {page === 'question'
                            ? user !== null &&
                              !isLoading &&
                              folders.length > 0 && <ManageQuestion nowPackage={nowPackage} />
                            : user !== null && <ManageUser />}
                    </Suspense>
                </ManageSection>
            </ErrorBoundary>

            <Footer />
        </>
    )
}
