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
import { selectUser } from 'features/userSlice'
import { getDateTime } from 'utils/GetTime'
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
        if (window.confirm('????????? ????????? ?????????????????????????')) {
            alert('?????????????????????!')
            const idx = getDateTime()
            await addDoc(packageInfo, {
                idx,
                title: `?????????`,
                time: new Date(),
                catagory: ['????????????'],
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
        if (window.confirm(`${folders[target].title} ????????? ?????? ????????????????`)) {
            deleteFolder(folders[target].id)
            alert('?????????????????????.')
        }
    }

    const renderDeleteBtn = (target) => {
        if (!updateBtn) return ''
        return <FolderDeleteButton onClick={() => checkDelete(target)}>??????</FolderDeleteButton>
    }

    useEffect(() => {
        if (user !== null) {
            getPackages()
            if (folders.length >= 1) {
                console.log('???????????????', nowPackage)
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
                            ?????? ??????
                        </MiniTitle>
                        <MiniTitle>|</MiniTitle>
                        <MiniTitle
                            target="user"
                            onClick={() => {
                                changeView('user')
                            }}
                        >
                            ????????? ??????
                        </MiniTitle>
                    </ManageHeaderDiv>
                    {user !== null && (
                        <FolderOrderBox>
                            {updateBtn ? (
                                ''
                            ) : (
                                <FolderPlusButton onClick={() => plusPackage()}>
                                    ?????? ?????? ??????
                                </FolderPlusButton>
                            )}
                            <FolderUpdateButton onClick={() => setUpdateBtn(!updateBtn)}>
                                {updateBtn ? '?????? ??????' : '?????? ?????? ??????'}
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
                        <ManageAccessTitle>????????? ????????????????</ManageAccessTitle>
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
