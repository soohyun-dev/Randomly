import { useQAComment } from 'hooks'
import Comment from '../Comment'
import { CommentSection } from './QAComment.styled'

export default function QAComment({ id }) {
    const { data, isLoading } = useQAComment(id)
    const qaComment = data

    return (
        <CommentSection>
            {!isLoading && Object.keys(qaComment).map((v) => <Comment props={qaComment[v]} />)}
        </CommentSection>
    )
}
