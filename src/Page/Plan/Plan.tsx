import Nav from 'Components/Nav'
import ErrorPage from 'Page/Error'
import { ErrorBoundary } from 'react-error-boundary'
import PlanWrite from 'Components/Plan/PlanWrite'
import {
    PlanGuideParagraph,
    PlanTitleBox,
    PlanTitleParagraph,
    PlanTitleSection,
    PlanWriteSection,
} from './Plan.styled'

export default function Plan() {
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
                <PlanWriteSection>
                    <PlanWrite />
                </PlanWriteSection>
            </ErrorBoundary>
        </>
    )
}
