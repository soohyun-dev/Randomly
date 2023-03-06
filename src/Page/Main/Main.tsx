import Footer from 'Components/Footer'
import { Fade } from 'react-awesome-reveal'
import Nav from '../../Components/Nav'
import {
    ContentBox,
    ContentBoxText,
    ContentBoxTitle,
    ContentBoxTitleLogo,
    ContentBoxTitleLogoFirst,
    Img,
    ImgBox,
    ImgContentBox,
    ImgContentBoxDiv,
    Title,
    TitleContent,
    TitleContentDiv,
    TitleSection,
    TopDiv,
} from './styles'

export default function Main() {
    return (
        <>
            <Nav />
            <TitleSection>
                <TopDiv>
                    <div>
                        <Title>Randomly란?</Title>
                    </div>
                    <TitleContentDiv>
                        <Fade duration={2000} direction="left">
                            <TitleContent>
                                Randomly는 기술면접 스터디를 위한 도움 자료로 탄생하였습니다.
                            </TitleContent>
                            <TitleContent>
                                랜덤으로 제공되는 질문 방식을 따와 만들어진 이름입니다.
                            </TitleContent>
                        </Fade>
                    </TitleContentDiv>
                </TopDiv>
                <Fade duration={2000} direction="right">
                    <ImgContentBoxDiv>
                        <ImgContentBox>
                            <ImgBox>
                                <Img
                                    src="https://user-images.githubusercontent.com/81623931/216882813-8b704008-7bca-430a-b8d4-79701e771342.png"
                                    style={{ padding: '2em 0 3em 0' }}
                                />
                            </ImgBox>
                            <ContentBox>
                                <ContentBoxTitleLogoFirst>🛠️</ContentBoxTitleLogoFirst>
                                <ContentBoxTitle>Technology</ContentBoxTitle>
                                <ContentBoxText>Randomly는 기술의 장입니다.</ContentBoxText>
                                <ContentBoxText>
                                    기술의 향상은 개인의 역량 강화 뿐만 아니라
                                </ContentBoxText>
                                <ContentBoxText>
                                    사용자에게 더 나은 서비스를 제공합니다.
                                </ContentBoxText>
                            </ContentBox>
                        </ImgContentBox>
                    </ImgContentBoxDiv>
                </Fade>

                <Fade duration={2000} direction="left">
                    <ImgContentBoxDiv>
                        <ImgContentBox>
                            <ImgBox>
                                <Img src="https://user-images.githubusercontent.com/81623931/216874792-4297b159-d557-4b6c-bf99-d7e75bd30564.jpg" />
                            </ImgBox>
                            <ContentBox>
                                <ContentBoxTitleLogo>♾️</ContentBoxTitleLogo>
                                <ContentBoxTitle>Infinite Development</ContentBoxTitle>
                                <ContentBoxText>이에 멈추지 않습니다.</ContentBoxText>
                                <ContentBoxText>
                                    꾸준한 개발로 무한하게 발전해 나아갑니다.
                                </ContentBoxText>
                            </ContentBox>
                        </ImgContentBox>
                    </ImgContentBoxDiv>
                </Fade>

                <Fade duration={2000} direction="right">
                    <ImgContentBoxDiv>
                        <ImgContentBox>
                            <ImgBox>
                                <Img src="https://user-images.githubusercontent.com/81623931/216986610-a369f5cc-c434-4887-a432-91567d2561df.png" />
                            </ImgBox>
                            <ContentBox>
                                <ContentBoxTitleLogo>🌏</ContentBoxTitleLogo>
                                <ContentBoxTitle>Goal</ContentBoxTitle>
                                <ContentBoxText>
                                    2023년 가입자 100명의 목표를 가지고 있습니다.
                                </ContentBoxText>
                                <ContentBoxText>작은 시작은 원대한 꿈의 발판입니다.</ContentBoxText>
                            </ContentBox>
                        </ImgContentBox>
                    </ImgContentBoxDiv>
                </Fade>
            </TitleSection>
            <Footer />
        </>
    )
}
