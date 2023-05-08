import styled from 'styled-components'

export const ReviewAllSection = styled.section`
    z-index: -10;
`

export const ReviewSection = styled.section<{ props }>`
    display: flex;
    justify-content: center;
    margin: 10em 0 5em 0;
    z-index: 1;
    opacity: ${({ props }) => (props ? '0' : '1')};
`

export const ReviewContent = styled.div`
    text-align: center;
`

export const ReviewTitleParagraph = styled.p`
    margin: 0.5em 0;
    font-size: 36px;
`

export const ReviewTitleContent = styled.p`
    font-size: 24px;
    color: gray;
`

export const ReviewSearchInput = styled.input`
    margin: 1em 0;
    width: 15em;
    height: 2em;
    border-radius: 5px;
    font-size: 20px;
    padding: 0 1em;
`

export const ReviewSearchButton = styled.button`
    width: 5em;
    height: 2.5em;
    margin: 0 1em;
    border-radius: 5px;
`
export const ReviewCatagorySection = styled.section`
    display: flex;
    justify-content: flex-end;
    width: 90%;
`

export const ReviewCatagoryBox = styled.div``
