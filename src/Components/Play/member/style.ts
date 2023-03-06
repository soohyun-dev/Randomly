import styled from "styled-components";

export const UserContainer = styled.div`
  background-color: var(--containter-box);
  width: 80em;
  border-radius: 10px;
`;

export const NameContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 40px 0;
  padding: 30px 40px;
`;

export const MemberTitle = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

export const MemberName = styled.label`
  font-size: 22px;
  background-color: #651fff;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
`;

export const UpperLeft = styled.div`
  width: 20%;
`;

export const UpperMiddle = styled.div`
  width: 55%;
`;

export const UpperRight = styled.div`
  width: 25%;
`;

export const USER = styled.div`
  display: inline-block;
`;

export const CorrectText = styled.label`
  font-size: 22px;
  font-weight: 600;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const NoticeText = styled.p`
  margin: 2em 0;
  padding: 3em 0;
`;

export const OpenButton = styled.button<{ color: any }>`
  cursor: pointer;
  width: 120px;
  height: 40px;
  margin: 20px 0;
  color: white;
  background-color: ${({ color }) => (color ? "#00695c" : "#5c8aff")};
  border: none;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 600;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  &:hover {
    opacity: 70%;
  }
`;
