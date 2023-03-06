import styled from "styled-components";

export default function Loding() {
  return (
    <>
      <LodingDiv>
        <p>로딩중...</p>
      </LodingDiv>
    </>
  );
}

const LodingDiv = styled.div`
  background-color: blue;
`;
