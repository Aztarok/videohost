import { RealVideo, Video } from "@/types/video";
import React from "react";
import { VideoFilters } from "../Navbar/VideoFilters";
import { MaxWidthWrapper } from "../MaxWidthWrapper";
import { VideoCard } from "../ui/video-card";

interface FrontPageProps {
    videos: RealVideo[] | null;
}

const FrontPage: React.FC<FrontPageProps> = ({ videos }) => {
    return (
        <main className="container mx-auto">
            <VideoFilters />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {videos?.map((video) => (
                    <div key={video.id}>
                        <VideoCard
                            key={video.id}
                            title={video.title!}
                            thumbnail={video.thumbnailUrl!}
                            views={video.views!}
                            duration={video.duration!}
                            artists={video.user_id!}
                        />
                        {video.user_id}
                    </div>
                ))}
                {JSON.stringify(videos)}
            </div>
        </main>
    );
};

export default FrontPage;
