import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

export default function StopWatch() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [isRun, setIsRun] = useState(false);
  const [btnColor, setbtnColor] = useState(false);
  const time = useRef(0);
  const timerId = useRef(null);

  const checkIsRun = () => {
    setIsRun(!isRun);
    setbtnColor(!btnColor);
  };

  const resetCnt = () => {
    time.current = 0;
    setMin(0);
    setSec(0);
    setIsRun(false);
    setbtnColor(false);
  };

  useEffect(() => {
    if (isRun) {
      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);
        time.current += 1;
      }, 1000);
    }

    return () => clearInterval(timerId.current);
  }, [isRun]);

  useEffect(() => {});

  return (
    <>
      <StopWatchContainer>
        <Timer>
          {min} 분 {sec} 초
        </Timer>
        {isRun ? (
          <TimerBtn color={btnColor} onClick={checkIsRun}>
            중지
          </TimerBtn>
        ) : (
          <TimerBtn color={btnColor} onClick={checkIsRun}>
            시작
          </TimerBtn>
        )}
        <TimerBtn onClick={resetCnt}>초기화</TimerBtn>
      </StopWatchContainer>
    </>
  );
}

const StopWatchContainer = styled.div`
  margin-left: 1em;
  display: flex;
`;

const Timer = styled.div`
  font-size: 20px;
  line-height: 35px;
  color: #4caf50;
  margin-right: 1em;
`;

const TimerBtn = styled.button`
  cursor: pointer;
  width: 4em;
  margin: 0 0.2em;
  color: white;
  border: none;
  background-color: ${(props) => (props.color ? "red" : "#bdbdbd")};
  border-radius: 10px;
  font-size: 15px;
  fint-weight: 600;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  &:hover {
    opacity: 70%;
  }
`;
