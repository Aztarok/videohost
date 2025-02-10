"use server";

import { videos } from "@/testing/constants";
import { Video } from "@/types/video";

type ReturnValue = {
    success: boolean;
    message: string;
    videos?: Video[];
};

export const submitTagsAction = async (
    formData: FormData
): Promise<ReturnValue> => {
    const tags = Array.from(formData.getAll("tag")).filter(
        (entry): entry is string => typeof entry === "string"
    );
    const filteredVideos = videos.filter((video) =>
        tags.every((tag) => video.tags?.includes(tag))
    );
    return {
        success: true,
        message: "success",
        videos: filteredVideos
    };
};
