import styled from 'styled-components'

interface TimeInfo {
    color?: any
    onClick?: () => void
}

export const StopWatchContainer = styled.div`
    margin-left: 1em;
    display: flex;
`

export const Timer = styled.div`
    font-size: 20px;
    line-height: 35px;
    color: #4caf50;
    margin-right: 1em;
`

export const TimerBtn = styled.button<TimeInfo>`
    cursor: pointer;
    width: 4em;
    margin: 0 0.2em;
    color: white;
    border: none;
    background-color: ${({ color }) => (color ? 'red' : '#bdbdbd')};
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    &:hover {
        opacity: 70%;
    }
`
