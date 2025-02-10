import { useStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export function useFetchVideosMutation() {
    const { Videos, setVideos } = useStore(
        useShallow((state) => ({
            Videos: state.Videos,
            setVideos: state.setVideos
        }))
    );

    const queryClient = useQueryClient();
}
