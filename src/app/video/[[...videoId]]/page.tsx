import CommentSection from "@/components/VideoPage/CommentSection";
import LikeButtons from "@/components/VideoPage/InteractionButtons";
import SimilarVideos from "@/components/VideoPage/SimilarVideos";
import VideoPlayer from "@/components/VideoPage/VideoPlayer";

export default async function VideoPage({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = await params;

    return (
        <div className="min-h-screen bg-slate-800 text-black">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <VideoPlayer videoId={videoId} />

                        <div className="bg-slate-950 text-white p-6 rounded-lg shadow-sm">
                            <h1 className="text-2xl font-bold mb-4">Video Title</h1>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600">123,456 views • Feb 23, 2024</span>
                                </div>
                                <LikeButtons />
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-6 rounded-lg shadow-sm">
                            <CommentSection />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <SimilarVideos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
