import { useEffect, useState } from "react";
import { fireStore } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import styled from "styled-components";
import { useRef } from "react";
import UserTable from "../../Components/ManageInterview/UserTable";

export default function ManageUser() {
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState("");
  const users = useRef([]);
  const userInfo = collection(fireStore, "member");

  const getUsers = async () => {
    const userData = await getDocs(query(userInfo, orderBy("time", "asc")));
    users.current = userData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
    console.log(users.current);
  };

  /**
   * 유저 추가
   *
   * @param {Number}
   */
  const addUser = async () => {
    const idx = Object.keys(users.current).length;
    const newData = {};
    newData["idx"] = idx;
    newData["user"] = newUser;
    newData["time"] = new Date();
    await addDoc(userInfo, newData);
    alert("유저가 추가되었습니다.");
    getUsers();
    window.location.reload();
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <>
      <UserListContainer>
        <div>
          <div>
            <UserInput
              type="text"
              placeholder="추가할 유저를 입력해주세요."
              onChange={(e) => {
                setNewUser(e.target.value);
              }}
            />
            <AddBtn onClick={addUser}>유저 추가</AddBtn>
          </div>
          <div style={{ display: "inline-block" }}>
            <Table border="1">
              <thead>
                <tr>
                  <Th>No.</Th>
                  <Th>유저</Th>
                  <Th>수정하기</Th>
                  <ThNoRight>삭제하기</ThNoRight>
                </tr>
              </thead>
              {show
                ? Object.keys(users.current).map((v, idx) => (
                    <UserTable
                      user={users.current[~~v].user}
                      id={users.current[~~v].id}
                      idx={idx}
                    />
                  ))
                : ""}
            </Table>
          </div>
        </div>
      </UserListContainer>
    </>
  );
}

const UserInput = styled.input`
  width: 40em;
  height: 3em;
  padding-left: 1em;
  border: 2px solid #eeeeee;
  border-radius: 10px;
  margin: 2em 0 5em 5em;
`;

const UserListContainer = styled.div`
  text-align: center;
  margin: 5em 0;
`;

const AddBtn = styled.button`
  width: 6em;
  height: 3em;
  margin: 0 1em;
  font-size: 14px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #424242;
  &:hover {
    opacity: 80%;
  }
`;

const Table = styled.table`
  width: 70em;
  border-top: 2px solid;
`;

const Th = styled.th`
  padding: 2em 0;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const ThNoRight = styled.th`
  padding: 2em 0;
  border-bottom: 1px solid #e0e0e0;
`;
