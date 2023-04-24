import Nav from 'Components/Nav'
import ErrorPage from 'Page/Error'
import { ErrorBoundary } from 'react-error-boundary'
import PlanWrite from 'Components/Plan/PlanWrite'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import { Link } from 'react-router-dom'
import useStudySchedule from 'hooks/useStudySchedule'
import PlanPosting from 'Components/Plan/PlanPosting'
import {
    LinkLoginBtn,
    ManageAccessSection,
    ManageAccessTitle,
    PlanGuideParagraph,
    PlanGuideTextBox,
    PlanPostingListBox,
    PlanPostingSection,
    PlanTitleBox,
    PlanTitleParagraph,
    PlanTitleSection,
    PlanWriteSection,
} from './Plan.styled'

export default function Plan() {
    const user = useSelector(selectUser)

    const { data: studyScheduleData, isLoading } = useStudySchedule()

    return (
        <>
            <Nav />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <PlanTitleSection>
                    <PlanTitleBox>
                        <PlanTitleParagraph>Plan</PlanTitleParagraph>
                        <PlanGuideParagraph>스터디 일정</PlanGuideParagraph>
                    </PlanTitleBox>
                </PlanTitleSection>
                <PlanPostingSection>
                    {Object.keys(studyScheduleData).length === 0 ? (
                        <PlanGuideTextBox>
                            <p>등록된 일정이 없어요! 스터디 일정을 등록해주세요.💁‍♂️</p>
                            <p>⬇️⬇️</p>
                        </PlanGuideTextBox>
                    ) : (
                        <PlanPostingListBox>
                            {Object.keys(studyScheduleData).map((schedule) => (
                                <PlanPosting
                                    key={studyScheduleData[schedule].id}
                                    {...studyScheduleData[schedule]}
                                />
                            ))}
                        </PlanPostingListBox>
                    )}
                </PlanPostingSection>
                {user !== null ? (
                    <PlanWriteSection>
                        <PlanWrite />
                    </PlanWriteSection>
                ) : (
                    <ManageAccessSection>
                        <ManageAccessTitle>로그인 해주세요😋</ManageAccessTitle>
                        <Link to="/Login" style={{ textDecoration: 'none', color: 'black' }}>
                            <LinkLoginBtn>로그인하러 가기 ➡️</LinkLoginBtn>
                        </Link>
                    </ManageAccessSection>
                )}
            </ErrorBoundary>
        </>
    )
}
