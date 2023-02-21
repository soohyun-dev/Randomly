import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0rem;
  }

  body{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    background-color: ${({ theme }) => (theme ? "#2D3436;" : "white")}
    color: #bdc1c6;
  }

  button{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }

  :root {
    --navbar-box: ${({ theme }) => (theme ? "#757575" : "white")};
    --logo-text: ${({ theme }) => (theme ? "#bdc1c6" : "#5C8AFF")};
    --gray-text: ${({ theme }) => (theme ? "#bdc1c6" : "black")};
    --containter-box: ${({ theme }) => (theme ? "#37474f" : "#f5f5f5")};
    --div-line: ${({ theme }) => (theme ? "#757575" : "#eeeeee")};
    --Notice-PostingBox: ${({ theme }) => (theme ? "#757575" : "#f5f5f5")};
    --QA-PostingBox: ${({ theme }) => (theme ? "#757575" : "#f5f5f5")};
  }
`;

export default GlobalStyle;
