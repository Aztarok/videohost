import { Video } from "@/types/video";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFilterVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (tags: string[]) => {
            // Retrieve cached videos from the query client
            const cachedVideos = queryClient.getQueryData<Video[]>(["videos"]);

            if (!cachedVideos) {
                console.warn("No cached videos found.");
                return [];
            }
            if (!tags || tags.length === 0) {
                return cachedVideos;
            }
            // Filter videos by checking if all tags match
            return cachedVideos.filter((video) =>
                tags.some((tag) => video.tags?.includes(tag))
            );
        }
    });
};
