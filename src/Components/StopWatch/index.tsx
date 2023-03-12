import { useRef, useEffect, useState } from 'react'
import { StopWatchContainer, Timer, TimerBtn } from './styles'

export default function StopWatch() {
    const [min, setMin] = useState<number>(0)
    const [sec, setSec] = useState<number>(0)
    const [isRun, setIsRun] = useState<boolean>(false)
    const [btnColor, setbtnColor] = useState<boolean>(false)
    const time = useRef<number>(0)
    const timerId = useRef<any>(null)

    const checkIsRun = () => {
        setIsRun(!isRun)
        setbtnColor(!btnColor)
    }

    const resetCnt = () => {
        time.current = 0
        setMin(0)
        setSec(0)
        setIsRun(false)
        setbtnColor(false)
    }

    useEffect(() => {
        if (isRun) {
            timerId.current = window.setInterval(() => {
                setMin(+(time.current / 60))
                setSec(time.current % 60)
                time.current += 1
            }, 1000)
        }

        return () => clearInterval(timerId.current)
    }, [isRun])

    return (
        <StopWatchContainer>
            <Timer>
                {min} 분 {sec} 초
            </Timer>
            {isRun ? (
                <TimerBtn color={btnColor} onClick={checkIsRun}>
                    중지
                </TimerBtn>
            ) : (
                <TimerBtn color={btnColor} onClick={checkIsRun}>
                    시작
                </TimerBtn>
            )}
            <TimerBtn onClick={resetCnt}>초기화</TimerBtn>
        </StopWatchContainer>
    )
}
