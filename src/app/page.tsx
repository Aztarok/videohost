import VideoShower from "@/components/VideoShower";
import { videos } from "@/testing/constants";
import { Video } from "@/types/video";

// Mock data for videos
// const videos = Array(25)
//     .fill(null)
//     .map((_, i) => ({
//         id: i + 1,
//         title: `Amazing Video ${i + 1}`,
//         thumbnail: `https://loremflickr.com/320/240/${i + 1}`,
//         views: `${Math.floor(Math.random() * 1000)}K`,
//         duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(
//             Math.random() * 60
//         )
//             .toString()
//             .padStart(2, "0")}`,
//         creator: `Creator ${i + 1}`
// }));

const videoArray: Video[] = videos;

export default async function Home() {
    return (
        <>
            <VideoShower videoArray={videoArray} />
        </>
    );
}
