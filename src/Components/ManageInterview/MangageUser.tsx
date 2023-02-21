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
import { selectUser } from "features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { memberSlice, selectMember } from "features/memberSlice";
import { chooseFolder, chooseId } from "features/folderSlice";

export default function ManageUser() {
  const [newMember, setNewMember] = useState<string>("");
  const users = useRef<ManageUserInfo[]>([]);
  const user = useSelector(selectUser);
  const member = useSelector(selectMember);
  const now = useSelector(chooseFolder);
  const dispatch = useDispatch();
  const folderId = useSelector(chooseId);
  const userInfo = collection(
    fireStore,
    `users/${user}/packages/${folderId}/members`
  );

  const getUsers = async () => {
    const userData = await getDocs(query(userInfo, orderBy("time", "asc")));
    users.current = userData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    dispatch(
      memberSlice.actions.setMember({
        members: userData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      })
    );
  };

  console.log(member);

  /**
   * 유저 추가
   *
   * @param {Number}
   */
  const addUser = async () => {
    const idx = Object.keys(users.current).length;
    const newData = {};
    newData["idx"] = idx;
    newData["member"] = newMember;
    newData["time"] = new Date();
    await addDoc(userInfo, newData);
    alert("유저가 추가되었습니다.");
    setNewMember("");
    getUsers();
  };

  const enterSubmit = (e) => {
    if (e.key === "Enter") {
      addUser();
    }
  };

  useEffect(() => {
    getUsers();
  }, [newMember, folderId, now]);

  return (
    <>
      <UserListContainer>
        <div>
          <div>
            <UserInput
              value={newMember}
              type="text"
              placeholder="추가할 참여자를 입력해주세요."
              onChange={(e) => {
                setNewMember(e.target.value);
              }}
              onKeyDown={enterSubmit}
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
              {Object.keys(users.current).map((v, idx) => (
                <UserTable
                  member={users.current[~~v].member}
                  id={users.current[~~v].id}
                  idx={idx}
                />
              ))}
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
