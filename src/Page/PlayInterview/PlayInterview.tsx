import ShowMember from 'Components/Play/ShowMember'
import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { selectUser } from 'features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { folderSlice, chooseId, selectFolder } from 'features/folderSlice'
import { questionsSlice, selectQuestions } from 'features/questionsSlice'
import { playSlice, selectDistribution, selectOrderMemeber } from 'features/playSlice'
import { memberSlice, selectMember } from 'features/memberSlice'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from 'Page/Error'
import getQuestionNums, { MakeNums } from 'utils/MakeNums'
import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import getEqualDistribution from 'utils/EqualDistribution'
import { fireStore } from '../../firebase'
import {
    CatagoryCheckInput,
    GuideToggle,
    LinkLoginBtn,
    MainContainer,
    MakeQuestionNums,
    ManageAccessSection,
    ManageAccessTitle,
    OrderContainer,
    PackageBox,
    PackageDate,
    PackageDiv,
    PackageSection,
    PackageTitle,
    PackageTitleDiv,
    PackageTitleText,
    PageGuide,
    ShuffleName,
    Title,
    USER,
} from './PlayInterview.styled'

export default function PlayInterview() {
    const dispatch = useDispatch()
    const [firstRender, setFirstRender] = useState(false)
    const [bool, setBool] = useState<boolean>(false)
    const [nowPackage, setNowPackage] = useState<string>('0')
    const [isChecked, setIsChecked] = useState(false)
    const user = useSelector(selectUser)
    const folders = useSelector(selectFolder)
    const folderId = useSelector(chooseId)
    const member = useSelector(selectMember)
    const questions = useSelector(selectQuestions)
    const distribution = useSelector(selectDistribution)
    const packageInfo = collection(fireStore, `users/${user}/packages`)
    const userInfo =
        folderId === ''
            ? collection(fireStore, `users/${user}/packages`)
            : collection(fireStore, `users/${user}/packages/${folderId}/members`)

    const questionInfo =
        folderId === ''
            ? collection(fireStore, `users/${user}/questions`)
            : collection(fireStore, `users/${user}/packages/${folderId}/questions`)

    /**
     * ????????? ??? ???????????? ???????????? shuffle?????? ???????????????.
     * ????????? ?????? ????????? ????????? ???????????? ???????????? ??????????????? ????????????.
     *
     * @param {e} ?????? ?????? ?????? ?????????
     */
    const makeArray = () => {
        let resultArray = []
        if (isChecked) {
            // ??????????????? ?????? ?????? ?????????
            resultArray = getEqualDistribution(member.length, questions)
        } else {
            // ??????????????? ?????? ?????? ???????????????
            resultArray = getQuestionNums(member.length, Object.keys(questions).length)
        }

        dispatch(
            playSlice.actions.setDistribution({
                result: resultArray,
                correctCnt: Array.from({ length: Object.keys(questions).length - 1 }, () => false),
                distribution: true,
            })
        )
        setBool(true)
        alert('?????? ????????? ?????????????????????!')
    }

    const getPackages = async () => {
        const packageData = await getDocs(query(packageInfo, orderBy('time', 'asc')))

        dispatch(
            folderSlice.actions.setFolder({
                folders: packageData.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })),
            })
        )
    }

    const getQuestions = async () => {
        const data = await getDocs(questionInfo)
        dispatch(
            questionsSlice.actions.setQuestion({
                Questions: data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })),
            })
        )
    }

    const getUsers = async () => {
        const userData = await getDocs(userInfo)
        dispatch(
            memberSlice.actions.setMember({
                members: userData.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })),
            })
        )
        console.log('??????', member)
        dispatch(
            playSlice.actions.setOrderMember({
                orderMember: Array.from({ length: member.length }, (_, idx) => idx),
            })
        )
    }

    const changePackage = () => {
        dispatch(playSlice.actions.setChangeFolder())
        getUsers()
        setBool(false)
    }

    const shuffleName = () => {
        const newOrder = MakeNums(Object.keys(member).length)
        dispatch(
            playSlice.actions.setOrderMember({
                orderMember: newOrder,
            })
        )

        alert('?????? ????????? ?????????????????????!')
    }

    const checkCatagory = () => {
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        if (!firstRender) {
            dispatch(
                playSlice.actions.setDistribution({
                    result: [],
                    correctCnt: [],
                    distribution: false,
                })
            )
            setFirstRender(true)
        }
        if (user !== null && folderId !== '') {
            getPackages()
            getUsers()
            getQuestions()
            setNowPackage(nowPackage)
            dispatch(
                folderSlice.actions.choose({
                    id: folders[nowPackage].id,
                })
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPackage, folderId, distribution, bool])

    return (
        <>
            <Nav />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <section style={{ textAlign: 'center' }}>
                    <Title>INTERVIEW</Title>
                    <PageGuide>
                        ???????????? ?????? ????????? ????????? ???????????? ????????? ????????? ?????? ???????????????.
                    </PageGuide>
                    {user === null ? '' : <PageGuide>???????????? ??? ????????? ???????????????. </PageGuide>}
                </section>
                <PackageSection>
                    <PackageDiv>
                        {Object.keys(folders).map((v, idx) => (
                            <PackageBox
                                onClick={() => {
                                    setNowPackage(v)
                                    changePackage()
                                    dispatch(
                                        folderSlice.actions.choose({
                                            choose: v,
                                            id: folders[v].id,
                                        })
                                    )
                                }}
                            >
                                <PackageTitle>{folders[v].title}</PackageTitle>
                                <PackageDate>{folders[v].idx.slice(0, 10)}</PackageDate>
                            </PackageBox>
                        ))}
                    </PackageDiv>
                </PackageSection>
                <PackageTitleDiv>
                    <PackageTitleText>
                        {folders.length > 0 && folders[nowPackage].title}
                    </PackageTitleText>
                </PackageTitleDiv>

                <section style={{ textAlign: 'center' }}>
                    <MainContainer>
                        {user === null ? (
                            <ManageAccessSection>
                                <ManageAccessTitle>????????? ????????????????</ManageAccessTitle>
                                <Link
                                    to="/Login"
                                    style={{ textDecoration: 'none', color: 'black' }}
                                >
                                    <LinkLoginBtn>??????????????? ?????? ??????</LinkLoginBtn>
                                </Link>
                            </ManageAccessSection>
                        ) : (
                            <OrderContainer>
                                <div>
                                    <ShuffleName onClick={shuffleName}>?????? ?????? ??????</ShuffleName>
                                </div>
                                <div>
                                    <MakeQuestionNums color={bool} onClick={makeArray}>
                                        {bool ? '?????? ?????????' : '?????? ?????? ??????'}
                                    </MakeQuestionNums>
                                </div>

                                {bool ? (
                                    <GuideToggle>
                                        ?????? ????????? ?????????????????????. ????????? ??????????????????.
                                    </GuideToggle>
                                ) : (
                                    <GuideToggle>
                                        ????????? ???????????? ????????????. ???? ????????? ?????? ?????????
                                        ??????????????????!
                                    </GuideToggle>
                                )}
                                <div>
                                    <label htmlFor="repo">??????????????? ?????? ??????</label>
                                    <CatagoryCheckInput type="checkbox" onChange={checkCatagory} />
                                </div>
                                <USER>{user === null ? '' : <ShowMember />}</USER>
                            </OrderContainer>
                        )}
                    </MainContainer>
                </section>
            </ErrorBoundary>
            <Footer />
        </>
    )
}
