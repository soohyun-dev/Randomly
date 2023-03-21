import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Comment from 'Components/Q&A/Comment'

export default {
    title: 'Comment',
    component: Comment,
} as ComponentMeta<typeof Comment>

const comment: ComponentStory<typeof Comment> = (args) => {
    return <Comment {...args} />
}

export const exComment01 = comment.bind({})
exComment01.args = {
    commentWriter: 'Ysh',
    content: '댓글입니다',
    date: '2023-02-12 11:53:33',
    id: 'JwLwxUW0uywg8jsGXkTi',
    time: new Date(),
}
