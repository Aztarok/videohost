"use client";

import { useStore } from "@/store/store";
import { Video } from "@/types/video";
import Link from "next/link";
import { useEffect } from "react";
import ChangePages from "./ChangePages";
import { VideoFilters } from "./VideoFilters";
import { VideoNavbar } from "./VideoNavbar";
import { VideoCard } from "./ui/video-card";


export default function VideoShower({ videoArray }: { videoArray: Video[] }) {
    const store = useStore()
    useEffect(() => {
        store.setVideos(videoArray)
    }, [videoArray, store.Videos, store.setVideos])
    // const currentVideo = store.Videos.find((video) => video.id === store.currentItem);
    return (
        <>
            <VideoNavbar />
            <main className="container mx-auto">
                <VideoFilters />
                <ChangePages
                    currentPage={store.currentPage}
                    setCurrentPage={store.setCurrentPage}
                    totalItems={store.Videos.length}
                    itemsPerPage={store.itemsPerPage}
                />
                {/* {JSON.stringify(store.currentItem)}
                {store.indexOfFirstItem}
                {store.indexOfLastItem} */}
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {/* {currentVideo ? (
                        <Link href={`/video/${currentVideo.id}`} key={currentVideo.id}>
                            <VideoCard
                                title={currentVideo.title}
                                thumbnail={currentVideo.thumbnailUrl}
                                views={currentVideo.views}
                                duration={currentVideo.duration}
                                artists={currentVideo.artists[0]}
                            />
                        </Link>
                    ) : (
                        <p>No video found for the current item.</p>
                    )} */}
                    {store.currentItem.map((video) => (
                        <Link href={`/video/${video.id}`} key={video.id}>
                            <VideoCard
                                title={video.title}
                                thumbnail={video.thumbnailUrl}
                                views={video.views}
                                duration={video.duration}
                                artists={video.artists[0]}
                            />
                        </Link>
                    ))}
                </div>
                <div className="py-8">
                    <ChangePages
                        currentPage={store.currentPage}
                        setCurrentPage={store.setCurrentPage}
                        totalItems={store.Videos.length}
                        itemsPerPage={store.itemsPerPage}
                    />
                </div>
            </main>
        </>
    );

    // return (
    //     <div className="bg-background">
    //         <VideoNavbar />
    //         <main className="container mx-auto">
    //             <VideoFilters />
    //             <ChangePages
    //                 currentPage={store.currentPage}
    //                 setCurrentPage={store.setCurrentPage}
    //                 totalItems={store.Videos.length}
    //                 itemsPerPage={store.itemsPerPage}
    //             />
    //             <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    //                 {store.Videos.map((video) => (
    //                     <Link href={`/video/${video.id}`} key={video.id}>
    //                         <VideoCard
    //                             title={video.title}
    //                             thumbnail={video.thumbnailUrl}
    //                             views={video.views}
    //                             duration={video.duration}
    //                             artists={video.artists[0]}
    //                         />
    //                     </Link>
    //                 ))}
    //             </div>
    //             <div className="py-8">
    //                 <ChangePages
    //                     currentPage={store.currentPage}
    //                     setCurrentPage={store.setCurrentPage}
    //                     totalItems={store.Videos.length}
    //                     itemsPerPage={store.itemsPerPage}
    //                 />
    //                 {/* <Pagination>
    //                     <PaginationContent>
    //                         <PaginationItem>
    //                             <PaginationPrevious href="#" />
    //                         </PaginationItem>
    //                         <PaginationItem>
    //                             <PaginationLink href="#" isActive>
    //                                 1
    //                             </PaginationLink>
    //                         </PaginationItem>
    //                         <PaginationItem>
    //                             <PaginationLink href="#">2</PaginationLink>
    //                         </PaginationItem>
    //                         <PaginationItem>
    //                             <PaginationLink href="#">3</PaginationLink>
    //                         </PaginationItem>
    //                         <PaginationItem>
    //                             <PaginationEllipsis />
    //                         </PaginationItem>
    //                         <PaginationItem>
    //                             <PaginationNext href="#" />
    //                         </PaginationItem>
    //                     </PaginationContent>
    //                 </Pagination> */}
    //             </div>
    //             {/* <ChangePages /> */}
    //         </main>
    //     </div>
    // );
}
