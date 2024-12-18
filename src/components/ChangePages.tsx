import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
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
    const maxVisible = 5;
    const [pageRange, setPageRange] = useState<number[]>([]);
    useEffect(() => {
        const range: number[] = [];
        if (currentPage <= maxVisible) {
            // When the current page is within the first visible range
            for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
                range.push(i);
            }
        } else {
            // When the current page is beyond the first visible range
            for (
                let i = currentPage - 1; // Start from `currentPage - 1`
                i <= Math.min(currentPage - 1 + maxVisible, totalPages);
                i++
            ) {
                range.push(i);
            }
        }
        setPageRange(range); // Update state with the computed range
    }, [currentPage, totalPages, maxVisible]);

    return (
        <div className="py-12 mb-4">
            <p>Page
                {currentPage}
                {pageRange}
            </p>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={"#"}
                            onClick={(e) => {
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
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index + 1}>
                            <PaginationLink
                                href="#"
                                onClick={() => setCurrentPage(index + 1)}
                                className={
                                    currentPage === index + 1 ? "font-black border-2" : ""
                                }
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href={"#"}
                            onClick={(e) => {
                                if (currentPage < totalPages) {
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
