import {
    FaFileImage,
    FaFileVideo,
    FaFileAudio,
    FaFileAlt,
    FaFile
} from "react-icons/fa";

function getFileType(extension: string) {
    switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
            return "image";
        case "mp4":
        case "mov":
        case "avi":
        case "mkv":
            return "video";
        case "mp3":
        case "wav":
            return "audio";
        case "pdf":
        case "doc":
        case "docx":
        case "txt":
            return "document";
        default:
            return "file";
    }
}

type FileThumbnailProps = {
    name: string;
};

export function FileThumbnail({ name }: FileThumbnailProps) {
    const extension = name.split(".").pop()?.toLowerCase();
    const fileType = extension ? getFileType(extension) : "file";

    const iconClass = "text-primary-500 text-4xl"; // Adjust Tailwind styles as needed

    switch (fileType) {
        case "image":
            return <FaFileImage className={iconClass} />;
        case "video":
            return <FaFileVideo className={iconClass} />;
        case "audio":
            return <FaFileAudio className={iconClass} />;
        case "document":
            return <FaFileAlt className={iconClass} />;
        default:
            return <FaFile className={iconClass} />;
    }
}
