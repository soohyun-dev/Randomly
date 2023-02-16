import { fireStore } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { selectUser } from "Features/userSlice";
import { useSelector } from "react-redux";

export default function UserTable({ packageId, member, id, idx }) {
  const [newMember, setNewMember] = useState<string>(member);
  const [update, setUpdate] = useState<boolean>(false);
  const [change, getChange] = useState<boolean>(false);
  const [updateBtnToggle, setUpdateBtnToggle] = useState<boolean>(false);
  const user = useSelector(selectUser);

  /**
   * 유저 이름 수정
   *
   * @param {Number} 수정할 유저의 id값
   */

  const updateQuestion = async (id) => {
    const questionDoc = doc(
      fireStore,
      `users/${user}/packages/${packageId}/members`,
      id
    );
    const newContent = { member: newMember };
    await updateDoc(questionDoc, newContent);
    await getChange(!change);
  };

  /**
   * 유저 삭제
   *
   * @param {Number} 삭제할 유저의 id값
   */
  const checkDelete = (id) => {
    const deleteQuestion = async (id) => {
      const memberDoc = doc(
        fireStore,
        `users/${user}/packages/${packageId}/members`,
        id
      );
      await deleteDoc(memberDoc);
    };
    if (window.confirm("정말 삭제합니까?")) {
      deleteQuestion(id);
      alert("삭제되었습니다.");
      getChange(!change);
    }
  };

  useEffect(() => {}, [change]);

  return (
    <>
      <Tr>
        <Td>{idx + 1}</Td>
        <UserTd>
          {update ? (
            <UserInput
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
          ) : (
            member
          )}
        </UserTd>
        <Td>
          {updateBtnToggle ? (
            <div>
              <Btn
                onClick={() => {
                  alert("수정 완료되었습니다.");
                  updateQuestion(id);
                  setUpdate(!update);
                  setUpdateBtnToggle(!updateBtnToggle);
                }}
              >
                수정 완료
              </Btn>
              <Btn
                onClick={() => {
                  setUpdate(!update);
                  setUpdateBtnToggle(!updateBtnToggle);
                }}
              >
                수정 취소
              </Btn>
            </div>
          ) : (
            <UpdateBtn
              onClick={() => {
                setUpdate(!update);
                setUpdateBtnToggle(!updateBtnToggle);
              }}
            >
              수정
            </UpdateBtn>
          )}
        </Td>
        <TdNoRight>
          <Btn
            onClick={() => {
              checkDelete(id);
            }}
          >
            삭제
          </Btn>
        </TdNoRight>
      </Tr>
    </>
  );
}

const Tr = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const Td = styled.td`
  padding: 1.5em 0;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const UserTd = styled.td`
  width: 40em;
  padding: 1.5em 0;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const TdNoRight = styled.td`
  padding: 1.5em 0;
  border-bottom: 1px solid #e0e0e0;
`;

const UserInput = styled.input`
  width: 15em;
  height: 3em;
  padding-left: 1em;
  border: 2px solid #eeeeee;
  border-radius: 10px;
`;

const Btn = styled.button`
  width: 6em;
  height: 2.5em;
  font-size: 14px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #424242;
  &:hover {
    opacity: 80%;
  }
  margin-right: 1em;
`;

const UpdateBtn = styled.button`
  width: 12.5em;
  height: 2.5em;
  font-size: 14px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #424242;
  &:hover {
    opacity: 80%;
  }
  margin-right: 1em;
`;
