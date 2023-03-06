import styled from 'styled-components'

export const PostingBox = styled.div`
    display: flex;
    margin: 3em 2em;
    color: black;
    background-color: var(--Notice-PostingBox);
    width: 50em;
    height: 4em;
    border-radius: 15px;
    cursor: pointer;
    align-items: center;
    &:hover {
        box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
        transition: 0.3s;
    }
    &:visited {
        text-decoration: none;
        color: black;
    }
`

export const IdxDiv = styled.div`
    width: 15%;
`

export const TitleDiv = styled.div`
    text-align: left;
    width: 65%;
`

export const DateDiv = styled.div`
    width: 30%;
    color: #777;
`
