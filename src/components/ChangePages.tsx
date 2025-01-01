import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination";

interface ChangePagesProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}

export default function ChangePages({
    currentPage,
    setCurrentPage,
    totalItems,
    itemsPerPage
}: ChangePagesProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisible = 7;
    const [pageRange, setPageRange] = useState<number[]>([]);
    useEffect(() => {
        const range: number[] = [];

        if (totalPages <= maxVisible) {
            // Show all pages if totalPages is less than or equal to maxVisible
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            if (currentPage <= maxVisible - 1) {
                // Case 1: When currentPage is within the first few pages
                const start = currentPage === maxVisible - 1 ? 2 : 1; // Remove first page if on page 4
                for (let i = start; i < maxVisible; i++) {
                    range.push(i);
                }
                if (currentPage === maxVisible - 1) {
                    // Explicitly add page 5 when on page 4
                    range.push(currentPage + 1);
                }
                range.push(Infinity); // Ellipsis
                range.push(totalPages);
            } else if (currentPage >= totalPages - (maxVisible - 2)) {
                // Case 2: When currentPage is in the last few pages
                range.push(1);
                range.push(Infinity); // Ellipsis
                for (
                    let i = totalPages - (maxVisible - 2);
                    i <= totalPages;
                    i++
                ) {
                    range.push(i);
                }
            } else {
                // Case 3: When currentPage is in the middle
                range.push(1);
                range.push(Infinity); // Ellipsis

                const middleRangeSize = maxVisible - 2; // Space for middle pages
                const startPage =
                    currentPage - Math.floor((middleRangeSize - 1) / 2);
                const endPage = currentPage + Math.floor(middleRangeSize / 2);

                for (let i = startPage; i <= endPage; i++) {
                    range.push(i);
                }

                range.push(Infinity); // Ellipsis
                range.push(totalPages);
            }
        }

        setPageRange(range); // Update state with the computed range
    }, [currentPage, totalPages, maxVisible]);

    return (
        <div className="mb-4">
            <Pagination className="flex w-full justify-center">
                <PaginationContent className="min-w-[545px] flex justify-between">
                    <PaginationItem>
                        <PaginationPrevious
                            href={"#"}
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) {
                                    setCurrentPage(
                                        Math.max(currentPage - 1, 1)
                                    );
                                } else {
                                    e.preventDefault();
                                }
                            }}
                            // aria-disabled={currentPage === 1}
                        />
                    </PaginationItem>
                    {pageRange.map((page, index) =>
                        page === Infinity ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href={`/?page=${currentPage}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(page);
                                    }}
                                    className={
                                        currentPage === page
                                            ? "font-black border-2"
                                            : ""
                                    }
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href={"#"}
                            onClick={(e) => {
                                if (currentPage < totalPages) {
                                    e.preventDefault();
                                    setCurrentPage(
                                        Math.min(currentPage + 1, totalPages)
                                    );
                                } else {
                                    e.preventDefault();
                                }
                            }}
                            className=""
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
