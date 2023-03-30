![image](https://user-images.githubusercontent.com/81623931/224643522-615a379a-8e20-4634-90e0-88b81a5f6df2.png)

<div align='center'>
    <h1>Randomly</h1>

```
  "질문 관리 및 분배" 개인 프로젝트
    (2023년 1월 18일 ~ 🏃‍♂️)
```

  <br>
  
[🗳️ Randomly 홈페이지](https://randomly.pages.dev/)
  
</div>

<br><br><br>

## 🗳️ 목차

1. [🗳️ 프로젝트 소개](#🗳️-프로젝트-소개)
2. [🖥️ 프로젝트 화면](#🖥️-프로젝트-화면)
3. [🛠️ 사용 기술](#🛠️-사용-기술)
4. [📌 컨벤션](#📌-컨벤션)
5. [🏃‍♂️ 프로젝트 진행과정](#📌-컨벤션)
6. [🎰 기능 소개](#🎰-기능-소개)
7. [📜 개발 기록](#📜-개발-기록)
8. [🗂️ 프로젝트 구조](#🗂️-프로젝트-구조)

    <br><br><br>

# 🗳️ 프로젝트 소개

### 1️⃣ 계정별 폴더 등록 관리 서비스

각 계정마다 고유의 폴더에 각각의 질문들을 정의하고 팀원들을 등록할 수 있어요!

<br>

### 2️⃣ 카테고리별 질문 등록 서비스

어떠한 유형의 질문인지 카테고리를 설정하고 같이 등록해보세요!

<br>

### 3️⃣ 질문 분배 서비스

질문과 카테고리, 팀원들을 모두 등록하셨나요?

그럼 이제 질문을 랜덤으로 분배 받고 스터디를 진행해보세요!

카테고리 별로 균등하게 분배도 가능하고, 카테고리 상관없이 분배 받을 수 도 있어요!

<br>

### 4️⃣ Q&A 서비스

본 서비스와 관련해서 운영자의 공지를 전달받고, 문의를 직접 남겨보세요!

<br><br><br>

# 🖥️ 프로젝트 화면

### 1️⃣ 메인

![](https://i.imgur.com/UXKuSRg.gif)

-   홈페이지의 초기 화면 위치입니다.
-   서비스의 소개를 담았습니다.
-   react-awesome-reveal를 사용하여 동적인 효과를 주었습니다

<br>

### 2️⃣ 폴더 관리

![image](https://user-images.githubusercontent.com/81623931/224652103-0752f370-455f-4a8c-aeb8-a432b544a389.png)

-   NavBar의 MANAGE를 누르면 해당 페이지로 이동합니다.
-   계정별로 고유의 폴더를 생성할 수 있습니다.
-   각 폴더의 네이밍을 짓고, 질문과 팀원을 등록할 수 있습니다.
-   폴더는 등록된 시간별로 나열됩니다.
-   `질문 폴더 수정` 버튼을 누르면 새로운 폴더가 생성됩니다.
-   `질문 폴더 수정` 버튼을 누르면 등록할 폴더를 수정, 삭제할 수 있습니다.

<br><br>

![image](https://user-images.githubusercontent.com/81623931/224653341-3307dd80-c3b0-4f50-9fc4-4ba9e9c4b510.png)

-   폴더 내에 등록한 질문들을 관리할 수 있습니다.
-   질문은 등록한 순으로 나열됩니다.
-   카테고리를 등록하면 등록할 질문의 카테고리를 설정할 수 있습니다.
-   카테고리는 최대 7개까지 추가할 수 있습니다.
-   카테고리를 선택하면 등록할 질문의 카테고리를 정할 수 있습니다.
-   카테고리 `+` 버튼을 누르면 카테고리를 추가할 수 있습니다.
-   카테고리 `수정` 버튼을 누르면 등록한 카테고리를 삭제할 수 있습니다.
-   `질문 추가` 버튼을 누르면 선택한 카테고리와 입력한 질문을 등록해줍니다.
-   `수정` 버튼을 누르면 입력한 질문을 수정할 수 있습니다.
-   `삭제` 버튼을 누르면 입력한 질문을 삭제할 수 있습니다.

<br><br>

![image](https://user-images.githubusercontent.com/81623931/224688540-859a885a-da3b-4ec0-96d3-847f04f6dc89.png)

-   상단의 `참여자 관리`를 누르면 폴더의 팀원 관리 화면을 볼 수 있습니다.
-   추가할 참여자를 입력하고 `참여자 추가` 버튼을 누르면 팀원이 추가 됩니다.
-   `수정` 버튼을 누르면 등록된 팀원의 이름을 수정할 수 있습니다.
-   `삭제` 버튼을 누르면 등록된 팀원을 삭제할 수 있습니다.

<br><br><br>

### 3️⃣ 질문 분배

![image](https://user-images.githubusercontent.com/81623931/224689421-434cf42a-b265-4de6-b8f5-0451ee0ada51.png)

-   NavBar의 INTERVIEW를 누르면 해당 페이지로 이동합니다.
-   MANAGE에서 등록한 폴더를 확인할 수 있습니다.
-   질문 분배를 할 폴더를 클릭하여 설정해줍니다.

<br><br>

![image](https://user-images.githubusercontent.com/81623931/224690020-42236a99-8921-4fd7-8ee4-5d55fa9e3c88.png)

-   하단으로 내려오면 폴더에 등록된 팀원들의 BOX를 확인할 수 있습니다.
-   `이름 순서 변경` 버튼을 누르면 나열된 팀원들의 이름이 랜덤하게 셔플되어 보여집니다.
-   초기 화면 진입시에는 `질문 분배 시작` 버튼을 한 번 눌러 질문을 배분하고 인터뷰를 시작합니다.
-   `질문 분배 시작` 버튼을 누르면 등록된 질문들이 랜덤하게 배정되어 팀원들에게 배정됩니다.
-   `카테 고리 균등 분배` checkbox 를 체크하고 `질문 분배 시작` 버튼을 누르면 카테고리별로 균등하게 질문이 분배됩니다.

<br><br>

![](https://i.imgur.com/yt5w89t.png)

-   `질문 분배 시작` 버튼을 누르면 등록된 질문들이 배정됩니다.
-   `질문 보기` 버튼을 누르면 배정된 질문을 확인할 수 있습니다.
-   `질문 가리기` 버튼을 누르면 확인할 질문을 다시 닫을 수 있습니다.
-   `맞음` 버튼을 누르면 해당 질문이 맞았다는 표시를 할 수 있습니다.
-   `취소` 버튼을 누르면 맞았다는 표시를 취소할 수 있습니다.
-   `시작` 버튼을 누르면 해당 질문을 답하는 시간을 체크해줍니다.
-   `중지` 버튼을 누르면 시간 체크를 멈춥니다.
-   `초기화` 버튼을 누르면 체크 된 시간을 초기화 시킵니다.

<br><br>

### 카테고리 균등 분배 미체크

![](https://i.imgur.com/tUXSdFF.png)

-   전체의 질문에서 카테고리와 상관없이 랜덤하게 질문이 부여됩니다.
-   같은 카테고리의 질문도 갯수 상관없이 배정받을 수 있습니다.
-   해당 기능은 카테고리와 상관없이 팀원이 비슷하게 질문을 분배 받고 싶을때 유용합니다.

<br><br>

### 카테고리 균등 분배 체크 ✔️

![](https://i.imgur.com/FTVynaM.png)

-   등록된 카테고리와 등록된 팀원의 수에 맞게 균등하게 질문이 배정됩니다.
-   해당 기능은 카테고리별로 팀원이 비슷하게 질문을 분배 받고 싶을때 유용합니다.

<br><br><br>

## 4️⃣ 팀원 피드백

![image](https://user-images.githubusercontent.com/81623931/228737347-bda7fb94-c4aa-4957-8697-7e6081f308ab.png)

-   질문 스터디를 진행하고 각 팀원에 대한 피드백을 남기는 공간입니다.
-   각 팀원은 해당 팀원에 대한 피드백을 작성하고 등록할 수 있습니다.
-   등록된 피드백 포스팅은 Review 페이지에 등록된 날짜를 기준으로 내림차순으로 정렬됩니다.

<br><br>

### 모달 창 기능

![모달](https://user-images.githubusercontent.com/81623931/228736831-701f0fc7-f610-4ecd-b9e1-566862695366.gif)

-   원하는 피드백 포스팅을 클릭하면 모달창이 열립니다.
-   모달창 이외의 영역은 투명처리 됩니다.
-   모달창이 열릴시 외부 스크롤은 차단됩니다.
-   모달창내의 닫기 버튼이외에도 외부영역을 클릭시 모달창이 닫힙니다.

<br><br>

### 검색 기능

![검색](https://user-images.githubusercontent.com/81623931/228736846-5bbe3452-5105-4e41-824a-97e3269b03a6.gif)

-   평가 대상자의 이름을 검색하면 해당 이름에 맞는 피드백 포스팅들이 나타납니다.
-   등록된 날짜 내림차순으로 정렬됩니다.

<br><br><br>

## 4️⃣ 공지사항 & Q&A

![](https://i.imgur.com/nopwVMq.png)

-   운영진이 서비스와 관련된 공지사항을 업로드하는 페이지입니다.
-   제목 box를 클릭하면 내용을 확인할 수 있습니다.
-   공지사항은 운영자만 업로드 가능합니다.
-   운영자에게만 `글쓰기` 버튼이 toggle 됩니다.

<br><br>

![](https://i.imgur.com/dLSinUU.png)

-   사용자가 운영진에게 질문을 남기는 페이지입니다.
-   `글쓰기 버튼`을 클릭하면 글쓰기 페이지로 이동됩니다.
-   글을 업로드하면 해당페이지에서 보여집니다.

<br><br><br>

## 5️⃣ 다크모드

![](https://i.imgur.com/o4GiBdH.png)

-   본 서비스는 다크모드를 지원합니다.
-   상단 NavBar 오른쪽에 있는 `Dark` 버튼을 누르면 다크모드가 설정됩니다.
-   `Light` 버튼을 누르면 다크모드가 해제됩니다.

<br><br><br>

## 6️⃣ 비동기 로딩 처리

![](https://i.imgur.com/lONF9xb.gif)

-   Suspense를 이용하여 비동기 로딩 처리를 구현하였습니다.
-   동적인 로딩 과정을 사용자가 확인할 수 있어 사용자의 경험을 보다 더 향상시킵니다.

<br><br><br>

# 🛠️ 사용 기술

## 💻 Web Languages / Libraries

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-004088.svg?style=for-the-badge&logo=typescript&logoColor=white) ![ReduxToolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white) ![ReactQuery](https://img.shields.io/badge/React%20Query-FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white)

![ReactAwesomeReveal](https://img.shields.io/badge/React%20Awesome%20Reveal-3668FF.svg?style=for-the-badge&logo=react&logoColor=white) ![ReactRouterDom](https://img.shields.io/badge/React%20Router%20DOM-4A154B.svg?style=for-the-badge&logo=react&logoColor=white) ![ErrorBoundary](https://img.shields.io/badge/Error%20Boundary-237F5AB6.svg?style=for-the-badge&logo=react&logoColor=white) ![Suspense](https://img.shields.io/badge/Suspense-1A2C34.svg?style=for-the-badge&logo=react&logoColor=white)

![StyledComponents](https://img.shields.io/badge/Styled%20Components-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white) ![Mantine](https://img.shields.io/badge/Mantine-3A33D1.svg?style=for-the-badge&logo=react&logoColor=white)

<br>

## 🗃️ DB & 배포

![FireBase](https://img.shields.io/badge/firebase-FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=white) ![CloudFlare](https://img.shields.io/badge/cloudflare-F38020.svg?style=for-the-badge&logo=cloudflare&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<br>

## 📑 Test

![Jest](https://img.shields.io/badge/jest-C21325.svg?style=for-the-badge&logo=jest&logoColor=white) ![Storybook](https://img.shields.io/badge/Storybook-FF4785.svg?style=for-the-badge&logo=Storybook&logoColor=white)

<br>

## ⚙️ Tools

![VisualStudioCode](https://img.shields.io/badge/Visual%20Studio%20code-007ACC.svg?style=for-the-badge&logo=visual-studio-Code&logoColor=white) ![GitHub](https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logo=github&logoColor=white) ![Git](https://img.shields.io/badge/git-F05032.svg?style=for-the-badge&logo=git&logoColor=white) ![Tistory](https://img.shields.io/badge/tistory-000000.svg?style=for-the-badge&logo=tistory&logoColor=white)
<br>

## 👨‍⚖️ Linters

![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

<br>

## 🔤 Font

![Spoqa Han Sans Neo](https://img.shields.io/badge/Spoqa%20Han%20Sans%20Neo-3668FF.svg?style=for-the-badge&logoColor=white)

<br><br><br>

# 📌 컨벤션

<details><summary><h3>🔀 코드 컨벤션</h3></summary>
<div markdown="1">

    ✔️Airbnb

    - Airbnb Eslint를 따릅니다.

</details>

<details><summary><h3>🔀 브랜치명 컨벤션</h3></summary>
<div markdown="1">

    ✔️dev

    - 항상 최신 정보를 유지하는 브랜치입니다.

    ✔️main

    - 배포용 브랜치입니다.

    ✔️ver-버전정보

    - 버전에 따라 분류한 브랜치입니다.

</details>
    
<details>
<summary><h3>🔀 PR 컨벤션</h3></summary>
<div markdown="1">

    - [Feat] 제목 (제목만 봐도 무엇을 했는지 단번에 파악할 수 있게 작성)

    - 상세 내용

    - closes 이슈번호

</details>

<details>
<summary><h3>🔀 Commit 컨벤션</h3></summary>
<div markdown="1">

-   Gitmoji

-   FEAT : 새로운 기능의 추가
-   FIX: 버그 수정
-   DOCS: 문서 수정 (리드미 작성)
-   STYLE: 스타일 관련 기능(코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)
-   REFACTOR: 코드 리펙토링
-   TEST: 테스트 코트, 리펙토링 테스트 코드 추가
-   CHORE: 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)

</details>

<details>
<summary><h3>🔀 Styled-Components 컨벤션</h3></summary>
<div markdown="1">

-   div : '기능명'Box
-   section : '기능명'Section
-   ul : '기능명'List
-   li : '기능명'Item
-   p : '기능명'Paragraph
-   span : '기능명'Span

</details>

<br><br><br>

# 🏃‍♂️ 프로젝트 진행과정

-   [📝 진행과정 기록 ](https://bmy1320.tistory.com/category/%EC%84%B1%EC%9E%A5%EA%B8%B0%EB%A1%9D/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)

<br><br><br>

# 📜 개발 기록

[📜이슈 목록](https://github.com/soohyun-dev/Randomly/issues?q=is%3Aissue+is%3Aclosed)

<br><br><br>

# 🎰 기능 소개

개발 완성 및 예정 기능 목록 : [기능 목록](https://github.com/soohyun-dev/Randomly/wiki/%EB%A7%8C%EB%93%A0-%EA%B8%B0%EB%8A%A5-%EB%AA%A9%EB%A1%9D)

<br><br><br>

# 🗂️ 프로젝트 구조

<pre>
📦src
 ┣ 📂Components
 ┃ ┣ 📂Footer
 ┃ ┃ ┣ 📜Footer.styled.ts
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Loading
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜Loading.styled.ts
 ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┣ 📂LoginBox
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜LoginBox.styled.ts
 ┃ ┃ ┗ 📜LoginBox.tsx
 ┃ ┣ 📂ManageInterview
 ┃ ┃ ┣ 📂Catagory
 ┃ ┃ ┃ ┣ 📜Catagory.styled.ts
 ┃ ┃ ┃ ┣ 📜Catagory.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂ManageQuestion
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜ManageQuestion.styled.ts
 ┃ ┃ ┃ ┣ 📜ManageQuestion.tsx
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┣ 📂ManageUser
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜ManageUser.styled.ts
 ┃ ┃ ┃ ┣ 📜ManageUser.tsx
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┣ 📂QuestionTable
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜QuestionTable.styled.ts
 ┃ ┃ ┃ ┗ 📜QuestionTable.tsx
 ┃ ┃ ┣ 📂UserTable
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜UserTable.styled.ts
 ┃ ┃ ┃ ┗ 📜UserTable.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂Memo
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜Memo.styled.ts
 ┃ ┃ ┗ 📜Memo.tsx
 ┃ ┣ 📂Nav
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜Nav.styled.ts
 ┃ ┃ ┗ 📜Nav.tsx
 ┃ ┣ 📂Notice
 ┃ ┃ ┣ 📂Notice
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜Notice.styled.ts
 ┃ ┃ ┃ ┣ 📜Notice.tsx
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┗ 📂NoticeList
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜NoticeList.styled.ts
 ┃ ┃ ┃ ┗ 📜NoticeList.tsx
 ┃ ┣ 📂Play
 ┃ ┃ ┣ 📂ShowMember
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜ShowMember.styled.ts
 ┃ ┃ ┃ ┣ 📜ShowMember.tsx
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┗ 📂ShowQuestion
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜ShowQuestion.styled.ts
 ┃ ┃ ┃ ┗ 📜ShowQuestion.tsx
 ┃ ┣ 📂Q&A
 ┃ ┃ ┣ 📂Comment
 ┃ ┃ ┃ ┣ 📜Comment.styled.ts
 ┃ ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂QA
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜QA.styled.ts
 ┃ ┃ ┃ ┗ 📜QA.tsx
 ┃ ┃ ┣ 📂QAComment
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜QAComment.styled.ts
 ┃ ┃ ┃ ┗ 📜QAComment.tsx
 ┃ ┃ ┣ 📂QAList
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜QAList.styled.ts
 ┃ ┃ ┃ ┗ 📜QAList.tsx
 ┃ ┃ ┣ 📂WriteComment
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜types.ts
 ┃ ┃ ┃ ┣ 📜WriteComment.styled.ts
 ┃ ┃ ┃ ┗ 📜WriteComment.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┗ 📂StopWatch
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜StopWatch.styled.ts
 ┃ ┃ ┗ 📜StopWatch.tsx
 ┣ 📂features
 ┃ ┣ 📜folderSlice.tsx
 ┃ ┣ 📜memberSlice.tsx
 ┃ ┣ 📜playSlice.tsx
 ┃ ┣ 📜questionsSlice.tsx
 ┃ ┣ 📜themeSlice.tsx
 ┃ ┗ 📜userSlice.tsx
 ┣ 📂hooks
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜useFolder.tsx
 ┃ ┣ 📜useMember.tsx
 ┃ ┣ 📜useNotice.tsx
 ┃ ┣ 📜useQA.tsx
 ┃ ┣ 📜useQAComment.tsx
 ┃ ┗ 📜useQuestion.tsx
 ┣ 📂icons
 ┃ ┗ 📂DarkModeToggle
 ┃ ┃ ┣ 📜DarkModeToggle.tsx
 ┃ ┃ ┗ 📜index.ts
 ┣ 📂Page
 ┃ ┣ 📂Error
 ┃ ┃ ┣ 📜ErrorPage.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜Login.styled.ts
 ┃ ┃ ┗ 📜Login.tsx
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜Main.styled.ts
 ┃ ┃ ┗ 📜Main.tsx
 ┃ ┣ 📂Manage
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜Manage.styled.ts
 ┃ ┃ ┣ 📜Manage.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂MyPage
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜Mypage.styled.ts
 ┃ ┃ ┗ 📜MyPage.tsx
 ┃ ┣ 📂Notice
 ┃ ┃ ┣ 📂NoticePosting
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜NoticePosting.styled.ts
 ┃ ┃ ┃ ┗ 📜NoticePosting.tsx
 ┃ ┃ ┣ 📂WriteNotice
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜types.ts
 ┃ ┃ ┃ ┣ 📜WriteNotice.styled.ts
 ┃ ┃ ┃ ┗ 📜WriteNotice.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂Plan
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜Plan.styled.ts
 ┃ ┃ ┗ 📜Plan.tsx
 ┃ ┣ 📂PlayInterview
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜PlayInterview.styled.ts
 ┃ ┃ ┣ 📜PlayInterview.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┗ 📂Q&A
 ┃ ┃ ┣ 📂QAPage
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜QAPage.styled.ts
 ┃ ┃ ┃ ┗ 📜QAPage.tsx
 ┃ ┃ ┣ 📂QAPosting
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜QAPosting.styled.ts
 ┃ ┃ ┃ ┗ 📜QAPosting.tsx
 ┃ ┃ ┗ 📂WriteQA
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜types.ts
 ┃ ┃ ┃ ┣ 📜WriteQA.styled.ts
 ┃ ┃ ┃ ┗ 📜WriteQA.tsx
 ┣ 📂store
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜store.tsx
 ┣ 📂stories
 ┃ ┗ 📜Comment.stories.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.tsx
 ┃ ┗ 📜theme.ts
 ┣ 📂utils
 ┃ ┣ 📜EqualDistribution.tsx
 ┃ ┣ 📜GetTime.tsx
 ┃ ┣ 📜MakeNums.tsx
 ┃ ┗ 📜ScrollToTop.tsx
 ┣ 📂__tests__
 ┃ ┣ 📜GetTime.test.ts
 ┃ ┗ 📜MakeNums.test.ts
 ┣ 📜App.tsx
 ┣ 📜firebase.tsx
 ┗ 📜index.tsx
</pre>
