import { useQuery } from "@tanstack/react-query";
import { videoFetch, videoFetchById, videoFetchByIdSupabase } from "./api";
import { TypedSupabaseClient } from "@/utils/supabase/supabase";

export const useVideoFetch = () => {
    return useQuery({
        queryKey: ["videos"],
        queryFn: videoFetch
    });
};

export const useTotalVideos = () => {
    return useQuery({ queryKey: ["videos", "count"], queryFn: videoFetch });
};

export const useVideoFetchById = ({ id }: { id: number }) => {
    return useQuery({
        queryKey: ["videos", id],
        queryFn: () => videoFetchById({ id })
    });
};

export const useVideoQuery = ({
    videoId,
    client
}: {
    videoId: number;
    client: TypedSupabaseClient;
}) => {
    const queryKey = ["video", videoId];
    const queryFn = async () => {
        return videoFetchByIdSupabase(client, videoId).then((res) => res.data);
    };
    return { queryKey, queryFn };
};
