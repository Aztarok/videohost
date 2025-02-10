import { videos } from "@/testing/constants";
import { Video } from "@/types/video";
import { TypedSupabaseClient } from "@/utils/supabase/supabase";

export const videoFetch = async () => {
    const response: Video[] = await videos;
    return response;
};
export const videoFetchById = async ({ id }: { id: number }) => {
    const response: Video[] = await videos;
    return response.filter((video) => video.id === Number(id))[0];
};

export const videoFetchByIdSupabase = async (
    client: TypedSupabaseClient,
    videoId: number
) => {
    return client
        .from("videos")
        .select("*")
        .eq("id", "b0f4eaf4-4b37-460e-b00a-a6ce7dbc1abb")
        .throwOnError()
        .single();
};

// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient("https://your-project.supabase.co", "your-anon-key");

// // Function to fetch the total count of videos
// export const fetchTotalCount = async () => {
//     const { count, error } = await supabase
//         .from("videos")
//         .select("*", { count: "exact", head: true });

//     if (error) throw new Error(error.message);
//     return count;
// };

// Function to fetch videos for a specific page
// export const fetchVideosByPage = async (page: number, limit: number) => {
//     const start = (page - 1) * limit;
//     const end = start + limit - 1;

//     const { data, error } = await supabase
//         .from("videos")
//         .select("*")
//         .order("created_at", { ascending: false })
//         .range(start, end);

//     if (error) throw new Error(error.message);
//     return data;
// };
