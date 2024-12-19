"use client";

import { useStore } from "@/store/store";
import { Video } from "@/types/video";
import Link from "next/link";
import { useEffect } from "react";
import ChangePages from "./ChangePages";
import { VideoFilters } from "./VideoFilters";
import { VideoNavbar } from "./VideoNavbar";
import { VideoCard } from "./ui/video-card";



export default function VideoShower({ videoArray, session }: { videoArray: Video[], session: any }) {
    const store = useStore()

    useEffect(() => {
        store.setVideos(videoArray)
    }, [videoArray, store.Videos, store.setVideos])
    // const currentVideo = store.Videos.find((video) => video.id === store.currentItem);
    return (
        <>
            <VideoNavbar session={session} />
            <main className="container mx-auto">
                <VideoFilters />
                <ChangePages
                    currentPage={store.currentPage}
                    setCurrentPage={store.setCurrentPage}
                    totalItems={store.Videos.length}
                    itemsPerPage={store.itemsPerPage}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {store.currentItem ? store.currentItem.map((video) => (
                        <Link href={`/video/${video.id}`} key={video.id}>
                            <VideoCard
                                title={video.title}
                                thumbnail={video.thumbnailUrl}
                                views={video.views}
                                duration={video.duration}
                                artists={video.artists[0]}
                            />
                        </Link>
                    )) : <p>No videos found</p>}
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
}
