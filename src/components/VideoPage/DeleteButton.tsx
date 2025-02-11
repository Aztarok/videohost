"use client";

import { useVideoQuery } from "@/services/queries";
import { useStore } from "@/store/store";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";

const DeleteButton = ({ videoId }: { videoId: string }) => {
    const supabase = createClient();
    const { data: currentClientVideoData } = useQuery(
        useVideoQuery({ videoId, client: supabase })
    );
    const { user } = useStore(
        useShallow((state) => ({
            user: state.user
        }))
    );
    const router = useRouter();
    const handleDelete = async () => {
        const { error } = await supabase
            .from("videos")
            .delete()
            .eq("id", videoId);
        if (error) console.log(error);
        router.push("/");
        router.refresh();
    };
    return (
        <div>
            {currentClientVideoData?.user_id === user?.id && (
                <Button onClick={handleDelete}>Delete Video</Button>
            )}
        </div>
    );
};

export default DeleteButton;
