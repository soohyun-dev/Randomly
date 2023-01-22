import { useEffect, useId, useState } from "react";
import MakeNums from "../Utils/MakeNums";
import styled from "styled-components";
import { fireStore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MainContainer = styled.div`
  position: absolute;
  left: 40%;
  top: 30%;
`;

const Main = () => {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState([]);
  const [bool, setBool] = useState(false);
  const member = ["ㅇㅇ"];
  const uniqueId = useId();

  const userInfo = collection(fireStore, "member");
  console.log(userInfo, 1);

  const makeArray = (e) => {
    e.preventDefault();
    setResult(MakeNums(number));
    setBool(true);
  };

  const getResult = (user) => {
    const cnt = +(result.length / member.length);
    for (let i = 0; i < cnt; i++) return <h3>{result.join(" ")}</h3>;
  };

  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(userInfo);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  console.log(users);

  const showUsers = users.map((value) => (
    <div key={uniqueId}>
      <h1>Name: {value.name}</h1>
    </div>
  ));

  return (
    <>
      <div>
        <MainContainer>
          <input onChange={(e) => setNumber(e.target.value)} />
          <button onClick={makeArray}>생성</button>
          {member.forEach((user) => {
            return getResult(user);
          })}
          {showUsers}
        </MainContainer>
      </div>
    </>
  );
};

export default Main;
