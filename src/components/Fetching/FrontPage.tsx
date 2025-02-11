import { RealVideo } from "@/types/video";
import Link from "next/link";
import React from "react";
import { VideoFilters } from "../Navbar/VideoFilters";
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
                    <Link href={`/video/${video.id}`} key={video.id}>
                        <VideoCard
                            title={video.title!}
                            thumbnail={video.thumbnailUrl!}
                            views={video.views!}
                            duration={video.duration!}
                            artists={video.creators!}
                        />
                        {video.user_id}
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default FrontPage;
