import Nav from 'Components/Nav'
import ErrorPage from 'Page/Error'
import { ErrorBoundary } from 'react-error-boundary'
import { createStyles, rem } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { PlanSection } from './Plan.styled'

const useStyles = createStyles((theme) => ({
    input: {
        height: rem(54),
        paddingTop: rem(18),
    },

    label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: `calc(${theme.spacing.sm} / 2)`,
        zIndex: 1,
    },
}))

export default function Plan() {
    const [date, setDate] = useState(new Date())
    const { classes } = useStyles()

    console.log(date)
    return (
        <>
            <Nav />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <PlanSection style={{ textAlign: 'center' }}>
                    <div>
                        <DatePickerInput
                            mt="md"
                            popoverProps={{ withinPortal: true }}
                            label="스터디 날짜"
                            placeholder="다음 스터디는 언제?"
                            classNames={classes}
                            clearable={false}
                            onChange={setDate}
                        />
                    </div>
                </PlanSection>
                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심좌표
                        lat: 33.450701,
                        lng: 126.570667,
                    }}
                    style={{
                        // 지도의 크기
                        width: '100%',
                        height: '450px',
                    }}
                    level={3} // 지도의 확대 레벨
                />
            </ErrorBoundary>
        </>
    )
}
