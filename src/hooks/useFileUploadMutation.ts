import { useStore } from "@/store/store";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExtendedFile } from "../types/extendedFile";

export function useFileUploadMutation() {
    const updateUploadStatus = useStore((state) => state.updateUploadStatus);
    const appendFiles = useStore((state) => state.appendFiles);

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

            const uploadPromises = files.map(async (file) => {
                if (file.uploadStatus === "idle") {
                    updateUploadStatus(file.id, "uploading");

                    const { data, error } = await supabase.storage
                        .from("videos")
                        .upload(`${userData.user.id}/${file.id}`, file.file);

                    if (error) {
                        updateUploadStatus(file.id, "error");
                        throw new Error(`Upload failed for file ${file.id}`);
                    }

                    updateUploadStatus(file.id, "success");
                    return data;
                }
                return Promise.resolve();
            });
            return Promise.all(uploadPromises);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["files"] });
        }
    });
}
