// import { useEffect, useState } from "react";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious
// } from "./ui/pagination";

// interface ChangePagesProps {
//     currentPage: number;
//     setCurrentPage: (page: number) => void;
//     totalItems: number;
//     itemsPerPage: number;
// }

// export default function ChangePages({
//     currentPage,
//     setCurrentPage,
//     totalItems,
//     itemsPerPage
// }: ChangePagesProps) {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const maxVisible = 5;
//     const [pageRange, setPageRange] = useState<number[]>([]);
//     useEffect(() => {
//         const range: number[] = [];

//         if (totalPages <= maxVisible) {
//             // Show all pages if totalPages is less than or equal to maxVisible
//             for (let i = 1; i <= totalPages; i++) {
//                 range.push(i);
//             }
//         } else {
//             if (currentPage <= maxVisible - 1) {
//                 // Case 1: When currentPage is within the first few pages
//                 for (let i = 1; i < maxVisible; i++) {
//                     range.push(i);
//                 }
//                 range.push(Infinity); // Ellipsis
//                 range.push(totalPages);
//             } else if (currentPage >= totalPages - (maxVisible - 2)) {
//                 // Case 2: When currentPage is in the last few pages
//                 range.push(1);
//                 range.push(Infinity); // Ellipsis
//                 for (let i = totalPages - (maxVisible - 2); i <= totalPages; i++) {
//                     range.push(i);
//                 }
//             } else {
//                 // Case 3: When currentPage is in the middle
//                 range.push(1);
//                 range.push(Infinity); // Ellipsis

//                 const middleRangeSize = maxVisible - 2; // Space for middle pages
//                 const startPage = currentPage - Math.floor((middleRangeSize - 1) / 2);
//                 const endPage = currentPage + Math.floor(middleRangeSize / 2);

//                 for (let i = startPage; i <= endPage; i++) {
//                     range.push(i);
//                 }

//                 range.push(Infinity); // Ellipsis
//                 range.push(totalPages);
//             }
//         }

//         setPageRange(range); // Update state with the computed range
//     }, [currentPage, totalPages, maxVisible]);


//     return (
//         <div className="py-12 mb-4">
//             <p>Page Range: {" "}
//                 {pageRange}
//             </p>
//             <Pagination>
//                 <PaginationContent>
//                     <PaginationItem>
//                         <PaginationPrevious
//                             href={"#"}
//                             onClick={(e) => {
//                                 if (currentPage > 1) {
//                                     setCurrentPage(
//                                         Math.max(currentPage - 1, 1)
//                                     );
//                                 } else {
//                                     e.preventDefault();
//                                 }
//                             }}
//                         // aria-disabled={currentPage === 1}
//                         />
//                     </PaginationItem>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <PaginationItem key={index + 1}>
//                             <PaginationLink
//                                 href="#"
//                                 onClick={() => setCurrentPage(index + 1)}
//                                 className={
//                                     currentPage === index + 1 ? "font-black border-2" : ""
//                                 }
//                             >
//                                 {index + 1}
//                             </PaginationLink>
//                         </PaginationItem>
//                     ))}
//                     <PaginationItem>
//                         <PaginationNext
//                             href={"#"}
//                             onClick={(e) => {
//                                 if (currentPage < totalPages) {
//                                     setCurrentPage(
//                                         Math.min(currentPage + 1, totalPages)
//                                     );
//                                 } else {
//                                     e.preventDefault();
//                                 }
//                             }}
//                             className=""
//                         />
//                     </PaginationItem>
//                 </PaginationContent>
//             </Pagination>
//             <Pagination>
//                 <PaginationContent>
//                     <PaginationItem>
//                         <PaginationPrevious
//                             href={"#"}
//                             onClick={(e) => {
//                                 if (currentPage > 1) {
//                                     setCurrentPage(
//                                         Math.max(currentPage - 1, 1)
//                                     );
//                                 } else {
//                                     e.preventDefault();
//                                 }
//                             }}
//                         // aria-disabled={currentPage === 1}
//                         />
//                     </PaginationItem>
//                     {Array.from({ length: pageRange.length }, (_, index) => (
//                         <PaginationItem key={index + 1}>
//                             <PaginationLink
//                                 href="#"
//                                 onClick={() => setCurrentPage(index + 1)}
//                                 className={
//                                     currentPage === index + 1 ? "font-black border-2" : ""
//                                 }
//                             >
//                                 {pageRange[index]}
//                             </PaginationLink>
//                         </PaginationItem>
//                     ))}
//                     <PaginationItem>
//                         <PaginationLink>
//                             <PaginationEllipsis />
//                         </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationLink href="#" onClick={() => setCurrentPage(totalPages)} className={currentPage === totalPages ? "font-black border-2" : ""}>
//                             {totalPages}
//                         </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationNext
//                             href={"#"}
//                             onClick={(e) => {
//                                 if (currentPage < totalPages) {
//                                     setCurrentPage(
//                                         Math.min(currentPage + 1, totalPages)
//                                     );
//                                 } else {
//                                     e.preventDefault();
//                                 }
//                             }}
//                             className=""
//                         />
//                     </PaginationItem>
//                 </PaginationContent>
//             </Pagination>
//             <Pagination>
//                 <PaginationContent>
//                     <PaginationItem>
//                         <PaginationPrevious
//                             href={"#"}
//                             onClick={(e) => {
//                                 if (currentPage > 1) {
//                                     setCurrentPage(
//                                         Math.max(currentPage - 1, 1)
//                                     );
//                                 } else {
//                                     e.preventDefault();
//                                 }
//                             }}
//                         // aria-disabled={currentPage === 1}
//                         />
//                     </PaginationItem>
//                     {pageRange.map((page, index) =>
//                         page === Infinity ? (
//                             <PaginationItem key={`ellipsis-${index}`}>
//                                 <PaginationEllipsis />
//                             </PaginationItem>
//                         ) : (
//                             <PaginationItem key={page}>
//                                 <PaginationLink
//                                     href="#"
//                                     onClick={() => setCurrentPage(page)}
//                                     className={currentPage === page ? "font-black border-2" : ""}
//                                 >
//                                     {page}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         )
//                     )}

//                     <PaginationItem>
//                         <PaginationNext
//                             href={"#"}
//                             onClick={(e) => {
//                                 if (currentPage < totalPages) {
//                                     setCurrentPage(
//                                         Math.min(currentPage + 1, totalPages)
//                                     );
//                                 } else {
//                                     e.preventDefault();
//                                 }
//                             }}
//                             className=""
//                         />
//                     </PaginationItem>
//                 </PaginationContent>
//             </Pagination>



//         </div>
//     );
// }
