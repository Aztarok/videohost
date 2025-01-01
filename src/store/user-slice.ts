import { Store } from "@/types/store";
import { User } from "@/types/user";
import { StateCreator } from "zustand";

export type UserState = {
    user: User | null;
    isSignedIn: boolean;
};

export type UserActions = {
    setUser: (user: User | null) => void;
    setUserName: (userName: string) => void;
    setIsSignedIn: (isSignedIn: boolean) => void;
};

export type userSlice = UserState & UserActions;

export const createUserSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    userSlice
> = (set) => ({
    user: null,
    isSignedIn: false,
    setUser: (user: User | null) => set({ user }),
    setUserName: (userName: string) =>
        set((state) => {
            if (state.user) {
                state.user.userName = userName;
            }
        }),
    setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn })
});
