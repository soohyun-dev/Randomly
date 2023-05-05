import styled from 'styled-components'

interface Choose {
    select: boolean
}

export const ReviewPaginationSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
`
export const ReviewPaginationButton = styled.button<Choose>`
    margin: 0.3rem;
    padding: 0.3rem 0.7rem;
    border: none;
    border-radius: 8px;
    color: ${(props) => (props.select === true ? '#fff' : 'gray')};
    background: ${(props) => (props.select === true ? '#3f76ff' : '#fff')};
    cursor: pointer;
`
