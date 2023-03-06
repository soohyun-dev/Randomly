import styled from 'styled-components'

export const Title = styled.h1`
    font-size: 44px;
`

export const QAListBox = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 5em 4em;
    margin: 5em 0;
`

export const TitleDiv = styled.div`
    width: 90%;
`

export const WriteBox = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const WriteBtn = styled.button`
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    width: 5em;
    height: 2.5em;
    border-radius: 10px;
    border: none;
    background-color: #f5f5f5;
    cursor: pointer;
    &:hover {
        opacity: 70%;
    }
`
