import Footer from "Components/Footer";
import styled from "styled-components";
import Nav from "../Components/Nav";
import { Fade } from "react-awesome-reveal";

export default function Main() {
  return (
    <>
      <Nav />
      <TitleSection>
        <div>
          <Title>Randomly란?</Title>
        </div>
        <TitleContentDiv>
          <TitleContent>
            Randomly는 기술면접 스터디를 위한 도움 자료로 탄생하였습니다.
          </TitleContent>
          <TitleContent>
            랜덤으로 제공되는 질문 방식을 따와 만들어진 이름입니다.
          </TitleContent>
          <Fade duration={2000} direction={"left"}>
            <ImgContentBoxDiv>
              <ImgContentBox>
                <ImgBox>
                  <Img src="https://user-images.githubusercontent.com/81623931/216874792-4297b159-d557-4b6c-bf99-d7e75bd30564.jpg" />
                </ImgBox>
                <ContentBox>
                  <ContentBoxTitleLogo>♾️</ContentBoxTitleLogo>
                  <ContentBoxTitle>무한한 발전 가능성</ContentBoxTitle>
                  <ContentBoxText>
                    Randomly는 이에 멈추지 않습니다.
                  </ContentBoxText>
                  <ContentBoxText>
                    꾸준한 개발로 무한하게 발전해 나아갑니다.
                  </ContentBoxText>
                </ContentBox>
              </ImgContentBox>
            </ImgContentBoxDiv>
          </Fade>
        </TitleContentDiv>
      </TitleSection>
      <Footer />
    </>
  );
}

const TitleSection = styled.section`
  margin: 10em 10em;
  text-align: left;
`;

const Title = styled.p`
  font-size: 48px;
  font-weight: 600;
`;

const TitleContentDiv = styled.div`
  margin: 5em 0;
`;

const TitleContent = styled.p`
  font-size: 24px;
  font-weight: 500;
`;

const Img = styled.img`
  margin: 5em 0;
  width: 100%;
  border-radius: 10px;
`;

const ImgContentBoxDiv = styled.div`
  margin: 3em 0;
  display: inline-block;
`;

const ImgContentBox = styled.div`
  display: flex;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 55%;
  display: inline-block;
`;

const ContentBox = styled.div`
  width: 40%;
  display: inline-block;
  margin-left: 3em;
`;
const ContentBoxTitleLogo = styled.p`
  font-size: 50px;
`;

const ContentBoxTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin: 1em 0;
`;

const ContentBoxText = styled.p`
  font-size: 24px;
`;
