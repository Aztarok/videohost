"use client";

import { useStore } from "@/store/store";
import { Video } from "@/types/video";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import ChangePages from "./ChangePages";
import { VideoFilters } from "./Navbar/VideoFilters";
import { VideoCard } from "./ui/video-card";

export default function VideoShower({ videoArray }: { videoArray: Video[] }) {
    const { currentPage, setCurrentPage, itemsPerPage, currentItem } = useStore(
        useShallow((state) => ({
            currentPage: state.currentPage,
            setCurrentPage: state.setCurrentPage,
            itemsPerPage: state.itemsPerPage,
            currentItem: state.currentItem
        }))
    );

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
                                    artists={video.creators[0]}
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
