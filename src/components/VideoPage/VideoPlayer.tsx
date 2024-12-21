import Image from "next/image";


const VideoPlayer = ({ videoId }: { videoId: string }) => {
    return (
        <div className="w-full aspect-video bg-black rounded-lg shadow-lg relative">
            <Image src={`/${videoId}.png`} className="object-cover rounded-lg" alt="Video Placeholder" fill />
        </div>
    );
};

export default VideoPlayer;