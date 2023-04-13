import { getDateFormat } from 'utils/GetTime'
import {
    ParticipateBox,
    PersonalCostParagraph,
    PlanPostingBox,
    PlanPostingCostBox,
    PlanPostingDateBox,
    PlanPostingPlaceBox,
    PlanPostingStudyNameBox,
    PlanPostingStudyNameParagraph,
    PlanPostingTimeParagraph,
} from './PlanPosting.styled'

export default function PlanPosting({
    id,
    participateNumber,
    pay,
    place,
    studyName,
    studyTime,
    date,
    uploadDate,
}) {
    console.log(date)
    return (
        <PlanPostingBox>
            <PlanPostingStudyNameBox>
                <PlanPostingStudyNameParagraph>{studyName}</PlanPostingStudyNameParagraph>
            </PlanPostingStudyNameBox>
            <PlanPostingDateBox>
                <p>날짜: {getDateFormat(new Date(date.seconds * 1000))}</p>
            </PlanPostingDateBox>
            <PlanPostingPlaceBox>
                <p>장소: {place} </p>
                <PlanPostingTimeParagraph>
                    {`0${studyTime.hour}`.slice(-2)}시 {`0${studyTime.minute}`.slice(-2)}분
                </PlanPostingTimeParagraph>
            </PlanPostingPlaceBox>
            <ParticipateBox>
                <p>참여인원: {participateNumber}명</p>
            </ParticipateBox>
            <PlanPostingCostBox>
                <p>참여비: {pay.toLocaleString('ko-KR')}원</p>
                <PersonalCostParagraph>
                    (인당: {Math.floor(pay / participateNumber).toLocaleString('ko-KR')}원)
                </PersonalCostParagraph>
            </PlanPostingCostBox>
        </PlanPostingBox>
    )
}
