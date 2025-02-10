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
    creators: string[];
    duration: number;
    comments?: number;
    isPublic?: boolean;
    released: boolean;
};

export type RealVideo = {
    comments: number | null;
    created_at: string;
    creators: string | null;
    description: string | null;
    duration: number | null;
    id: string;
    is_public: boolean;
    likes: number | null;
    released: boolean;
    tags: string | null;
    thumbnailUrl: string | null;
    title: string | null;
    url: string | null;
    user_id: string | null;
    views: number | null;
};
