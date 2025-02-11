// "use client";

// import { useEffect, useMemo } from "react";
// import { useStore } from "@/store/store";
// import { Video } from "@/types/video";
// import { useShallow } from "zustand/react/shallow";

// export default function PaginatedVideosManager({
//     videoArray,
//     filters = [],
//     sortBy
// }: {
//     videoArray: Video[];
//     filters?: ((video: Video) => boolean)[];
//     sortBy?: (a: Video, b: Video) => number;
// }) {
//     const {
//         Videos,
//         setVideos,
//         currentPage,
//         indexOfFirstItem,
//         indexOfLastItem
//     } = useStore(
//         useShallow((state) => ({
//             Videos: state.Videos,
//             setVideos: state.setVideos,
//             currentPage: state.currentPage,
//             indexOfFirstItem: state.indexOfFirstItem,
//             indexOfLastItem: state.indexOfLastItem
//         }))
//     );

//     useEffect(() => {
//         // Apply filters and sortingimport { useMemo } from "react";

//         const filteredVideos = useMemo(() => {
//             let result = [...videoArray];
//             filters.forEach((filter) => {
//                 result = result.filter(filter);
//             });
//             if (sortBy) result.sort(sortBy);
//             return result;
//         }, [videoArray, filters, sortBy]);

//         const paginatedVideos = useMemo(() => {
//             return filteredVideos.slice(indexOfFirstItem, indexOfLastItem);
//         }, [filteredVideos, indexOfFirstItem, indexOfLastItem]);

//         // Update state only if the videos have changed
//         if (JSON.stringify(Videos) !== JSON.stringify(paginatedVideos)) {
//             setVideos(paginatedVideos);
//         }
//         console.log(paginatedVideos);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return null;
// }
