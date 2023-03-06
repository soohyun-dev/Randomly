import styled from 'styled-components'

export const PostingBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    text-align: left;
    width: 16em;
    height: 10em;
    padding: 0 1em;
    background-color: var(--QA-PostingBox);
    border-radius: 10px;
    border: none;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
        transition: 0.3s;
    }
    &:visited {
        text-decoration: none;
        color: black;
    }
`

export const TitleBox = styled.div`
    margin-top: 1em;
    height: 2em;
`

export const ContentBox = styled.div`
    align-content: center;
    height: 4em;
    color: #777;
`

export const WriterBox = styled.div`
    display: flex;
    justify-content: space-between;
`

export const WriteText = styled.p`
    color: #777;
`
