import { useQAComment } from 'hooks'
import Comment from '../Comment'
import { CommentSection } from './QAComment.styled'

export default function QAComment({ id }) {
    const { data, isLoading } = useQAComment(id)
    const qaComment = data
    console.log(qaComment)
    return (
        <CommentSection>
            {!isLoading &&
                Object.keys(qaComment).map((v) => (
                    <Comment
                        id={qaComment[v].id}
                        commentWriter={qaComment[v].commentWriter}
                        content={qaComment[v].content}
                        date={qaComment[v].date}
                        time={qaComment[v].time}
                    />
                ))}
        </CommentSection>
    )
}
