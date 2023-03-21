import { chooseId } from 'features/folderSlice'
import { selectCorrectCnt, selectDistribution, selectResult } from 'features/playSlice'
import { useMember } from 'hooks'
import { useId, useState } from 'react'
import { useSelector } from 'react-redux'
import ShowQuestion from '../ShowQuestion'
import {
    ButtonContainer,
    MemberName,
    MemberTitle,
    NameContainer,
    NoticeText,
    UpperLeft,
    UpperMiddle,
    UpperRight,
    UserContainer,
} from './ShowMember.styled'
import { UserInfo } from './types'

export default function ShowMember({ orderMember }) {
    const [open, setOpen] = useState<Array<boolean[] | boolean>>([false])
    const folderId = useSelector(chooseId)
    const { data: member, isLoading: isMemberLoading } = useMember(folderId)
    const result = useSelector(selectResult)
    const correctCnt = useSelector(selectCorrectCnt)
    const distribution = useSelector(selectDistribution)
    const uniqueId = useId()

    /**
     * 버튼을 누르면 해당하는 유저의 질문 목록이 열린다.
     * 열린상태에서 누르면 닫힌다.
     *
     * @param {Number} 질문을 열거나 닫을 팀원의 index
     */
    const openHandler = (idx: number) => {
        if (!distribution) {
            alert('질문 분배를 해주세요!')
        }
        const change = [...open]
        change[idx] = !change[idx]
        setOpen(change)
    }

    /**
     * 맞은 질문의 갯수를 세주는 함수.
     *
     * @param {Number} 맞은 갯수를 카운트할 팀원의 index
     */
    //   const checkCorrect = (member: number) => {
    //     if (result.length === 0) return 0;
    //     let correct = 0;
    //     result[member].forEach((q) => {
    //       if (correctCnt[q]) {
    //         correct += 1;
    //       }
    //     });
    //     return correct;
    //   };

    return (
        <div>
            {!isMemberLoading &&
                member.map((value: UserInfo, idx: number) => (
                    <UserContainer key={uniqueId}>
                        <NameContainer>
                            <UpperLeft>
                                <MemberTitle>팀원명 : </MemberTitle>
                                <MemberName>
                                    {orderMember.length === 0 ||
                                    orderMember.length !== member.length
                                        ? value.member
                                        : member[orderMember[idx]].member}
                                </MemberName>
                            </UpperLeft>
                            <UpperMiddle />
                            <UpperRight>
                                {/* <CorrectText> 맞은 갯수: {checkCorrect(idx)} 개</CorrectText> */}
                            </UpperRight>
                        </NameContainer>
                        <ButtonContainer>
                            {distribution ? (
                                // (
                                //     <OpenButton
                                //         color={open[idx]}
                                //         onClick={(e) => {
                                //             openHandler(idx)
                                //         }}
                                //     >
                                //         {open[idx] ? '질문 닫기' : '질문 열기'}
                                //     </OpenButton>
                                // )
                                ''
                            ) : (
                                <NoticeText>질문 분배를 해주세요😋</NoticeText>
                            )}
                        </ButtonContainer>

                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        {result.length !== 0 ? <ShowQuestion result={result[idx]} /> : ''}
                    </UserContainer>
                ))}
        </div>
    )
}
