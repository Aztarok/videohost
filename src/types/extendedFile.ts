export type ExtendedFile = {
    file: File;
    id: string;
    uploadProgress: number;
    uploadStatus: "idle" | "uploading" | "success" | "error";
};
