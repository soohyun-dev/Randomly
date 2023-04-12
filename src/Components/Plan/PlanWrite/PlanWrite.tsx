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
    const [date, setDate] = useState(new Date())
    const { classes } = useStyles()
    const [formData, setFormData] = useState({
        studyName: '',
        participateNumber: '',
        place: '',
        pay: '0',
        date: new Date(),
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        let filterValue = value
        if (name === 'participateNumber' || name === 'pay') {
            filterValue = value.replace(/[^0-9]/g, '')
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: filterValue,
        }))
    }
    const isValidData = () => {
        if (formData.studyName.length === 0) {
            alert('스터디명을 작성해주세요.')
            return false
        }
        if (formData.participateNumber.length === 0) {
            alert('참여인원을 작성해주세요.')
            return false
        }
        if (formData.place.length === 0) {
            alert('장소를 작성해주세요.')
            return false
        }
        if (formData.pay.length === 0) {
            alert('참여비를 작성해주세요.')
            return false
        }

        return true
    }

    const resetInput = () => {
        setFormData(() => ({
            studyName: '',
            participateNumber: '',
            place: '',
            pay: '0',
            date: new Date(),
        }))
    }

    const submitHandler = async () => {
        if (isValidData()) {
            setFormData((prevState) => ({
                ...prevState,
                date,
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
                        <PlanWriteInput
                            type="number"
                            name="participateNumber"
                            value={formData.participateNumber}
                            onChange={handleChange}
                            placeholder="참여인원"
                        />
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
                            value={formData.pay}
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
                            onChange={setDate}
                            value={date}
                        />
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
