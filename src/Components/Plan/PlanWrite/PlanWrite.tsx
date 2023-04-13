import { createStyles, rem } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { selectUser } from 'features/userSlice'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { fireStore } from '../../../firebase'
import {
    PlanDateBox,
    PlanInfoBox,
    PlanWriteBox,
    PlanWriteInput,
    PlanWriteInputBox,
    PlanWriteSubmitButton,
    PlanWriteTitleBox,
    PlanWriteTitleParagraph,
} from './PlanWrite.styled'

const useStyles = createStyles((theme) => ({
    input: {
        height: rem(54),
        paddingTop: rem(18),
        border: '2px solid #d2e3fc',
    },

    label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: `calc(${theme.spacing.sm} / 2)`,
        zIndex: 1,
    },
}))

export default function PlanWrite() {
    const user = useSelector(selectUser)
    const [selectDate, setSelectDate] = useState(new Date())
    const { classes } = useStyles()
    const [selectHour, setSelectHour] = useState('시')
    const [selectMinute, setSelectMinute] = useState('분')
    const [participateNumber, setParticipateNumber] = useState('인원')
    const [formData, setFormData] = useState({
        studyName: '',
        participateNumber: '인원',
        place: '',
        pay: 0,
        date: new Date(),
        uploadDate: new Date(),
        studyTime: {
            hour: selectHour,
            minute: selectMinute,
        },
    })

    const cnt = Array.from({ length: 20 }, (_, i) => i + 1) // 인원
    const hour = Array.from({ length: 24 }, (_, i) => i) // 시
    const minute = Array.from({ length: 60 }, (_, i) => i) // 분

    const handleChange = (e) => {
        const { name, value } = e.target
        let filterValue = value
        if (name === 'pay') {
            filterValue = Number(value.replace(/[^0-9]/g, ''))
        }
        if (name === 'participateNumber') {
            setParticipateNumber(value)
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: filterValue,
            date: selectDate,
        }))
    }

    const dateHandler = (e) => {
        setSelectDate(e)
        setFormData((prevState) => ({
            ...prevState,
            date: e,
        }))
    }

    const selectTimeHandler = (e) => {
        const { name, value } = e.target
        if (name === '시') {
            setSelectHour(value)
            setFormData((prevState) => ({
                ...prevState,
                studyTime: {
                    hour: value,
                    minute: selectMinute,
                },
            }))
        } else if (name === '분') {
            setSelectMinute(value)
            setFormData((prevState) => ({
                ...prevState,
                studyTime: {
                    hour: selectHour,
                    minute: value,
                },
            }))
        }
    }

    const isValidData = () => {
        if (formData.studyName.length === 0) {
            alert('스터디명을 작성해주세요.')
            return false
        }
        if (formData.participateNumber === 'participateNumber') {
            alert('참여인원을 작성해주세요.')
            return false
        }
        if (formData.place.length === 0) {
            alert('장소를 작성해주세요.')
            return false
        }
        if (selectHour === '시' || selectMinute === '분') {
            alert('시간을 정확하게 선택해주세요.')
            return false
        }
        return true
    }

    const resetInput = () => {
        setFormData(() => ({
            studyName: '',
            participateNumber: '인원',
            place: '',
            pay: 0,
            date: new Date(),
            uploadDate: new Date(),
            studyTime: {
                hour: '시',
                minute: '분',
            },
        }))
        setSelectDate(new Date())
        setParticipateNumber('인원')
        setSelectHour('시')
        setSelectMinute('분')
    }

    const submitHandler = async () => {
        if (isValidData()) {
            setFormData((prevState) => ({
                ...prevState,
                uploadDate: new Date(),
            }))

            const studyScheduleInfo = collection(fireStore, `users/${user}/studySchedule`)
            await addDoc(studyScheduleInfo, formData)
            alert('스터디 일정이 등록되었습니다.')
            resetInput()
        }
    }

    return (
        <PlanWriteBox>
            <PlanWriteTitleBox>
                <PlanWriteTitleParagraph>스터디 일정 등록</PlanWriteTitleParagraph>
            </PlanWriteTitleBox>
            <PlanWriteInputBox>
                <PlanInfoBox>
                    <div>
                        <PlanWriteInput
                            name="studyName"
                            value={formData.studyName}
                            onChange={handleChange}
                            placeholder="스터디명"
                        />
                    </div>
                    <div>
                        <select
                            value={participateNumber}
                            name="participateNumber"
                            onChange={handleChange}
                        >
                            <option selected value="인원">
                                인원
                            </option>
                            {cnt.map((v) => (
                                <option value={v}>{v}명</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <PlanWriteInput
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                            placeholder="장소"
                        />
                    </div>
                    <div>
                        <PlanWriteInput
                            name="pay"
                            value={formData.pay.toLocaleString('ko-KR')}
                            onChange={handleChange}
                            placeholder="대여료"
                        />
                    </div>
                </PlanInfoBox>
                <PlanDateBox>
                    <div>
                        <DatePickerInput
                            mt="md"
                            popoverProps={{ withinPortal: true }}
                            label="스터디 날짜"
                            placeholder="다음 스터디는 언제?"
                            classNames={classes}
                            clearable={false}
                            name="selectDate"
                            onChange={dateHandler}
                            value={selectDate}
                        />
                    </div>
                    <div>
                        <select value={selectHour} name="시" onChange={selectTimeHandler}>
                            <option selected value="시">
                                시
                            </option>
                            {hour.map((v) => (
                                <option value={`${v}`}>{`0${String(v)}`.slice(-2)}시</option>
                            ))}
                        </select>
                        <select value={selectMinute} name="분" onChange={selectTimeHandler}>
                            <option selected value="분">
                                분
                            </option>
                            {minute.map((v) => (
                                <option value={`${v}`}>{`0${String(v)}`.slice(-2)}분</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <PlanWriteSubmitButton onClick={() => submitHandler()}>
                            등록
                        </PlanWriteSubmitButton>
                    </div>
                </PlanDateBox>
            </PlanWriteInputBox>
        </PlanWriteBox>
    )
}
