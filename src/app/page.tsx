import Navbar from "@/components/Navbar";
import VideoShower from "@/components/VideoShower";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    return (
        <div className="h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col w-full">
                <div className="w-full">
                    {/* {!data.user && <Link href={"/sign-up"}>Sign Up</Link>}
                    {!data.user && <Link href={"/sign-in"}>Sign In</Link>}
                    {data.user && <SignOutButton />} */}
                    {/* <Navbar signedIn={data.user?.email || ""} /> */}
                </div>
                <VideoShower />
            </div>
        </div>
    );
}
