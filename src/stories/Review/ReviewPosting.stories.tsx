import { ComponentStory, ComponentMeta } from '@storybook/react'
import ReviewPosting from 'Components/Review/ReviewPosting'

export default {
    title: 'ReviewPosting',
    component: ReviewPosting,
} as ComponentMeta<typeof ReviewPosting>

const reviewPosting: ComponentStory<typeof ReviewPosting> = (args) => {
    return <ReviewPosting {...args} />
}

export const exReviewPosting = reviewPosting.bind({})
exReviewPosting.args = {
    id: 'wsadx0uywg8jsGXkTi',
    memberName: '수현',
    selfIntroAdvise: '자기소개 조언',
    answerAdvise: '질문 답변 조언',
    writerName: '익명',
    date: '2023-02-12 11:53:33',
}
