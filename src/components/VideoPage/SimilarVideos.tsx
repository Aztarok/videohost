
const SimilarVideos = () => {
    const videos = Array(4).fill(null).map((_, i) => ({
        id: i + 1,
        title: `Similar Video ${i + 1}`,
        views: Math.floor(Math.random() * 100000),
        timestamp: '3 days ago'
    }));

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Similar Videos</h3>
            <div className="space-y-4">
                {videos.map((video) => (
                    <div key={video.id} className="flex gap-3">
                        <div className="w-40 h-24 bg-black rounded-lg flex-shrink-0" />
                        <div>
                            <h4 className="font-medium line-clamp-2">{video.title}</h4>
                            <p className="text-sm text-gray-500">
                                {video.views.toLocaleString()} views • {video.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarVideos;