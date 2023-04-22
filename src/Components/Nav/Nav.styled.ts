import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface Scroll {
    scroll: string
    isModalOpen?: boolean
}

export const TopHeader = styled.header<Scroll>`
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 600;
    display: grid;
    grid-template-columns: 2fr 6fr 1fr 1fr;
    padding: 15px 15px 10px 15px;
    font-size: 28px;
    color: ${(props) => (props.scroll === 'origin' ? 'white' : 'black')};
    background-color: ${(props) => (props.scroll === 'origin' ? '' : 'white')};
    box-shadow: ${(props) => (props.scroll === 'origin' ? '' : '0px 4px 4px rgba(0, 0, 0, 0.06)')};
    text-align: center;
    align-items: center;
    opacity: ${({ isModalOpen }) => (isModalOpen ? '0.2' : '1')};
    pointer-events: ${({ isModalOpen }) => (isModalOpen ? 'none' : '')};
    &:visited {
        text-decoration: none;
        color: black;
    }
    @media screen and (max-width: 700px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
`

export const LinkText = styled(Link)<Scroll>`
    text-decoration: none;
    color: ${(props) => (props.scroll === 'origin' ? 'white' : 'black')};
`

export const Logo = styled.div`
    font-weight: bold;
`

export const LogoText = styled.p<Scroll>`
    color: ${(props) => (props.scroll === 'origin' ? 'white' : '#3f76ff')};
`

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;
    @media screen and (max-width: 700px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
        position
    }
`

export const MenuText = styled.p`
    font-weight: 500;
    padding: 0 1.5em;
    &:hover {
        font-weight: bold;
        transition: 0.8s;
    }
`

export const Option = styled.div`
    font-size: 16px;
`

export const UserLabel = styled.label`
    margin-right: 0.5em;
`
export const Logout = styled.button<Scroll>`
    padding: 0.5em 0.5em;
    background-color: transparent;
    border: none;
    color: ${(props) => (props.scroll === 'origin' ? 'white' : 'black')};
    cursor: pointer;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    &:hover {
        opacity: 70%;
    }
`
