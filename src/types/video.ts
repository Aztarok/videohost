type Video = {
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    userId: string;
    uploadDate: Date;
    description: string;
    views?: number;
    likes?: number;
    tags?: string[];
    duration?: number;
    comments?: number;
    isPublic?: boolean;
};
