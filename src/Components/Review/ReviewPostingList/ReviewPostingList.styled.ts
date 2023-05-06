import styled from 'styled-components'

export const ReviewPostingListSection = styled.section<{ props }>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 3em 5em;
    opacity: ${({ props }) => (props ? '0.1' : '1')};
`
