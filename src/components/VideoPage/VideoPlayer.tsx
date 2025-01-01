"use client";

import { useStore } from "@/store/store";
import Image from "next/image";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { Skeleton } from "../ui/skeleton";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
    const videos = useStore(useShallow((state) => state.Videos));

    const currentClientVideoData = useMemo(
        () => videos.find((video) => video.id === parseInt(videoId)),
        [videos, videoId]
    );

    if (!currentClientVideoData) {
        return (
            <div className="flex flex-col space-y-3">
                <Skeleton className="w-full aspect-video bg-slate-800 rounded-lg relative" />
            </div>
        );
    }

    return (
        <div className="w-full aspect-video bg-black rounded-lg shadow-lg relative">
            <Image
                src={currentClientVideoData!.thumbnailUrl}
                className="object-cover rounded-lg"
                alt="Video Placeholder"
                fill
            />
        </div>
    );
};

export default VideoPlayer;
