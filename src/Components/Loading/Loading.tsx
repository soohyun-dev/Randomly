import { Fade } from 'react-awesome-reveal'
import { LoadingBox } from './Loading.styled'

export default function Loading() {
    return (
        <Fade direction="up">
            <LoadingBox>
                <h1>로딩중...</h1>
            </LoadingBox>
        </Fade>
    )
}
