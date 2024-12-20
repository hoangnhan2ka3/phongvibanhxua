import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"

export default function TabsPagination({
    totalPosts,
    productsPerPage,
    currentPage,
    setCurrentPage
}: {
    totalPosts: number,
    productsPerPage: number,
    currentPage: number,
    setCurrentPage: (page: number) => void
}) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    const maxPageNum = 5 // Maximum page numbers to display at once
    const pageNumLimit = Math.floor(maxPageNum / 2) // Current page should be in the middle if possible

    const activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    )

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Function to render page numbers with ellipsis
    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
            <PaginationItem key={idx}>
                <PaginationLink
                    type="button"
                    isActive={currentPage === page}
                    onClick={() => { setCurrentPage(page) }}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        ))

        // Add ellipsis at the start if necessary
        if (activePages[0] > 1) {
            renderedPages.unshift(
                <PaginationEllipsis
                    key="ellipsis-start"
                    onClick={() => { setCurrentPage(activePages[0] - 1) }}
                />
            )
        }

        // Add ellipsis at the end if necessary
        if (activePages[activePages.length - 1] < pageNumbers.length) {
            renderedPages.push(
                <PaginationEllipsis
                    key="ellipsis-end"
                    onClick={() => {
                        setCurrentPage(activePages[activePages.length - 1] + 1)
                    }}
                />
            )
        }

        return renderedPages
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious type="button" onClick={handlePrevPage} />
                </PaginationItem>
                {renderPages()}
                <PaginationItem>
                    <PaginationNext type="button" onClick={handleNextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
