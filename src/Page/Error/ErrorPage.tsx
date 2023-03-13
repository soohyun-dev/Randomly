import { ErrorGuideParagraph, ErrorSection } from './ErrorPage.styled'

export default function ErrorPage() {
    return (
        <ErrorSection>
            <div>
                <p>사용자 정보를 불러오는데 실패하였습니다.</p>
                <p>새로고침🔃을 시도해주세요!</p>
                <ErrorGuideParagraph>
                    오류가 계속되면 Q&A 페이지에서 문의 부탁드립니다.
                </ErrorGuideParagraph>
                <p>불편을 드려 죄송합니다.😥</p>
            </div>
        </ErrorSection>
    )
}
