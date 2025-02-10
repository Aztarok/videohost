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
            const supabase = createClient();
            const { data: userData, error } = await supabase.auth.getUser();

            if (error) {
                console.log(error);
                return;
            }
            if (!userData) {
                return;
            }

            const videoFile = files[0]; // Only one video is allowed
            const videoPath = `${userData.user.id}/${videoFile.id}`;

            updateUploadStatus(videoFile.id, "uploading"); // Mark video as uploading

            // Upload video file first
            const { data: videoData, error: videoError } =
                await supabase.storage
                    .from("videos")
                    .upload(videoPath, videoFile.file);

            if (videoError) {
                updateUploadStatus(videoFile.id, "error");
                console.log(videoError);
                throw new Error(`Upload failed for video ${videoFile.id}`);
            }

            const thumbnailFile = files[1]; // Assuming the second file is the thumbnail
            const thumbnailPath = `${userData.user.id}/${videoFile.id}-thumb`;

            updateUploadStatus(thumbnailFile.id, "uploading"); // Mark thumbnail as uploading

            // Upload thumbnail file
            const { data: thumbData, error: thumbError } =
                await supabase.storage
                    .from("videos")
                    .upload(thumbnailPath, thumbnailFile.file);

            if (thumbError) {
                updateUploadStatus(thumbnailFile.id, "error");
                console.log(thumbError);
                throw new Error(
                    `Upload failed for thumbnail ${thumbnailFile.id}`
                );
            }

            // Generate video and thumbnail URLs
            const videoUrl = `${process.env.NEXT_PUBLIC_API_URL2}/${videoPath}`;
            const thumbnailUrl = `${process.env.NEXT_PUBLIC_API_URL2}/${thumbnailPath}`;

            // Insert the video record into the database
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
                console.log(insertError);
                throw new Error("Failed to insert video data");
            }

            // Mark both files as successfully uploaded
            updateUploadStatus(videoFile.id, "success");
            updateUploadStatus(thumbnailFile.id, "success");

            return videoData;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["files"] });
        }
    });
}
