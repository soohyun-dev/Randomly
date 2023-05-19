import { useState } from 'react'
import { ReviewPaginationButton, ReviewPaginationSection } from './ReviewPagination.styled'

export default function ReviewPagination({ nowPage, nowPageHandler, reviewLength, listSize }) {
    const [pageButton, setPageButton] = useState(
        Array.from({ length: Math.round(reviewLength / listSize) }, (_, idx) => idx + 1)
    )

    return (
        <ReviewPaginationSection>
            <div>
                {pageButton.map((page, idx) => (
                    <ReviewPaginationButton
                        select={nowPage === page}
                        onClick={() => nowPageHandler(idx + 1)}
                    >
                        {page}
                    </ReviewPaginationButton>
                ))}
            </div>
        </ReviewPaginationSection>
    )
}
