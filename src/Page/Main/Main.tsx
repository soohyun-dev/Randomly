import { Fade } from 'react-awesome-reveal'
import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { useInView } from 'react-intersection-observer'
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
    PlusButton,
    Title,
    TitleContent,
    TitleSection,
    TopDiv,
} from './Main.styled'

export default function Main() {
    const [ref1, inView1] = useInView({
        threshold: 0.8,
    })

    const [ref2, inView2] = useInView({
        threshold: 0.8,
    })

    const [ref3, inView3] = useInView({
        threshold: 0.8,
    })

    return (
        <>
            <Nav page="Main" />
            <TitleSection>
                <TopDiv>
                    <div>
                        <Fade direction="up">
                            <Title>더 편하고, 더 효율적이게</Title>
                        </Fade>
                        <Fade duration={1000} direction="up" delay={300}>
                            <TitleContent>사용자의 편의를 위해 끊임없이 고민합니다.</TitleContent>
                            <PlusButton>더 알아보기 ➡️</PlusButton>
                        </Fade>
                    </div>
                </TopDiv>
                <Fade duration={2000} direction="right">
                    <ImgContentBoxDiv>
                        <ImgContentBox ref={ref1}>
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
