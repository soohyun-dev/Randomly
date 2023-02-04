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
import UserTable from "./UserTable";
import { ManageUserInfo } from "./types";

export default function ManageUser() {
  const [show, setShow] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<string>("");
  const users = useRef<ManageUserInfo[]>([]);
  const userInfo = collection(fireStore, "member");

  const getUsers = async () => {
    const userData = await getDocs(query(userInfo, orderBy("time", "asc")));
    users.current = userData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
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
    setNewUser("");
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, [users, newUser]);

  return (
    <>
      <UserListContainer>
        <div>
          <div>
            <UserInput
              value={newUser}
              type="text"
              placeholder="추가할 참여자를 입력해주세요."
              onChange={(e) => {
                setNewUser(e.target.value);
              }}
            />
            <AddBtn onClick={addUser}>참여자 추가</AddBtn>
          </div>
          <div style={{ display: "inline-block" }}>
            <Table>
              <thead>
                <tr>
                  <Th>No.</Th>
                  <Th>참여자</Th>
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
  width: 7em;
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
  padding: 1em 0;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const ThNoRight = styled.th`
  padding: 1em 0;
  border-bottom: 1px solid #e0e0e0;
`;
