export type Video = {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    userId: string;
    uploadDate: Date;
    description: string;
    views: number;
    likes?: number;
    tags?: string[];
    artists: string[];
    duration: number;
    comments?: number;
    isPublic?: boolean;
    released: boolean;
};
