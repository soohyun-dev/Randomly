import styled from 'styled-components'

interface TextArea {
    value: string
    rows: string
    cols: string
}

export const WriteNoticeSection = styled.section`
    text-align: center;
    margin: 7em 0;
`

export const Title = styled.p`
    font-size: 40px;
    font-weight: 600;
`

export const ContentTextArea = styled.textarea`
    width: 800px;
    height: 1000px;
    white-space: pre-wrap;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`
