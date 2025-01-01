"use client";

import { useStore } from "@/store/store";
import { Video } from "@/types/video";
import Link from "next/link";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import ChangePages from "./ChangePages";
import { VideoFilters } from "./Navbar/VideoFilters";
import { VideoCard } from "./ui/video-card";

export default function VideoShower({ videoArray }: { videoArray: Video[] }) {
    const {
        Videos,
        setVideos,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        currentItem,
        indexOfLastItem,
        indexOfFirstItem
    } = useStore(
        useShallow((state) => ({
            Videos: state.Videos,
            setVideos: state.setVideos,
            currentPage: state.currentPage,
            setCurrentPage: state.setCurrentPage,
            itemsPerPage: state.itemsPerPage,
            currentItem: state.currentItem,
            indexOfLastItem: state.indexOfLastItem,
            indexOfFirstItem: state.indexOfFirstItem
        }))
    );

    useEffect(() => {
        const paginatedVideos = videoArray.slice(
            indexOfFirstItem,
            indexOfLastItem
        );

        if (JSON.stringify(paginatedVideos) !== JSON.stringify(Videos)) {
            setVideos(paginatedVideos);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoArray, Videos, setVideos, currentPage]);
    // const currentVideo = store.Videos.find((video) => video.id === store.currentItem);

    return (
        <>
            <main className="container mx-auto">
                <VideoFilters />
                <ChangePages
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={videoArray.length}
                    itemsPerPage={itemsPerPage}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {currentItem ? (
                        currentItem.map((video) => (
                            <Link href={`/video/${video.id}`} key={video.id}>
                                <VideoCard
                                    title={video.title}
                                    thumbnail={video.thumbnailUrl}
                                    views={video.views}
                                    duration={video.duration}
                                    artists={video.artists[0]}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>No videos found</p>
                    )}
                </div>
                <div className="py-8">
                    <ChangePages
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={videoArray.length}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </main>
        </>
    );
}
