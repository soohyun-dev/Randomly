import { ComponentStory, ComponentMeta } from '@storybook/react'
import ReviewDetail from 'Components/Review/ReviewDetail'
import { Provider } from 'react-redux'
import store from 'store'

export default {
    title: 'ReviewDetail',
    component: ReviewDetail,
} as ComponentMeta<typeof ReviewDetail>

const reviewDetail: ComponentStory<typeof ReviewDetail> = (args) => {
    return (
        <Provider store={store}>
            <ReviewDetail {...args} />
        </Provider>
    )
}

export const exReviewDetail = reviewDetail.bind({})
exReviewDetail.args = {
    setModalOpen: true,
    data: {
        id: 'wsadx0uywg8jsGXkTi',
        memberName: '수현',
        selfIntroAdvise: '자기소개 조언',
        answerAdvise: '질문 답변 조언',
        writerName: '익명',
        date: '2023-02-12 11:53:33',
    },
}
