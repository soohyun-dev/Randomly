import styled from "styled-components";
import Nav from "../../Components/Nav";
import ManageQuestion from "../../Components/ManageInterview/ManageQuestion";
import ManageUser from "../../Components/ManageInterview/MangageUser";
import { useEffect, useRef, useState } from "react";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { fireStore } from "../../firebase";
import { ManageQuestionInfo } from "./types";
import { getDateTime } from "Utils/getTime";

export default function Manage() {
  const MiniTitle = styled.label<{ target?: any }>`
    padding: 0 0.5em;
    font-size: 24px;
    cursor: pointer;
    color: ${(props) => (props.target === page ? "black" : "#e0e0e0")};
    text-decoration: ${(props) => (props.target === page ? "underline" : "")};
    text-underline-position: under;
    &:hover {
      opacity: 80%;
    }
  `;
  const [show, setShow] = useState<boolean>(false);
  const [page, setPage] = useState<string>("question");
  const [nowPackage, setNowPackage] = useState("0");
  const packages = useRef<ManageQuestionInfo[]>([]);
  const user = useSelector(selectUser);
  const packageInfo = collection(fireStore, `users/${user}/packages`);

  const getQuestions = async () => {
    const packageData = await getDocs(
      query(packageInfo, orderBy("time", "asc"))
    );
    packages.current = packageData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShow(true);
  };
  console.log(packages.current);

  const changeView = (value) => {
    setPage(value);
  };
  const plusPackage = async () => {
    if (window.confirm("새로운 폴더를 추가하시겠습니까?")) {
      alert("추가되었습니다!");
      const idx = getDateTime();
      await addDoc(packageInfo, {
        idx: idx,
        title: `새폴더`,
        time: new Date(),
        questions: [],
        member: [{ time: new Date() }],
      });

      await window.location.reload();
    }
  };

  useEffect(() => {
    getQuestions();
  }, [nowPackage]);

  return (
    <>
      <Nav />
      <TitleSection>
        <Title>MANAGE</Title>
      </TitleSection>
      <section style={{ textAlign: "center" }}>
        <div style={{ textAlign: "center", display: "inline" }}>
          <MiniTitle
            target={"question"}
            onClick={() => {
              changeView("question");
            }}
          >
            질문 관리
          </MiniTitle>
          <MiniTitle>|</MiniTitle>
          <MiniTitle
            target={"user"}
            onClick={() => {
              changeView("user");
            }}
          >
            참여자 관리
          </MiniTitle>
        </div>
        <div>
          <PlusBtn onClick={() => plusPackage()}>질문 폴더 추가</PlusBtn>
        </div>
      </section>
      <PackageSection>
        <PackageDiv>
          {!show
            ? ""
            : Object.keys(packages.current).map((v, idx) => (
                <PackageBox
                  onClick={() => {
                    setNowPackage(v);
                  }}
                >
                  {packages.current[v].idx}
                </PackageBox>
              ))}
        </PackageDiv>
      </PackageSection>
      <PackageTitleDiv>
        <PackageTitleText>
          {show && packages.current[nowPackage].title}
        </PackageTitleText>
      </PackageTitleDiv>
      {user !== null ? (
        ""
      ) : (
        <ManageAccessSection>
          <ManageAccessTitle>로그인 해주세요😋</ManageAccessTitle>
        </ManageAccessSection>
      )}
      {page === "question"
        ? user !== null &&
          show && (
            <ManageQuestion
              packageId={packages.current[nowPackage].id}
              nowPackage={nowPackage}
            />
          )
        : user !== null && <ManageUser />}
      <Footer />
    </>
  );
}

const TitleSection = styled.section`
  margin-bottom: 3em;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin: 3em 0 2em 0;
`;

const ManageAccessSection = styled.section`
  text-align: center;
  margin: 5em 0;
`;

const ManageAccessTitle = styled.label`
  margin: 0 1em;
`;

const PlusBtn = styled.button`
  width: 10em;
  height: 3em;
  margin: 6em 0 3em 0;
  border: none;
  border-radius: 10px;
  background-color: #f5f5f5;
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
`;

const PackageSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PackageTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 5em 0;
`;

const PackageTitleText = styled.p`
  font-size: 24px;
`;

const PackageDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PackageBox = styled.div`
  width: 15em;
  height: 10em;
  border: none;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 2em 1em;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }
`;
