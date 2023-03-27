import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ReviewPosting from 'Components/Review/ReviewPosting'

export default {
    title: 'ReviewPosting',
    component: ReviewPosting,
} as ComponentMeta<typeof ReviewPosting>

const reviewPosting: ComponentStory<typeof ReviewPosting> = (args) => {
    return <ReviewPosting {...args} />
}

export const exReviewPosting01 = reviewPosting.bind({})
exReviewPosting01.args = {
    commentWriter: 'Ysh',
    content: '댓글입니다',
    date: '2023-02-12 11:53:33',
    id: 'JwLwxUW0uywg8jsGXkTi',
    time: new Date(),
}
