"use client";

import { useVideoQuery } from "@/services/queries";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const VideoPlayerServer = ({ videoId }: { videoId: number }) => {
    const supabase = createClient();
    const { data: currentClientVideoData } = useQuery(
        useVideoQuery({ videoId, client: supabase })
    );

    if (!currentClientVideoData) {
        return (
            <div className="flex flex-col space-y-3">
                <Skeleton className="w-full aspect-video bg-slate-800 rounded-lg relative" />
            </div>
        );
    }

    const imageUrl = "1.jpg";
    console.log(currentClientVideoData);
    return (
        <div className="w-full aspect-video bg-black rounded-lg shadow-lg relative flex items-center justify-center">
            {/* <Image
                src={`${currentClientVideoData.url}`}
                className="object-fill rounded-lg"
                alt="Video Placeholder"
                fill
            /> */}
            {/* <video>
                <source src={`${encodedUrl}`} type="video/mp4" />
            </video> */}
            {currentClientVideoData?.url ? (
                <video
                    controls
                    className="absolute inset-0 h-full w-full object-contain"
                >
                    <source
                        src={`${currentClientVideoData.url}`}
                        type="video/mp4"
                    />
                </video>
            ) : (
                <Skeleton className="w-full aspect-video bg-slate-800 rounded-lg relative" />
            )}
            {JSON.stringify(currentClientVideoData, null, 2)}
            {JSON.stringify(currentClientVideoData.url, null, 2)}
        </div>
    );
};

export default VideoPlayerServer;
