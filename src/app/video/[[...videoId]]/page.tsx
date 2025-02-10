import CommentSection from "@/components/VideoPage/CommentSection";
import LikeButtons from "@/components/VideoPage/InteractionButtons";
import SimilarVideos from "@/components/VideoPage/SimilarVideos";
import VideoPlayer from "@/components/VideoPage/VideoPlayer";
import VideoPlayerServer from "@/components/VideoPage/VideoPlayerServer";
import { useVideoQuery } from "@/services/queries";
import { createClient } from "@/utils/supabase/server";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
    useQueryClient
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { use } from "react";

export default async function VideoPage({
    params
}: {
    params: Promise<{ videoId: string | string[] | number }>;
}) {
    const resolvedParams = await params;
    const id = Array.isArray(resolvedParams.videoId)
        ? Number(resolvedParams.videoId[0]) // Take the first element of the array
        : typeof resolvedParams.videoId === "string"
        ? Number(resolvedParams.videoId) // Convert string to number
        : resolvedParams.videoId; // Use as-is if already a number

    const queryClient = new QueryClient();
    const supabase = await createClient();

    await queryClient.prefetchQuery(
        useVideoQuery({ videoId: id, client: supabase })
    );

    return (
        <div className="h-full bg-slate-500 text-black flex-1">
            <div className="max-w-7xl mx-auto px-4 py-8 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {/* <VideoPlayer videoId={id} /> */}
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <VideoPlayerServer videoId={id} />
                        </HydrationBoundary>

                        <div className="bg-slate-950 text-white p-6 rounded-lg shadow-sm">
                            <h1 className="text-2xl font-bold mb-4">
                                Video Title
                            </h1>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-white">
                                        123,456 views • Feb 23, 2024
                                    </span>
                                </div>
                                <LikeButtons />
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-6 rounded-lg shadow-sm">
                            <CommentSection />
                        </div>
                    </div>
                    <div className="lg:col-span-1 flex flex-col min-h-[100%]">
                        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-sm">
                            <SimilarVideos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
