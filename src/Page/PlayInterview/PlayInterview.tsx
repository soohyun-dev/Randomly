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
import { useFolder, useMember, useQuestion } from 'hooks'
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

type Time = {
    seconds: number
    nanoseconds: number
}

type Data = {
    question: string
    catagory: string
    time: Time
    idx: number
    id: string
}

export default function PlayInterview() {
    const dispatch = useDispatch()
    const [firstRender, setFirstRender] = useState(false)
    const [bool, setBool] = useState(false)
    const [nowPackage, setNowPackage] = useState('0')
    const [isChecked, setIsChecked] = useState(false)
    const user = useSelector(selectUser)
    const folderId = useSelector(chooseId)
    const member = useSelector(selectMember)
    const distribution = useSelector(selectDistribution)
    const { data: folders, isLoading: isFolderLoading } = useFolder(nowPackage)
    const { data: questions }: { data: Data[] } = useQuestion(folderId)
    console.log(JSON.stringify(questions))
    const { data: memberData, isLoading: isMemberLoading } = useMember(folderId)
    const userInfo =
        folderId === ''
            ? collection(fireStore, `users/${user}/packages`)
            : collection(fireStore, `users/${user}/packages/${folderId}/members`)

    const questionInfo =
        folderId === ''
            ? collection(fireStore, `users/${user}/questions`)
            : collection(fireStore, `users/${user}/packages/${folderId}/questions`)

    /**
     * 질문의 각 인덱스를 팀원에게 shuffle해서 분배시킨다.
     * 버튼을 누를 때마다 랜덤의 번호들이 생성되어 팀원들에게 부여된다.
     *
     * @param {e} 질문 분배 버튼 이벤트
     */
    const makeArray = () => {
        let resultArray = []
        if (isChecked) {
            // 카테고리별 균등 분배 선택시
            resultArray = getEqualDistribution(member.length, questions)
        } else {
            // 카테고리별 균등 분배 선택안할시
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
        alert('질문 분배가 완료되었습니다!')
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
        console.log('멤버', member)

        dispatch(
            playSlice.actions.setOrderMember({
                orderMember: Array.from({ length: member.length }, (_, idx) => idx),
            })
        )
    }

    const shuffleName = () => {
        const newOrder = MakeNums(Object.keys(member).length)
        dispatch(
            playSlice.actions.setOrderMember({
                orderMember: newOrder,
            })
        )

        alert('순서 변경이 완료되었습니다!')
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
            getUsers()
            setNowPackage(nowPackage)
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
                        팀원끼리 서로 랜덤의 질문을 배정받고 인터뷰 연습을 하는 공간입니다.
                    </PageGuide>
                    {user === null ? '' : <PageGuide>인터뷰를 할 폴더를 골라주세요. </PageGuide>}
                </section>
                <PackageSection>
                    <PackageDiv>
                        {!isFolderLoading &&
                            Object.keys(folders).map((v) => (
                                <PackageBox
                                    onClick={() => {
                                        setNowPackage(v)
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
                        {folders !== undefined && folders.length > 0 && folders[nowPackage].title}
                    </PackageTitleText>
                </PackageTitleDiv>

                <section style={{ textAlign: 'center' }}>
                    <MainContainer>
                        {user === null ? (
                            <ManageAccessSection>
                                <ManageAccessTitle>로그인 해주세요😋</ManageAccessTitle>
                                <Link
                                    to="/Login"
                                    style={{ textDecoration: 'none', color: 'black' }}
                                >
                                    <LinkLoginBtn>로그인하러 가기 ➡️</LinkLoginBtn>
                                </Link>
                            </ManageAccessSection>
                        ) : (
                            <OrderContainer>
                                <div>
                                    <ShuffleName onClick={() => shuffleName()}>
                                        이름 순서 변경
                                    </ShuffleName>
                                </div>
                                <div>
                                    <MakeQuestionNums color={bool} onClick={() => makeArray()}>
                                        {bool ? '질문 재분배' : '질문 분배 시작'}
                                    </MakeQuestionNums>
                                </div>

                                {bool ? (
                                    <GuideToggle>
                                        질문 분배가 완료되었습니다. 질문을 확인해주세요.
                                    </GuideToggle>
                                ) : (
                                    <GuideToggle>
                                        질문이 분배되기 전입니다. 🔼 버튼을 눌러 질문을
                                        분배해주세요!
                                    </GuideToggle>
                                )}
                                <div>
                                    <label htmlFor="repo">카테고리별 균등 분배</label>
                                    <CatagoryCheckInput type="checkbox" onChange={checkCatagory} />
                                </div>
                                <USER>{user === null ? '' : <ShowMember />}</USER>
                            </OrderContainer>
                        )}
                    </MainContainer>
                </section>
                <Footer />
            </ErrorBoundary>
        </>
    )
}
