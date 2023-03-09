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
import { QuestionInfo } from './types'
import { fireStore } from '../../firebase'
import {
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
} from './styles'
import getEqualDistribution from 'utils/EqualDistribution'

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
    let questions = useSelector(selectQuestions)
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
            console.log('균등결과물', resultArray)
        } else {
            // 카테고리별 균등 분배 선택안할시
            resultArray = getQuestionNums(member.length, Object.keys(questions).length)
            console.log('노균등결과물', resultArray)
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

    const changePackage = () => {
        dispatch(playSlice.actions.setChangeFolder())
        getUsers()
        setBool(false)
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
        questions = useSelector(selectQuestions)
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
                                    <ShuffleName onClick={shuffleName}>이름 순서 변경</ShuffleName>
                                </div>
                                <div>
                                    <MakeQuestionNums color={bool} onClick={makeArray}>
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
                                    <label>카테고리별 균등 분배</label>
                                    <input type="checkbox" onChange={checkCatagory} />
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
