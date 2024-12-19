import { Store } from "@/types/store";
import { User } from "@/types/user";
import { StateCreator } from "zustand";

export type UserState = {
    user: User | null;
};

export type UserActions = {
    setUser: (user: User | null) => void;
    setUserName: (userName: string) => void;
};

export type userSlice = UserState & UserActions;



export const createUserSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    userSlice
> = (set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    setUserName: (userName: string) => set((state) => {
        if (state.user) {
            state.user.userName = userName;
        }
    }),
});

