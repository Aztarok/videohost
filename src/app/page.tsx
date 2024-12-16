import Navbar from "@/components/Navbar";
import VideoShower from "@/components/VideoShower";
import { createClient } from "@/utils/supabase/server";

// Mock data for videos
const videos1 = Array(20)
    .fill(null)
    .map((_, i) => ({
        id: i + 1,
        title: `Amazing Video ${i + 1}`,
        thumbnail: `https://loremflickr.com/320/240/`, // Ensure unique thumbnail URLs
        views: `${(i + 1) * 100}K`, // Generate views based on a predictable formula
        duration: `${Math.floor((i % 10) + 1)}:${((i + 15) % 60)
            .toString()
            .padStart(2, "0")}`, // Unique but consistent durations
        creator: `Creator ${i + 1}`
    }));

const videos = Array(25)
    .fill(null)
    .map((_, i) => ({
        id: i + 1,
        title: `Amazing Video ${i + 1}`,
        thumbnail: `https://loremflickr.com/320/240/${i + 1}`,
        views: `${Math.floor(Math.random() * 1000)}K`,
        duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(
            Math.random() * 60
        )
            .toString()
            .padStart(2, "0")}`,
        creator: `Creator ${i + 1}`
    }));
export default async function Home() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    return (
        <div className="h-full pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col w-full">
                <div className="w-full">
                    {/* {!data.user && <Link href={"/sign-up"}>Sign Up</Link>}
                    {!data.user && <Link href={"/sign-in"}>Sign In</Link>}
                    {data.user && <SignOutButton />} */}
                    {/* <Navbar signedIn={data.user?.email || ""} /> */}
                </div>
                <VideoShower videoArray={videos} />
            </div>
        </div>
    );
}
