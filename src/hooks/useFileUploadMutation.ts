import { useStore } from "@/store/store";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExtendedFile } from "../types/extendedFile";

export function useFileUploadMutation() {
    const updateUploadStatus = useStore((state) => state.updateUploadStatus);
    const appendFiles = useStore((state) => state.appendFiles);
    const user = useStore((state) => state.user);

    const queryClient = useQueryClient();

    return useMutation({
        onMutate: (variables) => {
            appendFiles(variables.map((item) => item.file));
        },
        // Attempt 1
        // mutationFn: async (files: ExtendedFile[]) => {
        //     const uploadPromises = files.map(async (file) => {
        //         if (file.uploadStatus === "idle") {
        //             updateUploadStatus(file.id, "uploading");

        //             const formData = new FormData();
        //             formData.append("file", file.file);
        //             console.log(1, formData);
        //             return httpClient
        //                 .post("/", formData, {
        //                     headers: {
        //                         "Content-Type": "multipart/form-data"
        //                     },
        //                     onUploadProgress: (event) => {
        //                         if (event.lengthComputable && event.total) {
        //                             const percentComplete = Math.round(
        //                                 (event.loaded / event.total) * 100
        //                             );
        //                             updateUploadProgress(
        //                                 file.id,
        //                                 percentComplete
        //                             );
        //                         }
        //                     }
        //                 })
        //                 .then(() => {
        //                     updateUploadStatus(file.id, "success");
        //                     console.log(2, formData);
        //                 })
        //                 .catch(() => {
        //                     updateUploadStatus(file.id, "error");
        //                 });
        //         }
        //         return Promise.resolve();
        //     });
        //     await Promise.all(uploadPromises);
        // },
        // Attempt 2

        mutationFn: async (files: ExtendedFile[]) => {
            console.log("Mutation called!"); // Debugging log

            const supabase = createClient();
            const { data: userData, error } = await supabase.auth.getUser();

            if (error || !userData) {
                console.log("User data error:", error);
                return;
            }

            const videoFile = files[0];
            const videoPath = `${userData.user.id}/${videoFile.id}`;

            updateUploadStatus(videoFile.id, "uploading");

            const { data: videoData, error: videoError } =
                await supabase.storage
                    .from("videos")
                    .upload(videoPath, videoFile.file);

            if (videoError) {
                console.log("Video upload error:", videoError);
                updateUploadStatus(videoFile.id, "error");
                return;
            }

            const thumbnailFile = files[1];
            const thumbnailPath = `${userData.user.id}/${videoFile.id}-thumb`;

            updateUploadStatus(thumbnailFile.id, "uploading");

            const { error: thumbError } = await supabase.storage
                .from("videos")
                .upload(thumbnailPath, thumbnailFile.file);

            if (thumbError) {
                console.log("Thumbnail upload error:", thumbError);
                updateUploadStatus(thumbnailFile.id, "error");
                return;
            }

            const videoUrl = `${process.env.NEXT_PUBLIC_API_URL2}/${videoPath}`;
            const thumbnailUrl = `${process.env.NEXT_PUBLIC_API_URL2}/${thumbnailPath}`;

            // Prevent duplicate inserts
            console.log("Inserting video data...");
            const { error: insertError } = await supabase
                .from("videos")
                .insert([
                    {
                        user_id: userData.user.id,
                        title: videoFile.file.name,
                        description: videoFile.file.name,
                        url: videoUrl,
                        thumbnailUrl: thumbnailUrl,
                        duration: 0,
                        views: 0,
                        likes: 0,
                        comments: 0,
                        tags: null,
                        released: true,
                        is_public: true,
                        creators: user?.userName,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (insertError) {
                console.log("Insert error:", insertError);
                return;
            }

            updateUploadStatus(videoFile.id, "success");
            updateUploadStatus(thumbnailFile.id, "success");

            return videoData;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["files"] });
        }
    });
}
