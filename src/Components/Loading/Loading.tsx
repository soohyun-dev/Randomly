import { Fade } from 'react-awesome-reveal'
import { LoadingBox, LoadingSection } from './Loading.styled'

export default function Loading() {
    return (
        <Fade direction="up">
            <LoadingSection>
                <LoadingBox>
                    <h1>로딩중...</h1>
                </LoadingBox>
            </LoadingSection>
        </Fade>
    )
}
