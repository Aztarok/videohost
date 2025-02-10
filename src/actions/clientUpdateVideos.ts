"use client";

import { useStore } from "@/store/store";
import { Video } from "@/types/video";
import { useShallow } from "zustand/react/shallow";

type Props = {
    videos: Video[];
};

export const updateVideos = async (videoArray: Video[]) => {
    const { Videos, setVideos } = useStore(
        useShallow((state) => ({
            Videos: state.Videos,
            setVideos: state.setVideos
        }))
    );

    setVideos(videoArray);
};
