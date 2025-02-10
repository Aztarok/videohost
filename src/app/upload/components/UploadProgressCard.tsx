"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/store/store";
import { ExtendedFile } from "@/types/extendedFile";
import { converByteToMegabyte } from "@/utils/functions";
import { useCallback, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";
import { FileThumbnail } from "./FileThumbnail";

type Props = ExtendedFile;

const UploadProgressCard = ({ file, id, uploadStatus }: Props) => {
    const { removeFile } = useStore(
        useShallow((state) => ({ removeFile: state.removeFile }))
    );
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (uploadStatus === "uploading") {
            let progressValue = 0;

            const interval = setInterval(() => {
                progressValue += 1;
                setProgress((prev) => prev + 1);
                if (progressValue >= 100) {
                    setProgress(100);
                    progressValue = 100;
                    clearInterval(interval);
                }
            }, 500);
            return () => clearInterval(interval);
        }
        if (uploadStatus === "success") {
            setProgress(100);
            const interval = setInterval(() => {
                removeFile(id);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [id, removeFile, uploadStatus]);

    const getStatusColor = useCallback(() => {
        switch (uploadStatus) {
            case "success":
                return "bg-green-500";
            case "error":
                return "bg-red-500";
            default:
                return "bg-blue-500";
        }
    }, [uploadStatus]);

    function handleRemove() {
        removeFile(id);
    }
    return (
        <MaxWidthWrapper>
            <Card
                className="text-left shadow w-full mx-auto mt-5 rounded-md pt-4 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                <CardContent className="flex justify-between">
                    <div className="flex items-center">
                        <FileThumbnail name={file.name} />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium">{file.name}</h3>
                            <p className="text-xs text-gray-500">
                                {converByteToMegabyte(file.size)}
                            </p>
                        </div>
                    </div>
                    <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={handleRemove}
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </CardContent>
                <CardContent className="my-3 p-0 flex justify-between items-center">
                    <Progress
                        className="mx-5 bg-blue-900  p-0"
                        indicateColor={getStatusColor()}
                        value={progress}
                    />
                    <p className="mt-1 text-xs text-gray-500 mr-5">
                        {`${Math.round(progress)}%`}
                    </p>
                </CardContent>
            </Card>
        </MaxWidthWrapper>
    );
};

export default UploadProgressCard;
