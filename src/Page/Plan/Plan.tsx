import Nav from 'Components/Nav'
import ErrorPage from 'Page/Error'
import { ErrorBoundary } from 'react-error-boundary'
import { PlanSection } from './Plan.styled'

export default function Plan() {
    return (
        <>
            <Nav />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <PlanSection />
            </ErrorBoundary>
        </>
    )
}
