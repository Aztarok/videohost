import { Store } from "@/types/store";
import { Video } from "@/types/video";
import { StateCreator } from "zustand";

export type VideoState = {
    Videos: Video[];
};

export type VideoActions = {
    setVideos: (videos: Video[]) => void;
    setRelease: (release: boolean) => void;
    setDescription: (description: string) => void;
    setTags: (tag: string) => void;
    setComments: (comment: number) => void;
    setLikes: (like: number) => void;
    setViews: (view: number) => void;
    setTitle: (title: string) => void;
    setPublic: (isPublic: boolean) => void;
    getVideoById: (id: number) => Video | undefined;
    getVideoByTitle: (title: string) => Video | undefined;
    getVideoByTag: (tag: string) => Video | undefined;
    getVideoByArtist: (artist: string) => Video | undefined;
    getVideosBySearch: (searchParams: {
        title?: string;
        tag?: string;
        artist?: string;
    }) => Video[] | undefined;
    reset: () => void;
};

export type videoSlice = VideoState & VideoActions;

const initialState: VideoState = {
    Videos: []
};

export const createVideoSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    videoSlice
> = (set, get) => ({
    ...initialState,
    setVideos: (videos: Video[]) =>
        set((state) => {
            state.Videos = videos;
        }),
    setRelease: (release: boolean) =>
        set((state) => {
            state.Videos[0].released = release;
        }),
    setDescription: (description: string) =>
        set((state) => {
            state.Videos[0].description = description;
        }),
    setTags: (tag: string) =>
        set((state) => {
            state.Videos[0].tags?.push(tag);
        }),
    setComments: (comment: number) =>
        set((state) => {
            state.Videos[0].comments = comment;
        }),
    setLikes: (like: number) =>
        set((state) => {
            state.Videos[0].likes = like;
        }),
    setViews: (view: number) =>
        set((state) => {
            state.Videos[0].views = view;
        }),
    setTitle: (title: string) =>
        set((state) => {
            state.Videos[0].title = title;
        }),
    setPublic: (isPublic: boolean) =>
        set((state) => {
            state.Videos[0].isPublic = isPublic;
        }),
    getVideoById: (id: number) => get().Videos.find((video) => video.id === id),
    getVideoByTitle: (title: string) =>
        get().Videos.find((video) => video.title === title),
    getVideoByTag: (tag: string) =>
        get().Videos.find((video) => video.tags?.includes(tag)),
    getVideoByArtist: (artist: string) =>
        get().Videos.find((video) => video.creators?.includes(artist)),
    getVideosBySearch: (searchParams: {
        title?: string;
        tag?: string;
        artist?: string;
    }) => {
        return get().Videos.filter((video) => {
            return (
                (!searchParams.title ||
                    video.title
                        .toLowerCase()
                        .includes(searchParams.title.toLowerCase())) &&
                (!searchParams.tag ||
                    video.tags?.some(
                        (t) =>
                            searchParams.tag &&
                            t
                                .toLowerCase()
                                .includes(searchParams.tag.toLowerCase())
                    )) &&
                (!searchParams.artist ||
                    video.creators?.some(
                        (a) =>
                            searchParams.artist &&
                            a
                                .toLowerCase()
                                .includes(searchParams.artist.toLowerCase())
                    ))
            );
        });
    },
    reset: () =>
        set((state) => {
            state.Videos = [];
        })
});
