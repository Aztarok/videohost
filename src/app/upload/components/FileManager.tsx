"use client";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import ButtonBase from "@/components/ui/button-base";
import { useFileUploadMutation } from "@/hooks/useFileUploadMutation";
import { maxFileSize } from "@/lib";
import { useStore } from "@/store/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDropzone } from "react-dropzone";
import { MdFileUpload } from "react-icons/md";
import { useShallow } from "zustand/react/shallow";
import UploadProgressCard from "./UploadProgressCard";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";

const FileManager = () => {
    const { files, appendFiles } = useStore(
        useShallow((state) => ({
            files: state.files,
            appendFiles: state.appendFiles
        }))
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const fileUploadMutation = useFileUploadMutation();

    // function onDrop(acceptedFiles: File[]) {
    //     if (files.length > 0) return;
    //     fileUploadMutation.mutate(
    //         acceptedFiles.map((file) => ({
    //             file,
    //             id: `${file.name}${file.size}`,
    //             uploadStatus: "idle",
    //             uploadProgress: 0
    //         }))
    //     );
    // }
    function onDrop(acceptedFiles: File[]) {
        if (files.length > 0) return;
        appendFiles(acceptedFiles);
    }
    const handleUpload = () => {
        fileUploadMutation.mutate(files, {
            onSuccess: () => {
                // Reset states after successful upload
                setTitle("");
                setDescription("");
                setThumbnail(null);
                useStore.setState({ files: [] }); // Clear uploaded files
                toast.success("Upload successful!");
            }
        });
    };

    function onDropRejected() {
        toast.error("Only video files are allowed");
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: maxFileSize,
        accept: {
            "video/*": []
        },
        onDropRejected
    });

    const handleThumbnailUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            appendFiles([file]);
            setThumbnail(file);
        }
    };
    const [autoAnimateRef] = useAutoAnimate();

    //File uploading to Supabase v1
    // const handleUpload = async () => {
    //     if (!files) return;

    //     try {
    //         const supabase = createClient();
    //         const { data, error } = await supabase.storage
    //             .from("videos")
    //             .upload(files[0].id, files[0].file);

    //         if (error) {
    //             console.error("Error uploading file:", error);
    //         } else {
    //             console.log("File uploaded successfully:", data);
    //         }
    //     } catch (error) {
    //         console.error("Unexpected error:", error);
    //     }
    // };

    return (
        <MaxWidthWrapper className="flex-1 flex flex-col h-full items-center bg-blue-800">
            <ButtonBase
                {...getRootProps()}
                className="rounded-lg bg-slate-900/90 flex mt-20 flex-col text-lg gap-2 items-center justify-center px-28 p-2"
            >
                <input {...getInputProps()} />{" "}
                {/* Spread input props directly */}
                <MdFileUpload style={{ width: "69px", height: "69px" }} />
                <div className="flex flex-col items-center gap-1">
                    <p className="text-lg font-bold text-white text-center">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-lg font-bold text-white text-center">
                        Max 1GB
                    </p>
                </div>
            </ButtonBase>
            <div
                ref={autoAnimateRef}
                className="mt-6 gap-4 flex flex-col w-full"
            >
                {files.length > 0 ? (
                    <>
                        {files.map((file) => (
                            <UploadProgressCard {...file} key={file.id} />
                        ))}
                        <input
                            type="text"
                            placeholder="Enter video title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-4 px-4 py-2 rounded-lg w-3/4"
                        />
                        <textarea
                            placeholder="Enter video description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-2 px-4 py-2 rounded-lg w-3/4 min-h-32"
                        />{" "}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            className="mt-2"
                        />
                        {thumbnail && (
                            <p className="text-white">
                                Thumbnail selected: {thumbnail.name}
                            </p>
                        )}
                    </>
                ) : (
                    <p className="text-white font-bold text-center">
                        No files uploaded yet.
                    </p>
                )}
                {files.length > 0 && (
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Upload Files
                    </button>
                )}

                {/* <Button onClick={handleUpload}>Upload</Button> */}
            </div>
        </MaxWidthWrapper>
    );
};

export default FileManager;
