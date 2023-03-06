import styled from "styled-components";
import Nav from "../../Components/Nav";
import ManageQuestion from "../../Components/ManageInterview/ManageQuestion";
import ManageUser from "../../Components/ManageInterview/MangageUser";
import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { fireStore } from "../../firebase";
import { getDateTime } from "Utils/getTime";
import { folderSlice, selectFolder } from "features/folderSlice";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "Page/Error";
import {
  ManageAccessSection,
  ManageAccessTitle,
  ManageHeaderDiv,
  ManageHeaderSection,
  PackageBox,
  PackageDate,
  PackageDiv,
  PackageSection,
  PackageTitle,
  PackageTitleDiv,
  PackageTitleText,
  PlusBtn,
  Title,
  TitleSection,
} from "./styles";

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const folders = useSelector(selectFolder);
  const packageInfo = collection(fireStore, `users/${user}/packages`);

  const getPackages = async () => {
    const packageData = await getDocs(
      query(packageInfo, orderBy("time", "asc"))
    );

    dispatch(
      folderSlice.actions.setFolder({
        folders: packageData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      })
    );
    setShow(true);
  };

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
      });

      await window.location.reload();
    }
  };

  useEffect(() => {
    if (user !== null) {
      getPackages();
      if (folders.length >= 1) {
        dispatch(
          folderSlice.actions.choose({
            id: folders[nowPackage].id,
          })
        );
      }
    }
  }, [nowPackage]);

  return (
    <>
      <Nav />
      <TitleSection>
        <Title>MANAGE</Title>
      </TitleSection>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <ManageHeaderSection>
          <ManageHeaderDiv>
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
          </ManageHeaderDiv>
          {user !== null && (
            <div>
              <PlusBtn onClick={() => plusPackage()}>질문 폴더 추가</PlusBtn>
            </div>
          )}
        </ManageHeaderSection>
        <PackageSection>
          <PackageDiv>
            {Object.keys(folders).map((v, idx) => (
              <PackageBox
                onClick={() => {
                  setNowPackage(v);
                  dispatch(
                    folderSlice.actions.choose({
                      choose: v,
                    })
                  );
                }}
              >
                <PackageTitle>{folders[v].title}</PackageTitle>
                <PackageDate>{folders[v].idx.slice(0, 10)}</PackageDate>
              </PackageBox>
            ))}
          </PackageDiv>
        </PackageSection>
        <PackageTitleDiv>
          <PackageTitleText>
            {show && folders.length > 0 && folders[nowPackage].title}
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
          ? user !== null && show && folders.length > 0 && <ManageQuestion />
          : user !== null && <ManageUser />}
      </ErrorBoundary>
      <Footer />
    </>
  );
}
