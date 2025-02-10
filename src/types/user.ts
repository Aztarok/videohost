export type User = {
    id: string;
    createdAt: Date;
    userName: string | null;
    email: string;
    imageUrl: string | null;
    isActive: boolean;
};
