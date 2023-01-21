import { useState } from "react";
import MakeNums from "../Utils/MakeNums";
import styled from "styled-components";

const MainContainer = styled.div`
  position: absolute;
  left: 40%;
  top: 30%;
`;

const Main = () => {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState([]);
  const [bool, setBool] = useState(false);

  const memeber = ["수현", "선주", "루비", "캐미"];

  const makeArray = (e) => {
    e.preventDefault();
    setResult(MakeNums(number));
    setBool(true);
  };

  const getResult = (user) => {
    const cnt = +(result.length / memeber.length);
    for (let i = 0; i < cnt; i++) return <h3>{result.join(" ")}</h3>;
  };

  return (
    <>
      <div>
        <MainContainer>
          <input onChange={(e) => setNumber(e.target.value)} />
          <button onClick={makeArray}>생성</button>
          {memeber.forEach((user) => {
            return getResult(user);
          })}
        </MainContainer>
      </div>
    </>
  );
};

export default Main;
