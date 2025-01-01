import { Store } from "@/types/store";
import { StateCreator } from "zustand";
import { ExtendedFile } from "../types/extendedFile";

type FileState = {
    files: ExtendedFile[];
    selectedFileIds: string[];
};

type FileActions = {
    appendFiles: (acceptedFiles: File[]) => void;
    removeFile: (id: string) => void;
    updateUploadProgress: (id: string, uploadProgress: number) => void;
    updateUploadStatus: (
        id: string,
        uploadStatus: ExtendedFile["uploadStatus"]
    ) => void;
    updateSelectedFileIds: (ids: string[]) => void;
};

export type fileSlice = FileState & FileActions;

export const createFileSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    fileSlice
> = (set) => ({
    files: [],
    selectedFileIds: [],
    appendFiles: (acceptedFiles) =>
        set((state) => {
            const notDuplicatedNewFiles: ExtendedFile[] = acceptedFiles
                .filter((file) => {
                    const isDuplicate = state.files.some(
                        (subItem) => subItem.id === `${file.name}${file.size}`
                    );
                    return !isDuplicate;
                })
                .map((file) => ({
                    file,
                    id: `${file.name}${file.size}`,
                    uploadStatus: "idle",
                    uploadProgress: 0
                }));
            return {
                files: [...state.files, ...notDuplicatedNewFiles]
            };
        }),
    removeFile: (id) =>
        set((state) => ({
            files: state.files.filter((file) => file.id !== id)
        })),
    updateUploadProgress: (id, uploadProgress) =>
        set((state) => ({
            files: state.files.map((file) =>
                file.id === id ? { ...file, uploadProgress } : file
            )
        })),
    updateUploadStatus: (id, uploadStatus) =>
        set((state) => ({
            files: state.files.map((file) =>
                file.id === id ? { ...file, uploadStatus } : file
            )
        })),
    updateSelectedFileIds: (ids) => set({ selectedFileIds: ids })
});